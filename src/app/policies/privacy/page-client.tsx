"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function PolicyPageClient() {
  useEffect(() => {
    trackPageView("/policies/privacy", "Privacy Policy")
  }, [])

  return null
}

