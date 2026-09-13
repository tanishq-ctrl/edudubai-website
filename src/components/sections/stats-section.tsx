import { Section, Eyebrow } from "@/components/section"
import { Counter, Reveal } from "@/components/motion"

const stats = [
  { label: "Sessions delivered", value: 850, suffix: "+" },
  { label: "Professionals trained", value: 2500, suffix: "+" },
  { label: "Countries reached", value: 12, suffix: "+" },
  { label: "Certification tracks", value: 8, suffix: "+" },
]

/**
 * Numbers band.
 *
 * Server-rendered: the old version was a client component running four
 * setInterval timers to tick counters. `Counter` is the only client code here
 * now, so the section ships as static HTML with the final values already in it
 * -- the animation is pure enhancement.
 *
 * The two parallaxed radial glows that used to sit behind the figures are
 * gone. Each figure is separated by a 1px crimson rule instead: structure on
 * this site comes from rules, not from light with no source.
 */
export function StatsSection() {
  return (
    <Section tone="ink" size="sm" className="overflow-hidden">
      {/* The figures always get the full container width. Sharing the row with
          the lead paragraph left each track ~150px, and "2,500+" needs ~177px
          at this display size, so the widest number was being clipped. */}
      <div className="flex flex-col gap-12">
        <Reveal variant="up" className="max-w-measure-sm">
          <Eyebrow>Track record</Eyebrow>
          <p className="mt-4 text-[17px] leading-relaxed text-content-on-dark-muted">
            Three years of delivery to regulated institutions, measured by professionals certified.
          </p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant="up" delay={i * 110} className="group min-w-0">
              <div className="flex flex-col">
                <span aria-hidden="true" className="mb-5 h-px w-full bg-crimson-500" />
                <dd className="font-display text-3xl font-semibold leading-none text-content-on-dark sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} durationMs={2100} />
                </dd>
                <dt className="mt-3 text-sm text-content-on-dark-muted">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  )
}
