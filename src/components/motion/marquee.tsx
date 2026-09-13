"use client"

import * as React from "react"
import { useAnimate, type AnimationPlaybackControls } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "./use-in-view"

type MarqueeProps = {
  children: React.ReactNode
  /** Seconds for one full pass. Higher = slower. */
  durationSec?: number
  reverse?: boolean
  /** Fade the left/right edges into the background. */
  fade?: boolean
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
}

/**
 * Seamless logo/text rail.
 *
 * The track renders the children twice and translates exactly -50%, which
 * places copy B precisely where copy A began -- no visible seam at the wrap.
 * The duplicate is aria-hidden so screen readers announce the list once.
 *
 * framer runs the loop as a single infinitely repeating transform animation,
 * which lets us pause it properly on hover AND on focus-within: a keyboard
 * user tabbing into a logo link stops the rail rather than chasing it. The
 * `.marquee-track` CSS keyframes are suppressed inline so only one engine
 * drives the transform.
 *
 * Reduced motion stops the rail existing at all -- no infinite loop is
 * started, and the children simply sit where they are.
 */
export function Marquee({
  children,
  durationSec = 45,
  reverse = false,
  pauseOnHover = true,
  fade = true,
  className,
  itemClassName,
}: MarqueeProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const controls = React.useRef<AnimationPlaybackControls | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = scope.current
    if (!el || reduced) return

    const playback = animate(
      el,
      { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] },
      { duration: durationSec, ease: "linear", repeat: Infinity, repeatType: "loop" },
    )

    controls.current = playback
    return () => {
      controls.current = null
      playback.stop()
    }
  }, [durationSec, reverse, reduced, animate, scope])

  const pause = React.useCallback(() => controls.current?.pause(), [])
  const resume = React.useCallback(() => controls.current?.play(), [])

  return (
    <div
      className={cn("relative w-full overflow-hidden", fade && "marquee-mask", className)}
      onPointerEnter={pauseOnHover ? pause : undefined}
      onPointerLeave={pauseOnHover ? resume : undefined}
      // React's onFocus/onBlur are focusin/focusout, so these cover the whole
      // subtree -- the `:focus-within` pause, in JS.
      onFocus={pause}
      onBlur={resume}
    >
      <div ref={scope} className="marquee-track" style={{ animation: "none" }}>
        <div className={cn("flex shrink-0 items-center", itemClassName)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", itemClassName)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
