"use server"

import { getCurrentAdmin } from "@/lib/auth-guards"
import { createAdminClient } from "@/lib/supabase/admin"

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

  const { data, error } = await query

  if (error) {
    console.error("[admin-activity] list failed:", error.message)
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
