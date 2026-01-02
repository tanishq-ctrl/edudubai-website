"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function ContactPageClient() {
  useEffect(() => {
    trackPageView("/contact", "Contact Us")
  }, [])

  return null
}

