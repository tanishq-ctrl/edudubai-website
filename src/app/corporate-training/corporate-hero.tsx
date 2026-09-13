"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"

/**
 * Corporate hero.
 *
 * The specification-as-artefact idea is kept, but rendered with depth instead
 * of as a flat bordered box: a dark glass panel layered over a navy gradient
 * field, which is the treatment the style data recommends for high-end
 * corporate surfaces.
 *
 * Motion follows the "Stagger List" tier — scale 0.92 / y 16, 60ms apart,
 * overshoot easing, ~400ms — so the specification assembles itself once on
 * load rather than every section sliding up identically on scroll.
 *
 * PERF: this is the only backdrop-filter on the site. It sits on one element
 * that never moves, so it composites once; the 23 blurred elements that
 * previously caused scroll jank are not coming back.
 */

const specification: { term: string; value: string }[] = [
  { term: "Delivery", value: "In-person, live virtual or blended" },
  { term: "Cohort size", value: "8 – 40 participants" },
  { term: "Duration", value: "Concise 2 – 4 day format" },
  { term: "Scoping", value: "Against your institutional risk assessment" },
  { term: "Reporting", value: "Attendance, completion and competency" },
  { term: "Jurisdictions", value: "GCC, India and international markets" },
]

export function CorporateHero() {
  const reduced = useReducedMotion() ?? false

  const rise = (delay: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-[calc(var(--header-h)+4rem)] text-white">
      {/* Layered field: photograph as tone, then a multi-stop navy wash, then
          two coloured glows. Depth comes from the stack, not from one fill. */}
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <Image
          src="/hero/corporate.jpg"
          alt=""
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_15%_0%,rgb(var(--navy-700)/0.95),transparent_60%),radial-gradient(100%_80%_at_100%_100%,rgb(var(--ink-950)),rgb(var(--ink-950)/0.92))]"
      />
      <div
        aria-hidden="true"
        className="orb [--orb:rgb(var(--gold-400)/0.16)] pointer-events-none absolute -right-32 -top-24 -z-10 h-[38rem] w-[38rem]"
      />
      <div
        aria-hidden="true"
        className="orb [--orb:rgb(var(--navy-500)/0.35)] pointer-events-none absolute -bottom-40 left-[-10rem] -z-10 h-[30rem] w-[30rem]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain" />

      <Container>
        <div className="grid items-center gap-14 pb-section-md lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <motion.h1
              {...rise(0)}
              className="text-[clamp(2.5rem,1.6rem+3.6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
            >
              Corporate training for regulated institutions
            </motion.h1>

            <motion.p
              {...rise(0.08)}
              className="mt-7 max-w-measure text-lg leading-relaxed text-white/70"
            >
              Compliance, risk and governance programmes for banks, exchange houses, VASPs and
              DNFBPs — scoped against your own risk assessment and evidenced for audit.
            </motion.p>

            <motion.div {...rise(0.16)} className="mt-11 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <Link href="#request-proposal">Request a proposal</Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link href="/contact">Speak to an advisor</Link>
              </Button>
            </motion.div>
          </div>

          {/* The specification, as dark glass over the field. */}
          <motion.div {...rise(0.12)} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl bg-white/[0.06] shadow-[0_50px_90px_-40px_rgb(0_0_0/0.8)] ring-1 ring-white/12 backdrop-blur-xl">
              {/* Inset top highlight — the detail that makes glass read as glass. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent"
              />

              <div className="flex items-baseline justify-between px-7 pb-5 pt-6">
                <h2 className="text-sm font-semibold tracking-tight text-white">
                  Engagement specification
                </h2>
                <span className="text-2xs tabular text-white/55">2026</span>
              </div>

              <dl className="px-2 pb-3">
                {specification.map((row, i) => (
                  <motion.div
                    key={row.term}
                    initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.22 + i * 0.06,
                      ease: [0.34, 1.4, 0.64, 1],
                    }}
                    className="grid grid-cols-3 gap-4 rounded-lg px-5 py-3.5 transition-colors duration-fast hover:bg-white/[0.05]"
                  >
                    <dt className="col-span-1 text-sm text-white/65">{row.term}</dt>
                    <dd className="col-span-2 text-sm font-medium text-white">{row.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
