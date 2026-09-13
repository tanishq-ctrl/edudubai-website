"use server"

import { getCurrentAdmin } from "@/lib/auth-guards"
import { createAdminClient } from "@/lib/supabase/admin"
import { logger } from "@/lib/logger"

/**
 * Server actions are individually addressable endpoints — Next.js assigns each
 * one an ID that anyone can POST to. Gating the /admin page is NOT enough:
 * every action here must verify the caller itself.
 */
async function assertAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    throw new Error("Unauthorized")
  }
  return admin
}

export type AdminUser = {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: Date
  _count: {
    enrollments: number
    payments: number
  }
}

/**
 * Lists every registered user.
 *
 * Reads through the service-role client because RLS on `profiles` scopes each
 * user to their own row. Email lives in `auth.users`, not `profiles`, so it is
 * fetched from the auth admin API and joined in memory.
 */
export async function getAllUsers(): Promise<AdminUser[]> {
  try {
    await assertAdmin()

    const supabase = createAdminClient()
    if (!supabase) return []

    const [{ data: profiles }, { data: authUsers }, { data: enrollments }, { data: payments }] =
      await Promise.all([
        supabase.from("profiles").select("id, full_name, role, created_at"),
        supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
        supabase.from("enrollments").select("user_id"),
        supabase.from("payments").select("user_id"),
      ])

    if (!profiles) return []

    const emailById = new Map(
      (authUsers?.users ?? []).map((user) => [user.id, user.email ?? ""])
    )

    const countBy = (rows: Array<{ user_id: string }> | null) => {
      const counts = new Map<string, number>()
      for (const row of rows ?? []) {
        counts.set(row.user_id, (counts.get(row.user_id) ?? 0) + 1)
      }
      return counts
    }

    const enrollmentCounts = countBy(enrollments)
    const paymentCounts = countBy(payments)

    return profiles.map((profile) => ({
      id: profile.id,
      email: emailById.get(profile.id) ?? "",
      name: profile.full_name ?? null,
      role: profile.role ?? "STUDENT",
      createdAt: new Date(profile.created_at),
      _count: {
        enrollments: enrollmentCounts.get(profile.id) ?? 0,
        payments: paymentCounts.get(profile.id) ?? 0,
      },
    }))
  } catch (error) {
    logger.error("Error fetching users:", error)
    return []
  }
}
