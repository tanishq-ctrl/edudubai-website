import Image from "next/image"
import * as React from "react"

import { Container } from "@/components/container"
import { Reveal, SplitText, Parallax } from "@/components/motion"
import { cn } from "@/lib/utils"

interface PageHeroImageProps {
  image: string
  imageAlt: string
  title: string
  description?: string | React.ReactNode
  eyebrow?: string
  /** Escape hatch for a title that needs a non-default size. */
  titleClassName?: string
  align?: "center" | "left"
  children?: React.ReactNode
}

/**
 * Shared interior-page hero.
 *
 * Six marketing pages render through this, so it is the single place that
 * decides how an interior page opens. Sized in `svh` rather than `vh`: on iOS
 * Safari `vh` is measured against the *expanded* viewport, so a `70vh` hero
 * sat taller than the screen until the address bar collapsed.
 */
export function PageHeroImage({
  image,
  imageAlt,
  title,
  description,
  eyebrow,
  titleClassName,
  align = "center",
  children,
}: PageHeroImageProps) {
  const isLeft = align === "left"

  return (
    <section className="relative isolate flex min-h-[26rem] w-full items-end overflow-hidden bg-ink-950 pb-14 pt-header text-white sm:min-h-[32rem] md:min-h-[64svh] md:pb-20">
      <div className="absolute inset-0 -z-20">
        <Parallax speed={0.1} className="h-full w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="scale-[1.06] object-cover object-center"
          />
        </Parallax>
      </div>

      {/* Vertical scrim carries the text; the horizontal one keeps a
          left-aligned column readable on wide crops. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/78 to-ink-950/40"
      />
      {isLeft ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/88 via-ink-950/40 to-transparent"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-navy bg-grid opacity-30"
      />

      <Container className="relative z-10">
        <div className={cn("flex flex-col", isLeft ? "items-start text-left" : "items-center text-center")}>
          {eyebrow ? (
            <Reveal variant="fade">
              <p className="mb-5 inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                <span aria-hidden="true" className="h-px w-10 bg-gold-400/70" />
                {eyebrow}
              </p>
            </Reveal>
          ) : null}

          <h1
            className={cn(
              "text-4xl text-white sm:text-5xl lg:text-6xl",
              isLeft ? "max-w-4xl" : "max-w-4xl",
              titleClassName,
            )}
          >
            <SplitText text={title} as="span" className="block" />
          </h1>

          {description ? (
            <Reveal variant="up" delay={260}>
              <div
                className={cn(
                  "mt-6 text-lg leading-relaxed text-white/80",
                  isLeft ? "max-w-measure" : "mx-auto max-w-measure",
                )}
              >
                {description}
              </div>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal variant="up" delay={360} className="mt-9">
              {children}
            </Reveal>
          ) : null}
        </div>
      </Container>

      {/* Hairline that ties the hero into the first section below it. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gold-line opacity-50" />
    </section>
  )
}
