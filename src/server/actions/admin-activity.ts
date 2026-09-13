"use server"

import { getCurrentAdmin } from "@/lib/auth-guards"
import { createAdminClient } from "@/lib/supabase/admin"
import { STATUS_OPTIONS } from "@/lib/activity-status"
import { logger } from "@/lib/logger"

/**
 * Reads the admin_activity view, which unions every inbound activity:
 * leads, CARF diagnostics, trainer applications, support requests,
 * enrollments and scholarship applications.
 *
 * The view is service-role only and declared security_invoker, so it is
 * unreachable from any browser role. Every action here re-checks the caller,
 * because a "use server" export is an addressable endpoint on its own.
 */

async function assertAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error("Unauthorized")
  return admin
}

export type ActivityKind =
  | "LEAD"
  | "CARF"
  | "TRAINER"
  | "SUPPORT"
  | "ENROLLMENT"
  | "SCHOLARSHIP"

export type ActivityItem = {
  kind: ActivityKind
  id: string
  occurredAt: string
  personName: string | null
  personEmail: string | null
  summary: string | null
  status: string | null
}

export type ActivityPage = {
  items: ActivityItem[]
  hasMore: boolean
}

const PAGE_SIZE = 25

/**
 * One page of activity, newest first.
 *
 * Pagination is offset-based. The view is a UNION ALL across six tables with
 * no shared index, so keyset pagination would not help; at this data volume
 * offsets are fine, and the admin panel is the only reader.
 */
export async function listActivity(options: {
  kind?: ActivityKind | "ALL"
  offset?: number
  search?: string
} = {}): Promise<ActivityPage> {
  await assertAdmin()

  const supabase = createAdminClient()
  if (!supabase) return { items: [], hasMore: false }

  const offset = Math.max(0, options.offset ?? 0)

  let query = supabase
    .from("admin_activity")
    .select("kind, id, occurred_at, person_name, person_email, summary, status")
    .order("occurred_at", { ascending: false })
    // Fetch one extra row to detect whether another page exists.
    .range(offset, offset + PAGE_SIZE)

  if (options.kind && options.kind !== "ALL") {
    query = query.eq("kind", options.kind)
  }

  /*
     Search across the person and the summary. The term is escaped for PostgREST's
     `or` grammar: a raw comma or parenthesis would otherwise be read as filter
     syntax rather than as text to match.
  */
  const term = (options.search ?? "").trim().slice(0, 100)
  if (term) {
    const safe = term.replace(/[,()*\\]/g, " ")
    query = query.or(
      `person_name.ilike.%${safe}%,person_email.ilike.%${safe}%,summary.ilike.%${safe}%`
    )
  }

  const { data, error } = await query

  if (error) {
    logger.error("[admin-activity] list failed:", error.message)
    return { items: [], hasMore: false }
  }

  const rows = data ?? []
  const hasMore = rows.length > PAGE_SIZE

  return {
    items: rows.slice(0, PAGE_SIZE).map((row) => ({
      kind: row.kind as ActivityKind,
      id: row.id,
      occurredAt: row.occurred_at,
      personName: row.person_name,
      personEmail: row.person_email,
      summary: row.summary,
      status: row.status,
    })),
    hasMore,
  }
}

/** Row counts per activity kind, for the filter badges. */
export async function getActivityCounts(): Promise<Record<string, number>> {
  await assertAdmin()

  const supabase = createAdminClient()
  if (!supabase) return {}

  const kinds: ActivityKind[] = [
    "LEAD",
    "CARF",
    "TRAINER",
    "SUPPORT",
    "ENROLLMENT",
    "SCHOLARSHIP",
  ]

  const results = await Promise.all(
    kinds.map(async (kind) => {
      const { count } = await supabase
        .from("admin_activity")
        .select("id", { count: "exact", head: true })
        .eq("kind", kind)
      return [kind, count ?? 0] as const
    })
  )

  const counts = Object.fromEntries(results) as Record<string, number>
  counts.ALL = results.reduce((total, [, count]) => total + count, 0)
  return counts
}


/* ---------------------------------------------------------------------------
   Detail and triage
   ---------------------------------------------------------------------------
   The feed is a summary line, which is enough to see that something arrived
   and useless for acting on it: the contact message, the phone number, the
   CARF answers and the trainer's CV all lived only in the database. These two
   actions are what make the panel a place to work rather than a place to look.

   Both re-check the caller. A "use server" export is an addressable endpoint
   no matter which component calls it.
--------------------------------------------------------------------------- */

/** The table behind each activity kind, and the column carrying its date. */
const SOURCE_TABLE: Record<ActivityKind, { table: string; createdAt: string }> = {
  LEAD: { table: "leads", createdAt: "created_at" },
  CARF: { table: "carf_submissions", createdAt: "created_at" },
  TRAINER: { table: "trainer_applications", createdAt: "created_at" },
  SUPPORT: { table: "support_requests", createdAt: "created_at" },
  ENROLLMENT: { table: "enrollments", createdAt: "created_at" },
  SCHOLARSHIP: { table: "scholarship_applications", createdAt: "createdAt" },
}

const KINDS: ActivityKind[] = [
  "LEAD",
  "CARF",
  "TRAINER",
  "SUPPORT",
  "ENROLLMENT",
  "SCHOLARSHIP",
]

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * The whole row behind one activity item.
 *
 * Returned as a plain record so the panel can render whatever a table happens
 * to carry -- the shapes differ per kind and none of them is worth a bespoke
 * type here.
 */
export async function getActivityDetail(
  kind: ActivityKind,
  id: string
): Promise<Record<string, unknown> | null> {
  await assertAdmin()

  const source = SOURCE_TABLE[kind]
  if (!source || !KINDS.includes(kind)) return null
  /* The id reaches this endpoint from the network, so it is validated rather
     than trusted, even though it only ever reads. */
  if (!UUID_RE.test(id)) return null

  const supabase = createAdminClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from(source.table)
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    logger.error("[admin-activity] detail failed:", error.message)
    return null
  }

  return (data as Record<string, unknown>) ?? null
}

/** Moves one record through its own status list. */
export async function updateActivityStatus(
  kind: ActivityKind,
  id: string,
  status: string
): Promise<{ ok: boolean; error?: string }> {
  await assertAdmin()

  const allowed = STATUS_OPTIONS[kind]
  const source = SOURCE_TABLE[kind]

  /* Whitelisted, not passed through: the value lands in a column with a check
     constraint, and an arbitrary string from the client would either fail the
     constraint or write a status nothing else understands. */
  if (!allowed || !source || !allowed.includes(status)) {
    return { ok: false, error: "Unsupported status for this record" }
  }
  if (!UUID_RE.test(id)) return { ok: false, error: "Invalid id" }

  const supabase = createAdminClient()
  if (!supabase) return { ok: false, error: "Storage unavailable" }

  const { error } = await supabase.from(source.table).update({ status }).eq("id", id)

  if (error) {
    logger.error("[admin-activity] status update failed:", error.message)
    return { ok: false, error: "Could not update the status" }
  }

  return { ok: true }
}


/**
 * Headline figures for the analytics tab.
 *
 * Everything here is counted from our own tables. The tab previously showed
 * three numbers that were all derived from the page's existing props -- course
 * count, user count, a sum of enrollment counts -- and said nothing about the
 * thing the panel exists to watch, which is what is coming IN and whether it
 * is being dealt with.
 */
export type ActivityStats = {
  last7: number
  last30: number
  openLeads: number
  unsynced: number
  bySource: Array<{ source: string; count: number }>
}

export async function getActivityStats(): Promise<ActivityStats> {
  await assertAdmin()

  const supabase = createAdminClient()
  const empty: ActivityStats = {
    last7: 0,
    last30: 0,
    openLeads: 0,
    unsynced: 0,
    bySource: [],
  }
  if (!supabase) return empty

  const since = (days: number) =>
    new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const [last7, last30, openLeads, unsynced, sources] = await Promise.all([
    supabase
      .from("admin_activity")
      .select("id", { count: "exact", head: true })
      .gte("occurred_at", since(7)),
    supabase
      .from("admin_activity")
      .select("id", { count: "exact", head: true })
      .gte("occurred_at", since(30)),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "NEW"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("crm_synced", false),
    supabase.from("leads").select("source"),
  ])

  const tally = new Map<string, number>()
  for (const row of (sources.data ?? []) as Array<{ source: string }>) {
    tally.set(row.source, (tally.get(row.source) ?? 0) + 1)
  }

  return {
    last7: last7.count ?? 0,
    last30: last30.count ?? 0,
    openLeads: openLeads.count ?? 0,
    unsynced: unsynced.count ?? 0,
    bySource: Array.from(tally, ([source, count]) => ({ source, count })).sort(
      (a, b) => b.count - a.count
    ),
  }
}
