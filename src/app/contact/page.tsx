import type { Metadata } from "next"
import { Container } from "@/components/container"
import { ContactHero } from "@/components/sections/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/sections/contact-info"
import { ContactPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Speak to an EduDubai course advisor about certification tracks, corporate training, schedules and enrolment. We respond within one business day.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <ContactPageClient />
      <ContactHero />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </>
  )
}
