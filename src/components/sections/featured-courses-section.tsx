import Link from "next/link"
import { Container } from "@/components/container"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { getFeaturedCoursesNew } from "@/server/actions/courses"

export async function FeaturedCoursesSection() {
  const featuredCourses = await getFeaturedCoursesNew()

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/80 relative overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-indigo-100/20"></div>
      <Container className="relative z-10">
        <div className="text-center mb-16">
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
        <div className="text-center mt-16">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-navy hover:from-brand-gold-light hover:to-brand-gold font-semibold px-10 py-7 text-lg shadow-2xl shadow-brand-gold/30 hover:shadow-brand-gold/50 transition-all hover:scale-105"
          >
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

