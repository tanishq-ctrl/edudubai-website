import { CalendarClock, ClipboardCheck, Globe2, Users } from "lucide-react"

import { Section, SectionHeading } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

const pillars = [
  {
    Icon: Users,
    title: "Delivered by practitioners",
    body: "Every instructor holds an active compliance role. Programmes address the judgement required in supervisory examinations and internal audit, extending well beyond syllabus coverage.",
  },
  {
    Icon: CalendarClock,
    title: "Live instruction",
    body: "Scheduled cohorts operate across Dubai, India and international time zones, with weekday and weekend batches and direct access to the instructor.",
  },
  {
    Icon: ClipboardCheck,
    title: "Aligned to official blueprints",
    body: "Content is mapped to the ACAMS and GCI candidate handbooks, with readiness diagnostics to confirm preparedness before an examination is booked.",
  },
  {
    Icon: Globe2,
    title: "Internationally recognised",
    body: "Authorised training partner credentials recognised by regulators and employers across twelve countries.",
  },
]

/** Differentiators band, positioned before the programme grid. */
export function WhyEduDubai() {
  return (
    <Section tone="sunken" size="md">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            align="start"
            eyebrow="Why EduDubai"
            title="Training designed for operational responsibility"
            lead="Our programmes prepare candidates to carry regulatory responsibility, not solely to pass an examination."
          />
        </div>

        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7" step={110}>
          {pillars.map(({ Icon, title, body }) => (
            <div key={title} className="group flex flex-col">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-300 transition-transform duration-slow ease-out-expo group-hover:-translate-y-1"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg ">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-content-muted">{body}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
