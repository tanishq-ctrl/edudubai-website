import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Cookie-less anonymous Supabase client for public, unauthenticated reads.
 *
 * Deliberately does NOT use the cookie-backed server client: touching cookies
 * opts a route out of static rendering, and the sitemap and course pages have
 * no reason to be per-user. This runs as the `anon` role, so Row Level
 * Security still applies -- for `courses` that means only rows with
 * published = true are visible.
 *
 * Never use this for anything user-specific.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return null

  return createSupabaseClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
