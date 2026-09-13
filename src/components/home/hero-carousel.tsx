"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/components/motion";
import { Container } from "@/components/container";
import { Marquee } from "@/components/motion";

type Slide = {
  eyebrow?: string;
  headline: string;
  /** Rendered in crimson, on its own line, as the emphasis half of the headline. */
  accent?: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  image: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Training and consulting",
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
    eyebrow: "ACAMS exam preparation",
    headline: "ACAMS certification",
    accent: "preparation.",
    subheadline:
      "Live instructor-led cohorts aligned to the ACAMS Candidate Handbook and examination blueprint.",
    primaryCTA: { text: "ACAMS programmes", href: "/courses?body=ACAMS" },
    secondaryCTA: { text: "Request a brochure", href: "/contact" },
    image: "/hero/slide-2.jpg",
    imageAlt: "ACAMS exam preparation cohort",
  },
  {
    eyebrow: "GCI exam preparation",
    headline: "Global Compliance",
    accent: "Institute tracks.",
    subheadline:
      "Authorised GCI programmes covering AML, sanctions, FATCA/CRS and regulatory governance.",
    primaryCTA: { text: "GCI programmes", href: "/courses?body=GCI" },
    secondaryCTA: { text: "Request a brochure", href: "/contact" },
    image: "/hero/slide-3.jpg",
    imageAlt: "GCI certification training",
  },
  {
    eyebrow: "For organisations",
    headline: "Corporate compliance",
    accent: "programmes.",
    subheadline:
      "Institution-wide compliance training scoped to your risk assessment and delivered across jurisdictions.",
    primaryCTA: { text: "Corporate programmes", href: "/corporate-training" },
    secondaryCTA: { text: "Join our faculty", href: "/become-a-trainer" },
    image: "/hero/slide-4.jpg",
    imageAlt: "Corporate compliance team workshop",
  },
];

const partners = [
  { name: "Deutsche Bank", imagePath: "/images/partners/deutsche-bank.png" },
  { name: "BNP Paribas", imagePath: "/images/partners/bnp-paribas.png" },
  { name: "Citibank", imagePath: "/images/partners/citibank.png" },
  { name: "UBS", imagePath: "/images/partners/ubs.png" },
  { name: "Emirates NBD", imagePath: "/images/partners/emirates-nbd.png" },
  { name: "First Abu Dhabi Bank", imagePath: "/images/partners/fab.png" },
  { name: "HSBC", imagePath: "/images/partners/hsbc.png" },
  {
    name: "Standard Chartered",
    imagePath: "/images/partners/standard-chartered.png",
  },
];

const SLIDE_MS = 7000;

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
 *    the compositor every frame. There is no ambient glow at all now: the
 *    photograph carries a single directional scrim and nothing else.
 *  - No `will-change`: it promotes layers permanently and costs more than the
 *    transition it is meant to smooth.
 *  - Autoplay stops while the tab is hidden.
 *
 * HEIGHT CONTRACT (same rule as HeroShell, see src/components/hero-shell.tsx):
 * every vertical measure in the copy block is a clamp() with an `svh` term, so
 * the eyebrow, headline, lead, both CTAs and the indicator row all fit between
 * 620px and 1000px of viewport height at 1440px wide. The old fixed `mb-5` /
 * `mt-6` / `mt-9` rhythm and the `vw`-only type clamp pushed the buttons under
 * the fold on a short laptop window. Do not replace these with fixed rem
 * spacing or a width-only font clamp.
 */

/* One place for the height-aware measurements, so a slide cannot drift. */
const HEADLINE_SIZE = "clamp(2rem, 1rem + 2.4vw + 1.3svh, 3.5rem)";
const LEAD_SIZE = "clamp(1.0625rem, 1rem + 0.25vw + 0.2svh, 1.1875rem)";
const COPY_GAP = "clamp(0.75rem, 0.35rem + 1.4svh, 1.5rem)";
const CONTROLS_GAP = "clamp(1.25rem, 0.5rem + 2.4svh, 2.25rem)";
const BLOCK_PAD = "clamp(1.25rem, 0.5rem + 2.2svh, 2rem)";

export function HeroCarousel() {
  const [active, setActive] = React.useState(0);
  const [userPaused, setUserPaused] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  /*
     Mount-gated: the preference is a media query, so it is false on the server
     and true on the client for a reduced-motion user. Reading it raw made the
     pause button and the progress fill differ between the two trees, which is
     a hydration mismatch. See `usePrefersReducedMotion`.
  */
  const reduced = usePrefersReducedMotion();

  // Reduced-motion users get a static slide plus the manual controls; nothing
  // rotates underneath them.
  const playing = !userPaused && !hidden && !reduced;

  const go = React.useCallback((i: number) => {
    setActive(((i % slides.length) + slides.length) % slides.length);
  }, []);

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  React.useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const slide = slides[active];

  // One shared entrance: each copy element inherits its own delay from the
  // index passed in, so the block reveals top-down without a stagger parent.
  /*
     One shape for every render. Branching these props on `reduced` produced a
     hydration mismatch: the server resolved the preference one way and the
     first client render the other, so React threw and regenerated the whole
     tree. `MotionConfig reducedMotion="user"` below honours the preference at
     runtime instead, which leaves the server and client markup identical.
  */
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-roledescription="carousel"
        aria-label="EduDubai highlights"
        onKeyDown={onKeyDown}
        className="relative isolate flex flex-col overflow-hidden bg-ink-950 text-content-on-dark"
        /* The slide AND the trust rail are one band, and together they own
           exactly the first viewport: the rail is the floor of the hero, so
           the visitor never lands on a strip of the next section under it.
           The copy block takes the slack (it is `flex-1` below), the rail
           keeps its natural height. */
        style={{ minHeight: "100svh" }}
      >
        {/* ---------------- Backplate ---------------- */}
        <div className="absolute inset-0 -z-20">
          {slides.map((s, i) => {
            const dist = Math.min(
              Math.abs(i - active),
              slides.length - Math.abs(i - active),
            );
            if (dist > 1) return null;

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
                  className="object-cover object-center [filter:saturate(1.08)_contrast(1.05)]"
                />
              </motion.div>
            );
          })}
        </div>

        {/*
        ONE directional scrim, and it exists only to keep the copy legible over
        whichever photograph is showing. There used to be three stacked ramps
        plus a grid tile plus a radial glow; light with no source over an
        edgeless stack of gradients is the strongest generated-look tell there
        is. A gradient is allowed here, and nowhere else on the page, because
        this one sits inside a photograph.

        Bottom-weighted on phones, where the copy sits at the foot of the
        frame; left-weighted from `sm` up, where it sits in the left column.
      */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30 sm:bg-gradient-to-r sm:from-ink-950 sm:via-ink-950/80 sm:to-ink-950/25"
        />

        {/* ---------------- Copy ---------------- */}
        <Container
          className="relative z-10 flex flex-1 flex-col pt-header"
          style={{ paddingBottom: BLOCK_PAD }}
        >
          {/*
             Centred, not bottom-anchored. `justify-end` put every pixel of
             slack above the headline, so on a tall window the slide opened on
             half a screen of empty photograph before the first word. Centring
             splits the slack, and the indicator row below still holds the
             floor of the band.
          */}
          <div
            className="flex flex-1 flex-col justify-center"
            style={{ paddingTop: BLOCK_PAD }}
          >
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
                className="flex max-w-3xl flex-col"
                style={{ gap: COPY_GAP }}
              >
                {slide.eyebrow ? (
                  <motion.p
                    {...rise(0)}
                    className="inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.24em] text-content-on-dark-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-10 bg-crimson-500"
                    />
                    {slide.eyebrow}
                  </motion.p>
                ) : null}

                {/* Width AND height terms: this is the line that keeps the CTAs
                  above the fold on a 620px-tall window. */}
                <motion.h1
                  {...rise(0.06)}
                  className="font-bold tracking-tight text-content-on-dark"
                  style={{ fontSize: HEADLINE_SIZE, lineHeight: 1.06 }}
                >
                  <span className="block">{slide.headline}</span>
                  {slide.accent ? (
                    <span className="block text-crimson-300">
                      {slide.accent}
                    </span>
                  ) : null}
                </motion.h1>

                <motion.p
                  {...rise(0.14)}
                  className="max-w-[32rem] leading-relaxed text-content-on-dark-muted"
                  style={{ fontSize: LEAD_SIZE }}
                >
                  {slide.subheadline}
                </motion.p>

                <motion.div
                  {...rise(0.2)}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <Button asChild size="xl" variant="primary" block>
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
                      <Link href={slide.secondaryCTA.href}>
                        {slide.secondaryCTA.text}
                      </Link>
                    </Button>
                  ) : null}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ---------------- Controls ---------------- */}
          <div
            className="flex items-center gap-4 sm:gap-5"
            style={{ marginTop: CONTROLS_GAP }}
          >
            <div
              className="flex items-center gap-2.5"
              role="tablist"
              aria-label="Choose slide"
            >
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slide ${i + 1}: ${s.headline}`}
                  onClick={() => go(i)}
                  className="group/dot relative h-8 px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <span
                    className={cn(
                      "block h-[3px] overflow-hidden rounded-full bg-white/25 transition-all duration-slow ease-out-expo",
                      i === active
                        ? "w-12 sm:w-14"
                        : "w-6 group-hover/dot:bg-white/50",
                    )}
                  >
                    {i === active ? (
                      <motion.span
                        key={`fill-${active}-${playing}`}
                        initial={{ scaleX: playing ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: playing ? SLIDE_MS / 1000 : 0,
                          ease: "linear",
                        }}
                        style={{ originX: 0 }}
                        className="block h-full w-full rounded-full bg-crimson-300"
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-content-on-dark transition-colors hover:border-crimson-500 hover:bg-crimson-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              >
                {userPaused ? (
                  <Play className="h-3.5 w-3.5" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
              </button>
            ) : null}

            <span className="ml-auto hidden text-2xs font-semibold tabular tracking-widest text-content-on-dark-muted sm:block">
              <span className="text-content-on-dark">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </Container>

        {/* ---------------- Trust rail ---------------- */}
        {/*
         A light band, and the logos in their own colours.

         This used to silhouette every mark white (`brightness-0 invert`) on a
         dark rail. That treatment can only render a logo that is a shape on
         transparency, and one of these eight is not: Emirates NBD ships as a
         solid brand slab with its wordmark knocked out of it, so the filter
         turned slab and wordmark the same white and the mark collapsed into a
         blank lozenge. Stripping the slab is not a fix either -- the wordmark
         is anti-aliased into it and removing the blue leaves 2% of the artwork
         standing.

         A light ground needs no filter at all, so all eight render as their
         owners drew them, and the rail reads as a seal at the foot of the hero
         rather than a row of ghosts.
      */}
        <div className="relative z-10 shrink-0 border-t border-line bg-surface">
          <Container>
            <div className="flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:gap-10">
              <p className="shrink-0 text-2xs font-semibold uppercase tracking-[0.22em] text-content-subtle">
                Trusted by teams at
              </p>
              <Marquee durationSec={52} itemClassName="gap-14 pr-14">
                {partners.map((p) => (
                  <span key={p.name} className="relative h-10 w-36 shrink-0">
                    <Image
                      src={p.imagePath}
                      alt={p.name}
                      fill
                      quality={90}
                      sizes="144px"
                      className="object-contain opacity-90 transition-opacity duration-slow hover:opacity-100"
                    />
                  </span>
                ))}
              </Marquee>
            </div>
          </Container>
        </div>
      </section>
    </MotionConfig>
  );
}
