/**
 * Database-backed course catalogue.
 *
 * Mirrors the helper API of `src/lib/courses.ts` and returns the same `Course`
 * shape, so consumers do not care which source they are reading from. The
 * switch lives in `src/server/actions/courses.ts`.
 *
 * Reads go through the anonymous client, so Row Level Security limits them to
 * published rows. Admin reads and all writes use the service-role client
 * instead -- see `src/server/actions/admin-courses.ts`.
 */

import { createPublicClient } from "@/lib/supabase/public"
import type { Course, Category, DeliveryMode } from "@/lib/types"
import { logger } from "./logger"

/** Shape of a row in public.courses. */
type CourseRow = {
  id: string
  slug: string
  legacy_id: string | null
  title: string
  short_description: string
  long_description: string
  category: string
  issuing_body: string
  level: string
  duration_hours: number
  price_usd: string | number
  currency: string
  delivery_modes: string[]
  featured: boolean
  published: boolean
  display_order: number
  image_url: string | null
  hero_image_url: string | null
  delivery_schedules: unknown
  outcomes: unknown
  who_its_for: unknown
  faq: unknown
  audience_categories: unknown
  why_choose_us: unknown
  exam_info: unknown
  program_overview: unknown
}

const COURSE_COLUMNS = `
  id, slug, legacy_id, title, short_description, long_description,
  category, issuing_body, level, duration_hours, price_usd, currency,
  delivery_modes, featured, published, display_order,
  image_url, hero_image_url,
  delivery_schedules, outcomes, who_its_for, faq, audience_categories,
  why_choose_us, exam_info, program_overview
`

/**
 * Maps a database row onto the Course type the components expect.
 *
 * `id` comes from legacy_id rather than the uuid primary key:
 * src/app/courses/[slug]/course-hero.tsx switches on 'cams', 'cgss', 'tbml'
 * and 'certified-compliance-manager' to pick per-course hero content, so those
 * original identifiers are load-bearing rather than cosmetic.
 *
 * Optional fields are returned as undefined rather than null to match the
 * TypeScript type, which uses `?:` throughout.
 */
export function rowToCourse(row: CourseRow): Course {
  return {
    id: row.legacy_id ?? row.slug,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    category: row.category as Category,
    deliveryModes: (row.delivery_modes ?? []) as DeliveryMode[],
    deliverySchedules: (row.delivery_schedules as Course["deliverySchedules"]) ?? undefined,
    level: row.level as Course["level"],
    duration: row.duration_hours,
    priceUsd: Number(row.price_usd),
    currency: row.currency as "USD",
    outcomes: (row.outcomes as string[]) ?? [],
    whoItsFor: (row.who_its_for as string[]) ?? [],
    whyChooseUs: (row.why_choose_us as Course["whyChooseUs"]) ?? undefined,
    faq: (row.faq as Course["faq"]) ?? [],
    featured: row.featured,
    imageUrl: row.image_url ?? undefined,
    heroImageUrl: row.hero_image_url ?? undefined,
    examInfo: (row.exam_info as Course["examInfo"]) ?? undefined,
    programOverview: (row.program_overview as Course["programOverview"]) ?? undefined,
    audienceCategories: (row.audience_categories as Course["audienceCategories"]) ?? undefined,
    issuingBody: row.issuing_body as Course["issuingBody"],
  }
}

/**
 * Every published course, in display order.
 *
 * Returns an empty array if Supabase is unreachable. Callers treat that as
 * "no courses" rather than crashing the page; the caller-side fallback to the
 * static file lives in server/actions/courses.ts.
 */
export async function getAllCoursesFromDb(): Promise<Course[]> {
  const supabase = createPublicClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_COLUMNS)
    .eq("published", true)
    .is("archived_at", null)
    .order("display_order", { ascending: true })

  if (error) {
    logger.error("[courses-db] getAllCourses failed:", error.message)
    return []
  }

  return (data as unknown as CourseRow[]).map(rowToCourse)
}

export async function getCourseBySlugFromDb(slug: string): Promise<Course | undefined> {
  const supabase = createPublicClient()
  if (!supabase) return undefined

  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .is("archived_at", null)
    .maybeSingle()

  if (error) {
    logger.error("[courses-db] getCourseBySlug failed:", error.message)
    return undefined
  }

  return data ? rowToCourse(data as unknown as CourseRow) : undefined
}

export async function getFeaturedCoursesFromDb(): Promise<Course[]> {
  const supabase = createPublicClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_COLUMNS)
    .eq("published", true)
    .eq("featured", true)
    .is("archived_at", null)
    .order("display_order", { ascending: true })

  if (error) {
    logger.error("[courses-db] getFeaturedCourses failed:", error.message)
    return []
  }

  return (data as unknown as CourseRow[]).map(rowToCourse)
}

export async function getCategoriesFromDb(): Promise<Category[]> {
  const courses = await getAllCoursesFromDb()
  return Array.from(new Set(courses.map((course) => course.category))) as Category[]
}

export async function getCoursesByCategoryFromDb(category: Category): Promise<Course[]> {
  const courses = await getAllCoursesFromDb()
  return courses.filter((course) => course.category === category)
}

export async function getCoursesByDeliveryModeFromDb(mode: DeliveryMode): Promise<Course[]> {
  const courses = await getAllCoursesFromDb()
  return courses.filter((course) => course.deliveryModes.includes(mode))
}
