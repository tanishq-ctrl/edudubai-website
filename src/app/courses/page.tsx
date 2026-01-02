import { Suspense } from "react"
import { Container } from "@/components/container"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { CoursesHero } from "@/components/sections/courses-hero"
import { getAllCoursesNew } from "@/server/actions/courses"
import { CoursesPageClient } from "./page-client"
import { Category, DeliveryMode } from "@/lib/types"
import { Search } from "lucide-react"

interface CoursesPageProps {
  searchParams: {
    q?: string
    category?: string
    mode?: string
  }
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const allCourses = await getAllCoursesNew()
  
  // Filter courses based on search params
  let filteredCourses = allCourses

  // Search query filter
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.shortDescription.toLowerCase().includes(query) ||
        course.longDescription.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (searchParams.category) {
    filteredCourses = filteredCourses.filter(
      (course) => course.category === searchParams.category
    )
  }

  // Delivery mode filter
  if (searchParams.mode) {
    filteredCourses = filteredCourses.filter((course) =>
      course.deliveryModes.includes(searchParams.mode as DeliveryMode)
    )
  }

  return (
    <>
      <CoursesPageClient />
      <CoursesHero />
      <Container className="py-12 md:py-16">
        {/* Filters Section */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-32 animate-pulse bg-neutral-bg-subtle rounded-lg" />}>
            <CourseFilters />
          </Suspense>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm font-medium text-neutral-text-muted">
            {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
          </p>
        </div>

        {/* Course Grid or Empty State */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-neutral-bg-subtle rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-neutral-text-muted" />
              </div>
              <h3 className="text-2xl font-semibold text-brand-navy mb-2">
                No courses found
              </h3>
              <p className="text-neutral-text-muted mb-6">
                Try adjusting your search or filters to find what you're looking for
              </p>
              {(searchParams.q || searchParams.category || searchParams.mode) && (
                <p className="text-sm text-neutral-text-muted">
                  There are {allCourses.length} total courses available
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
