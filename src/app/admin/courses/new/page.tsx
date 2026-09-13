import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth-guards"
import { CourseForm } from "@/components/admin/course-form"
import { Container } from "@/components/container"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "New Course",
  robots: { index: false, follow: false },
}

export default async function NewCoursePage() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/login?next=/admin/courses/new")
  if (user.role !== "ADMIN") notFound()

  return (
    <Container className="py-10 max-w-4xl">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center text-sm text-content-muted hover:text-crimson-600"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to admin
      </Link>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-content-strong">New Course</h1>
      <CourseForm />
    </Container>
  )
}
