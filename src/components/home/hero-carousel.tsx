"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { Marquee } from "@/components/motion"

type Slide = {
  eyebrow?: string
  headline: string
  /** Rendered in gold, on its own line, as the emphasis half of the headline. */
  accent?: string
  subheadline: string
  primaryCTA: { text: string; href: string }
  secondaryCTA?: { text: string; href: string }
  image: string
  imageAlt: string
  certifications?: { name: string; imagePath: string }[]
  /**
   * How the credential artwork is built, which decides how it is framed.
   *
   * "mark" — ACAMS: a flat olive laurel on a TRANSPARENT background. Too dark
   *   to sit directly on the navy hero, so it needs a light surface.
   * "tile" — GCI: a complete navy card with a gold medallion, white caption
   *   and a notched corner, already carrying its own background. Putting one
   *   of these on a white chip produced a navy square letterboxed inside a
   *   white pill, which is what made slides 2 and 3 look unprofessional.
   */
  certificationStyle?: "mark" | "tile"
}

const slides: Slide[] = [
  {
    eyebrow: "Training & Consulting",
    headline: "Professional compliance",
    accent: "certification.",
    subheadline:
      "Accredited training for compliance, risk and audit functions in regulated institutions worldwide.",
    primaryCTA: { text: "View programmes", href: "/courses" },
    secondaryCTA: { text: "Speak to an advisor", href: "/contact" },
    image: "/hero/slide-1.jpg",
    imageAlt: "Compliance professionals in a training session",
  },
  {
    eyebrow: "ACAMS Exam Preparation",
    headline: "ACAMS certification",
    accent: "preparation.",
    subheadline:
      "Live instructor-led cohorts aligned to the ACAMS Candidate Handbook and examination blueprint.",
    primaryCTA: { text: "ACAMS programmes", href: "/courses?body=ACAMS" },
    secondaryCTA: { text: "Request a brochure", href: "/contact" },
    image: "/hero/slide-2.jpg",
    imageAlt: "ACAMS exam preparation cohort",
    certificationStyle: "mark",
    certifications: [
      { name: "CAMS", imagePath: "/images/certifications/camss.png" },
      { name: "CGSS", imagePath: "/images/certifications/cgss.png" },
      { name: "CCAS", imagePath: "/images/certifications/ccas.png" },
      { name: "CAFS", imagePath: "/images/certifications/cafs.png" },
    ],
  },
  {
    eyebrow: "GCI Exam Preparation",
    headline: "Global Compliance",
    accent: "Institute tracks.",
    subheadline:
      "Authorised GCI programmes covering AML, sanctions, FATCA/CRS and regulatory governance.",
    primaryCTA: { text: "GCI programmes", href: "/courses?body=GCI" },
    secondaryCTA: { text: "Request a brochure", href: "/contact" },
    image: "/hero/slide-3.jpg",
    imageAlt: "GCI certification training",
    certificationStyle: "tile",
    certifications: [
      { name: "CCM", imagePath: "/images/certifications/ccm.png" },
      { name: "FCS", imagePath: "/images/certifications/fcs.png" },
      { name: "AMLS", imagePath: "/images/certifications/amls.png" },
      { name: "RCS", imagePath: "/images/certifications/rcs.png" },
      { name: "SCS", imagePath: "/images/certifications/scs.png" },
    ],
  },
  {
    eyebrow: "For Organisations",
    headline: "Corporate programmes",
    accent: "programmes.",
    subheadline:
      "Institution-wide compliance training scoped to your risk assessment and delivered across jurisdictions.",
    primaryCTA: { text: "Corporate programmes", href: "/corporate-training" },
    secondaryCTA: { text: "Join our faculty", href: "/become-a-trainer" },
    image: "/hero/slide-4.jpg",
    imageAlt: "Corporate compliance team workshop",
  },
]

const partners = [
  { name: "Deutsche Bank", imagePath: "/images/partners/deutsche-bank.png" },
  { name: "BNP Paribas", imagePath: "/images/partners/bnp-paribas.png" },
  { name: "Citibank", imagePath: "/images/partners/citibank.png" },
  { name: "UBS", imagePath: "/images/partners/ubs.png" },
  { name: "Emirates NBD", imagePath: "/images/partners/emirates-nbd.png" },
  { name: "First Abu Dhabi Bank", imagePath: "/images/partners/fab.png" },
  { name: "HSBC", imagePath: "/images/partners/hsbc.png" },
  { name: "Standard Chartered", imagePath: "/images/partners/standard-chartered.png" },
]

const SLIDE_MS = 7000

/**
 * Homepage hero.
 *
 * Hand-rolled rather than Swiper: the hero needs a crossfade, a per-element
 * copy reveal and a progress bar on the indicators, none of which Swiper gives
 * for free -- and dropping it takes its CSS and module weight off the most
 * important page on the site.
 *
 * PERF NOTES (these are load-bearing, do not "tidy" them away):
 *  - Only the active image and its two neighbours are mounted. Rendering all
 *    four meant the browser downloaded every hero photo on first paint (~1.1MB)
 *    even at opacity 0 -- they are inside the viewport, so lazy loading never
 *    kicked in.
 *  - No `backdrop-filter` and no large `blur-[Npx]`: both are re-rasterised by
 *    the compositor every frame. Ambient glow uses the cheap `.orb` radial
 *    gradient instead.
 *  - No `will-change`: it promotes layers permanently and costs more than the
 *    transition it is meant to smooth.
 *  - Autoplay stops while the tab is hidden.
 */
export function HeroCarousel() {
  const [active, setActive] = React.useState(0)
  const [userPaused, setUserPaused] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const reduced = useReducedMotion() ?? false

  // Reduced-motion users get a static slide plus the manual controls; nothing
  // rotates underneath them.
  const playing = !userPaused && !hidden && !reduced

  const go = React.useCallback((i: number) => {
    setActive(((i % slides.length) + slides.length) % slides.length)
  }, [])

  React.useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => window.clearInterval(id)
  }, [playing])

  React.useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    onVis()
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      go(active + 1)
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      go(active - 1)
    }
  }

  const slide = slides[active]

  // One shared entrance: each copy element inherits its own delay from the
  // index passed in, so the block reveals top-down without a stagger parent.
  const rise = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="EduDubai highlights"
      onKeyDown={onKeyDown}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-950 text-white"
    >
      {/* ---------------- Backplate ---------------- */}
      <div className="absolute inset-0 -z-20">
        {slides.map((s, i) => {
          const dist = Math.min(Math.abs(i - active), slides.length - Math.abs(i - active))
          if (dist > 1) return null

          return (
            <motion.div
              key={s.image}
              aria-hidden={i !== active}
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 1.1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={s.image}
                alt={i === active ? s.imageAlt : ""}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                quality={75}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          )
        })}
      </div>

      {/*
        Three stacked scrims in brand navy. The vertical one guarantees legible
        text at the bottom of the frame regardless of the photo; the
        left-weighted one keeps the headline column readable on wide desktop
        crops; the grid adds a little corporate texture.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/82 to-ink-950/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/92 via-ink-800/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-navy bg-grid opacity-[0.35]"
      />
      {/* Cheap radial glow -- see `.orb` in globals.css, not a blur filter. */}
      <div
        aria-hidden="true"
        style={{ "--orb": "rgb(var(--gold-400) / 0.15)" } as React.CSSProperties}
        className="orb pointer-events-none absolute -left-24 bottom-0 -z-10 h-[28rem] w-[28rem] max-w-full"
      />

      {/* ---------------- Copy ---------------- */}
      <Container className="relative z-10 pb-10 pt-header sm:pb-16">
        <div className="flex min-h-[58svh] flex-col justify-end">
          {/*
            Only the active slide is in the DOM, so inactive CTAs can never
            become invisible tab stops. AnimatePresence with mode="wait" keeps
            the outgoing copy from overlapping the incoming copy.
          */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${slides.length}`}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.28 }}
              className="max-w-3xl"
            >
              {slide.eyebrow ? (
                <motion.p
                  {...rise(0)}
                  className="mb-5 inline-flex items-center gap-3 text-2xs font-bold uppercase tracking-[0.24em] text-gold-300"
                >
                  <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
                  {slide.eyebrow}
                </motion.p>
              ) : null}

              <motion.h1
                {...rise(0.06)}
                className="text-[2rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                <span className="block">{slide.headline}</span>
                {slide.accent ? (
                  <span className="relative mt-1 inline-block text-gold-400">
                    {slide.accent}
                    <motion.span
                      aria-hidden="true"
                      initial={reduced ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="absolute -bottom-1 left-0 block h-[3px] w-full rounded-full bg-gold-400/70"
                    />
                  </span>
                ) : null}
              </motion.h1>

              <motion.p
                {...rise(0.14)}
                className="mt-6 max-w-measure-sm text-base text-content-on-dark-muted sm:text-lg"
              >
                {slide.subheadline}
              </motion.p>

              <motion.div
                {...rise(0.2)}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button asChild size="xl" variant="gold" block>
                  <Link href={slide.primaryCTA.href}>
                    {slide.primaryCTA.text}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:translate-x-1"
                    />
                  </Link>
                </Button>

                {slide.secondaryCTA ? (
                  <Button asChild size="xl" variant="outline-light" block>
                    <Link href={slide.secondaryCTA.href}>{slide.secondaryCTA.text}</Link>
                  </Button>
                ) : null}
              </motion.div>

              {slide.certifications ? (
                <motion.div {...rise(0.26)} className="mt-9">
                  <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Certifications covered
                  </p>

                  {/*
                    Every badge is rendered SQUARE (the source art is 1080x1080)
                    at one uniform size, so the row has a consistent rhythm.
                    Previously they were forced into a 72x48 landscape chip,
                    which letterboxed square artwork and shrank the captions to
                    an illegible size.
                  */}
                  <ul className="mt-4 flex flex-wrap items-center gap-3">
                    {slide.certifications.map((c) => (
                      <li key={c.name} className="group/badge relative">
                        <div
                          className={cn(
                            "relative h-16 w-16 overflow-hidden rounded-lg transition-transform duration-slow ease-out-expo group-hover/badge:-translate-y-1 sm:h-[4.5rem] sm:w-[4.5rem]",
                            slide.certificationStyle === "tile"
                              ? // Already a navy tile: let it sit on the hero
                                // directly, with only a hairline to seat it.
                                "ring-1 ring-white/15"
                              : // Transparent olive mark: needs a light surface
                                // to be legible on navy.
                                "bg-white p-2.5 shadow-sm ring-1 ring-gold-400/30",
                          )}
                        >
                          <Image
                            src={c.imagePath}
                            alt={`${c.name} certification`}
                            fill
                            quality={90}
                            sizes="72px"
                            className="object-contain"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------------- Controls ---------------- */}
        <div className="mt-9 flex items-center gap-4 sm:gap-5">
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}: ${s.headline}`}
                onClick={() => go(i)}
                className="group/dot relative h-8 px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                <span
                  className={cn(
                    "block h-[3px] overflow-hidden rounded-full bg-white/25 transition-all duration-slow ease-out-expo",
                    i === active ? "w-12 sm:w-14" : "w-6 group-hover/dot:bg-white/50",
                  )}
                >
                  {i === active ? (
                    <motion.span
                      key={`fill-${active}-${playing}`}
                      initial={{ scaleX: playing ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: playing ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                      style={{ originX: 0 }}
                      className="block h-full w-full rounded-full bg-gold-400"
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>

          {!reduced ? (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Resume slideshow" : "Pause slideshow"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/40 text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
          ) : null}

          <span className="ml-auto hidden text-2xs font-semibold tabular tracking-widest text-white/50 sm:block">
            <span className="text-gold-300">{String(active + 1).padStart(2, "0")}</span> /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </Container>

      {/* ---------------- Trust rail ---------------- */}
      <div className="relative z-10 border-t border-white/10 glass-dark">
        <Container>
          <div className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10">
            <p className="shrink-0 text-2xs font-bold uppercase tracking-[0.22em] text-gold-300">
              Trusted by teams at
            </p>
            <Marquee durationSec={52} itemClassName="gap-12 pr-12">
              {partners.map((p) => (
                <span key={p.name} className="relative h-8 w-28 shrink-0">
                  <Image
                    src={p.imagePath}
                    alt={p.name}
                    fill
                    quality={90}
                    sizes="112px"
                    className="object-contain brightness-0 invert opacity-60 transition-opacity duration-slow hover:opacity-100"
                  />
                </span>
              ))}
            </Marquee>
          </div>
        </Container>
      </div>
    </section>
  )
}
