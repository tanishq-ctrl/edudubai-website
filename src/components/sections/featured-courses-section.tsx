import Link from "next/link"
import { Container } from "@/components/container"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { getFeaturedCoursesNew } from "@/server/actions/courses"

export async function FeaturedCoursesSection() {
  const featuredCourses = await getFeaturedCoursesNew()

  return (
    <section className="py-12 md:py-14 bg-gradient-to-br from-neutral-bg-subtle via-slate-50 to-neutral-bg relative overflow-hidden">
      {/* Subtle brand-aligned gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/5 via-transparent to-brand-gold/5"></div>
      <Container className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Featured Courses
          </h2>
          <p className="text-lg md:text-xl text-neutral-text-muted max-w-2xl mx-auto">
            Discover our most popular professional development programs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button
            asChild
            size="xl"
            variant="gold"
          >
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

