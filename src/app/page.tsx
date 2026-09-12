import type { Metadata } from "next"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { TrustBar } from "@/components/sections/trust-bar"
import { PartnershipsSection } from "@/components/sections/partnerships-section"
import { StatsSection } from "@/components/sections/stats-section"
import { FindYourPath } from "@/components/sections/find-your-path"
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

export default function HomePage() {
  return (
    <>
      <HomePageClient />
      <HeroCarousel />
      <PartnershipsSection />
      {/* <FindYourPath /> */}
      <FeaturedCoursesSection />
      {/* TrustBar now integrated into HeroCarousel bottom */}
      <StatsSection />
      <TestimonialsSection />
      <CorporateCTASection />
    </>
  )
}

