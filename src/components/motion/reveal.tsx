"use client"

import * as React from "react"
import { useAnimate } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  useInViewOn,
  useIsomorphicLayoutEffect,
  usePrefersReducedMotion,
  useRevealFailsafe,
} from "./use-in-view"

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "fade"
  | "curtain"

/* ===========================================================================
   Why these components are plain elements animated with framer's imperative
   `animate()` rather than `<motion.div>`.

   A `motion` component renders its `initial` state as an INLINE STYLE during
   SSR -- `style="opacity:0"` ships in the HTML. If scripting is disabled or
   the bundle fails, framer never runs, and that inline `opacity:0` beats the
   `.no-js [data-reveal] { opacity: 1 }` rule in globals.css (inline wins over
   a non-important declaration). Every revealed block on the site would be
   permanently invisible -- the exact bug the `no-js`/`reveal-all` machinery
   exists to prevent.

   So the HIDDEN state stays where it already lives: the `[data-reveal]` CSS.
   The server ships no inline styles at all, which keeps all four existing
   escape hatches working untouched -- `.no-js`, `.reveal-all !important`,
   `prefers-reduced-motion`, and `@media print`. framer then takes over on the
   client with explicit `[from, to]` keyframes that match the CSS hidden state
   exactly, so there is no flash and nothing to measure.
   ========================================================================= */

/** Matches `--dur-reveal` / `--ease-out-expo` in globals.css. */
const DURATION = 0.9
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Frames = Record<string, Array<string | number>>

/** `[hidden, shown]` keyframes mirroring the `[data-reveal="..."]` CSS rules. */
function revealFrames(variant: RevealVariant, distance?: number): Frames {
  switch (variant) {
    case "up":
      return { opacity: [0, 1], y: [distance ?? 28, 0] }
    case "down":
      return { opacity: [0, 1], y: [-(distance ?? 28), 0] }
    case "left":
      return { opacity: [0, 1], x: [distance ?? 40, 0] }
    case "right":
      return { opacity: [0, 1], x: [-(distance ?? 40), 0] }
    case "scale":
      return { opacity: [0, 1], scale: [0.94, 1] }
    case "blur":
      return { opacity: [0, 1], y: [16, 0], filter: ["blur(12px)", "blur(0px)"] }
    case "curtain":
      return { opacity: [0, 1], y: [14, 0], clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"] }
    case "fade":
    default:
      return { opacity: [0, 1] }
  }
}

/** Plays the same keyframes backwards, for `repeat`. */
function flip(frames: Frames): Frames {
  const out: Frames = {}
  for (const key of Object.keys(frames)) out[key] = [...frames[key]].reverse()
  return out
}

/**
 * Writes the finished state directly.
 *
 * Belt and braces: called when the animation completes and for reduced-motion
 * users, so the visible state is an explicit inline fact rather than something
 * we trust an animation runtime to have committed.
 */
function paintVisible(el: HTMLElement) {
  el.style.opacity = "1"
  el.style.transform = "none"
  el.style.filter = "none"
  el.style.clipPath = "none"
}

type RevealProps = {
  children: React.ReactNode
  /** Direction/style of the entrance. */
  variant?: RevealVariant
  /** Delay in ms before this element animates. */
  delay?: number
  /** Travel distance in px for directional variants. */
  distance?: number
  threshold?: number
  rootMargin?: string
  repeat?: boolean
  className?: string
  /** Render as a different element -- `as="li"` inside a list, etc. */
  as?: React.ElementType
}

/**
 * Scroll entrance wrapper.
 *
 * The hidden state is defined in CSS (`[data-reveal]`), not inline, so content
 * stays visible if JS never runs. framer drives the transition itself.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  distance,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  repeat = false,
  className,
  as: Tag = "div",
}: RevealProps) {
  const [scope, animate] = useAnimate<HTMLElement>()
  const reduced = usePrefersReducedMotion()
  const failsafe = useRevealFailsafe()
  const inView = useInViewOn(scope, { threshold, rootMargin, repeat })

  const visible = inView || failsafe
  const [shown, setShown] = React.useState(false)
  const hasShown = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el) return

    const frames = revealFrames(variant, distance)

    if (reduced) {
      paintVisible(el)
      hasShown.current = true
      setShown(true)
      return
    }

    let cancelled = false

    if (visible) {
      hasShown.current = true
      const controls = animate(el, frames, { duration: DURATION, ease: EASE, delay: delay / 1000 })
      controls.then(() => {
        if (cancelled) return
        paintVisible(el)
        setShown(true)
      })
      return () => {
        cancelled = true
        controls.stop()
      }
    }

    // Nothing has been shown yet: leave the element free of inline styles so
    // the CSS hidden state -- and every CSS failsafe over it -- stays in force.
    if (!hasShown.current) return

    setShown(false)
    const controls = animate(el, flip(frames), { duration: DURATION * 0.6, ease: EASE })
    return () => {
      cancelled = true
      controls.stop()
    }
  }, [visible, reduced, variant, distance, delay, animate, scope])

  return (
    <Tag
      ref={scope}
      data-reveal={variant}
      data-shown={shown ? "true" : "false"}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          ...(distance ? { "--reveal-distance": `${distance}px` } : {}),
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </Tag>
  )
}

type StaggerProps = {
  children: React.ReactNode
  /** Gap in ms between consecutive children. */
  step?: number
  /** Delay before the first child. */
  initialDelay?: number
  variant?: RevealVariant
  distance?: number
  className?: string
  as?: React.ElementType
  childAs?: React.ElementType
  threshold?: number
}

/**
 * Cascades its direct children.
 *
 * One observer on the container drives every child, rather than one observer
 * each -- a 12-card grid costs a single observer. The cascade is framer's
 * per-element dynamic `delay`, resolved against the child's index.
 */
export function Stagger({
  children,
  step = 90,
  initialDelay = 0,
  variant = "up",
  distance,
  className,
  as: Tag = "div",
  childAs: ChildTag = "div",
  threshold = 0.1,
}: StaggerProps) {
  const [scope, animate] = useAnimate<HTMLElement>()
  const reduced = usePrefersReducedMotion()
  const failsafe = useRevealFailsafe()
  const inView = useInViewOn(scope, { threshold, rootMargin: "0px 0px -8% 0px" })

  const visible = inView || failsafe
  const [shown, setShown] = React.useState(false)
  const items = React.Children.toArray(children)
  const count = items.length

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el) return

    const targets = Array.from(el.querySelectorAll<HTMLElement>(":scope > [data-reveal]"))
    if (targets.length === 0) return

    if (reduced) {
      targets.forEach(paintVisible)
      setShown(true)
      return
    }

    if (!visible) return

    let cancelled = false
    const controls = animate(targets, revealFrames(variant, distance), {
      duration: DURATION,
      ease: EASE,
      delay: (i: number) => (initialDelay + i * step) / 1000,
    })

    controls.then(() => {
      if (cancelled) return
      targets.forEach(paintVisible)
      setShown(true)
    })

    return () => {
      cancelled = true
      controls.stop()
    }
  }, [visible, reduced, variant, distance, step, initialDelay, count, animate, scope])

  return (
    <Tag ref={scope} className={className}>
      {items.map((child, i) => (
        <ChildTag
          key={i}
          data-reveal={variant}
          data-shown={shown ? "true" : "false"}
          style={
            {
              "--reveal-delay": `${initialDelay + i * step}ms`,
              ...(distance ? { "--reveal-distance": `${distance}px` } : {}),
            } as React.CSSProperties
          }
        >
          {child}
        </ChildTag>
      ))}
    </Tag>
  )
}

type SplitTextProps = {
  text: string
  className?: string
  wordClassName?: string
  /** ms between each word lifting into place. */
  step?: number
  delay?: number
  as?: React.ElementType
  /**
   * Controlled mode. When supplied, this drives the reveal instead of the
   * IntersectionObserver.
   *
   * Required inside a carousel: inactive slides are `display:none`, so their
   * headings have zero area and can never intersect. Left uncontrolled there,
   * a slide's words stay masked for as long as it is on screen.
   */
  shown?: boolean
}

const WORD_HIDDEN = "110%"
const WORD_SHOWN = "0%"

/**
 * Word-by-word mask reveal for display headlines.
 *
 * Each word sits in an `overflow:hidden` box and slides up from 110%, so the
 * letters appear to rise out of the baseline. The full string stays in the
 * accessibility tree via aria-label; the split spans are hidden from it.
 *
 * As with `Reveal`, the masked start position is the CSS `--word-y` default,
 * so an un-hydrated or no-JS page shows the words rather than blank boxes.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  step = 55,
  delay = 0,
  as: Tag = "span",
  shown,
}: SplitTextProps) {
  const controlled = shown !== undefined

  const [scope, animate] = useAnimate<HTMLElement>()
  const reduced = usePrefersReducedMotion()
  const failsafe = useRevealFailsafe()
  // Skip observing entirely in controlled mode rather than running an observer
  // whose result is then thrown away.
  const inView = useInViewOn(scope, { threshold: 0.3, rootMargin: "0px", disabled: controlled })

  // The failsafe must not fight the controller: an inactive carousel slide is
  // `display:none`, so forcing its words open would only spend the entrance
  // animation the slide is about to play.
  const visible = controlled ? shown === true : inView || failsafe

  const [settled, setSettled] = React.useState(false)
  const hasShown = React.useRef(false)
  const words = React.useMemo(() => text.split(" "), [text])

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el) return

    const spans = Array.from(el.querySelectorAll<HTMLElement>(".reveal-word > span"))
    if (spans.length === 0) return

    if (reduced) {
      spans.forEach((span) => {
        span.style.transform = "none"
      })
      setSettled(true)
      return
    }

    let cancelled = false

    if (visible) {
      hasShown.current = true
      const controls = animate(
        spans,
        { y: [WORD_HIDDEN, WORD_SHOWN] },
        { duration: DURATION, ease: EASE, delay: (i: number) => (delay + i * step) / 1000 },
      )
      controls.then(() => {
        if (cancelled) return
        spans.forEach((span) => {
          span.style.transform = "none"
        })
        setSettled(true)
      })
      return () => {
        cancelled = true
        controls.stop()
      }
    }

    // Never revealed yet -- keep the spans free of inline styles so CSS (and
    // its failsafes) own them.
    if (!hasShown.current) return

    setSettled(false)
    spans.forEach((span) => {
      span.style.transform = `translate3d(0, ${WORD_HIDDEN}, 0)`
    })
  }, [visible, reduced, delay, step, words.length, animate, scope])

  return (
    <Tag
      ref={scope}
      data-shown={settled ? "true" : "false"}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className={cn("reveal-word", wordClassName)} aria-hidden="true">
            <span style={{ "--word-delay": `${delay + i * step}ms` } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  )
}
