import { Section, Eyebrow } from "@/components/section"
import { Counter, Reveal, Parallax } from "@/components/motion"

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
 */
export function StatsSection() {
  return (
    <Section tone="ink" size="sm" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Parallax speed={0.12} className="absolute -right-24 -top-24">
          <div className="h-[26rem] w-[26rem] orb [--orb:rgb(var(--navy-700)/0.3)]" />
        </Parallax>
        <div className="absolute -bottom-40 left-10 h-80 w-80 orb [--orb:rgb(var(--gold-400)/0.08)]" />
      </div>

      {/* The figures always get the full container width. Sharing the row with
          the lead paragraph left each track ~150px, and "2,500+" needs ~177px
          at this display size, so the widest number was being clipped. */}
      <div className="flex flex-col gap-14">
        <Reveal variant="up" className="max-w-measure-sm">
          <Eyebrow>Track record</Eyebrow>
          <p className="mt-4 text-xl text-white/85">
            Eight years of delivery to regulated institutions, measured by professionals certified.
          </p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant="up" delay={i * 110} className="group min-w-0">
              <div className="flex flex-col">
                <span aria-hidden="true" className="rule-gold mb-5 w-full" />
                <dd className="font-display text-3xl font-semibold leading-none text-white sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} durationMs={2100} />
                </dd>
                <dt className="mt-3 text-sm text-white/55">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  )
}
