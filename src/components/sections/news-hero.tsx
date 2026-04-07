import { PageHeroImage } from "@/components/sections/page-hero-image"

export function NewsHero() {
  return (
    <PageHeroImage
      image="/hero/corporate.jpg"
      imageAlt="EduDubai News and Press"
      title="In The News"
      titleClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
      description="Stay up to date with the latest announcements, partnerships, and milestones from EduDubai."
      align="center"
    />
  )
}
