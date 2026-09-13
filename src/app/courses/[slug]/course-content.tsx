import { Check, ChevronDown } from "lucide-react"

import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"
import { Course } from "@/lib/types"

/**
 * The course detail body: one template for every programme.
 *
 * There used to be two. `page.tsx` branched on a hardcoded slug and sent CGSS
 * to a 655-line component that was a copy of this one with "CGSS" spliced into
 * the headings and a different CSS prefix. Worse, that fork read nothing from
 * the course record at all -- every word was hardcoded, so editing the CGSS
 * course changed nothing on its page and the `COURSES_SOURCE` switch was
 * bypassed for it. Both problems disappear when there is one template driven
 * by data.
 *
 * The old markup also carried ~340 lines of raw CSS in a `dangerouslySetInner
 * HTML` style block, which is why these pages never looked like the rest of
 * the site: none of it went through the token system. Everything here uses
 * `Section` tones and Tailwind tokens, so the detail pages inherit the same
 * rhythm, palette and type scale as every other page.
 *
 * It is a server component. The old one was marked "use client" while
 * rendering entirely static content, which shipped the whole template to the
 * browser for nothing. The FAQ uses `<details>` so progressive disclosure
 * costs no JavaScript.
 */

type Props = { course: Course }

/** Category codes are acronyms; lowercasing them produces "aml cft". */
const CATEGORY_LABELS: Record<string, string> = {
  AML_CFT: "AML/CFT",
  SANCTIONS: "sanctions compliance",
  TBML: "trade-based money laundering",
  FATCA_CRS: "FATCA and CRS",
  TAX: "tax compliance",
  GOVERNANCE: "governance and regulatory compliance",
  RISK: "risk management",
  DATA_AI: "data and AI",
}

const FALLBACK_BENEFITS = [
  "Expert instructors with fifteen years or more in practice",
  "Complete study materials and practice examinations",
  "Interactive live virtual and in-person classes",
  "Ninety days of post-training support",
  "Proven pass rate across the region",
  "Global recognition within the industry",
]

/** Outcomes and benefits are authored as "Lead-in: detail". */
function splitLead(value: string) {
  const i = value.indexOf(":")
  if (i === -1) return { lead: null as string | null, rest: value }
  return { lead: value.slice(0, i), rest: value.slice(i + 1).trim() }
}

function SectionHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <Reveal variant="up">
      <div className="max-w-measure-lg">
        <h2 className="text-3xl tracking-tight sm:text-4xl">{title}</h2>
        {lead ? <p className="mt-4 max-w-measure text-lg leading-relaxed text-content-muted">{lead}</p> : null}
      </div>
    </Reveal>
  )
}

export function CourseContent({ course }: Props) {
  const overview = course.programOverview
  const examInfo = course.examInfo
  const benefits = course.whyChooseUs?.points?.length
    ? course.whyChooseUs.points
    : FALLBACK_BENEFITS

  const audience =
    course.audienceCategories?.length
      ? course.audienceCategories
      : [{ title: "Who it is for", roles: course.whoItsFor }]

  return (
    <>
      {overview ? (
        <Section id="overview" tone="paper" size="sm">
          <SectionHead
            title="What this programme covers"
            lead="Leading professional certification training for regulated institutions."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { h: "Programme overview", body: overview.whatIs },
              { h: "Why it matters", body: overview.whyItMatters },
              { h: "Job-ready skills", body: overview.jobReadySkills },
            ].map((block) => (
              <article
                key={block.h}
                className="flex h-full flex-col rounded-lg border border-line bg-surface-raised p-7 shadow-sm"
              >
                <h3 className="text-lg">{block.h}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-content-muted">{block.body}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {course.outcomes?.length ? (
        <Section id="outcomes" tone="sunken" size="sm">
          <SectionHead
            title="What you will be able to do"
            lead={`Capability built across ${
              CATEGORY_LABELS[course.category] ?? course.category.replace(/_/g, " ")
            } for professionals in supervised institutions.`}
          />

          {/*
             A numbered index rather than a grid of equal cards. The sequence is
             the curriculum's own order, so the ordinal carries information.
          */}
          <ol className="mt-12 grid list-none gap-x-14 border-t border-line lg:grid-cols-2">
            {course.outcomes.map((outcome, i) => {
              const { lead, rest } = splitLead(outcome)
              return (
                <li key={outcome} className="flex gap-5 border-b border-line py-6">
                  <span
                    aria-hidden="true"
                    className="tabular pt-0.5 font-display text-sm font-semibold text-gold-mark"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-content">
                    {lead ? <span className="font-semibold text-content-strong">{lead}. </span> : null}
                    {rest}
                  </p>
                </li>
              )
            })}
          </ol>
        </Section>
      ) : null}

      <Section id="audience" tone="paper" size="sm">
        <SectionHead
          title="Who should attend"
          lead="Written for the roles that carry the obligation, not for a general audience."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {audience.map((cat) => (
            <article
              key={cat.title}
              className="flex h-full flex-col rounded-lg border border-line bg-surface-raised p-7 shadow-sm"
            >
              <h3 className="text-lg">{cat.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {cat.roles.map((role) => (
                  <li key={role} className="flex gap-3 text-[15px] leading-relaxed text-content-muted">
                    <span aria-hidden="true" className="mt-[9px] h-1 w-4 shrink-0 bg-gold-400/70" />
                    {role}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {course.deliverySchedules?.length ? (
        <Section id="schedule" tone="sunken" size="sm">
          <SectionHead
            title="Delivery options"
            lead="Choose the format that fits around the role you already hold."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {course.deliverySchedules.map((s) => (
              <article
                key={s.name}
                className="flex h-full flex-col rounded-lg border border-line bg-surface-raised p-7 shadow-sm"
              >
                <h3 className="text-lg">{s.name}</h3>
                <dl className="mt-5 flex flex-col gap-3 text-[15px]">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-content-subtle">Days</dt>
                    <dd className="mt-1 text-content">{s.schedule}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-content-subtle">Timing</dt>
                    <dd className="mt-1 text-content">{s.duration}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {examInfo ? (
        <Section id="exam" tone="paper" size="sm">
          <SectionHead
            title="The examination"
            lead="What the issuing body sets, and what you have to meet to sit it."
          />

          <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Questions", v: examInfo.questions },
              { k: "Duration", v: examInfo.duration },
              { k: "Passing score", v: examInfo.passingScore },
              { k: "Format", v: examInfo.format },
            ]
              .filter((e) => e.v)
              .map((entry) => (
                <div key={entry.k} className="bg-surface-raised p-6">
                  <dt className="text-xs uppercase tracking-wider text-content-subtle">{entry.k}</dt>
                  <dd className="mt-2 text-lg font-semibold text-content-strong">{entry.v}</dd>
                </div>
              ))}
          </dl>

          {examInfo.requirements?.length ? (
            <div className="mt-10 max-w-measure-lg">
              <ExamRequirements requirements={examInfo.requirements} />
            </div>
          ) : null}
        </Section>
      ) : null}

      <Section id="benefits" tone="sunken" size="sm">
        <SectionHead title="Why study this with EduDubai" />

        <ul className="mt-12 grid gap-x-12 gap-y-5 lg:grid-cols-2">
          {benefits.map((point) => {
            const { lead, rest } = splitLead(point)
            return (
              <li key={point} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-mark"
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <p className="text-[15px] leading-relaxed text-content">
                  {lead ? <span className="font-semibold text-content-strong">{lead}. </span> : null}
                  {rest}
                </p>
              </li>
            )
          })}
        </ul>
      </Section>

      {course.faq?.length ? (
        <Section id="faq" tone="paper" size="sm">
          <SectionHead title="Frequently asked questions" />

          {/*
             Restored. The FAQ block was commented out in the old template, so
             every programme carried this content in its record and rendered
             none of it. `<details>` gives progressive disclosure with no
             client JavaScript.
          */}
          <div className="mt-10 max-w-measure-lg border-t border-line">
            {course.faq.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-medium text-content-strong marker:hidden hover:text-navy-700">
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-content-subtle transition-transform duration-slow ease-out-expo group-open:rotate-180"
                  />
                </summary>
                <p className="pb-6 pr-10 text-[15px] leading-relaxed text-content-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  )
}

/**
 * Requirements arrive in two shapes: a flat list of strings, or titled groups
 * where one group may be a disclaimer that has to read as small print.
 */
function ExamRequirements({
  requirements,
}: {
  requirements: NonNullable<Course["examInfo"]>["requirements"]
}) {
  if (!requirements?.length) return null

  if (typeof requirements[0] === "string") {
    return (
      <ul className="flex flex-col gap-3">
        {(requirements as string[]).map((req) => (
          <li key={req} className="flex gap-3 text-[15px] leading-relaxed text-content-muted">
            <span aria-hidden="true" className="mt-[9px] h-1 w-4 shrink-0 bg-gold-400/70" />
            {req}
          </li>
        ))}
      </ul>
    )
  }

  const groups = requirements as Array<{ title: string; items: string[] }>

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => {
        if (group.title === "Disclaimer") {
          return (
            <p
              key={group.title}
              className="border-t border-line pt-5 text-[13px] leading-relaxed text-content-subtle"
            >
              <span className="font-semibold">Disclaimer: </span>
              {group.items[0]}
            </p>
          )
        }

        return (
          <div key={group.title}>
            <h3 className="text-lg">{group.title}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {group.items.map((item) => {
                const i = item.indexOf(":")
                const lead = i === -1 ? null : item.slice(0, i)
                const rest = i === -1 ? item : item.slice(i + 1).trim()
                return (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-content-muted">
                    <span aria-hidden="true" className="mt-[9px] h-1 w-4 shrink-0 bg-gold-400/70" />
                    <span>
                      {lead ? <span className="font-semibold text-content-strong">{lead}: </span> : null}
                      {rest}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
