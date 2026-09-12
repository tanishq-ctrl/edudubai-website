"use server"

import {
  getAllCourses,
  getFeaturedCourses,
  getCourseBySlug as getCourseBySlugHelper,
  getCategories,
  getCoursesByCategory,
  getCoursesByDeliveryMode
} from "@/lib/courses"
import {
  getAllCoursesFromDb,
  getFeaturedCoursesFromDb,
  getCourseBySlugFromDb,
  getCategoriesFromDb,
  getCoursesByCategoryFromDb,
  getCoursesByDeliveryModeFromDb,
} from "@/lib/courses-db"
import { Category, DeliveryMode } from "@/lib/types"
import { revalidatePath } from "next/cache"

/**
 * Which catalogue the public site reads from.
 *
 * "file" (the default) keeps serving src/lib/courses.ts exactly as before.
 * "db" reads public.courses, which is what makes admin edits visible on the
 * site. Set COURSES_SOURCE=db to switch.
 *
 * The default is deliberately the file: the database copy is verified against
 * it by scripts/verify-course-seed.ts, but until someone has actually looked
 * at the rendered pages, the known-good source stays in charge.
 */
function readFromDatabase(): boolean {
  return process.env.COURSES_SOURCE === "db"
}

/**
 * Falls back to the static file when the database returns nothing.
 *
 * A Supabase outage or a misapplied migration should degrade to the old
 * catalogue rather than showing visitors an empty course list.
 */
function withFallback<T>(dbResult: T[], fileResult: T[]): T[] {
  return dbResult.length > 0 ? dbResult : fileResult
}

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
  if (!readFromDatabase()) return getAllCourses()
  return withFallback(await getAllCoursesFromDb(), getAllCourses())
}

export async function getFeaturedCoursesNew() {
  if (!readFromDatabase()) return getFeaturedCourses()
  return withFallback(await getFeaturedCoursesFromDb(), getFeaturedCourses())
}

export async function getCourseBySlugNew(slug: string) {
  if (!readFromDatabase()) return getCourseBySlugHelper(slug)
  return (await getCourseBySlugFromDb(slug)) ?? getCourseBySlugHelper(slug)
}

export async function getCategoriesNew() {
  if (!readFromDatabase()) return getCategories()
  return withFallback(await getCategoriesFromDb(), getCategories())
}

export async function getCoursesByCategoryNew(category: Category) {
  if (!readFromDatabase()) return getCoursesByCategory(category)
  return withFallback(await getCoursesByCategoryFromDb(category), getCoursesByCategory(category))
}

export async function getCoursesByDeliveryModeNew(mode: DeliveryMode) {
  if (!readFromDatabase()) return getCoursesByDeliveryMode(mode)
  return withFallback(await getCoursesByDeliveryModeFromDb(mode), getCoursesByDeliveryMode(mode))
}
