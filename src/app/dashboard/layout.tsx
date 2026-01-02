import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user

  try {
    const supabase = await createClient()
    
    if (!supabase) {
      console.log('[Dashboard Layout] Supabase not configured, redirecting to login')
      redirect("/auth/login?next=/dashboard")
    }

    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    user = authUser

    // Debug logging
    console.log('[Dashboard Layout]', {
      hasUser: !!user,
      userId: user?.id || null,
      error: authError?.message || null,
    })

    if (!user) {
      console.log('[Dashboard Layout] No user found, redirecting to login')
      redirect("/auth/login?next=/dashboard")
    }

    console.log('[Dashboard Layout] User authenticated, rendering dashboard')
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

