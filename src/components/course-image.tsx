"use client"

import Image from "next/image"
import { useState } from "react"

interface CourseImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  height?: number
  width?: number
}

export function CourseImage({ 
  src, 
  alt, 
  fill = false,
  className = "",
  sizes,
  priority = false,
  height,
  width
}: CourseImageProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    // Fallback gradient when image fails to load
    return (
      <div 
        className={`bg-gradient-to-br from-brand-navy to-brand-navy-dark ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setImageError(true)}
    />
  )
}

