import Image from "next/image"

import { Section, Eyebrow } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

/**
 * The faculty.
 *
 * `about-trainers.tsx` has existed for a long time and /about never rendered
 * it, so the page argued "taught by practitioners" without ever showing one.
 * The biographies here are that component's copy, trimmed to the length this
 * layout can carry; the long-form version still lives there.
 *
 * On the photographs: they are shown as taken. The `mix-blend-color` wash
 * that used to tint both headshots has gone with the rest of the decorative
 * layer; a 1px frame does the unifying work instead.
 */
const faculty = [
  {
    name: "Sonali Prabhu",
    role: "Founder & CEO",
    image: "/team/sonali-prabhu.jpg",
    bio: "A banking professional with deep experience in operations, policy implementation and regulatory compliance at HDFC Bank. Her work in AML/CFT, sanctions screening and audit management sets the standard the curriculum is built to.",
  },
  {
    name: "Sanjay Prabhu",
    role: "Director, GRC consulting and training",
    image: "/team/sanjay-prabhu.jpg",
    bio: "Eighteen years in trade finance and banking operations, and nine dedicated to compliance training across international banks, exchange houses and DNFBPs. Certified Compliance Manager (GCI), CFCS and CTP.",
  },
]

export function AboutFaculty() {
  return (
    <Section tone="deep" size="sm">
      <Reveal variant="fade">
        <Eyebrow marker="dot">The faculty</Eyebrow>
      </Reveal>

      <Reveal variant="up" delay={70}>
        <h2 className="mt-5 max-w-measure-sm text-4xl tracking-tight text-content-on-dark sm:text-5xl">
          Taught by practising compliance professionals
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-8 md:grid-cols-2" step={130} variant="up">
        {faculty.map((person) => (
          <article key={person.name} className="panel-dark rounded-sm p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>

            <h3 className="mt-7 text-2xl text-content-on-dark">{person.name}</h3>
            <p className="mt-2 text-[15px] font-medium text-crimson-ink">{person.role}</p>
            <p className="mt-4 text-[17px] leading-relaxed text-content-on-dark-muted">{person.bio}</p>
          </article>
        ))}
      </Stagger>
    </Section>
  )
}
