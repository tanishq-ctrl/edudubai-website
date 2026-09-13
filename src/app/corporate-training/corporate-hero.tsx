import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"

/**
 * Corporate hero.
 *
 * A bespoke hero rather than HeroShell, because the aside is a six-row
 * specification that has to stay readable rather than a photograph that can
 * shrink. It deliberately does NOT claim `calc(100svh - header)`: CorporateProof
 * is a second band that this file's own comment calls "the closing band of the
 * hero field", so a full-viewport hero pushed the whole accreditation rail and
 * all three figures below the fold at every height from 620px to 1000px. The
 * two bands size to their content instead, and both are svh-clamped.
 *
 * It follows HeroShell's rule all the same: every vertical measure is
 * a clamp with an svh term, so the whole hero fits from 620px to 1000px of
 * viewport height at 1440px wide. A fixed `pt-[...+4rem]`, a fixed
 * `pb-section-md` or a vw-only type clamp puts the cut-off bug back.
 *
 * The ground is a flat ink field with the photograph held back as tone behind
 * it. The two radial navy washes, the gold and navy orbs, the backdrop-blur
 * glass panel and its gradient top highlight are all gone: light with no
 * source over a translucent card was the most generated-looking surface on the
 * site. The specification is now a solid ink-900 panel under a hairline.
 */

const specification: { term: string; value: string }[] = [
  { term: "Delivery", value: "In-person, live virtual or blended" },
  { term: "Cohort size", value: "8 to 40 participants" },
  { term: "Duration", value: "Concise 2 to 4 day format" },
  { term: "Scoping", value: "Against your institutional risk assessment" },
  { term: "Reporting", value: "Attendance, completion and competency" },
  { term: "Jurisdictions", value: "GCC, India and international markets" },
]

/* Height-aware measures, kept together so they cannot drift apart. */
const PAD_TOP = "calc(var(--header-h) + clamp(1.5rem, 0.4rem + 4svh, 3.5rem))"
const PAD_BOTTOM = "clamp(1.75rem, 0.4rem + 5svh, 4.5rem)"
const COL_GAP = "clamp(1.75rem, 0.6rem + 3.5svh, 3.5rem)"
const STACK_GAP = "clamp(0.9rem, 0.4rem + 1.7svh, 1.9rem)"
const TITLE_SIZE = "clamp(2rem, 1rem + 2.4vw + 1.2svh, 3.5rem)"

export function CorporateHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink-950 text-content-on-dark grain"
      style={{
        paddingTop: PAD_TOP,
        paddingBottom: PAD_BOTTOM,
      }}
    >
      {/* Photograph as tone, under a flat ink field. No gradient wash. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/hero/corporate.jpg"
          alt=""
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950/70" />

      <Container className="relative z-10 flex h-full flex-col justify-center">
        <div
          className="grid items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
          style={{ gap: COL_GAP }}
        >
          <div className="flex min-w-0 flex-col" style={{ gap: STACK_GAP }}>
            <Reveal variant="up">
              <h1
                className="max-w-measure-sm font-semibold tracking-tight"
                style={{ fontSize: TITLE_SIZE, lineHeight: 1.06 }}
              >
                Corporate training for regulated institutions
              </h1>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <p className="max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
                Compliance, risk and governance programmes for banks, exchange houses, VASPs
                and DNFBPs, scoped against your own risk assessment and evidenced for audit.
              </p>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <Link href="#request-proposal">Request a proposal</Link>
                </Button>
                <Button asChild variant="outline-light" size="lg">
                  <Link href="/contact">Speak to an advisor</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* The specification, as a solid panel. */}
          <Reveal variant="fade" delay={180} className="min-w-0">
            <div className="panel-dark rounded-sm">
              <div className="flex items-baseline justify-between border-b border-white/10 px-6 py-4">
                <h2 className="text-sm font-semibold tracking-tight text-content-on-dark">
                  Engagement specification
                </h2>
                <span className="text-2xs tabular text-content-on-dark-muted">2026</span>
              </div>

              <dl className="px-2 py-2">
                {specification.map((row) => (
                  <div
                    key={row.term}
                    className="grid grid-cols-3 gap-4 px-4 py-2 transition-colors duration-fast hover:bg-white/5"
                  >
                    <dt className="col-span-1 text-[17px] text-content-on-dark-muted">
                      {row.term}
                    </dt>
                    <dd className="col-span-2 text-[17px] font-medium text-content-on-dark">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
