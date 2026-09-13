import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Reveal } from "@/components/motion"

/**
 * Section shell.
 *
 * Every section on the site goes through this so vertical rhythm comes from
 * four tokens instead of the 21 different `py-*` values the old markup used.
 * `tone` likewise replaces ad-hoc `bg-white` / `bg-slate-50` / `bg-indigo-100`.
 */

type Tone =
  | "paper"
  | "sunken"
  | "raised"
  | "ink"
  | "deep"
  | "crimson"
  | "transparent"
  /** Legacy names. Both now resolve to a flat dark field; see below. */
  | "navy"
  | "midnight"

/**
 * Section grounds are FLAT FIELDS. No gradients.
 *
 * A band that fades from one colour to another has no edge, and a page built
 * from edgeless bands reads as generated. Contrast between sections comes from
 * value (paper -> sunken -> ink -> deep) and from the 1px rule where two
 * light bands meet, never from a ramp.
 *
 * Gradients are permitted in exactly one place on this site: the scrim over a
 * photograph, where they exist to keep text legible over the image.
 */
const toneClass: Record<Tone, string> = {
  paper: "bg-surface text-content",
  sunken: "bg-surface-sunken text-content",
  /* Pure white, raised off the warm paper ground. */
  raised: "bg-surface-raised text-content",
  /* Primary dark band. */
  ink: "bg-ink-950 text-content-on-dark grain",
  /* Deepest band. Pairs with `ink` so two adjacent dark sections differ in
     value instead of reading as one block. */
  deep: "bg-ink-975 text-content-on-dark grain",
  /* The brand ground: crimson-600 under paper-coloured text, 8.4:1. Use it
     once per page at most, for the band that carries the decision. */
  crimson: "bg-crimson-600 text-content-on-dark",
  transparent: "",

  /* --- Legacy aliases ---------------------------------------------------
     `navy` and `midnight` were gradient bands. There is no navy in this
     palette and there are no gradient bands, so both map to the flat dark
     fields. Kept only so existing callers compile; prefer ink / deep. */
  navy: "bg-ink-950 text-content-on-dark grain",
  midnight: "bg-ink-975 text-content-on-dark grain",
}

const sizeClass = {
  xs: "py-section-xs",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
} as const

export function Section({
  children,
  className,
  innerClassName,
  tone = "paper",
  size = "md",
  id,
  bleed = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: Tone
  size?: keyof typeof sizeClass
  /** Skip the Container so the child can run full-bleed. */
  bleed?: boolean
  innerClassName?: string
}) {
  return (
    <section
      id={id}
      className={cn("relative isolate", toneClass[tone], sizeClass[size], id && "anchor-offset", className)}
      {...props}
    >
      {bleed ? children : <Container className={innerClassName}>{children}</Container>}
    </section>
  )
}

/**
 * Small label above a heading. The crimson marker is the accent, not the text.
 *
 * `marker="rule"` is the original tracked-uppercase treatment, kept as the
 * default so the pages still using it are untouched. `marker="dot"` is the
 * sentence-case form -- uppercase tracking on 63 eyebrows was a large part of
 * why every section looked the same, so new work should prefer it.
 */
export function Eyebrow({
  children,
  className,
  marker = "rule",
}: {
  children: React.ReactNode
  className?: string
  marker?: "rule" | "dot"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-crimson-ink",
        marker === "rule"
          ? "gap-3 text-2xs font-semibold uppercase tracking-[0.22em]"
          : "gap-2.5 text-sm font-medium",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={
          marker === "rule"
            ? "h-px w-8 bg-current opacity-60"
            : "h-[7px] w-[7px] shrink-0 rounded-full bg-crimson-ink"
        }
      />
      {children}
    </span>
  )
}

/**
 * Standard section header: eyebrow, title, optional lead paragraph.
 * Centred by default; `align="start"` for editorial left-aligned blocks.
 */
export function SectionHeading({
  eyebrow,
  eyebrowMarker = "rule",
  title,
  lead,
  align = "center",
  onDark = false,
  className,
  titleClassName,
  as: Tag = "h2",
}: {
  eyebrow?: React.ReactNode
  eyebrowMarker?: "rule" | "dot"
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "center" | "start"
  onDark?: boolean
  className?: string
  titleClassName?: string
  as?: React.ElementType
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal variant="fade">
          <Eyebrow marker={eyebrowMarker}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal variant="up" delay={60}>
        <Tag
          className={cn(
            "text-3xl font-bold sm:text-4xl",
            // On light surfaces the heading inherits warm ink from the base
            // stylesheet; only the dark variant needs an explicit colour.
            onDark && "text-content-on-dark",
            align === "center" ? "mx-auto max-w-measure-sm" : "max-w-measure-sm",
            titleClassName,
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lead ? (
        <Reveal variant="up" delay={130}>
          <p
            className={cn(
              "text-lg leading-relaxed",
              onDark ? "text-content-on-dark-muted" : "text-content-muted",
              align === "center" ? "mx-auto max-w-measure" : "max-w-measure",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
