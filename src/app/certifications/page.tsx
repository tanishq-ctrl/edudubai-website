import { Container } from "@/components/container"
import { CertificationsHero } from "@/components/sections/certifications-hero"
import { ExamPrepTracksSection } from "@/components/sections/exam-prep-tracks-section"
import { CertificationsCtaSection } from "@/components/sections/certifications-cta-section"

export default function CertificationsPage() {
  return (
    <>
      <CertificationsHero />
      <Container className="py-12 md:py-16">
        <ExamPrepTracksSection />
      </Container>
      <CertificationsCtaSection />
    </>
  )
}

