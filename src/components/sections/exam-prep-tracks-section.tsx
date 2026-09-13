import { Section, SectionHeading } from "@/components/section"
import { CourseCard } from "@/components/course-card"
import { Stagger } from "@/components/motion"
import { getCourseBySlugNew } from "@/server/actions/courses"

/** Curated order for the certifications page, independent of the catalogue's own. */
const examPrepSlugs = [
  "cams",
  "anti-money-laundering-specialist",
  "fatca-crs-specialist",
  "sanctions-compliance-specialist",
  "regulatory-compliance-specialist",
  "certified-compliance-manager",
  "certified-global-sanctions-specialist",
  "trade-based-money-laundering",
]

/**
 * Renders through the shared CourseCard rather than a bespoke tile.
 * The previous version duplicated the card markup, so course tiles on
 * /certifications and /courses drifted apart visually over time.
 */
export async function ExamPrepTracksSection() {
  const results = await Promise.all(examPrepSlugs.map((slug) => getCourseBySlugNew(slug)))
  const tracks = results.filter((course): course is NonNullable<typeof course> => Boolean(course))

  if (tracks.length === 0) return null

  return (
    <Section tone="paper" size="md">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          align="start"
          eyebrow="Programmes"
          title="Exam preparation tracks"
          lead="Preparation programmes for the principal financial compliance certifications, delivered by practising specialists."
          className="max-w-3xl"
        />

        <span className="shrink-0 rounded-full border border-line bg-surface-sunken px-4 py-2 text-xs font-semibold text-content-muted">
          {tracks.length} programmes
        </span>
      </div>

      <Stagger
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        step={80}
        variant="up"
      >
        {tracks.map((course, i) => (
          <CourseCard key={course.id} course={course} priority={i < 3} className="h-full" />
        ))}
      </Stagger>
    </Section>
  )
}
