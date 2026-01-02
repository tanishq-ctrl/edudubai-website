"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function PolicyPageClient() {
  useEffect(() => {
    trackPageView("/policies/terms", "Terms of Service")
  }, [])

  return null
}

