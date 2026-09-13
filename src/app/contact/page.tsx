import type { Metadata } from "next"

import { ContactHero } from "@/components/sections/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/sections/contact-info"
import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"
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

      <Section tone="sunken" size="sm">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <Reveal variant="up" className="lg:col-span-3">
            <div className="rounded-sm border border-line bg-surface-raised p-7 shadow-sm sm:p-9">
              <ContactForm />
            </div>
          </Reveal>

          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </Section>
    </>
  )
}
