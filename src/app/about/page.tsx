import { Metadata } from "next"

import { AboutHero } from "@/components/sections/about-hero"
import { AboutPosition } from "@/components/sections/about-position"
import { AboutExpertise } from "@/components/sections/about-expertise"
import { AboutWhoWeServe } from "@/components/sections/about-who-we-serve"
import { AboutCredibility } from "@/components/sections/about-credibility"
import { AboutFaculty } from "@/components/sections/about-faculty"
import { AboutCredentials } from "@/components/sections/about-credentials"
import { AboutCta } from "@/components/sections/about-cta"
import { AboutPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "About Us | Global Compliance & Professional Education Specialist",
  description:
    "Learn about EduDubai's mission to provide world-class regulatory compliance training, AML/CFT certification, and professional development to specialists globally.",
  keywords: [
    "Compliance Training Team",
    "AML Experts",
    "Professional Education History",
    "EduDubai Mission",
    "Global Regulatory Specialists",
  ],
  alternates: { canonical: "/about" },
}

/**
 * Sections own their own vertical rhythm and background tone, so the page no
 * longer wraps them in a Container with its own padding -- that wrapper was
 * what prevented full-bleed dark bands from reaching the viewport edges.
 *
 * Tone alternates midnight / deep down the page so no two adjacent bands share
 * a value, and the gold CTA is the only light band -- held back to the end so
 * it reads as the payoff.
 */
export default function AboutPage() {
  return (
    <>
      <AboutPageClient />
      <AboutHero />
      <AboutPosition />
      <AboutExpertise />
      <AboutWhoWeServe />
      <AboutCredibility />
      <AboutFaculty />
      <AboutCredentials />
      <AboutCta />
    </>
  )
}
