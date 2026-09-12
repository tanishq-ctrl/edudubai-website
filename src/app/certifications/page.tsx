import type { Metadata } from "next"
import { Container } from "@/components/container"
import { CertificationsHero } from "@/components/sections/certifications-hero"
import { ExamPrepTracksSection } from "@/components/sections/exam-prep-tracks-section"
import { CertificationsCtaSection } from "@/components/sections/certifications-cta-section"

export const metadata: Metadata = {
  title: "Professional Compliance Certifications",
  description:
    "Exam preparation tracks for CAMS, CGSS, CCAS and other globally recognised compliance certifications, with structured study plans and live coaching.",
  alternates: { canonical: "/certifications" },
}

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

