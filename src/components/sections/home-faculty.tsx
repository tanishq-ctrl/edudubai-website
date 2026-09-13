import Image from "next/image"
import Link from "next/link"

import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"

/**
 * The positioning claim, stated on the homepage rather than buried on /about.
 *
 * Deliberately not the two-up card grid `about-faculty.tsx` uses. That layout
 * is right on a page the visitor reached to learn about the company; here the
 * faculty are evidence for a claim made in the heading, so the portraits sit
 * inside the argument rather than in containers of their own.
 *
 * The neutral `mix-blend-color` wash is carried over from the /about
 * treatment: the two headshots were taken on different backgrounds and read as
 * unrelated images without it. It is the one tint on the page, and it is
 * applied to photographs rather than used as decoration.
 */
const faculty = [
  {
    name: "Sonali Prabhu",
    role: "Founder & CEO",
    image: "/team/sonali-prabhu.jpg",
    credential: "Banking operations, policy and regulatory compliance at HDFC Bank",
  },
  {
    name: "Sanjay Prabhu",
    role: "Director, GRC consulting and training",
    image: "/team/sanjay-prabhu.jpg",
    credential: "CCM (GCI), CFCS and CTP. Eighteen years in trade finance and banking operations.",
  },
]

export function HomeFaculty() {
  return (
    <Section tone="deep" size="sm">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <div>
          <Reveal variant="up">
            <h2 className="max-w-measure-sm text-4xl tracking-tight text-content-on-dark sm:text-5xl">
              Taught by practising compliance professionals
            </h2>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <p className="mt-6 max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
              The faculty are serving MLROs, heads of compliance and former regulators. Case
              material is drawn from live enforcement actions rather than textbook scenarios, so
              the curriculum reflects current supervisory expectations.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={150}>
            <p className="mt-8 text-[17px] text-content-on-dark-muted">
              <Link
                href="/about"
                className="font-medium text-content-on-dark underline decoration-crimson-500 underline-offset-[6px] transition-colors duration-slow ease-out-expo hover:decoration-crimson-300"
              >
                Meet the faculty
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={120}>
          <div className="grid gap-6 sm:grid-cols-2">
            {faculty.map((person) => (
              <figure key={person.name} className="min-w-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink-800/60 mix-blend-color"
                  />
                </div>

                <figcaption className="mt-5">
                  <p className="font-display text-lg font-semibold tracking-tight text-content-on-dark">
                    {person.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gold-ink">{person.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-content-on-dark-muted">
                    {person.credential}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
