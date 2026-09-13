"use client"

import * as React from "react"
import { animate } from "framer-motion"
import { cn } from "@/lib/utils"
import { useInView, usePrefersReducedMotion } from "./use-in-view"

type CounterProps = {
  value: number
  /** Digits after the decimal point. */
  decimals?: number
  prefix?: string
  suffix?: string
  durationMs?: number
  className?: string
  /** Group thousands with locale separators. */
  locale?: boolean
}

/** The house curve: fast start, long settle -- `--ease-out-expo`. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/**
 * Counts up when scrolled into view.
 *
 * The tween is framer's `animate(from, to)` driving a plain number, so the
 * duration holds regardless of refresh rate (a 120Hz MacBook and a 60Hz
 * Windows display finish together).
 *
 * State starts at the FINAL value, not zero: the number is therefore correct
 * in the SSR HTML, correct for reduced-motion users, and correct if the
 * observer never fires. The animation only ever rewinds a value that was
 * already right.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1900,
  className,
  locale = true,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = React.useState(value)
  const started = React.useRef(false)

  React.useEffect(() => {
    if (!inView || started.current) return
    if (reduced) {
      setDisplay(value)
      return
    }

    started.current = true

    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: EASE,
      onUpdate: setDisplay,
      onComplete: () => setDisplay(value),
    })

    return () => controls.stop()
  }, [inView, value, durationMs, reduced])

  const formatted = locale
    ? display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display.toFixed(decimals)

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
