import Link from "next/link"

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
    obligation: "Know who you onboarded, and prove it",
    detail: "Customer due diligence, enhanced diligence, and a file that stands up when it is read back to you.",
  },
  {
    courseId: "sanctions-compliance-specialist",
    obligation: "Screen against the regimes, and defend the hit",
    detail: "Screening controls, match handling and the evidence trail behind a release decision.",
  },
  {
    courseId: "cgss",
    obligation: "Run a sanctions programme across a global book",
    detail: "Multi-regime exposure, ownership and control tests, and programme-level governance.",
  },
  {
    courseId: "cams",
    obligation: "Monitor transactions, and file what the regulator expects",
    detail: "Risk assessment, internal controls, independent audit and training — the four pillars, examined.",
  },
  {
    courseId: "tbml",
    obligation: "Finance trade without financing crime",
    detail: "Documentary fraud, price manipulation and the red flags that sit inside a legitimate trade file.",
  },
  {
    courseId: "fatca-crs-specialist",
    obligation: "Report under FATCA and CRS without penalty",
    detail: "Classification, due diligence and the reporting obligations that attach to each.",
  },
  {
    courseId: "regulatory-compliance-specialist",
    obligation: "Test the controls before the audit does",
    detail: "Compliance testing, control design and audit strategy against global GRC standards.",
  },
  {
    courseId: "certified-compliance-manager",
    obligation: "Own the compliance function",
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
          You already carry the risk.{" "}
          <span className="text-gold-400">Get certified for it.</span>
        </h1>
      </Reveal>

      <Reveal variant="up" delay={90}>
        <p className="mt-7 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
          Certification and advisory programmes for compliance, risk and audit professionals in
          regulated institutions — 2,500 of them since 2017, across twelve jurisdictions. Start
          from the obligation that is yours.
        </p>
      </Reveal>

      <Reveal variant="fade" delay={160}>
        {/*
           Two columns of four on desktop. Rows are independent, so the columns
           do not need to align row-for-row -- but every row gets the same
           internal register, which is what makes the index read as measured
           rather than merely listed.
        */}
        <ul className="mt-16 grid list-none gap-x-16 border-t border-white/12 lg:grid-cols-2">
          {rows.map((row, i) => (
            <li key={row.courseId} className="border-b border-white/12">
              <Link
                href={`/courses/${row.course.slug}`}
                className="group flex gap-6 py-7 outline-none transition-colors duration-slow ease-out-expo sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="tabular pt-1 font-display text-sm font-semibold text-gold-400/85 transition-colors duration-slow ease-out-expo group-hover:text-gold-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-semibold leading-snug tracking-tight text-white [text-wrap:balance]">
                    {row.obligation}
                  </span>

                  <span className="mt-2 block text-[15px] leading-relaxed text-white/50">
                    {row.detail}
                  </span>

                  {/*
                     The signature moment: the register fills in. The rule grows
                     from the ordinal toward full measure and the programme name
                     lifts from muted to full contrast -- one gesture, not a
                     colour swap on every element.
                  */}
                  <span className="mt-5 flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="h-px w-6 shrink-0 bg-gold-400/40 transition-all duration-slow ease-out-expo group-hover:w-12 group-hover:bg-gold-400"
                    />
                    <span className="text-sm font-medium text-white/65 transition-colors duration-slow ease-out-expo group-hover:text-white">
                      {row.course.title}
                    </span>
                  </span>

                  <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
                    <span>{row.course.issuingBody?.replace(/_/g, " ")}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular">{row.course.duration} hrs</span>
                    <span aria-hidden="true">·</span>
                    <span>{levelLabel[row.course.level]}</span>
                  </span>
                </span>
              </Link>
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
          — filter by issuing body, level and delivery mode.
        </p>
      </Reveal>
    </Section>
  )
}
