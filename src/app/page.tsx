import type { Metadata } from "next"

import { HeroCarousel } from "@/components/home/hero-carousel"
import { PartnershipsSection } from "@/components/sections/partnerships-section"
import { WhyEduDubai } from "@/components/sections/why-edudubai"
import { StatsSection } from "@/components/sections/stats-section"
import { FeaturedCoursesSection } from "@/components/sections/featured-courses-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CorporateCTASection } from "@/components/sections/corporate-cta-section"
import { HomePageClient } from "./home-client"

export const metadata: Metadata = {
  title: "Global Online Professional Education & Compliance Training",
  description:
    "CAMS certification, AML training and GCI compliance courses delivered online to compliance professionals worldwide. Live instructor-led sessions and exam preparation.",
  alternates: { canonical: "/" },
}

/**
 * Section order is a deliberate narrative:
 * hero (what) -> why us -> proof in numbers -> the catalogue -> peer proof ->
 * corporate ask. Tones alternate paper/sunken/ink so no two adjacent bands
 * share a background.
 */
export default function HomePage() {
  return (
    <>
      <HomePageClient />
      <HeroCarousel />
      <PartnershipsSection />
      <WhyEduDubai />
      <StatsSection />
      <FeaturedCoursesSection />
      <TestimonialsSection />
      <CorporateCTASection />
    </>
  )
}
