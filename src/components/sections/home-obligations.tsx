import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"
import type { Course } from "@/lib/types"

/**
 * The index of obligations, directly under the hero carousel.
 *
 * The visitor enters through the exposure they already carry rather than
 * through a feature trio, so the rows are obligations first and programmes
 * second. It renders an h2, not an h1: the carousel above it owns the page
 * heading, and two h1s on one document is one too many.
 *
 * The ordinals are not decoration. Rows run in the order the obligations bite
 * across a customer's life -- onboard, screen, run the programme, monitor,
 * finance trade, report, test, own the function -- so the number carries the
 * sequence. Remove that ordering and the numbers should go with it.
 *
 * Only obligations with a programme behind them appear. Four of the ten
 * practice areas on /about (corporate tax, VAT, labour law, consumer
 * protection) have no course in the catalogue, and an index row promising one
 * would be a lie. /about keeps those; this page does not.
 */

/**
 * Obligation copy, keyed by course id. Hours, level and issuing body are NOT
 * repeated here -- they are read from the catalogue at render so this index
 * cannot drift out of step with /courses.
 */
const obligations: Array<{ courseId: string; obligation: string; detail: string }> = [
  {
    courseId: "aml-specialist",
    obligation: "Customer onboarding and due diligence",
    detail: "Customer due diligence, enhanced due diligence, and the documentation required to evidence both.",
  },
  {
    courseId: "sanctions-compliance-specialist",
    obligation: "Sanctions screening and match resolution",
    detail: "Screening controls, match handling and the evidence trail behind a release decision.",
  },
  {
    courseId: "cgss",
    obligation: "Global sanctions programme management",
    detail: "Multi-regime exposure, ownership and control tests, and programme-level governance.",
  },
  {
    courseId: "cams",
    obligation: "Transaction monitoring and regulatory reporting",
    detail: "Risk assessment, internal controls, independent audit and training: the four examined pillars.",
  },
  {
    courseId: "tbml",
    obligation: "Trade finance and trade-based money laundering",
    detail: "Documentary fraud, price manipulation and the red flags that sit inside a legitimate trade file.",
  },
  {
    courseId: "fatca-crs-specialist",
    obligation: "FATCA and CRS reporting obligations",
    detail: "Classification, due diligence and the reporting obligations that attach to each.",
  },
  {
    courseId: "regulatory-compliance-specialist",
    obligation: "Compliance testing and control assurance",
    detail: "Compliance testing, control design and audit strategy against global GRC standards.",
  },
  {
    courseId: "certified-compliance-manager",
    obligation: "Compliance function leadership",
    detail: "Governance structures, board reporting and the responsibilities that come with the appointment.",
  },
]

const levelLabel: Record<Course["level"], string> = {
  BEGINNER: "Foundation",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
}

export function HomeObligations({ courses }: { courses: Course[] }) {
  const byId = new Map(courses.map((c) => [c.id, c]))

  const rows = obligations
    .map((o) => ({ ...o, course: byId.get(o.courseId) }))
    .filter((r): r is typeof r & { course: Course } => Boolean(r.course))

  return (
    /* Flat ink field. The two radial blooms that used to float behind this
       band are gone: a section ground on this site is one colour. */
    <Section tone="ink" size="sm" className="overflow-hidden">
      <Reveal variant="up">
        <h2 className="max-w-measure text-display font-semibold leading-[1.04] tracking-tighter text-content-on-dark">
          Certification for the{" "}
          <span className="text-crimson-300">obligations you hold.</span>
        </h2>
      </Reveal>

      <Reveal variant="up" delay={90}>
        <p className="mt-7 max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
          Certification and advisory programmes for compliance, risk and audit professionals in
          regulated institutions. Over 2,500 specialists certified since 2023, across twelve
          jurisdictions. Select the obligation relevant to your role.
        </p>
      </Reveal>

      <Reveal variant="fade" delay={160}>
        {/*
           Same card material as the catalogue, adapted to a dark band: the
           surface is `.panel-dark`, which is a SOLID ink-900 field with a
           hairline, not a translucent glass tile. Near-square corners, a 1px
           border for structure and no shadow or hover lift: the hover state is
           a crimson border and nothing that moves.

           The whole card is one link via a stretched overlay, not a nested
           anchor plus a button. A card-inside-a-card link is invalid markup and
           hands a screen reader two targets for one destination, so the arrow
           is decorative and marked aria-hidden.
        */}
        <ul className="mt-12 grid list-none gap-4 lg:grid-cols-2">
          {rows.map((row, i) => (
            <li key={row.courseId}>
              <article
                className={
                  "panel-dark group relative flex h-full flex-col rounded-sm p-6 " +
                  "transition-colors duration-slow ease-out-expo " +
                  "hover:border-crimson-500 focus-within:border-crimson-500 sm:p-7"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="tabular font-display text-sm font-semibold text-crimson-300 transition-colors duration-slow ease-out-expo group-hover:text-crimson-200"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-content-on-dark-muted transition-colors duration-slow ease-out-expo group-hover:border-crimson-600 group-hover:bg-crimson-600 group-hover:text-content-on-dark"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-content-on-dark [text-wrap:balance]">
                  <Link href={`/courses/${row.course.slug}`} className="after:absolute after:inset-0">
                    {row.obligation}
                  </Link>
                </h3>

                <p className="mt-3 text-[17px] leading-relaxed text-content-on-dark-muted">{row.detail}</p>

                <div className="mt-auto border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-content-on-dark-muted transition-colors duration-slow ease-out-expo group-hover:text-content-on-dark">
                    {row.course.title}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-content-on-dark-muted">
                    <span>{row.course.issuingBody?.replace(/_/g, " ")}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular">{row.course.duration} hrs</span>
                    <span aria-hidden="true">·</span>
                    <span>{levelLabel[row.course.level]}</span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal variant="fade" delay={220}>
        <p className="mt-12 text-[17px] text-content-on-dark-muted">
          <Link
            href="/courses"
            className="font-medium text-content-on-dark underline decoration-crimson-500 underline-offset-[6px] transition-colors duration-slow ease-out-expo hover:decoration-crimson-300"
          >
            Browse the full catalogue
          </Link>{" "}
          to filter by issuing body, subject, level and delivery format.
        </p>
      </Reveal>
    </Section>
  )
}
