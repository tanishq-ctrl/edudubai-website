"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface HeaderLogoProps {
  isTransparent: boolean
  isScrolled: boolean
  logoError: boolean
  setLogoError: (error: boolean) => void
}

/**
 * The supplied logo is a dark PNG with no light variant, so it is recoloured
 * with a filter: `brightness(0)` flattens it to pure black on light surfaces,
 * and `invert(1)` flips that to white while floating over the dark hero.
 */
export function HeaderLogo({
  isTransparent,
  isScrolled,
  logoError,
  setLogoError,
}: HeaderLogoProps) {
  const onDark = isTransparent && !isScrolled

  return (
    <Link
      href="/"
      aria-label="EduDubai home"
      className="group flex shrink-0 items-center gap-2.5 rounded-sm"
    >
      {!logoError ? (
        <div
          className={cn(
            "relative transition-[height,width] duration-slow ease-out-expo",
            isScrolled ? "h-9 w-28 md:w-32" : "h-11 w-32 md:w-40",
          )}
        >
          <Image
            src="/edudubai-logo.png"
            alt="EduDubai"
            fill
            priority
            sizes="160px"
            className="object-contain object-left transition-opacity duration-slow group-hover:opacity-80"
            style={{ filter: onDark ? "brightness(0) invert(1)" : "brightness(0)" }}
            onError={() => setLogoError(true)}
          />
        </div>
      ) : (
        <span className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display text-xl font-semibold tracking-tight transition-colors",
              onDark ? "text-white" : "text-navy-900",
            )}
          >
            Edu
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-gold-400">
            Dubai
          </span>
        </span>
      )}
    </Link>
  )
}
