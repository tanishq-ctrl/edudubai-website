import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDashboardStats, getUserPayments } from "@/server/dashboard/queries"
import { BookOpen, CheckCircle2, CreditCard, ArrowRight, GraduationCap, Clock, Bell, Settings } from "lucide-react"

// Mark as dynamic since it uses cookies
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let supabase
  let user
  let profile

  try {
    supabase = await createClient()

    if (!supabase) {
      redirect("/auth/login?next=/dashboard")
    }

    const { data: { user: authUser } } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?next=/dashboard")
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    profile = profileData
  } catch (error) {
    console.error("[Dashboard Page] Supabase error:", error)
    redirect("/auth/login?next=/dashboard")
  }

  const userName = profile?.full_name || user?.email?.split("@")[0] || "User"
  const stats = await getDashboardStats(user.id)
  const recentPayments = await getUserPayments(user.id)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tight">
            Hello, {userName}! 👋
          </h1>
          <p className="text-neutral-text-muted mt-1 font-medium">
            Here&apos;s what&apos;s happening with your learning today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-xl relative">
            <Bell className="h-5 w-5 text-neutral-text" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-xl">
            <Link href="/dashboard/profile">
              <Settings className="h-5 w-5 text-neutral-text" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Courses Subscribed", value: stats.activeCourses + stats.completedCourses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "In Progress", value: stats.activeCourses, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Completed", value: stats.completedCourses, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Payments", value: stats.paymentsCount, icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((item, idx) => (
          <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-text-muted uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <div className="text-3xl font-black text-brand-navy">{item.value}</div>
                </div>
                <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}>
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main learning section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning Card */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-brand-gold" />
                Continue Learning
              </h2>
            </div>

            {stats.continueLearning ? (
              <Card className="overflow-hidden border-2 border-brand-navy/5 hover:border-brand-navy/10 transition-colors shadow-sm">
                <CardContent className="p-0">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-brand-gold text-brand-navy hover:bg-brand-gold font-bold">
                          Next Session
                        </Badge>
                        <Badge variant="outline" className="border-brand-navy/20 text-brand-navy">
                          {stats.continueLearning.delivery_mode.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-black text-brand-navy mb-2 tracking-tight">
                        {stats.continueLearning.course_title}
                      </h3>
                      <p className="text-neutral-text-muted text-sm line-clamp-2 mb-6">
                        Stay ahead of compliance regulations with our practitioner-led training sessions.
                      </p>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-brand-gold" />
                          <span className="text-xs font-bold text-brand-navy">Enrollment ID: #{stats.continueLearning.id.slice(0, 8)}</span>
                        </div>
                        {stats.continueLearning.start_date && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs font-bold text-brand-navy">Active since {new Date(stats.continueLearning.start_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button asChild size="lg" className="bg-brand-navy text-white hover:bg-brand-navy/90 rounded-xl px-8 shadow-xl shadow-brand-navy/20">
                      <Link href={`/courses/${stats.continueLearning.course_slug}`}>
                        Resume Course
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2 bg-neutral-bg-subtle/50">
                <CardContent className="p-10 text-center">
                  <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border shadow-sm">
                    <BookOpen className="h-8 w-8 text-neutral-text-muted" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2">No active enrollments</h3>
                  <p className="text-neutral-text-muted text-sm mb-6 max-w-xs mx-auto">
                    Start your journey today by browsing our globally recognized compliance certifications.
                  </p>
                  <Button asChild className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light rounded-xl">
                    <Link href="/courses">Browse Official Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Featured/Upcoming? */}
          <section className="bg-gradient-to-br from-brand-navy to-brand-navy/90 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Upgrade your skills</h3>
              <p className="text-white/70 text-sm mb-6 max-w-md">
                Get certified in Regulatory Compliance or AML with our industry practitioners. New batches starting soon.
              </p>
              <Button asChild variant="gold" className="rounded-xl">
                <Link href="/courses">View Course Catalog</Link>
              </Button>
            </div>
          </section>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-brand-navy flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-brand-gold" />
                Recent Payments
              </CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-0">
                {recentPayments.length > 0 ? (
                  recentPayments.slice(0, 5).map((payment) => (
                    <div key={payment.id} className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-bg-subtle transition-colors border-b last:border-0">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        payment.status === "SUCCESS" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                      )}>
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-navy truncate">
                          {payment.course_slug.replace(/-/g, " ")}
                        </p>
                        <p className="text-[10px] font-medium text-neutral-text-muted tracking-wide">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-brand-navy">
                          {payment.amount_usd} {payment.currency}
                        </p>
                        <Badge variant="outline" className={cn(
                          "text-[9px] h-4 font-bold uppercase p-0",
                          payment.status === "SUCCESS" ? "text-emerald-600" : "text-red-600"
                        )}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-10 text-center">
                    <p className="text-sm text-neutral-text-muted">No payment history found.</p>
                  </div>
                )}
              </div>
              {recentPayments.length > 5 && (
                <div className="p-4 text-center">
                  <Button asChild variant="link" className="text-xs font-bold text-brand-navy">
                    <Link href="/dashboard/payments">View all payments</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

