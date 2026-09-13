import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/container"
import { Reveal } from "@/components/motion"

/**
 * /about hero -- the "Midnight" treatment.
 *
 * Deliberately not `PageHeroImage`. That component centres copy over a
 * full-bleed photograph, which is the pattern every other page already uses
 * and the reason the site read as one repeated template. Here the photograph
 * is a framed object beside the copy rather than a backdrop behind it, and the
 * ground is a navy-to-near-black field carrying a gold bloom.
 *
 * The bloom is `.bloom-gold` / `.bloom-navy` (radial gradients), not a blurred
 * element -- see the note on `.orb` in globals.css for why.
 */
export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-navy-900 to-ink-975 text-content-on-dark grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 -top-56 h-[46rem] w-[46rem] bloom-gold" />
        <div className="absolute -right-24 top-40 h-[52rem] w-[52rem] bloom-navy" />
      </div>

      <Container className="grid items-center gap-12 py-section-sm lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-20">
        <div className="max-w-measure-sm">
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-medium text-white/85">
              <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-gold-400" />
              Accredited with ACAMS &middot; GCI
            </span>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h1 className="mt-7 text-[clamp(2.25rem,1.4rem+3.4vw,3.75rem)] font-semibold leading-[1.04] tracking-tighter">
              Specialists in regulatory{" "}
              <span className="text-gold-400">compliance training.</span>
            </h1>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <p className="mt-6 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
              Certification and advisory programmes for compliance, risk and audit professionals
              inside regulated institutions across India, the Gulf and international markets.
            </p>
          </Reveal>

          <Reveal variant="up" delay={230}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="rounded-full bg-gold-400 px-7 py-4 text-base font-semibold text-navy-900 transition-colors duration-slow ease-out-expo hover:bg-gold-300"
              >
                Explore programmes
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 bg-white/[0.06] px-7 py-4 text-base font-medium text-white transition-colors duration-slow ease-out-expo hover:bg-white/[0.12]"
              >
                Talk to the faculty
              </Link>
            </div>
          </Reveal>

          <Reveal variant="up" delay={300}>
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
              {[
                { value: "2023", label: "Founded" },
                { value: "12", label: "Jurisdictions" },
                { value: "850+", label: "Sessions delivered" },
              ].map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="font-display text-3xl font-semibold leading-none tracking-tight text-white">
                    {fact.value}
                  </dd>
                  <p aria-hidden="true" className="mt-2 text-sm text-white/50">
                    {fact.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={140} className="relative mx-auto w-full max-w-[470px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="/hero/about.jpg"
              alt="The EduDubai training team"
              fill
              priority
              sizes="(min-width: 1024px) 470px, 100vw"
              className="object-cover"
            />
          </div>

          {/*
             Stat card breaking the photograph's bottom-left corner. The overlap
             is the point -- it stops the two columns reading as two separate
             rectangles sitting side by side.

             Not `.panel-dark`: that fill is translucent, and half this card
             sits over the photograph, where the muted line underneath went
             unreadable. This is the one panel on the page that needs an
             opaque ground.
          */}
          <div className="absolute -bottom-8 -left-6 rounded-[1.4rem] border border-white/10 bg-ink-975/95 px-7 py-6 shadow-2xl sm:-left-10">
            <p className="font-display text-4xl font-semibold leading-none tracking-tight text-white">
              2,500+
            </p>
            <p className="mt-2 text-sm text-white/60">specialists certified since 2023</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
