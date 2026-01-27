import { Container } from "@/components/container"
import { AboutHero } from "@/components/sections/about-hero"
import { AboutExpertise } from "@/components/sections/about-expertise"
import { AboutWhoWeServe } from "@/components/sections/about-who-we-serve"
import { AboutCredibility } from "@/components/sections/about-credibility"
import { AboutTrainers } from "@/components/sections/about-trainers"
import { AboutPageClient } from "./page-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Global Compliance & Professional Education Specialist",
  description: "Learn about EduDubai's mission to provide world-class regulatory compliance training, AML/CFT certification, and professional development to specialists globally.",
  keywords: ["Compliance Training Team", "AML Experts", "Professional Education History", "EduDubai Mission", "Global Regulatory Specialists"],
}

export default function AboutPage() {
  return (
    <>
      <AboutPageClient />
      <AboutHero />
      <Container className="py-12 md:py-16">
        <AboutExpertise />
        <AboutWhoWeServe />
        <AboutCredibility />
        {/* <AboutTrainers /> */}
      </Container>
    </>
  )
}
