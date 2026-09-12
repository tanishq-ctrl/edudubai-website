import type { Metadata } from "next"
import { Container } from "@/components/container"
import { CorporateHero } from "@/components/sections/corporate-hero"
import { CorporatePillars } from "@/components/sections/corporate-pillars"
import { CorporateIndustries } from "@/components/sections/corporate-industries"
import { CorporateProcess } from "@/components/sections/corporate-process"
import { CorporateLeadForm } from "@/components/corporate-lead-form"

export const metadata: Metadata = {
  title: "Corporate Compliance Training",
  description:
    "Tailored AML and compliance training programmes for banks, fintechs and regulated firms, delivered to your team online or on site.",
  alternates: { canonical: "/corporate" },
}

export default function CorporatePage() {
  return (
    <>
      <CorporateHero />
      <Container className="py-12 md:py-16">
        <CorporatePillars />
        <CorporateIndustries />
        <CorporateProcess />
      </Container>
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-dark">
        <Container className="py-16 md:py-20">
          <CorporateLeadForm />
        </Container>
      </div>
    </>
  )
}

