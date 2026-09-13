import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDashboardStats, getUserPayments } from "@/server/dashboard/queries"
import { BookOpen, CheckCircle2, CreditCard, ArrowRight, GraduationCap, Clock, Settings } from "lucide-react"

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
          <h1 className="text-3xl md:text-4xl font-semibold text-content-strong tracking-tight">
            {userName}
          </h1>
          <p className="mt-1 text-content-muted">
            Your enrolments, materials and payment history.
          </p>
        </div>
        {/*
           The bell that used to sit here had no handler and carried a red dot
           that was always lit: a control that does nothing, promising unread
           news that does not exist. There is no notification feature to wire
           it to, so it is gone rather than faked.
        */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" className="rounded-sm">
            <Link href="/dashboard/profile" aria-label="Profile and settings">
              <Settings aria-hidden="true" className="h-5 w-5 text-content" />
            </Link>
          </Button>
        </div>
      </div>

      {/*
         One ruled strip, not four floating cards. The figures are the point,
         so they are set in the display face at a readable size with the label
         under them -- the same figure/label pairing the about hero uses --
         and the icon tiles are gone: they decorated four numbers that already
         had names.
      */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-4">
        {[
          { label: "Courses", value: stats.activeCourses + stats.completedCourses },
          { label: "In progress", value: stats.activeCourses },
          { label: "Completed", value: stats.completedCourses },
          { label: "Payments", value: stats.paymentsCount },
        ].map((item) => (
          <div key={item.label} className="bg-surface-raised px-6 py-5">
            <dd className="font-display text-3xl font-semibold leading-none tracking-tight tabular text-content-strong">
              {item.value}
            </dd>
            <dt className="mt-2 text-2xs font-semibold uppercase tracking-[0.18em] text-content-subtle">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main learning section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning Card */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold tracking-tight text-content-strong">
                Continue where you left off
              </h2>
            </div>

            {stats.continueLearning ? (
              <Card className="overflow-hidden rounded-sm border border-line border-t-2 border-t-crimson-600 shadow-none">
                <CardContent className="p-0">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-gold-400 font-semibold text-ink-950 hover:bg-gold-400">
                          Next session
                        </Badge>
                        <Badge variant="outline" className="border-line text-content-strong">
                          {stats.continueLearning.delivery_mode.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-semibold text-content-strong mb-2 tracking-tight">
                        {stats.continueLearning.course_title}
                      </h3>
                      <p className="text-content-muted text-sm line-clamp-2 mb-6">
                        Stay ahead of compliance regulations with our practitioner-led training sessions.
                      </p>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock aria-hidden="true" className="h-4 w-4 text-content-subtle" />
                          <span className="tabular text-xs text-content-muted">
                            Enrolment {stats.continueLearning.id.slice(0, 8)}
                          </span>
                        </div>
                        {stats.continueLearning.start_date && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-success" />
                            <span className="tabular text-xs text-content-muted">
                              Active since {new Date(stats.continueLearning.start_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button asChild size="lg" variant="primary" className="rounded-sm px-8">
                      <Link href={`/courses/${stats.continueLearning.course_slug}`}>
                        Resume Course
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-sm border border-line shadow-none">
                <CardContent className="p-10 text-center">
                  <h3 className="font-display text-lg font-semibold text-content-strong">
                    No active enrolments
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-content-muted">
                    Programmes you enrol on will appear here, with your session details.
                  </p>
                  <Button asChild variant="primary" className="mt-6 rounded-sm">
                    <Link href="/courses">Browse programmes</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Featured/Upcoming? */}
          {/* A flat ink field with a crimson rule. The blurred gold orb that
              used to sit in this corner was the last piece of the treatment the
              re-theme removed from every other page. */}
          <section className="rounded-sm border-t-2 border-t-crimson-600 bg-ink-950 p-8 text-content-on-dark">
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Add a second certification
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-content-on-dark-muted">
              Programmes in AML/CFT, sanctions, trade-based money laundering and
              regulatory compliance, taught by practitioners who still do the job.
            </p>
            <Button asChild variant="primary" className="mt-6 rounded-sm">
              <Link href="/courses">View the catalogue</Link>
            </Button>
          </section>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-8">
          <Card className="h-full rounded-sm border border-line shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-lg font-semibold tracking-tight text-content-strong">
                Recent payments
              </CardTitle>
              <CardDescription>Your latest transactions.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-0">
                {recentPayments.length > 0 ? (
                  recentPayments.slice(0, 5).map((payment) => (
                    <div key={payment.id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-sunken transition-colors border-b last:border-0">
                      <div className={cn(
                        "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm",
                        payment.status === "SUCCESS"
                          ? "bg-surface-sunken text-success"
                          : "bg-danger/8 text-danger"
                      )}>
                        <CreditCard aria-hidden="true" className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium capitalize text-content-strong">
                          {payment.course_slug.replace(/-/g, " ")}
                        </p>
                        <p className="text-2xs font-medium text-content-muted tracking-wide">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-content-strong">
                          {payment.amount_usd} {payment.currency}
                        </p>
                        <Badge variant="outline" className={cn(
                          "text-2xs h-4 font-bold uppercase p-0",
                          payment.status === "SUCCESS" ? "text-success" : "text-danger"
                        )}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-10 text-center">
                    <p className="text-sm text-content-muted">No payment history found.</p>
                  </div>
                )}
              </div>
              {recentPayments.length > 5 && (
                <div className="p-4 text-center">
                  <Button asChild variant="link" className="text-xs font-bold text-content-strong">
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

