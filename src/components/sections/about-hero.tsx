import { PageHeroImage } from "@/components/sections/page-hero-image"

export function AboutHero() {
  return (
    <PageHeroImage
      image="/hero/about.jpg"
      imageAlt="About EduDubai - Global education and training specialist"
      title="About Us"
      titleClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
    />
  )
}
