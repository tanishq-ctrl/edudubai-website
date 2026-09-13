import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { CertificationsCtaSection } from "@/components/sections/certifications-cta-section"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { getAllCoursesNew } from "@/server/actions/courses"
import { DeliveryMode } from "@/lib/types"
import { PathwayTable } from "./pathway-table"
import { CoursesPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "Compliance & AML Courses",
  description:
    "Browse EduDubai's catalogue of AML, sanctions, financial crime and corporate governance programmes. Filter by category, level and delivery mode.",
  alternates: { canonical: "/courses" },
}

interface CoursesPageProps {
  // Next.js 15 delivers search params asynchronously.
  searchParams: Promise<{
    q?: string
    category?: string
    mode?: string
    body?: string
    level?: string
  }>
}

/**
 * Course catalogue.
 *
 * On a browse page the catalogue IS the hero, so this does not use the shared
 * PageHeroImage: a full-height photograph would push the grid below the fold.
 * A compact navy head hands over to the filter bar, which straddles the
 * boundary between the head and the grid so the control the visitor needs
 * first is the most prominent object on the page.
 */
export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const filters = await searchParams
  const allCourses = await getAllCoursesNew()

  let filteredCourses = allCourses

  if (filters.q) {
    const query = filters.q.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.shortDescription.toLowerCase().includes(query) ||
        course.longDescription.toLowerCase().includes(query),
    )
  }

  if (filters.category) {
    filteredCourses = filteredCourses.filter((course) => course.category === filters.category)
  }

  if (filters.mode) {
    filteredCourses = filteredCourses.filter((course) =>
      course.deliveryModes.includes(filters.mode as DeliveryMode),
    )
  }

  if (filters.body) {
    filteredCourses = filteredCourses.filter((course) => course.issuingBody === filters.body)
  }

  if (filters.level) {
    filteredCourses = filteredCourses.filter((course) => course.level === filters.level)
  }

  /*
     Facets come from the catalogue rather than a hardcoded list, so a filter
     option exists only when something can match it. The old filter bar offered
     eight subjects against a catalogue that uses four.
  */
  const facets = {
    categories: Array.from(new Set(allCourses.map((c) => c.category))),
    bodies: Array.from(
      new Set(allCourses.map((c) => c.issuingBody).filter(Boolean)),
    ) as string[],
    levels: Array.from(new Set(allCourses.map((c) => c.level))),
  }

  const isFiltered = filteredCourses.length !== allCourses.length

  return (
    <>
      <CoursesPageClient />

      {/*
         No hero band. On a browse page the catalogue is the hero: a full-height
         navy head with a standfirst and a stat row only pushed the grid below
         the fold and delayed the one thing the visitor came for. The page opens
         on its title, hands straight to the controls, then to the programmes.

         The panel carries the page's only sunken fill. `--surface` and
         `--surface-raised` are both pure white, so a white card on a white page
         cannot define itself whatever ring it wears; the grey does that, and
         the search field inside goes white against it.
      */}
      <section className="bg-surface pb-section-md pt-header">
        <Container>
          <h1 className="mt-10 text-4xl tracking-tight sm:mt-12 sm:text-5xl">
            Professional certifications
          </h1>

          <div className="mt-8 rounded-xl bg-surface-sunken p-5 ring-1 ring-line sm:p-6">
            <Suspense
              fallback={<div className="h-28 animate-pulse rounded-sm bg-surface" />}
            >
              <CourseFilters facets={facets} />
            </Suspense>
          </div>

          <h2 className="sr-only">Course results</h2>

          <div className="mb-8 mt-12 flex items-baseline justify-between gap-4">
            {/* Count changes as filters are applied client-side; announce it. */}
            <p aria-live="polite" className="text-sm text-content-muted">
              <span className="font-semibold tabular text-content-strong">
                {filteredCourses.length}
              </span>{" "}
              {filteredCourses.length === 1 ? "programme" : "programmes"}
              {isFiltered ? (
                <span className="text-content-subtle"> of {allCourses.length}</span>
              ) : null}
            </p>
            {isFiltered ? (
              <Link
                href="/courses"
                className="text-sm font-medium text-navy-700 underline-offset-4 hover:underline"
              >
                Clear filters
              </Link>
            ) : null}
          </div>

          {filteredCourses.length === 0 ? (
            /* Never a bare "0 results": name what was searched and offer a way on. */
            <div className="mx-auto max-w-lg rounded-xl bg-surface-sunken px-8 py-16 text-center ring-1 ring-line">
              <span
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface text-content-subtle shadow-sm"
              >
                <Search className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl text-navy-900">
                No programmes match{filters.q ? ` “${filters.q}”` : " those filters"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-content-muted">
                Try a broader term, or browse the full catalogue of {allCourses.length}{" "}
                programmes.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {["AML", "Sanctions", "FATCA", "Governance"].map((term) => (
                  <Link
                    key={term}
                    href={`/courses?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-line-strong px-4 py-2 text-xs font-medium text-content transition-colors duration-fast hover:border-navy-400 hover:text-navy-700"
                  >
                    {term}
                  </Link>
                ))}
              </div>
              <Button asChild variant="gold" size="lg" className="mt-8">
                <Link href="/courses">View all programmes</Link>
              </Button>
            </div>
          ) : (
            <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, i) => (
                <li
                  key={course.id}
                  /* content-visibility defers off-screen cards on a long grid. */
                  className="[contain-intrinsic-size:0_28rem] [content-visibility:auto]"
                >
                  <CourseCard course={course} priority={i < 3} className="h-full" />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <PathwayTable />
      <CertificationsCtaSection />
    </>
  )
}
