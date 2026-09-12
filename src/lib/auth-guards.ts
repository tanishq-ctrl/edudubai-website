/**
 * Server-side authentication and authorization guards.
 *
 * Roles live in `public.profiles.role`. That column is deliberately NOT
 * writable by the `authenticated` or `anon` roles (see the column-level
 * REVOKE in the migration) because the dashboard profile page upserts this
 * same table straight from the browser — without that revoke, any signed-in
 * user could promote themselves to ADMIN.
 *
 * Always resolve roles here, on the server. Never trust a role value that
 * arrives from the client.
 */

import { createClient } from "@/lib/supabase/server"

export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN"

export type AuthedUser = {
  id: string
  email: string
  fullName: string | null
  role: UserRole
}

/**
 * Returns the currently signed-in user joined with their profile row, or null
 * when there is no valid session.
 */
export async function getCurrentUser(): Promise<AuthedUser | null> {
  const supabase = await createClient()

  // Supabase is not configured (e.g. local dev without env vars).
  if (!supabase) return null

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.email) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single()

  // A session without a profile row has no role, so it cannot be privileged.
  if (!profile) return null

  return {
    id: profile.id,
    email: user.email,
    fullName: profile.full_name ?? null,
    role: (profile.role as UserRole) ?? "STUDENT",
  }
}

/**
 * Returns the current user only if they hold the ADMIN role, otherwise null.
 */
export async function getCurrentAdmin(): Promise<AuthedUser | null> {
  const user = await getCurrentUser()
  return user?.role === "ADMIN" ? user : null
}
