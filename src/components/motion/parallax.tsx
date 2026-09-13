"use client"

import * as React from "react"
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "./use-in-view"

type ParallaxProps = {
  children: React.ReactNode
  /**
   * Positive drifts slower than the page (recedes), negative drifts faster
   * (approaches). Keep within roughly -0.4..0.4 -- beyond that the element
   * visibly detaches from the layout.
   */
  speed?: number
  className?: string
  /** Clamp travel so a fast scroll can never push content off its section. */
  maxOffset?: number
}

/* ===========================================================================
   Scroll-linked motion.

   Everything here rides framer's `useScroll`, which measures each target once
   (and again on resize/layout change) and then derives progress from a single
   passive scroll listener shared by every consumer. The values it produces are
   MotionValues, so `useTransform` -> `motion.div` writes styles directly and
   React never re-renders while the page scrolls.

   This replaces the hand-rolled shared rAF loop that used to live here. That
   loop existed to keep per-element `getBoundingClientRect()` reads out of the
   write phase; framer removes the per-frame reads entirely instead.
   ========================================================================= */

export function Parallax({ children, speed = 0.18, className, maxOffset = 140 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  // 0 as the element enters from the bottom, 1 as it leaves past the top --
  // the same span the old measure phase normalised by hand.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, (p) => {
    // -1 at the bottom edge of the viewport, +1 at the top.
    const raw = (p * 2 - 1) * speed * 100
    return Math.max(-maxOffset, Math.min(maxOffset, raw))
  })

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </motion.div>
  )
}

/**
 * Publishes 0..1 scroll progress through a section as a CSS variable
 * (`--progress`) on the wrapper, for effects that are cheaper to express in
 * CSS than in JS (scaling a backdrop, rotating a rule, fading a caption).
 */
export function ScrollScene({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // A MotionValue assigned to a custom property is written straight to the
  // element on every scroll frame, without a React render.
  const style = { "--progress": reduced ? 0 : scrollYProgress } as MotionStyle

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  )
}

/** Thin gold rail across the top of the page showing read progress. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5", className)}
    >
      {/*
        `scale-x-0` is the pre-hydration state; framer's inline `scaleX`
        overrides it as soon as the scroll value resolves.
      */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="h-full origin-left scale-x-0 bg-crimson-600"
      />
    </div>
  )
}
