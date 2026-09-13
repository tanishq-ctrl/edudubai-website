import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Reveal, Stagger } from "@/components/motion"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { CoursesHero } from "@/components/sections/courses-hero"
import { CertificationsCtaSection } from "@/components/sections/certifications-cta-section"
import { getAllCoursesNew } from "@/server/actions/courses"
import { CoursesPageClient } from "./page-client"
import { Category, DeliveryMode } from "@/lib/types"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Compliance & AML Courses",
  description:
    "Browse EduDubai's catalogue of AML, sanctions, financial crime and corporate governance courses. Filter by category, level and delivery mode.",
  alternates: { canonical: "/courses" },
}

interface CoursesPageProps {
  // Next.js 15 delivers search params asynchronously.
  searchParams: Promise<{
    q?: string
    category?: string
    mode?: string
    body?: string
  }>
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const filters = await searchParams
  const allCourses = await getAllCoursesNew()

  // Filter courses based on search params
  let filteredCourses = allCourses

  // Search query filter
  if (filters.q) {
    const query = filters.q.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.shortDescription.toLowerCase().includes(query) ||
        course.longDescription.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (filters.category) {
    filteredCourses = filteredCourses.filter(
      (course) => course.category === filters.category
    )
  }

  // Delivery mode filter
  if (filters.mode) {
    filteredCourses = filteredCourses.filter((course) =>
      course.deliveryModes.includes(filters.mode as DeliveryMode)
    )
  }

  // Issuing Body filter
  if (filters.body) {
    filteredCourses = filteredCourses.filter(
      (course) => course.issuingBody === filters.body
    )
  }

  return (
    <>
      <CoursesPageClient />
      <CoursesHero />

      <Section tone="sunken" size="md">
        {/*
          Sticky filter bar. `top` clears the fixed header so the controls stay
          reachable while scrolling a long catalogue.
        */}
        <div className="sticky top-[calc(var(--header-h)+0.5rem)] z-30 -mx-gutter mb-10 px-gutter">
          <div className="rounded-lg border border-line bg-surface-raised p-4 shadow-lg sm:p-5">
            <Suspense
              fallback={<div className="h-28 animate-pulse rounded-sm bg-surface-sunken" />}
            >
              <CourseFilters />
            </Suspense>
          </div>
        </div>

        {/* The card titles are h3; without this the document jumped h1 -> h3.
            Visually redundant next to the hero, so it is screen-reader only. */}
        <h2 className="sr-only">Course results</h2>

        <div className="mb-8 flex items-baseline justify-between gap-4">
          <p className="text-sm text-content-muted">
            <span className="font-semibold text-content-strong tabular">
              {filteredCourses.length}
            </span>{" "}
            {filteredCourses.length === 1 ? "course" : "courses"}
            {filteredCourses.length !== allCourses.length ? (
              <span className="text-content-subtle"> of {allCourses.length}</span>
            ) : null}
          </p>
        </div>

        {filteredCourses.length === 0 ? (
          <Reveal variant="up">
            <div className="mx-auto max-w-md py-16 text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface-raised text-content-subtle shadow-sm"
              >
                <Search className="h-8 w-8" />
              </span>
              <h2 className="mt-7 text-2xl ">No programmes match your criteria</h2>
              <p className="mt-3 text-content-muted">
                Adjust your search or filters. The full catalogue contains {allCourses.length}
                programmes.
              </p>
              <Button asChild variant="outline" size="lg" className="mt-8">
                <Link href="/courses">Clear filters</Link>
              </Button>
            </div>
          </Reveal>
        ) : (
          <Stagger
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            step={70}
            variant="up"
          >
            {filteredCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} priority={i < 3} className="h-full" />
            ))}
          </Stagger>
        )}
      </Section>

      <CertificationsCtaSection />
    </>
  )
}
