import {
  Briefcase,
  Building2,
  FileText,
  Globe,
  Scale,
  Shield,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Section, SectionHeading } from "@/components/section"
import { Stagger } from "@/components/motion"

const expertiseAreas = [
  {
    icon: Shield,
    title: "KYC / CDD / EDD",
    description:
      "Customer identification frameworks covering onboarding, risk mitigation and compliance with applicable regulatory standards.",
  },
  {
    icon: FileText,
    title: "AML / CFT",
    description:
      "Customer due diligence, transaction monitoring and enterprise risk assessment, together with the regulatory obligations governing each.",
  },
  {
    icon: Globe,
    title: "Sanctions",
    description:
      "Global sanctions regimes, screening processes and the controls required to manage sanctions exposure.",
  },
  {
    icon: Building2,
    title: "Regulatory Compliance",
    description:
      "Compliance testing, internal controls, risk assessment and audit strategy against global GRC standards.",
  },
  {
    icon: Scale,
    title: "FATCA & CRS",
    description:
      "Implementation strategy, reporting obligations and the controls required to avoid reporting penalties.",
  },
  {
    icon: Briefcase,
    title: "Corporate Taxation",
    description:
      "Corporate tax regulation, compliance strategy and established practice in tax governance.",
  },
  {
    icon: FileText,
    title: "Value Added Tax",
    description: "VAT implementation, compliance and reporting across multiple jurisdictions.",
  },
  {
    icon: Building2,
    title: "Corporate Governance",
    description:
      "Governance structures, board responsibilities and the regulatory framework underpinning both.",
  },
  {
    icon: Users,
    title: "Labour Laws",
    description: "Labour compliance, employee rights and the statutory obligations placed on employers.",
  },
  {
    icon: ShoppingCart,
    title: "Consumer Protection",
    description:
      "Consumer rights, transparency and ethical conduct standards, and the compliance obligations attaching to them.",
  },
]

export function AboutExpertise() {
  return (
    <Section tone="paper" size="md">
      <SectionHeading
        eyebrow="Our expertise"
        title="Areas of practice"
        lead="We deliver training and advisory services across the regulatory domains that carry institutional risk."
      />

      <Stagger
        className="mt-16 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        step={70}
        variant="up"
      >
        {expertiseAreas.map((area) => {
          const Icon = area.icon
          return (
            <div
              key={area.title}
              className="group flex h-full flex-col rounded-lg border border-line bg-surface-raised p-7 shadow-sm transition-all duration-slow ease-out-expo hover:-translate-y-1 hover:border-gold-400/55 hover:shadow-lg"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-400/12 text-gold-mark transition-transform duration-slow ease-out-expo group-hover:-translate-y-1"
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg ">{area.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-content-muted">{area.description}</p>
            </div>
          )
        })}
      </Stagger>
    </Section>
  )
}
