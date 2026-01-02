import { HeroCarousel } from "@/components/home/hero-carousel"
import { TrustBar } from "@/components/sections/trust-bar"
import { StatsSection } from "@/components/sections/stats-section"
import { DeliveryFormatsSection } from "@/components/sections/delivery-formats-section"
import { CategoriesSection } from "@/components/sections/categories-section"
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
      <DeliveryFormatsSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <TestimonialsSection />
      <CorporateCTASection />
    </>
  )
}
