import { Quote } from "lucide-react"

import { Section, SectionHeading } from "@/components/section"
import { Marquee, Reveal } from "@/components/motion"
import { cn } from "@/lib/utils"

type Testimonial = {
  name: string
  role: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Al-Mansoori",
    role: "Senior Compliance Officer",
    content:
      "EduDubai's CAMS prep course was instrumental in my success. The focus on complex international regulations alongside global standards gave me a significant edge in my current role.",
  },
  {
    name: "Ahmed Hassan",
    role: "AML Analyst",
    content:
      "The practical case studies on Trade-Based Money Laundering were exceptionally detailed. I implemented new detection patterns in our monitoring system immediately after the workshop.",
  },
  {
    name: "Priya Sharma",
    role: "Risk & Governance Manager",
    content:
      "Completing the CCM certification through EduDubai was a turning point. The instructors are clearly practitioners, not just lecturers, which makes the GCI curriculum much easier to grasp.",
  },
  {
    name: "Mohammed Al-Rashid",
    role: "MLRO",
    content:
      "The executive-level insights in the live virtual sessions were top-notch. It is rare to find training that balances theoretical compliance with the harsh realities of regulatory reporting.",
  },
  {
    name: "Fatima Al-Zahra",
    role: "KYC Specialist",
    content:
      "Excellent focus on Customer Due Diligence. The advanced KYC workshop cleared up many ambiguities around Ultimate Beneficial Ownership structures that we struggle with daily.",
  },
  {
    name: "Rajesh Kumar",
    role: "Internal Audit Manager",
    content:
      "The Sanctions Compliance Specialist programme was exceptionally well structured. It improved our audit-readiness significantly when dealing with complex OFAC and UN sanctions regimes.",
  },
  {
    name: "Hussain Abbas",
    role: "Head of Operations",
    content:
      "The FATCA & CRS reporting workshop was a lifesaver. What used to be a confusing manual process is now handled with far more confidence thanks to the technical depth of the training.",
  },
  {
    name: "Lindsey Morgan",
    role: "Regulatory Liaison Officer",
    content:
      "The GCI curriculum and EduDubai's delivery style are perfectly matched. The clarity brought to cross-border requirements has made communication with regional authorities much smoother.",
  },
]

/** Initials avatar -- no photos exist for these, and a generic stock face is worse than none. */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure
      className={cn(
        "flex w-[19rem] shrink-0 flex-col justify-between gap-6 rounded-sm border border-line bg-surface-raised p-7 sm:w-[23rem]",
        // Structure from the hairline, not from a shadow, and the hover state
        // is a crimson border rather than a lift.
        "transition-colors duration-slow ease-out-expo hover:border-crimson-600",
      )}
    >
      <div>
        <Quote aria-hidden="true" className="h-6 w-6 text-crimson-600" />
        <blockquote className="mt-4 text-[17px] leading-relaxed text-content">{t.content}</blockquote>
      </div>

      <figcaption className="flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 text-2xs font-semibold tracking-wider text-content-on-dark"
        >
          {initials(t.name)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-content-strong">{t.name}</span>
          <span className="text-sm text-content-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * Two counter-scrolling rails.
 *
 * Replaces the single rotating quote: all eight voices are visible at once and
 * nothing is hidden behind a 5-second timer the reader cannot control. Both
 * rails pause on hover and on keyboard focus.
 */
export function TestimonialsSection() {
  const topRow = testimonials.slice(0, 4)
  const bottomRow = testimonials.slice(4)

  return (
    <Section tone="sunken" size="sm" bleed className="overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-gutter">
        <SectionHeading
          eyebrow="Client feedback"
          title="What our delegates say"
          lead="Feedback from compliance officers, analysts and MLROs who have completed our programmes."
        />
      </div>

      <Reveal variant="fade" className="mt-12 flex flex-col gap-5">
        <Marquee durationSec={64} itemClassName="gap-5 pr-5">
          {topRow.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>

        <Marquee durationSec={74} reverse itemClassName="gap-5 pr-5">
          {bottomRow.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </Reveal>
    </Section>
  )
}
