import { Section, Eyebrow } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

/**
 * Areas of practice, as a numbered index.
 *
 * This was ten identical icon cards on a three-column grid, each with the same
 * radius, shadow and hover-lift. Ten equal cards say "ten things" and nothing
 * else; an index says the same thing typographically, in half the height, and
 * stops the page repeating a card pattern it already uses elsewhere.
 *
 * The icons went with them. A shield next to "Sanctions" and a shield next to
 * "KYC" carried no information -- the labels already do that work.
 */
const expertiseAreas = [
  {
    title: "KYC / CDD / EDD",
    description:
      "Customer identification frameworks covering onboarding, risk mitigation and compliance with applicable regulatory standards.",
  },
  {
    title: "AML / CFT",
    description:
      "Customer due diligence, transaction monitoring and enterprise risk assessment, together with the regulatory obligations governing each.",
  },
  {
    title: "Sanctions",
    description:
      "Global sanctions regimes, screening processes and the controls required to manage sanctions exposure.",
  },
  {
    title: "Regulatory compliance",
    description:
      "Compliance testing, internal controls, risk assessment and audit strategy against global GRC standards.",
  },
  {
    title: "FATCA & CRS",
    description:
      "Implementation strategy, reporting obligations and the controls required to avoid reporting penalties.",
  },
  {
    title: "Corporate taxation",
    description:
      "Corporate tax regulation, compliance strategy and established practice in tax governance.",
  },
  {
    title: "Value added tax",
    description: "VAT implementation, compliance and reporting across multiple jurisdictions.",
  },
  {
    title: "Corporate governance",
    description:
      "Governance structures, board responsibilities and the regulatory framework underpinning both.",
  },
  {
    title: "Labour law",
    description:
      "Labour compliance, employee rights and the statutory obligations placed on employers.",
  },
  {
    title: "Consumer protection",
    description:
      "Consumer rights, transparency and ethical conduct standards, and the compliance obligations attaching to them.",
  },
]

export function AboutExpertise() {
  return (
    <Section tone="midnight" size="sm">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <div>
          <Reveal variant="fade">
            <Eyebrow marker="dot">Areas of practice</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={70}>
            <h2 className="mt-5 max-w-measure-sm text-4xl tracking-tight text-white sm:text-5xl">
              Ten domains where the exposure is real
            </h2>
          </Reveal>
        </div>

        <Reveal variant="up" delay={140}>
          <p className="max-w-[22rem] leading-relaxed text-content-on-dark-muted">
            Training and advisory across the regulatory domains that carry institutional risk.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="mt-16 grid gap-x-16 md:grid-cols-2"
        step={55}
        variant="up"
      >
        {expertiseAreas.map((area, i) => (
          <div
            key={area.title}
            className={
              // The first row of each column gets the heavier rule, so both
              // columns are capped rather than only the very first item.
              "border-t py-7 " + (i === 0 || i === 5 ? "border-white/40" : "border-white/10")
            }
          >
            <div className="flex gap-6">
              <span
                aria-hidden="true"
                className="w-7 shrink-0 pt-1 font-display text-sm font-semibold text-gold-400"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl text-white">{area.title}</h3>
                <p className="mt-2.5 text-[17px] leading-relaxed text-white/55">{area.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Stagger>
    </Section>
  )
}
