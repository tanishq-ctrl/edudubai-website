import { redirect } from "next/navigation"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"
import { logger } from "@/lib/logger"

// Signed-in areas must never be indexed.
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

// Reads cookies, so it can never be statically rendered.
export const dynamic = "force-dynamic"

/**
 * `redirect()` signals by throwing an error carrying a `NEXT_REDIRECT` digest.
 * Detected via the digest rather than importing Next's internal
 * `isRedirectError`, which lives under `next/dist/**` and is not a stable
 * public entry point.
 */
function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  )
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = await createClient()

    if (!supabase) {
      logger.debug("[Dashboard Layout] Supabase not configured")
      redirect("/auth/login?next=/dashboard")
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    logger.debug("[Dashboard Layout]", {
      hasUser: Boolean(user),
      error: authError?.message ?? null,
    })

    if (!user) {
      redirect("/auth/login?next=/dashboard")
    }
  } catch (error) {
    // Without this re-throw the catch swallowed every successful redirect,
    // logged it as a failure, and issued the same redirect again -- so the
    // normal signed-out path emitted an error on each request.
    if (isRedirectError(error)) throw error

    // Diagnostics go through the logger, never console -- see src/lib/logger.ts.
    logger.error("[Dashboard Layout] Supabase error", error)
    redirect("/auth/login?next=/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-sunken">
      <DashboardTopbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-gutter py-section-xs">{children}</div>
        </main>
      </div>
    </div>
  )
}
