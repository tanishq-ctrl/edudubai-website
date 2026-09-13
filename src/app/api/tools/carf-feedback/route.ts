import { NextRequest, NextResponse } from "next/server"
import { syncLeadToSystemeIO } from "@/lib/systeme-io"
import { verifyTurnstile } from "@/lib/turnstile"
import { logger } from "@/lib/logger"
import { enforceRateLimit } from "@/lib/rate-limit"
import { recordLead, markLeadSynced } from "@/server/leads-repository"

function clampRating(val: unknown): string {
  const n = Number(val)
  if (!Number.isFinite(n) || n < 0 || n > 5) return ""
  return String(Math.round(n))
}

function sanitizeText(val: unknown, maxLen = 700): string {
  if (typeof val !== "string") return ""
  return val.slice(0, maxLen).replace(/[<>]/g, "")
}

function sanitizeList(val: unknown): string {
  if (!Array.isArray(val)) return ""
  return val.filter((v): v is string => typeof v === "string").join(", ").slice(0, 200)
}

export async function POST(req: NextRequest) {
  const limited = enforceRateLimit(req, "carf-feedback", { limit: 5, windowMs: 60_000 })
  if (limited) return limited
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const {
    turnstileToken,
    overall, relevance, clarity, practical, expertise,
    liked, more,
    recommend,
    resources, services, otherService,
    fullname, email, org, jobtitle, country,
  } = body

  const safeName = sanitizeText(fullname, 200)
  const safeEmail = sanitizeText(email, 200)
  const safeLiked = sanitizeText(liked)

  if (!safeName || !safeEmail || !safeLiked) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
  }

  const valid = await verifyTurnstile(sanitizeText(turnstileToken, 2048))
  if (!valid) {
    return NextResponse.json(
      { error: "Security check failed. Please refresh and try again." },
      { status: 403 }
    )
  }

  const firstName = safeName.split(" ")[0]

  /*
     Persist before any CRM work, the same rule the other five inbound forms
     follow. This route used to be CRM-only: the answers went to Systeme.io
     and nowhere we own, so webinar feedback never appeared in the admin
     activity feed, and with no API key configured the route returned
     `{ ok: true }` while dropping the submission outright.

     The ratings and free text ride in `metadata`, which is jsonb, so the whole
     response is recoverable from our own database whatever the CRM does.
  */
  const leadId = await recordLead({
    source: "GENERAL",
    name: safeName,
    email: safeEmail,
    company: sanitizeText(org, 200),
    courseTitle: "CARF Webinar Feedback",
    message: safeLiked,
    metadata: {
      form: "carf_webinar_feedback",
      ratings: {
        overall: clampRating(overall),
        relevance: clampRating(relevance),
        clarity: clampRating(clarity),
        practical: clampRating(practical),
        expertise: clampRating(expertise),
        recommend: clampRating(recommend),
      },
      liked: safeLiked,
      wantsMoreOn: sanitizeText(more),
      resources: sanitizeList(resources),
      services: sanitizeList(services),
      otherService: sanitizeText(otherService, 500),
      jobTitle: sanitizeText(jobtitle, 200),
      country: sanitizeText(country, 200),
    },
  })

  const apiKey = process.env.SYSTEME_IO_API_KEY

  if (!apiKey) {
    logger.warn("[CARF-Feedback] SYSTEME_IO_API_KEY not set, skipping sync")
    return NextResponse.json({ ok: true, saved: true, synced: false })
  }

  const contact = await syncLeadToSystemeIO({
    email: safeEmail,
    firstName,
    company: sanitizeText(org, 200),
    courseInterest: "CARF Webinar Feedback",
  })

  if (!contact?.id) {
    /* The feedback is already stored, so this is a sync failure, not a lost
       submission: report success to the visitor and leave the row unsynced
       for a later replay. */
    logger.warn("[CARF-Feedback] contact sync failed; feedback stored unsynced")
    return NextResponse.json({ ok: true, saved: true, synced: false })
  }

  const contactId = contact.id

  // Save all feedback fields individually
  try {
    const res = await fetch(`https://api.systeme.io/api/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        fields: [
          { slug: "carf_overall", value: clampRating(overall) },
          { slug: "carf_relevance", value: clampRating(relevance) },
          { slug: "carf_clarity", value: clampRating(clarity) },
          { slug: "carf_practical", value: clampRating(practical) },
          { slug: "carf_expertise", value: clampRating(expertise) },
          { slug: "carf_liked", value: safeLiked },
          { slug: "carf_topics", value: sanitizeText(more) },
          { slug: "carf_recommend", value: clampRating(recommend) },
          { slug: "carf_resources", value: sanitizeList(resources) },
          { slug: "carf_services", value: sanitizeList(services) },
          { slug: "carf_other_service", value: sanitizeText(otherService, 500) },
          { slug: "carf_jobtitle", value: sanitizeText(jobtitle, 200) },
          { slug: "carf_country", value: sanitizeText(country, 200) },
        ],
      }),
    })
    if (!res.ok) {
      logger.error("[CARF-Feedback] field update failed:", res.status)
    } else {
      logger.debug("[CARF-Feedback] All fields saved")
    }
  } catch (err) {
    logger.error("[CARF-Feedback] custom field update failed:", err)
  }

  // Apply tag — hardcode ID after first lookup for performance
  try {
    const tagsRes = await fetch("https://api.systeme.io/api/tags", {
      headers: { "X-API-Key": apiKey },
    })
    const tagsData = await tagsRes.json()
    const feedbackTag = tagsData.items?.find(
      (t: { name: string }) => t.name.trim() === "CARF_Webinar_Feedback"
    )
    if (feedbackTag) {
      await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
        body: JSON.stringify({ tagId: feedbackTag.id }),
      })
    }
  } catch (err) {
    logger.error("[CARF-Feedback] tag assignment failed:", err)
  }

  await markLeadSynced(leadId, contactId)

  return NextResponse.json({ ok: true, saved: true, synced: true })
}
