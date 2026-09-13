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
    <Section tone="ink" size="sm">
      <Reveal variant="fade">
        <Eyebrow marker="dot">Track record</Eyebrow>
      </Reveal>

      <div className="mt-12 grid gap-16 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-24">
        <Reveal variant="up">
          <div>
            <p className="font-display text-[clamp(4rem,2rem+8vw,8.25rem)] font-semibold leading-[0.9] tracking-tighter text-content-on-dark">
              <Counter value={2500} suffix="+" />
            </p>
            <p className="mt-6 text-2xl text-crimson-ink">specialists certified</p>
            <p className="mt-5 max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
              Three years of delivery to regulated institutions, from front-line officers to
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
              <p className="font-display text-4xl font-semibold leading-none tracking-tight text-content-on-dark sm:w-36 sm:shrink-0">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <div className="min-w-0">
                <h3 className="text-lg text-content-on-dark">{stat.label}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-content-on-dark-muted">{stat.description}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
