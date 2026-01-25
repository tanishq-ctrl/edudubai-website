"use server"

import {
  getAllCourses,
  getFeaturedCourses,
  getCourseBySlug as getCourseBySlugHelper,
  getCategories,
  getCoursesByCategory,
  getCoursesByDeliveryMode
} from "@/lib/courses"
import { Category, DeliveryMode } from "@/lib/types"
import { revalidatePath } from "next/cache"

// Legacy compatibility - map new Course type to old format for existing components
function mapToLegacyFormat(course: any) {
  return {
    id: course.id,
    title: course.title,
    description: course.longDescription,
    slug: course.slug,
    price: course.priceUsd,
    duration: course.duration,
    level: course.level,
    category: course.category,
    deliveryFormat: course.deliveryModes[0] || "LIVE_VIRTUAL", // Use first delivery mode for legacy
    instructor: {
      name: "Expert Instructor",
      email: "training@edudubai.org",
    },
    published: true,
    modules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export async function getPublishedCourses() {
  const courses = getAllCourses()
  return courses.map(mapToLegacyFormat)
}

export async function getCourseBySlug(slug: string) {
  const course = getCourseBySlugHelper(slug)
  if (!course) return null
  return mapToLegacyFormat(course)
}

export async function getUserEnrollments(userId: string) {
  // Phase 1: Return empty array (no database)
  // Phase 2: Implement with database
  return []
}

export async function checkEnrollment(userId: string, courseId: string) {
  // Phase 1: Return null (no database)
  // Phase 2: Implement with database
  return null
}

export async function createEnrollment(userId: string, courseId: string) {
  // Phase 1: Mock enrollment
  // Phase 2: Implement with database
  revalidatePath("/dashboard")
  return {
    id: `enr_${Date.now()}`,
    userId,
    courseId,
    status: "ACTIVE",
    progress: 0,
    enrolledAt: new Date(),
  }
}

// New functions using the new Course type
export async function getAllCoursesNew() {
  return getAllCourses()
}

export async function getFeaturedCoursesNew() {
  return getFeaturedCourses()
}

export async function getCourseBySlugNew(slug: string) {
  return getCourseBySlugHelper(slug)
}

export async function getCategoriesNew() {
  return getCategories()
}

export async function getCoursesByCategoryNew(category: Category) {
  return getCoursesByCategory(category)
}

export async function getCoursesByDeliveryModeNew(mode: DeliveryMode) {
  return getCoursesByDeliveryMode(mode)
}
