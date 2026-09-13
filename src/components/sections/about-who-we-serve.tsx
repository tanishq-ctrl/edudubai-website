import { Section, Eyebrow } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

/**
 * Three lines of defence.
 *
 * The columns are deliberately unequal (`lg:grid-cols-[1.5fr_1.25fr_1fr]`).
 * Equal thirds implied the three lines carry equal weight and equal copy; they
 * do not, and the even grid was part of what made every band on the site look
 * like the same component.
 */
const linesOfDefence = [
  {
    number: "01",
    kicker: "First line",
    title: "Front-line officers & branch managers",
    description:
      "The people who see the customer, the transaction and the red flag before anyone else does.",
  },
  {
    number: "02",
    kicker: "Second line",
    title: "Head-office compliance & risk teams",
    description:
      "Policy owners, MLROs and risk teams who set the controls the first line has to run.",
  },
  {
    number: "03",
    kicker: "Third line",
    title: "Internal auditors",
    description: "Independent assurance, testing whether the first two lines actually work.",
  },
]

const industries = [
  "Banking, insurance, custodial and investment entities",
  "Virtual Asset Service Providers (VASPs)",
  "Exchange and remittance houses",
  "DPMS (dealers in precious metals and stones)",
  "DNFBPs (real estate, corporate service providers, law firms, chartered accountants)",
]

export function AboutWhoWeServe() {
  return (
    <Section tone="deep" size="sm">
      <Reveal variant="fade">
        <Eyebrow marker="dot">Who we serve</Eyebrow>
      </Reveal>

      <Reveal variant="up" delay={70}>
        <h2 className="mt-5 max-w-measure-sm text-4xl tracking-tight text-content-on-dark sm:text-5xl">
          Across all three lines of defence
        </h2>
      </Reveal>

      <Stagger
        className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1.25fr_1fr]"
        step={100}
        variant="up"
      >
        {linesOfDefence.map((line) => (
          <div key={line.number} className="panel-dark h-full rounded-sm p-8">
            <p
              aria-hidden="true"
              className="font-display text-5xl font-semibold leading-none tracking-tighter text-crimson-ink"
            >
              {line.number}
            </p>
            <p className="mt-5 text-2xs font-semibold uppercase tracking-[0.18em] text-content-on-dark-muted">
              {line.kicker}
            </p>
            <h3 className="mt-2 text-xl text-content-on-dark">{line.title}</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-content-on-dark-muted">{line.description}</p>
          </div>
        ))}
      </Stagger>

      <Reveal variant="fade" delay={120}>
        <p className="mt-10 max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
          Also serving accounts and finance professionals, and MLROs appointed under local
          regulation.
        </p>
      </Reveal>

      <Reveal variant="up" delay={80}>
        <div className="mt-16 border-t border-white/15 pt-10">
          <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-16">
            <h3 className="text-lg text-content-on-dark">Sectors served</h3>
            <ul className="grid gap-x-14 gap-y-4 sm:grid-cols-2">
              {industries.map((industry) => (
                <li key={industry} className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full bg-crimson-ink"
                  />
                  <span className="text-[17px] leading-relaxed text-content-on-dark">{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
