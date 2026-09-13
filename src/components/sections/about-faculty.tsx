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
 * On the photographs: the two headshots were taken on different backgrounds
 * (one warm, one grey studio) and read as unrelated images side by side. The
 * navy `mix-blend-color` wash unifies them. It is one small element per card,
 * not a full-section blend -- see the perf note on `.grain` in globals.css.
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
    bio: "Eighteen years in trade finance and banking operations, and nine dedicated to compliance training across international banks, exchange houses and DNFBPs. Certified Compliance Manager (GCI), CFCS and CTP; 2,500+ sessions delivered.",
  },
]

export function AboutFaculty() {
  return (
    <Section tone="deep" size="sm">
      <Reveal variant="fade">
        <Eyebrow marker="dot">The faculty</Eyebrow>
      </Reveal>

      <Reveal variant="up" delay={70}>
        <h2 className="mt-5 max-w-measure-sm text-4xl tracking-tight text-white sm:text-5xl">
          Taught by people who still do the job
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-8 md:grid-cols-2" step={130} variant="up">
        {faculty.map((person) => (
          <article key={person.name} className="panel-dark rounded-3xl p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-navy-700/60 mix-blend-color"
              />
            </div>

            <h3 className="mt-7 text-2xl text-white">{person.name}</h3>
            <p className="mt-2 text-sm font-medium text-gold-ink">{person.role}</p>
            <p className="mt-4 text-[17px] leading-relaxed text-white/55">{person.bio}</p>
          </article>
        ))}
      </Stagger>
    </Section>
  )
}
