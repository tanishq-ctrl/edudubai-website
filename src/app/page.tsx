import type { Metadata } from "next"

import { HeroCarousel } from "@/components/home/hero-carousel"
import { HomeObligations } from "@/components/sections/home-obligations"
import { PartnershipsSection } from "@/components/sections/partnerships-section"
import { HomeFaculty } from "@/components/sections/home-faculty"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CorporateCTASection } from "@/components/sections/corporate-cta-section"
import { getAllCoursesNew } from "@/server/actions/courses"
import { HomePageClient } from "./home-client"

export const metadata: Metadata = {
  title: "Global Online Professional Education & Compliance Training",
  description:
    "CAMS certification, AML training and GCI compliance courses delivered online to compliance professionals worldwide. Live instructor-led sessions and exam preparation.",
  alternates: { canonical: "/" },
}

/**
 * The hero carousel and its trust rail open the page, as before -- the rail is
 * part of the hero's own band rather than a separate strip, which is what makes
 * the top of the page read as one object.
 *
 * What changed underneath it: the hero used to hand over to a light band, then
 * a feature trio, then a separate featured-courses grid. The obligation index
 * now follows the hero directly on the same dark ground, so the visitor crosses
 * no seam between "what this is" and "which programme is mine", and it replaces
 * both `WhyEduDubai` and `FeaturedCoursesSection` -- the trio said nothing the
 * index does not, and the index routes to all eight programmes in a third of
 * the height the grid needed.
 *
 * Tones from there alternate so no two adjacent bands share a value, and every
 * one of them is a FLAT field rather than a gradient:
 *
 *   carousel (ink, photographic) -> trust rail (paper) -> obligations (ink)
 *   -> partnerships (paper) -> faculty (deep) -> stats (ink)
 *   -> testimonials (sunken) -> corporate CTA (crimson)
 *
 * The crimson band appears exactly once, at the foot of the page, on the block
 * that carries the decision. Do not add a second one: two crimson fields on a
 * page and neither reads as the brand.
 */
export default async function HomePage() {
  const courses = await getAllCoursesNew()

  return (
    <>
      <HomePageClient />
      <HeroCarousel />
      <HomeObligations courses={courses} />
      <PartnershipsSection />
      <HomeFaculty />
      <StatsSection />
      <TestimonialsSection />
      <CorporateCTASection />
    </>
  )
}
