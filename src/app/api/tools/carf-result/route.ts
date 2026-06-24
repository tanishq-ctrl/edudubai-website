import { NextRequest, NextResponse } from "next/server"
import { syncLeadToSystemeIO } from "@/lib/systeme-io"
import { verifyTurnstile } from "@/lib/turnstile"

export async function POST(req: NextRequest) {
  const { name, email, company, score, riskLevel, turnstileToken } = await req.json()

  if (!name || !email || !company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const valid = await verifyTurnstile(turnstileToken ?? "")
  if (!valid) {
    return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 403 })
  }

  const firstName = name.split(" ")[0]
  const apiKey = process.env.SYSTEME_IO_API_KEY

  if (!apiKey) {
    console.warn("[CARF] SYSTEME_IO_API_KEY not set — skipping sync")
    return NextResponse.json({ ok: true })
  }

  // 1. Create/update contact + apply LEADS tag
  const contact = await syncLeadToSystemeIO({
    email,
    firstName,
    company,
    courseInterest: "CARF Diagnostic",
  })

  if (!contact?.id) {
    console.warn("[CARF] Contact sync failed — Systeme.io rejected the email or an error occurred")
    return NextResponse.json({ ok: true })
  }

  const contactId = contact.id

  // 2. Write carf_score and carf_risk custom fields
  try {
    await fetch(`https://api.systeme.io/api/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        fields: [
          { slug: "carf_score", value: String(score) },
          { slug: "carf_risk", value: riskLevel },
        ],
      }),
    })
  } catch (err) {
    console.error("[CARF] Custom field update failed:", err)
  }

  // 3. Apply CARF_Diagnostic tag
  try {
    const tagsRes = await fetch("https://api.systeme.io/api/tags", {
      headers: { "X-API-Key": apiKey },
    })
    const tagsData = await tagsRes.json()
    const carfTag = tagsData.items?.find(
      (t: { name: string }) => t.name.trim() === "CARF_Diagnostic"
    )
    if (carfTag) {
      await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
        body: JSON.stringify({ tagId: carfTag.id }),
      })
      console.log("[CARF] CARF_Diagnostic tag applied")
    } else {
      console.warn("[CARF] Tag 'CARF_Diagnostic' not found — create it in Systeme.io dashboard")
    }
  } catch (err) {
    console.error("[CARF] Tag assignment failed:", err)
  }

  return NextResponse.json({ ok: true })
}
