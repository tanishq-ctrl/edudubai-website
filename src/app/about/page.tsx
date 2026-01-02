import { Container } from "@/components/container"
import { AboutHero } from "@/components/sections/about-hero"
import { AboutExpertise } from "@/components/sections/about-expertise"
import { AboutWhoWeServe } from "@/components/sections/about-who-we-serve"
import { AboutCredibility } from "@/components/sections/about-credibility"
import { AboutTrainers } from "@/components/sections/about-trainers"
import { AboutPageClient } from "./page-client"

export default function AboutPage() {
  return (
    <>
      <AboutPageClient />
      <AboutHero />
      <Container className="py-12 md:py-16">
        <AboutExpertise />
        <AboutWhoWeServe />
        <AboutCredibility />
        <AboutTrainers />
      </Container>
    </>
  )
}
