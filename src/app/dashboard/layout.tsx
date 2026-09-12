import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"
import { logger } from "@/lib/logger"
import type { Metadata } from "next"

// Signed-in areas must never be indexed.
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
}

// Mark as dynamic since it uses cookies
export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user

  try {
    const supabase = await createClient()
    
    if (!supabase) {
      logger.debug('[Dashboard Layout] Supabase not configured, redirecting to login')
      redirect("/auth/login?next=/dashboard")
    }

    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    user = authUser

    // Debug logging
    logger.debug('[Dashboard Layout]', {
      hasUser: !!user,
      userId: user?.id || null,
      error: authError?.message || null,
    })

    if (!user) {
      logger.debug('[Dashboard Layout] No user found, redirecting to login')
      redirect("/auth/login?next=/dashboard")
    }

    logger.debug('[Dashboard Layout] User authenticated, rendering dashboard')
  } catch (error) {
    console.error("[Dashboard Layout] Supabase error:", error)
    redirect("/auth/login?next=/dashboard")
  }

  return (
    <div className="flex h-screen flex-col bg-neutral-bg-subtle">
      <DashboardTopbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

