import { Metadata } from "next"
import { NewsHero } from "@/components/sections/news-hero"
import { NewsGrid } from "@/components/sections/news-grid"

export const metadata: Metadata = {
  title: "News & Press | EduDubai",
  description:
    "Latest news, press releases, and announcements from EduDubai — including strategic partnerships and milestones in global compliance education.",
  keywords: [
    "EduDubai News",
    "Compliance Training Partnership",
    "Trans World Compliance",
    "AML Training Announcement",
    "EduDubai Press Release",
  ],
}

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsGrid />
    </>
  )
}
