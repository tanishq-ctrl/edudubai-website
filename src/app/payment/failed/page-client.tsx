"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function PaymentFailedClient() {
  useEffect(() => {
    trackPageView("/payment/failed", "Payment Failed")
  }, [])

  return null
}

