import { Container } from "@/components/container"
import { CorporateHero } from "@/components/sections/corporate-hero"
import { CorporatePillars } from "@/components/sections/corporate-pillars"
import { CorporateIndustries } from "@/components/sections/corporate-industries"
import { CorporateProcess } from "@/components/sections/corporate-process"
import { CorporateLeadForm } from "@/components/corporate-lead-form"

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

