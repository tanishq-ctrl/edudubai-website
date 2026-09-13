import Link from "next/link"

import { Section, Eyebrow } from "@/components/section"
import { Reveal } from "@/components/motion"
import { Button } from "@/components/ui/button"

/**
 * Closing band for /about.
 *
 * The one crimson band on the page, and the only one anywhere on /about: the
 * brand ground is held back until the band that carries the decision. After
 * six ink bands it reads as arrival rather than as decoration.
 *
 * It used to be a gold gradient with two hand-rolled pill links. Both are
 * gone: the ground is a flat field and the calls to action are Button
 * variants, so they cannot drift from the primary.
 */
export function AboutCta() {
  return (
    <Section tone="crimson" size="sm">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <div>
          <Reveal variant="fade">
            {/* --accent-ink re-points to gold on this ground, so the eyebrow
                stays legible without an override. */}
            <Eyebrow marker="dot">Corporate training</Eyebrow>
          </Reveal>

          <Reveal variant="up" delay={70}>
            <h2 className="mt-6 max-w-measure-sm text-4xl tracking-tight text-content-on-dark sm:text-5xl">
              Cohort training for institutions
            </h2>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="mt-5 max-w-measure text-[17px] leading-relaxed text-content-on-dark/85">
              Cohort programmes delivered in-house, mapped to your risk assessment and your
              regulator.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={210}>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Button asChild variant="default" size="lg" className="whitespace-nowrap">
              <Link href="/contact">Request a proposal</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="whitespace-nowrap">
              <Link href="/courses">Browse the catalogue</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
