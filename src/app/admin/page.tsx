import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-guards"
import { getAllUsers } from "@/server/actions/admin"
import { listCoursesForAdmin } from "@/server/actions/admin-courses"
import { CoursesManager } from "@/components/admin/courses-manager"
import { listActivity, getActivityCounts } from "@/server/actions/admin-activity"
import { ActivityFeed } from "@/components/admin/activity-feed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUsersList } from "@/components/admin/users-list"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

// Mark as dynamic to prevent build-time Prisma access
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?next=/admin")
  }

  // Signed in but not an admin: do not reveal that this page exists.
  if (user.role !== "ADMIN") {
    notFound()
  }

  const [users, courses, activity, activityCounts] = await Promise.all([
    getAllUsers(),
    listCoursesForAdmin({ includeArchived: true }),
    listActivity(),
    getActivityCounts(),
  ])

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-navy-700 mb-2">Admin Dashboard</h1>
        <p className="text-content-muted">
          Manage courses, review inbound activity, and see who has signed up.
        </p>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">
            Activity
            {activityCounts.ALL ? (
              <span className="ml-1.5 text-xs opacity-70">{activityCounts.ALL}</span>
            ) : null}
          </TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <ActivityFeed
            initialItems={activity.items}
            initialHasMore={activity.hasMore}
            counts={activityCounts}
          />
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <CoursesManager courses={courses} />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <AdminUsersList users={users} />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-navy-700">
                  {courses.filter((course) => !course.archivedAt).length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-navy-700">{users.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-navy-700">
                  {users.reduce((total, user) => total + user._count.enrollments, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
