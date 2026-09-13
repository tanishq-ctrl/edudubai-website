"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { getCurrentAdmin } from "@/lib/auth-guards"
import { createAdminClient } from "@/lib/supabase/admin"
import { rowToCourse } from "@/lib/courses-db"
import type { Course } from "@/lib/types"
import { logger } from "@/lib/logger"

/**
 * Course administration.
 *
 * Every export here is a "use server" action, which Next.js exposes as an
 * individually addressable endpoint. Gating the /admin page is not enough:
 * each action verifies the caller itself.
 *
 * Reads and writes use the service-role client so drafts and archived rows are
 * visible, which the public RLS policy hides.
 */

async function assertAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error("Unauthorized")
  return admin
}

/** Revalidates every surface that renders course data. */
function revalidateCourseSurfaces(slug?: string) {
  revalidatePath("/")
  revalidatePath("/courses")
  revalidatePath("/sitemap.xml")
  if (slug) revalidatePath(`/courses/${slug}`)
  revalidatePath("/admin")
}

// ---------------------------------------------------------------------------
// Validation
//
// The nested content is jsonb, so it is only as safe as what we validate here.
// A malformed FAQ entry would render as a broken accordion on a public course
// page, so the shapes are pinned rather than accepted as arbitrary json.
// ---------------------------------------------------------------------------

const faqSchema = z.array(
  z.object({ question: z.string().min(1), answer: z.string().min(1) })
)

const scheduleSchema = z.array(
  z.object({
    name: z.string().min(1),
    schedule: z.string().min(1),
    duration: z.string().min(1),
  })
)

const audienceSchema = z.array(
  z.object({ title: z.string().min(1), roles: z.array(z.string()) })
)

const whyChooseUsSchema = z
  .object({
    title: z.string().min(1),
    description: z.string(),
    points: z.array(z.string()),
  })
  .nullable()

const examInfoSchema = z
  .object({
    questions: z.string().optional(),
    duration: z.string().optional(),
    passingScore: z.string().optional(),
    format: z.string().optional(),
    requirements: z
      .union([
        z.array(z.string()),
        z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
      ])
      .optional(),
  })
  .nullable()

const programOverviewSchema = z
  .object({
    whatIs: z.string().optional(),
    whyItMatters: z.string().optional(),
    jobReadySkills: z.string().optional(),
  })
  .nullable()

const courseInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens"),
  legacyId: z.string().trim().max(200).nullable().optional(),
  title: z.string().trim().min(1).max(300),
  shortDescription: z.string().trim().min(1).max(2000),
  longDescription: z.string().trim().min(1).max(20000),
  /* The eight the public catalogue knows. A free string here created courses
     that rendered but matched no filter facet on /courses and fell through
     every CATEGORY_LABELS lookup. */
  category: z.enum([
    "AML_CFT",
    "SANCTIONS",
    "TBML",
    "FATCA_CRS",
    "TAX",
    "GOVERNANCE",
    "RISK",
    "DATA_AI",
  ]),
  issuingBody: z.enum(["ACAMS", "GCI", "HOCK_INTERNATIONAL"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  durationHours: z.coerce.number().int().positive(),
  priceUsd: z.coerce.number().nonnegative(),
  currency: z.string().trim().default("USD"),
  /* Only the two modes the site can render. The editor used to offer
     SELF_PACED and HYBRID, which no badge and no filter understands. */
  deliveryModes: z.array(z.enum(["LIVE_VIRTUAL", "IN_PERSON"])).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
  imageUrl: z.string().trim().nullable().optional(),
  heroImageUrl: z.string().trim().nullable().optional(),
  deliverySchedules: scheduleSchema.default([]),
  outcomes: z.array(z.string()).default([]),
  whoItsFor: z.array(z.string()).default([]),
  faq: faqSchema.default([]),
  audienceCategories: audienceSchema.default([]),
  whyChooseUs: whyChooseUsSchema.optional(),
  examInfo: examInfoSchema.optional(),
  programOverview: programOverviewSchema.optional(),
})

export type CourseInput = z.infer<typeof courseInputSchema>

/** Maps validated input onto database column names. */
function toRow(input: CourseInput) {
  return {
    slug: input.slug,
    legacy_id: input.legacyId ?? input.slug,
    title: input.title,
    short_description: input.shortDescription,
    long_description: input.longDescription,
    category: input.category,
    issuing_body: input.issuingBody,
    level: input.level,
    duration_hours: input.durationHours,
    price_usd: input.priceUsd,
    currency: input.currency,
    delivery_modes: input.deliveryModes,
    featured: input.featured,
    published: input.published,
    display_order: input.displayOrder,
    image_url: input.imageUrl || null,
    hero_image_url: input.heroImageUrl || null,
    delivery_schedules: input.deliverySchedules,
    outcomes: input.outcomes,
    who_its_for: input.whoItsFor,
    faq: input.faq,
    audience_categories: input.audienceCategories,
    why_choose_us: input.whyChooseUs ?? null,
    exam_info: input.examInfo ?? null,
    program_overview: input.programOverview ?? null,
  }
}

export type AdminCourse = Course & {
  rowId: string
  published: boolean
  displayOrder: number
  archivedAt: string | null
}

const ALL_COLUMNS = `
  id, slug, legacy_id, title, short_description, long_description,
  category, issuing_body, level, duration_hours, price_usd, currency,
  delivery_modes, featured, published, display_order,
  image_url, hero_image_url,
  delivery_schedules, outcomes, who_its_for, faq, audience_categories,
  why_choose_us, exam_info, program_overview, archived_at
`

function toAdminCourse(row: any): AdminCourse {
  return {
    ...rowToCourse(row),
    rowId: row.id,
    published: row.published,
    displayOrder: row.display_order,
    archivedAt: row.archived_at,
  }
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

export async function listCoursesForAdmin(
  options: { includeArchived?: boolean } = {}
): Promise<AdminCourse[]> {
  await assertAdmin()

  const supabase = createAdminClient()
  if (!supabase) return []

  let query = supabase.from("courses").select(ALL_COLUMNS)

  if (!options.includeArchived) {
    query = query.is("archived_at", null)
  }

  const { data, error } = await query.order("display_order", { ascending: true })

  if (error) {
    logger.error("[admin-courses] list failed:", error.message)
    return []
  }

  return (data ?? []).map(toAdminCourse)
}

export async function getCourseForAdmin(rowId: string): Promise<AdminCourse | null> {
  await assertAdmin()

  const supabase = createAdminClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("courses")
    .select(ALL_COLUMNS)
    .eq("id", rowId)
    .maybeSingle()

  if (error || !data) return null
  return toAdminCourse(data)
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

export type ActionResult =
  | { success: true; id?: string; slug?: string }
  | { success: false; error: string }

export async function createCourse(input: unknown): Promise<ActionResult> {
  try {
    await assertAdmin()

    const parsed = courseInputSchema.parse(input)
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: "Storage unavailable" }

    const { data, error } = await supabase
      .from("courses")
      .insert(toRow(parsed))
      .select("id, slug")
      .single()

    if (error) {
      // 23505 is unique_violation; slug is the only unique user-supplied column.
      if (error.code === "23505") {
        return { success: false, error: `A course with slug "${parsed.slug}" already exists.` }
      }
      return { success: false, error: error.message }
    }

    revalidateCourseSurfaces(data.slug)
    return { success: true, id: data.id, slug: data.slug }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issue = error.errors[0]
      return { success: false, error: `${issue.path.join(".")}: ${issue.message}` }
    }
    logger.error("[admin-courses] create failed:", error)
    return { success: false, error: "Failed to create course." }
  }
}

export async function updateCourse(rowId: string, input: unknown): Promise<ActionResult> {
  try {
    await assertAdmin()

    const parsed = courseInputSchema.parse(input)
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: "Storage unavailable" }

    // The slug may have changed, so revalidate the old path too or the old URL
    // keeps serving a cached page.
    const { data: existing } = await supabase
      .from("courses")
      .select("slug")
      .eq("id", rowId)
      .maybeSingle()

    const { data, error } = await supabase
      .from("courses")
      .update(toRow(parsed))
      .eq("id", rowId)
      .select("id, slug")
      .single()

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: `A course with slug "${parsed.slug}" already exists.` }
      }
      return { success: false, error: error.message }
    }

    if (existing?.slug && existing.slug !== data.slug) {
      revalidatePath(`/courses/${existing.slug}`)
    }
    revalidateCourseSurfaces(data.slug)

    return { success: true, id: data.id, slug: data.slug }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issue = error.errors[0]
      return { success: false, error: `${issue.path.join(".")}: ${issue.message}` }
    }
    logger.error("[admin-courses] update failed:", error)
    return { success: false, error: "Failed to update course." }
  }
}

/**
 * Archives a course: hidden from the public site, recoverable from the admin
 * panel. There is deliberately no hard delete -- a course row holds a lot of
 * irreplaceable nested content and this project has no automated backups.
 */
export async function archiveCourse(rowId: string): Promise<ActionResult> {
  try {
    await assertAdmin()

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: "Storage unavailable" }

    const { data, error } = await supabase
      .from("courses")
      .update({ archived_at: new Date().toISOString(), published: false })
      .eq("id", rowId)
      .select("slug")
      .single()

    if (error) return { success: false, error: error.message }

    revalidateCourseSurfaces(data.slug)
    return { success: true, slug: data.slug }
  } catch (error) {
    logger.error("[admin-courses] archive failed:", error)
    return { success: false, error: "Failed to archive course." }
  }
}

/** Restores an archived course. It comes back unpublished, never straight live. */
export async function restoreCourse(rowId: string): Promise<ActionResult> {
  try {
    await assertAdmin()

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: "Storage unavailable" }

    const { data, error } = await supabase
      .from("courses")
      .update({ archived_at: null, published: false })
      .eq("id", rowId)
      .select("slug")
      .single()

    if (error) return { success: false, error: error.message }

    revalidateCourseSurfaces(data.slug)
    return { success: true, slug: data.slug }
  } catch (error) {
    logger.error("[admin-courses] restore failed:", error)
    return { success: false, error: "Failed to restore course." }
  }
}

export async function setCoursePublished(
  rowId: string,
  published: boolean
): Promise<ActionResult> {
  try {
    await assertAdmin()

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: "Storage unavailable" }

    const { data, error } = await supabase
      .from("courses")
      .update({ published })
      .eq("id", rowId)
      .is("archived_at", null)
      .select("slug")
      .single()

    if (error) return { success: false, error: error.message }

    revalidateCourseSurfaces(data.slug)
    return { success: true, slug: data.slug }
  } catch (error) {
    logger.error("[admin-courses] publish toggle failed:", error)
    return { success: false, error: "Failed to update course." }
  }
}

/** Persists a new catalogue order. Accepts row ids in their intended order. */
export async function reorderCourses(orderedRowIds: string[]): Promise<ActionResult> {
  try {
    await assertAdmin()

    const ids = z.array(z.string().uuid()).min(1).parse(orderedRowIds)

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: "Storage unavailable" }

    // Supabase has no bulk positional update, and the list is small.
    const results = await Promise.all(
      ids.map((id, index) =>
        supabase.from("courses").update({ display_order: index }).eq("id", id)
      )
    )

    const failed = results.find((result) => result.error)
    if (failed?.error) return { success: false, error: failed.error.message }

    revalidateCourseSurfaces()
    return { success: true }
  } catch (error) {
    logger.error("[admin-courses] reorder failed:", error)
    return { success: false, error: "Failed to reorder courses." }
  }
}
