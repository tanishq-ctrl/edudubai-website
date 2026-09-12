import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client.
 *
 * This client BYPASSES Row Level Security. Never expose it to the browser and
 * never call it from a route or action that has not already verified the
 * caller is an admin (`getCurrentAdmin()` in `@/lib/auth-guards`).
 *
 * It exists because RLS on `profiles` scopes each user to their own row, so an
 * admin listing every user needs to read past that policy.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
