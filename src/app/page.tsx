import { HeroCarousel } from "@/components/home/hero-carousel"
import { TrustBar } from "@/components/sections/trust-bar"
import { PartnershipsSection } from "@/components/sections/partnerships-section"
import { StatsSection } from "@/components/sections/stats-section"
import { FindYourPath } from "@/components/sections/find-your-path"
import { FeaturedCoursesSection } from "@/components/sections/featured-courses-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CorporateCTASection } from "@/components/sections/corporate-cta-section"
import { HomePageClient } from "./home-client"

export default function HomePage() {
  return (
    <>
      <HomePageClient />
      <HeroCarousel />
      <TrustBar />
      <StatsSection />
      <PartnershipsSection />
      <FindYourPath />
      <FeaturedCoursesSection />
      <TestimonialsSection />
      <CorporateCTASection />
    </>
  )
}

