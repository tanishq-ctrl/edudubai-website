import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { HeroShell } from "@/components/hero-shell"
import { Reveal } from "@/components/motion"

/**
 * /about hero.
 *
 * Built on HeroShell, so every vertical measure is svh-aware and the whole
 * hero fits between 620px and 1000px of viewport height. The photograph is a
 * framed object beside the copy rather than a backdrop behind it; it is the
 * block that gives up space on a short screen, never the actions.
 *
 * The ground is a flat ink field. The radial blooms that used to sit behind it
 * are gone, along with the navy gradient: light with no source was the
 * strongest generated-looking element on the page.
 */

const facts = [
  { value: "2023", label: "Founded" },
  { value: "12", label: "Jurisdictions" },
  { value: "850+", label: "Sessions delivered" },
]

export function AboutHero() {
  return (
    <HeroShell
      tone="ink"
      /* This page opens on the hero, so the hero owns the first viewport: it
         carries a photograph, a figure overlay and the three-fact rail, which
         is a full band's worth of content rather than a bare page head. */
      fill
      eyebrow="Accredited with ACAMS and GCI"
      title={
        <>
          Specialists in regulatory{" "}
          <span className="text-crimson-ink">compliance training.</span>
        </>
      }
      lead="Certification and advisory programmes for compliance, risk and audit professionals inside regulated institutions across India, the Gulf and international markets."
      actions={
        <>
          <Button asChild variant="primary" size="lg">
            <Link href="/courses">Explore programmes</Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link href="/contact">Talk to the faculty</Link>
          </Button>
        </>
      }
      aside={
        /* Height, not aspect ratio: it matches HeroShell's own svh cap, so the
           photograph shrinks on a short screen instead of being cropped and
           taking the figure overlay with it. */
        <div
          className="relative h-full w-full border border-white/10"
          style={{ minHeight: "clamp(8rem, 36svh, 26rem)" }}
        >
          <Image
            src="/hero/about-session.jpg"
            alt="Compliance trainers reviewing case material during a session"
            fill
            priority
            sizes="(min-width: 1024px) 470px, 100vw"
            className="object-cover"
          />
          {/* The one gradient permitted on this page: a scrim inside a
              photograph, there to keep the figure below legible. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-975/90 to-transparent"
          />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="font-display text-3xl font-semibold leading-none tracking-tight text-white">
              2,500+
            </p>
            <p className="mt-1.5 text-[15px] text-content-on-dark-muted">
              specialists certified since 2023
            </p>
          </div>
        </div>
      }
    >
      <Reveal variant="up" delay={200}>
        {/* svh-aware, like every other measure in the hero: on a short screen
            the rail tightens instead of pushing the actions off the fold. */}
        <dl
          className="flex flex-wrap gap-x-12 gap-y-4 border-t border-white/10"
          style={{ paddingTop: "clamp(0.9rem, 0.4rem + 1.6svh, 1.75rem)" }}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-display text-2xl font-semibold leading-none tracking-tight text-white">
                {fact.value}
              </dd>
              <p aria-hidden="true" className="mt-2 text-[15px] text-content-on-dark-muted">
                {fact.label}
              </p>
            </div>
          ))}
        </dl>
      </Reveal>
    </HeroShell>
  )
}
