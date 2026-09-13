import { Section, Eyebrow } from "@/components/section"
import { Counter, Reveal, Stagger } from "@/components/motion"

/**
 * Track record.
 *
 * Was four equal stat columns, which gave "2,500 specialists certified" exactly
 * as much weight as "12 jurisdictions". One number is the claim and the other
 * three support it, so the layout now says that: one oversized figure against
 * three subordinate rows.
 */
const supportingStats = [
  {
    value: 8,
    suffix: "+",
    label: "Elite certifications",
    description: "Credentials issued with ACAMS, GCI and partner bodies.",
  },
  {
    value: 850,
    suffix: "+",
    label: "Professional sessions",
    description: "Delivered across international financial markets.",
  },
  {
    value: 12,
    suffix: "",
    label: "Global jurisdictions",
    description: "Regulatory regimes our faculty teach to directly.",
  },
]

export function AboutCredibility() {
  return (
    <Section tone="midnight" size="sm" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-16 h-[38rem] w-[38rem] bloom-gold" />
      </div>

      <Reveal variant="fade">
        <Eyebrow marker="dot">Track record</Eyebrow>
      </Reveal>

      <div className="mt-12 grid gap-16 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-24">
        <Reveal variant="up">
          <div>
            <p className="font-display text-[clamp(4rem,2rem+8vw,8.25rem)] font-semibold leading-[0.9] tracking-tighter text-white">
              <Counter value={2500} suffix="+" />
            </p>
            <p className="mt-6 text-2xl text-gold-300">specialists certified</p>
            <p className="mt-5 max-w-measure leading-relaxed text-content-on-dark-muted">
              Eight years of delivery to regulated institutions, from front-line officers to
              appointed MLROs, across twelve jurisdictions.
            </p>
          </div>
        </Reveal>

        <Stagger className="flex flex-col" step={110} variant="up">
          {supportingStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-4 border-t border-white/15 py-8 sm:flex-row sm:gap-8"
            >
              <p className="font-display text-4xl font-semibold leading-none tracking-tight text-white sm:w-36 sm:shrink-0">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <div className="min-w-0">
                <h3 className="text-lg text-white">{stat.label}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/55">{stat.description}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
