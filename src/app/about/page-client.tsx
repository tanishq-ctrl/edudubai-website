"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function AboutPageClient() {
  useEffect(() => {
    trackPageView("/about", "About Us")
  }, [])

  return null
}

