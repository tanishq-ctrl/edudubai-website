import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Reveal } from "@/components/motion"

/* ===========================================================================
   HeroShell
   ---------------------------------------------------------------------------
   THE RULE THIS COMPONENT EXISTS TO ENFORCE, AND WHY.

   Every hero on this site was written against one viewport. The padding was a
   fixed rem value, the headline was a `vw`-only clamp, and the photograph had
   a fixed height. All three are width-aware and height-blind, so on a laptop
   with a short viewport -- a 1440x720 window, a 13" screen with a dock and a
   browser chrome, a phone in landscape -- the buttons and the media block were
   pushed under the fold. Measured: content was cut at 680px of viewport
   height, and on two pages as high as 740px.

   So every vertical measurement here is driven by `svh` as well as `vw`:

     - section padding          clamp(..., svh, ...)
     - title size               clamp(min, rem + vw + svh, max)
     - gaps between blocks      clamp(..., svh, ...)
     - the aside's max-height   clamped in svh, so a photograph SHRINKS on a
                                short screen instead of pushing the actions
                                below the fold

   REQUIREMENT, do not undo it: the whole hero (title, lead, actions and
   aside) must fit inside the viewport at every height from 620px to 1000px at
   1440px wide. If you add a block here, give it a clamp with an svh term. A
   fixed `py-32`, a fixed `h-[520px]` media box or a `vw`-only type clamp
   reintroduces the bug.

   `svh` (small viewport height) rather than `vh` is deliberate: on mobile
   Safari `vh` is the height WITHOUT the retracted browser chrome, so a
   `100vh` hero is taller than what the reader can actually see on first paint.

   Grounds are flat fields. No gradient bands, no radial blooms. A gradient is
   allowed only as the scrim inside a photograph passed in as `aside`.
   ========================================================================= */

type HeroTone = "ink" | "deep" | "crimson" | "paper" | "sunken"

const toneClass: Record<HeroTone, string> = {
  ink: "bg-ink-950 text-content-on-dark grain",
  deep: "bg-ink-975 text-content-on-dark grain",
  crimson: "bg-crimson-600 text-content-on-dark",
  paper: "bg-surface text-content",
  sunken: "bg-surface-sunken text-content",
}

const leadToneClass: Record<HeroTone, string> = {
  ink: "text-content-on-dark-muted",
  deep: "text-content-on-dark-muted",
  crimson: "text-content-on-dark/85",
  paper: "text-content-muted",
  sunken: "text-content-muted",
}

/* Height-aware measurements, in one place so a page cannot drift from them. */
const PAD_BLOCK = "clamp(1.75rem, 0.4rem + 5svh, 4.5rem)"
const STACK_GAP = "clamp(0.9rem, 0.4rem + 1.7svh, 1.9rem)"
const COL_GAP = "clamp(1.5rem, 0.6rem + 3svh, 3.5rem)"
/* Both width AND height terms. This is the line that fixes the cut-off hero. */
const TITLE_SIZE = "clamp(1.9rem, 1rem + 2.2vw + 1.2svh, 3.25rem)"
const LEAD_SIZE = "clamp(1rem, 0.94rem + 0.25vw + 0.2svh, 1.1875rem)"
/* A photograph is the first thing that should give up space on a short
   screen, never the actions. */
const ASIDE_MAX_H = "clamp(8rem, 36svh, 26rem)"

export interface HeroShellProps {
  /** Sentence case. Rendered as the page h1 unless `as` says otherwise. */
  title: React.ReactNode
  /** One short paragraph. Anything longer belongs in the first section. */
  lead?: React.ReactNode
  /** Small label above the title. */
  eyebrow?: React.ReactNode
  /** Buttons. Use the Button component's variants, never hand-rolled classes. */
  actions?: React.ReactNode
  /** A photograph or a stat block. Height-capped; it shrinks, copy does not. */
  aside?: React.ReactNode
  tone?: HeroTone
  /**
   * Fill the viewport below the fixed header. Uses svh, so "fill" never means
   * "overflow". Set false for a compact page head.
   */
  fill?: boolean
  as?: React.ElementType
  id?: string
  className?: string
  /** Extra content under the actions. Give it an svh-aware height if it grows. */
  children?: React.ReactNode
}

export function HeroShell({
  title,
  lead,
  eyebrow,
  actions,
  aside,
  tone = "ink",
  fill = true,
  as: Heading = "h1",
  id,
  className,
  children,
}: HeroShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden",
        toneClass[tone],
        id && "anchor-offset",
        className,
      )}
      style={{
        paddingBlock: PAD_BLOCK,
        /* Never a fixed min-height: at 620px tall this resolves to 620px
           minus the header, and the clamps above keep the content inside it. */
        minHeight: fill ? "calc(100svh - var(--header-h))" : undefined,
      }}
    >
      <Container className="relative z-10 flex h-full w-full flex-col justify-center">
        <div
          className={cn(
            "grid w-full items-center",
            aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]" : "",
          )}
          style={{ gap: COL_GAP }}
        >
          <div className="flex min-w-0 flex-col" style={{ gap: STACK_GAP }}>
            {eyebrow ? (
              <Reveal variant="fade">
                <span className="inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.22em] text-crimson-ink">
                  <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
                  {eyebrow}
                </span>
              </Reveal>
            ) : null}

            <Reveal variant="up">
              <Heading
                className="max-w-measure-sm font-semibold tracking-tight"
                style={{ fontSize: TITLE_SIZE, lineHeight: 1.08 }}
              >
                {title}
              </Heading>
            </Reveal>

            {lead ? (
              <Reveal variant="up" delay={80}>
                <p
                  className={cn("max-w-measure leading-relaxed", leadToneClass[tone])}
                  style={{ fontSize: LEAD_SIZE }}
                >
                  {lead}
                </p>
              </Reveal>
            ) : null}

            {actions ? (
              <Reveal variant="up" delay={140}>
                <div className="flex flex-wrap items-center gap-3">{actions}</div>
              </Reveal>
            ) : null}

            {children}
          </div>

          {aside ? (
            /* min-h-0 lets the cap actually bite inside a grid track, and
               overflow-hidden crops a photograph rather than letting it set
               the row height. Images inside should be object-cover. */
            <Reveal variant="fade" delay={180} className="min-w-0">
              <div
                className="relative min-h-0 w-full overflow-hidden rounded-sm [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
                style={{ maxHeight: ASIDE_MAX_H }}
              >
                {aside}
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
