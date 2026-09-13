"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function CorporateTrainingPageClient() {
  useEffect(() => {
    trackPageView("/corporate-training", "Corporate Training")
  }, [])

  return null
}
