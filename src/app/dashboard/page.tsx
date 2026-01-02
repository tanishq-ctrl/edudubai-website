import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDashboardStats } from "@/server/dashboard/queries"
import { BookOpen, CheckCircle2, CreditCard, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  let supabase
  let user
  let profile

  try {
    supabase = await createClient()
    
    if (!supabase) {
      console.log('[Dashboard Page] Supabase not configured, redirecting to login')
      redirect("/auth/login?next=/dashboard")
    }

    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    user = authUser

    // Debug logging
    console.log('[Dashboard Page]', {
      hasUser: !!user,
      userId: user?.id || null,
      error: authError?.message || null,
    })

    if (!user) {
      console.log('[Dashboard Page] No user found, redirecting to login')
      redirect("/auth/login?next=/dashboard")
    }

    // Get user profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    profile = profileData
    console.log('[Dashboard Page] User authenticated, rendering dashboard content')
  } catch (error) {
    console.error("[Dashboard Page] Supabase error:", error)
    redirect("/auth/login?next=/dashboard")
  }

  const userName = profile?.full_name || user?.email?.split("@")[0] || "User"
  const stats = await getDashboardStats(user.id)

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="border-2 border-brand-gold/20 bg-gradient-to-br from-white to-brand-gold/5">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-brand-navy">
            Welcome back, {userName}!
          </CardTitle>
          <CardDescription className="text-base">
            Continue your learning journey with EduDubai
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-text-muted">
              Active Courses
            </CardTitle>
            <BookOpen className="h-5 w-5 text-brand-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-navy">{stats.activeCourses}</div>
            <p className="text-xs text-neutral-text-muted mt-1">
              Courses in progress
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-text-muted">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-brand-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-navy">{stats.completedCourses}</div>
            <p className="text-xs text-neutral-text-muted mt-1">
              Courses finished
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-text-muted">
              Payments
            </CardTitle>
            <CreditCard className="h-5 w-5 text-brand-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-navy">{stats.paymentsCount}</div>
            <p className="text-xs text-neutral-text-muted mt-1">
              Successful payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {stats.continueLearning ? (
        <Card className="border-2 border-brand-navy/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-brand-navy">Continue Learning</CardTitle>
            <CardDescription>
              Pick up where you left off
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-brand-navy mb-2">
                  {stats.continueLearning.course_title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-brand-gold/10 text-brand-gold border-brand-gold/20">
                    {stats.continueLearning.delivery_mode.replace(/_/g, " ")}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    {stats.continueLearning.status}
                  </Badge>
                </div>
                {stats.continueLearning.start_date && (
                  <p className="text-sm text-neutral-text-muted">
                    Started: {new Date(stats.continueLearning.start_date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button asChild className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light">
                <Link href={`/courses/${stats.continueLearning.course_slug}`}>
                  View Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Enroll in your first course to begin learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
