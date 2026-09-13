import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Section, SectionHeading } from "@/components/section"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Reveal, Stagger } from "@/components/motion"
import { getFeaturedCoursesNew } from "@/server/actions/courses"

export async function FeaturedCoursesSection() {
  const featuredCourses = await getFeaturedCoursesNew()

  if (featuredCourses.length === 0) return null

  return (
    <Section tone="paper" size="md">
      <SectionHeading
        eyebrow="Certification tracks"
        title="Certification programmes"
        lead="Each programme is delivered live by practising compliance professionals, in line with the issuing body's official examination blueprint."
      />

      <Stagger
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        step={110}
        variant="up"
      >
        {featuredCourses.map((course, i) => (
          <CourseCard key={course.id} course={course} priority={i < 3} className="h-full" />
        ))}
      </Stagger>

      <Reveal variant="up" delay={140} className="mt-14 flex justify-center">
        <Button asChild size="xl" variant="outline">
          <Link href="/courses">
            View all programmes
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:translate-x-1"
            />
          </Link>
        </Button>
      </Reveal>
    </Section>
  )
}
