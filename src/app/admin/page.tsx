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
    <div>
      {/*
         The panel opens on an ink band carrying the figures that decide what
         to do next -- what came in, what is waiting on a reply -- instead of a
         title over a tab strip. Same device as the marketing pages: a flat
         field, a crimson rule under it, figures set in the display face.
      */}
      <header className="border-b border-crimson-600 bg-ink-950 text-content-on-dark">
        <div className="container mx-auto max-w-7xl px-4 py-10">
          <span className="inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.22em] text-crimson-300">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            Administration
          </span>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            Inbound and catalogue
          </h1>
          <p className="mt-3 max-w-measure text-content-on-dark-muted">
            Every enquiry, application and enrolment the site has received, and the
            programmes it publishes.
          </p>

          <dl className="mt-9 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-white/15 pt-7 sm:grid-cols-4">
            {[
              { term: "Last 7 days", value: stats.last7 },
              { term: "Last 30 days", value: stats.last30 },
              { term: "Leads to contact", value: stats.openLeads },
              { term: "Registered users", value: users.length },
            ].map((figure) => (
              <div key={figure.term}>
                <dd className="font-display text-3xl font-semibold leading-none tracking-tight tabular">
                  {figure.value}
                </dd>
                <dt className="mt-2 text-2xs font-semibold uppercase tracking-[0.18em] text-content-on-dark-muted">
                  {figure.term}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-9">
      <Tabs defaultValue="activity" className="space-y-6">
        {/* A ruled tab bar, not a pill group: the underline is the same
            device the site uses for the active nav item. */}
        <TabsList className="h-auto w-full justify-start gap-7 rounded-none border-b border-line bg-transparent p-0">
          {[
            { value: "activity", label: "Activity", count: activityCounts.ALL },
            { value: "courses", label: "Courses", count: courses.length },
            { value: "users", label: "Users", count: users.length },
            { value: "analytics", label: "Analytics" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative rounded-none border-0 bg-transparent px-0 pb-3 pt-0 text-[15px] font-medium text-content-muted shadow-none transition-colors data-[state=active]:bg-transparent data-[state=active]:text-content-strong data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-transparent data-[state=active]:after:bg-crimson-600"
            >
              {tab.label}
              {tab.count ? (
                <span className="ml-2 tabular text-xs text-content-subtle">{tab.count}</span>
              ) : null}
            </TabsTrigger>
          ))}
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
            {/* Deliberately NOT the header rail's four figures again: this row
                covers what the band above it does not. */}
            {[
              { label: "Total inbound", value: activityCounts.ALL ?? 0, hint: "all time" },
              { label: "Not synced to CRM", value: stats.unsynced, hint: "replayable" },
              { label: "Trainer applications", value: activityCounts.TRAINER ?? 0, hint: "all time" },
              { label: "Scholarship applications", value: activityCounts.SCHOLARSHIP ?? 0, hint: "all time" },
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
    </div>
  )
}
