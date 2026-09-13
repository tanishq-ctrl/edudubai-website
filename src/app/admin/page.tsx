import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-guards"
import { getAllUsers } from "@/server/actions/admin"
import { listCoursesForAdmin } from "@/server/actions/admin-courses"
import { CoursesManager } from "@/components/admin/courses-manager"
import { listActivity, getActivityCounts, getActivityStats } from "@/server/actions/admin-activity"
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

  const [users, courses, activity, activityCounts, stats] = await Promise.all([
    getAllUsers(),
    listCoursesForAdmin({ includeArchived: true }),
    listActivity(),
    getActivityCounts(),
    getActivityStats(),
  ])

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-content-strong">Admin Dashboard</h1>
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
        <TabsContent value="analytics" className="space-y-6">
          {/*
             Counted from our own tables, not derived from what the page
             already had in props. These four answer the questions the panel
             exists for: how much is coming in, is any of it waiting on me,
             and is the CRM mirror keeping up.
          */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Last 7 days", value: stats.last7, hint: "inbound records" },
              { label: "Last 30 days", value: stats.last30, hint: "inbound records" },
              { label: "Leads awaiting contact", value: stats.openLeads, hint: "status NEW" },
              { label: "Not synced to CRM", value: stats.unsynced, hint: "replayable" },
            ].map((figure) => (
              <Card key={figure.label}>
                <CardContent className="py-5">
                  <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-content-subtle">
                    {figure.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-semibold tabular text-content-strong">
                    {figure.value}
                  </p>
                  <p className="mt-1 text-xs text-content-muted">{figure.hint}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leads by source</CardTitle>
                <CardDescription>Which form the enquiry arrived through.</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.bySource.length === 0 ? (
                  <p className="text-sm text-content-muted">
                    No leads recorded yet.
                  </p>
                ) : (
                  <dl className="border-t border-line">
                    {stats.bySource.map((row) => (
                      <div
                        key={row.source}
                        className="flex items-center justify-between border-b border-line py-2.5 text-sm"
                      >
                        <dt className="text-content">
                          {row.source.replace(/_/g, " ").toLowerCase()}
                        </dt>
                        <dd className="tabular font-medium text-content-strong">{row.count}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Catalogue and accounts</CardTitle>
                <CardDescription>Everything currently published and registered.</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="border-t border-line">
                  {[
                    {
                      term: "Live courses",
                      value: courses.filter((course) => !course.archivedAt).length,
                    },
                    { term: "Registered users", value: users.length },
                    {
                      term: "Enrolments",
                      value: users.reduce((total, user) => total + user._count.enrollments, 0),
                    },
                  ].map((row) => (
                    <div
                      key={row.term}
                      className="flex items-center justify-between border-b border-line py-2.5 text-sm"
                    >
                      <dt className="text-content">{row.term}</dt>
                      <dd className="tabular font-medium text-content-strong">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
