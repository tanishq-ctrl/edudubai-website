import { getAllCourses, getAllUsers } from "@/server/actions/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCoursesList } from "@/components/admin/courses-list"
import { AdminUsersList } from "@/components/admin/users-list"

export default async function AdminPage() {
  // Phase 1: No authentication required
  // Phase 2: Add authentication check here

  const courses = await getAllCourses()
  const users = await getAllUsers()

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-brand-navy mb-2">Admin Dashboard</h1>
        <p className="text-neutral-text-muted">Manage courses, users, and platform settings</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          <AdminCoursesList courses={courses} />
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
                <p className="text-3xl font-bold text-brand-navy">{courses.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-brand-navy">{users.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-brand-navy">
                  {courses.reduce((acc: number, course: typeof courses[0]) => acc + course._count.enrollments, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
