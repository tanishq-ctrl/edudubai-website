import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserEnrollments } from "@/server/dashboard/queries"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mark as dynamic since it uses cookies
export const dynamic = 'force-dynamic'

export default async function CoursesPage() {
  let user

  try {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?next=/dashboard/courses")
    }
  } catch (error) {
    console.error("Supabase error:", error)
    redirect("/auth/login?next=/dashboard/courses")
  }

  const enrollments = await getUserEnrollments(user.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-success/100 hover:bg-success">Active</Badge>
      case "COMPLETED":
        return <Badge className="bg-gold-400 hover:bg-gold-300">Completed</Badge>
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDeliveryModeBadge = (mode: string) => {
    return (
      <Badge variant="secondary" className="border-line bg-surface-sunken text-content-strong">
        {mode.replace(/_/g, " ")}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight text-content-strong">My Courses</h1>
        <p className="text-content-muted">
          Manage and track your course enrolments
        </p>
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Enrollments Yet</CardTitle>
            <CardDescription>
              Start learning by enrolling in a course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="primary">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Enrolled programmes</CardTitle>
            <CardDescription>
              {enrollments.length} {enrollments.length === 1 ? "course" : "courses"} enrolled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Delivery Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div className="font-medium text-content-strong">
                          {enrollment.course_title}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getDeliveryModeBadge(enrollment.delivery_mode)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(enrollment.status)}
                      </TableCell>
                      <TableCell>
                        {enrollment.start_date
                          ? new Date(enrollment.start_date).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/courses/${enrollment.course_slug}`}>
                            View Details
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {enrollments.map((enrollment) => (
                <Card key={enrollment.id} className="rounded-sm border border-line shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">{enrollment.course_title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getDeliveryModeBadge(enrollment.delivery_mode)}
                      {getStatusBadge(enrollment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-content-muted mb-4">
                      <Calendar className="h-4 w-4" />
                      {enrollment.start_date
                        ? new Date(enrollment.start_date).toLocaleDateString()
                        : "No start date"}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/courses/${enrollment.course_slug}`}>
                        View Course Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

