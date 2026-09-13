import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"
import type { Course } from "@/lib/types"

/**
 * The homepage's first viewport: an index of obligations, not a hero.
 *
 * The page this category always ships is a rotating photograph, a client logo
 * wall, three feature cards and a testimonial row -- an arrangement that makes
 * every training provider look like every other one. This opens instead on the
 * exposure the visitor already carries and lets them enter through it.
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
    <Section tone="midnight" size="md" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-52 h-[44rem] w-[44rem] bloom-gold" />
        <div className="absolute -right-32 top-72 h-[50rem] w-[50rem] bloom-navy" />
      </div>

      <Reveal variant="up">
        <h1 className="max-w-measure-lg text-display font-semibold leading-[1.04] tracking-tighter text-white">
          Certification for the{" "}
          <span className="text-gold-400">obligations you hold.</span>
        </h1>
      </Reveal>

      <Reveal variant="up" delay={90}>
        <p className="mt-7 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
          Certification and advisory programmes for compliance, risk and audit professionals in
          regulated institutions. Over 2,500 specialists certified since 2023, across twelve
          jurisdictions. Select the obligation relevant to your role.
        </p>
      </Reveal>

      <Reveal variant="fade" delay={160}>
        {/*
           Same card material as the catalogue, adapted to a dark band: the
           surface is `.panel-dark` rather than `bg-surface-raised`, and the
           border lights to gold on hover exactly as `CourseCard` does. No
           photograph, because this is an index rather than a second copy of
           the catalogue grid.

           The whole card is one link via a stretched overlay, not a nested
           anchor plus a button. A card-inside-a-card link is invalid markup and
           hands a screen reader two targets for one destination, so the arrow
           is decorative and marked aria-hidden.
        */}
        <ul className="mt-14 grid list-none gap-4 lg:grid-cols-2">
          {rows.map((row, i) => (
            <li key={row.courseId}>
              <article
                className={
                  "panel-dark group relative flex h-full flex-col rounded-lg p-6 shadow-sm " +
                  "transition-all duration-slow ease-out-expo hover:-translate-y-1.5 " +
                  "hover:border-gold-400/55 hover:shadow-lg focus-within:border-gold-400 sm:p-7"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="tabular font-display text-sm font-semibold text-gold-400/85 transition-colors duration-slow ease-out-expo group-hover:text-gold-400"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-slow ease-out-expo group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-navy-900"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-white [text-wrap:balance]">
                  <Link href={`/courses/${row.course.slug}`} className="after:absolute after:inset-0">
                    {row.obligation}
                  </Link>
                </h3>

                <p className="mt-3 text-[15px] leading-relaxed text-white/55">{row.detail}</p>

                <div className="mt-auto border-t border-white/10 pt-5">
                  <p className="text-sm font-medium text-white/70 transition-colors duration-slow ease-out-expo group-hover:text-white">
                    {row.course.title}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
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
        <p className="mt-12 text-[15px] text-white/60">
          <Link
            href="/courses"
            className="font-medium text-white underline decoration-gold-400/40 underline-offset-[6px] transition-colors duration-slow ease-out-expo hover:decoration-gold-400"
          >
            Browse the full catalogue
          </Link>{" "}
          to filter by issuing body, subject, level and delivery format.
        </p>
      </Reveal>
    </Section>
  )
}
