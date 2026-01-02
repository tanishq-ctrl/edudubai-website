"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function PaymentSuccessClient() {
  useEffect(() => {
    trackPageView("/payment/success", "Payment Success")
  }, [])

  return null
}

