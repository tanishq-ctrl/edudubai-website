"use client"

import Image from "next/image"
import { Container } from "@/components/container"

interface PageHeroImageProps {
  image: string
  imageAlt: string
  title: string
  description?: string
  eyebrow?: string
}

export function PageHeroImage({
  image,
  imageAlt,
  title,
  description,
  eyebrow,
}: PageHeroImageProps) {
  return (
    <section className="relative w-full h-[55vh] md:h-[70vh] min-h-[420px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 brightness-125">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
          onError={(e) => {
            // Fallback to gradient if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            const parent = target.parentElement
            if (parent) {
              parent.style.background =
                "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #1e3a5f 100%)"
            }
          }}
        />
      </div>

      {/* Dark Overlay Gradient - Lighter for brighter images */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.1)_100%)]" />

      {/* Content */}
      <Container className="relative z-10 h-full flex items-center px-4 sm:px-6">
        <div className="max-w-6xl w-full mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-up py-8 sm:py-12 md:py-0">
          {/* Eyebrow */}
          {eyebrow && (
            <div className="text-base sm:text-base md:text-lg font-extrabold uppercase tracking-widest text-[#f4d03f] drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_-1px_-1px_0_rgba(0,0,0,0.8),1px_1px_0_rgba(0,0,0,0.8),0_0_10px_rgba(244,208,63,0.5)] px-2 text-center">
              {eyebrow}
            </div>
          )}

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold leading-[1.1] sm:leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2 break-words text-center">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] max-w-3xl mx-auto px-2 text-center">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

