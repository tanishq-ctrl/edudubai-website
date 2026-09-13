"use client"

import * as React from "react"
import { useInView as useFramerInView, useReducedMotion } from "framer-motion"

export type InViewOptions = {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number
  /**
   * Shrinks the viewport rectangle so an element only counts as "in view"
   * once it is comfortably inside the fold rather than the instant one pixel
   * crosses the edge. Negative bottom inset = trigger later.
   */
  rootMargin?: string
  /** Re-hide and replay when the element leaves the viewport again. */
  repeat?: boolean
  /** Skip observing entirely and report visible immediately. */
  disabled?: boolean
}

/**
 * framer's `margin` is a template-literal type ("0px", "-10%", ...). Our public
 * option is a plain `string`, so it is widened here in exactly one place rather
 * than casting at every call site.
 */
type FramerMargin = NonNullable<Parameters<typeof useFramerInView>[1]>["margin"]

/** SSR-safe layout effect -- used to arm animations before the browser paints. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

/* ===========================================================================
   JS-side reveal failsafe
   ---------------------------------------------------------------------------
   The reveal components animate with framer, which writes inline styles. The
   CSS `.reveal-all` failsafe in globals.css uses `!important`, so it still
   wins over those inline styles -- but it can only rescue an element that the
   observer never reached. This store is the JS half of the same contract, and
   it deliberately mirrors the inline script in `src/app/layout.tsx`:

     - a hard 2.2s ceiling after which everything reveals regardless
     - reveal on tab becoming visible (observers do not fire in a background
       tab, so a page opened in one would otherwise render blank)
     - reveal immediately if the document is already hidden at mount

   One timer and one listener for the whole page, shared by every consumer --
   not one per revealed element.
   ========================================================================= */

const FAILSAFE_MS = 2200
const VISIBILITY_FAILSAFE_MS = 600

let revealAll = false
let armed = false
const failsafeListeners = new Set<() => void>()

function fireFailsafe() {
  if (revealAll) return
  revealAll = true
  failsafeListeners.forEach((listener) => listener())
}

function armFailsafe() {
  if (armed || typeof window === "undefined") return
  armed = true

  window.setTimeout(fireFailsafe, FAILSAFE_MS)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      window.setTimeout(fireFailsafe, VISIBILITY_FAILSAFE_MS)
    }
  })
  if (document.visibilityState !== "visible") fireFailsafe()
}

function subscribeFailsafe(onChange: () => void) {
  armFailsafe()
  failsafeListeners.add(onChange)
  return () => {
    failsafeListeners.delete(onChange)
  }
}

const getFailsafeSnapshot = () => revealAll
const getFailsafeServerSnapshot = () => false

/**
 * `true` once the page-wide failsafe has fired. Consumers OR this into their
 * own in-view state, so content is never held back by an observer that never
 * reported.
 */
export function useRevealFailsafe() {
  return React.useSyncExternalStore(
    subscribeFailsafe,
    getFailsafeSnapshot,
    getFailsafeServerSnapshot,
  )
}

/**
 * In-view state for a ref you already own -- used by the reveal components,
 * which need framer's animation scope to be the observed element too.
 *
 * When `disabled`, a permanently-null ref is handed to framer so no observer
 * is ever created, and the element reports visible immediately.
 */
export function useInViewOn<T extends Element>(
  ref: React.RefObject<T | null>,
  { threshold = 0.15, rootMargin = "0px 0px -12% 0px", repeat = false, disabled = false }: InViewOptions = {},
) {
  const unobserved = React.useRef<T>(null)

  const inView = useFramerInView(disabled ? unobserved : ref, {
    amount: threshold,
    margin: rootMargin as FramerMargin,
    once: !repeat,
  })

  return disabled ? true : inView
}

/**
 * Backed by framer's `useInView`, which shares a single IntersectionObserver
 * per (threshold, margin) pair across the whole page rather than allocating
 * one per element. An offscreen section still costs nothing.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options: InViewOptions = {}) {
  const ref = React.useRef<T>(null)
  const inView = useInViewOn(ref, options)

  return { ref, inView }
}

/**
 * Reads the OS-level reduced-motion preference and tracks changes to it.
 *
 * The preference is a media query, so framer's hook reports false during SSR
 * and true on the client for anyone with the OS setting on. Every component
 * that branches its markup on it therefore rendered a different first client
 * tree than the server sent, and React threw a hydration mismatch -- visible
 * on the homepage carousel, latent everywhere else.
 *
 * Holding the preference back until after mount makes render #1 identical to
 * the server HTML; the state update then flips the whole tree to the static
 * treatment before the user sees a frame of movement, because the effect runs
 * as a layout effect on the client.
 */
export function usePrefersReducedMotion() {
  const preference = useReducedMotion() ?? false
  const [mounted, setMounted] = React.useState(false)

  useIsomorphicLayoutEffect(() => setMounted(true), [])

  return mounted && preference
}
