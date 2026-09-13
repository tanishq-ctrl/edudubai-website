"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, type MotionStyle } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsomorphicLayoutEffect, usePrefersReducedMotion } from "./use-in-view"

/* ===========================================================================
   Pointer-driven effects.

   All three components here write MotionValues, never React state, so moving
   the cursor across a grid of cards never triggers a render.

   They are also gated twice over: `prefers-reduced-motion` disables them
   outright, and they only arm for a real mouse -- `(hover: hover) and
   (pointer: fine)` at mount, plus a per-event `pointerType === "mouse"`
   check. On touch, a `pointermove` fires on tap and would jerk the element
   sideways under the user's finger.
   ========================================================================= */

const SPRING = { stiffness: 260, damping: 26, mass: 0.6 } as const

/** True only for a real mouse on a hover-capable device. */
function useFinePointer(enabled: boolean) {
  const fine = React.useRef(false)

  useIsomorphicLayoutEffect(() => {
    fine.current =
      enabled &&
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  }, [enabled])

  return fine
}

type MagneticProps = {
  children: React.ReactNode
  /** How far the element is pulled toward the cursor, 0..1. */
  strength?: number
  className?: string
}

/**
 * Pulls an element toward the cursor while hovering, and springs back on exit.
 */
export function Magnetic({ children, strength = 0.32, className }: MagneticProps) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer(!reduced)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!fine.current || event.pointerType !== "mouse") return
      const rect = event.currentTarget.getBoundingClientRect()
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    },
    [fine, strength, x, y],
  )

  const reset = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  )
}

/**
 * 3D tilt + a light sheen that tracks the cursor.
 *
 * The rotation is a pair of springs; the sheen position rides two CSS custom
 * properties that framer writes straight to the element.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: React.ReactNode
  className?: string
  /** Maximum rotation in degrees on each axis. */
  max?: number
  glare?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer(!reduced)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, SPRING)
  const springY = useSpring(rotateY, SPRING)

  const glareX = useMotionValue("50%")
  const glareY = useMotionValue("50%")

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!fine.current || event.pointerType !== "mouse") return
      const rect = event.currentTarget.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      rotateX.set((0.5 - py) * max * 2)
      rotateY.set((px - 0.5) * max * 2)
      glareX.set(`${px * 100}%`)
      glareY.set(`${py * 100}%`)
    },
    [fine, glareX, glareY, max, rotateX, rotateY],
  )

  const reset = React.useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  const style = {
    rotateX: springX,
    rotateY: springY,
    transformPerspective: 1100,
    "--glare-x": glareX,
    "--glare-y": glareY,
  } as MotionStyle

  return (
    <motion.div
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
      {glare ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-slow group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgb(var(--gold-200) / 0.16), transparent 62%)",
          }}
        />
      ) : null}
    </motion.div>
  )
}

/**
 * Follows the cursor with a soft radial wash on the element it wraps.
 * Used on dark panels to make large flat areas feel responsive.
 */
export function Spotlight({
  children,
  className,
  size = 520,
}: {
  children: React.ReactNode
  className?: string
  size?: number
}) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer(!reduced)

  const spotX = useMotionValue("50%")
  const spotY = useMotionValue("50%")

  const onPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!fine.current || event.pointerType !== "mouse") return
      const rect = event.currentTarget.getBoundingClientRect()
      spotX.set(`${event.clientX - rect.left}px`)
      spotY.set(`${event.clientY - rect.top}px`)
    },
    [fine, spotX, spotY],
  )

  const style = { "--spot-x": spotX, "--spot-y": spotY } as MotionStyle

  return (
    <motion.div
      className={cn("group/spot relative", className)}
      style={style}
      onPointerMove={onPointerMove}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-slow group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(var(--gold-300) / 0.10), transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
