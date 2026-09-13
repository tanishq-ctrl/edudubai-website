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

type Tone = "paper" | "sunken" | "ink" | "navy" | "midnight" | "deep" | "transparent"

const toneClass: Record<Tone, string> = {
  paper: "bg-surface text-content",
  sunken: "bg-surface-sunken text-content",
  /* Deepest brand navy (#0f1f35) -- for the heaviest bands. */
  ink: "bg-ink-950 text-content-on-dark grain",
  /* The brand's signature navy gradient (#1e3a5f -> #0f1f35), as the site
     used before. Keeps `ink` and `navy` visually distinct rather than
     resolving to the same flat colour. */
  navy: "bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 text-content-on-dark grain",
  /* Navy falling into near-black. The anchor tone for dark pages. */
  midnight: "bg-gradient-to-b from-navy-900 to-ink-975 text-content-on-dark grain",
  /* Flat near-black. Pairs with `midnight` so two adjacent dark bands differ
     in value instead of reading as one continuous block. */
  deep: "bg-ink-975 text-content-on-dark grain",
  transparent: "",
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
 * Small label above a heading. The gold marker is the accent, not the text.
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
        "inline-flex items-center text-gold-ink",
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
            : "h-[7px] w-[7px] shrink-0 rounded-full bg-gold-400"
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
            // On light surfaces the heading inherits brand navy from the base
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
