"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function HomePageClient() {
  useEffect(() => {
    trackPageView("/", "Home")
  }, [])
  return null
}

