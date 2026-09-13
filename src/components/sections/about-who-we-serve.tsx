import { Briefcase, Building2, FileText, Shield, Users } from "lucide-react"

import { Section, SectionHeading, Eyebrow } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

const targetAudiences = [
  { icon: Users, title: "Front-line officers & branch managers", subtitle: "First line of defence" },
  { icon: Building2, title: "Head-office compliance & risk teams", subtitle: "Second line of defence" },
  { icon: Shield, title: "Internal auditors", subtitle: "Third line of defence" },
  { icon: FileText, title: "Accounts & finance professionals" },
  { icon: Briefcase, title: "MLRO professionals" },
]

const industries = [
  "Banking, insurance, custodial and investment entities",
  "Virtual Asset Service Providers (VASPs)",
  "Exchange and remittance houses",
  "DNFBPs — real estate, corporate service providers, law firms, chartered accountants",
  "DPMS — dealers in precious metals and stones",
]

export function AboutWhoWeServe() {
  return (
    <Section tone="sunken" size="md">
      <SectionHeading
        eyebrow="Who we serve"
        title="Across all three lines of defence"
        lead="Our programmes are written for professionals who carry regulatory responsibility at every level of the organisation."
      />

      <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" step={90} variant="up">
        {targetAudiences.map((audience) => {
          const Icon = audience.icon
          return (
            <div
              key={audience.title}
              className="group flex h-full items-start gap-4 rounded-lg border border-line bg-surface-raised p-6 shadow-sm transition-all duration-slow ease-out-expo hover:-translate-y-1 hover:border-gold-400/55 hover:shadow-lg"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-300"
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-base leading-snug text-content-strong">
                  {audience.title}
                </span>
                {audience.subtitle ? (
                  <span className="mt-1 text-2xs font-semibold uppercase tracking-wider text-gold-ink">
                    {audience.subtitle}
                  </span>
                ) : null}
              </span>
            </div>
          )
        })}
      </Stagger>

      <Reveal variant="up" delay={120} className="mt-6">
        <div className="rounded-lg border border-gold-400/30 bg-gradient-to-br from-surface-raised to-gold-50 p-8 sm:p-10">
          <Eyebrow>Sectors served</Eyebrow>
          <h3 className="mt-4 text-2xl ">MLRO professionals across industries</h3>
          <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {industries.map((industry) => (
              <li key={industry} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400"
                />
                <span className="text-sm leading-relaxed text-content">{industry}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
