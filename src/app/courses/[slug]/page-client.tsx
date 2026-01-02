"use client"

import { useEffect } from "react"
import { trackCourseView } from "@/lib/analytics"

interface CourseDetailClientProps {
  courseId: string
  courseTitle: string
}

export function CourseDetailClient({ courseId, courseTitle }: CourseDetailClientProps) {
  useEffect(() => {
    trackCourseView(courseId, courseTitle)
  }, [courseId, courseTitle])

  return null
}
