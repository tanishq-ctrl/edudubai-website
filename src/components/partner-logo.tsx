"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PartnerLogoProps {
  src: string
  alt: string
  className?: string
}

export function PartnerLogo({ src, alt, className }: PartnerLogoProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError || !src) {
    // Fallback to text if image fails to load
    return (
      <div className={cn("flex items-center justify-center h-16 min-w-[120px]", className)}>
        <span className="text-lg font-semibold text-brand-navy whitespace-nowrap">
          {alt}
        </span>
      </div>
    )
  }

  return (
    <div className={cn("relative flex items-center justify-center h-16 min-w-[120px]", className)}>
      <Image
        src={src}
        alt={alt}
        width={180}
        height={64}
        className="object-contain max-h-16 w-auto partner-logo-enhance transition-all duration-300"
        onError={() => setImageError(true)}
        unoptimized
        quality={100}
      />
    </div>
  )
}

