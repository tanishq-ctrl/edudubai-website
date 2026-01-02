"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export function CoursesPageClient() {
  useEffect(() => {
    trackPageView("/courses", "Courses")
  }, [])
  return null
}

