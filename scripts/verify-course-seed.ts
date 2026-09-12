/**
 * Compares every course in the database against src/lib/courses.ts field by
 * field, including the nested jsonb content.
 *
 * The seed is only safe to cut over to once this reports no differences, so
 * this checks deep equality rather than row counts.
 *
 * Run with:  npx vite-node scripts/verify-course-seed.ts <path-to-db-json>
 */

import { readFileSync } from "node:fs"
import { courses } from "../src/lib/courses"

type DbCourse = Record<string, any>

const dbPath = process.argv[2]
if (!dbPath) {
  console.error("usage: vite-node scripts/verify-course-seed.ts <path-to-db-json>")
  process.exit(1)
}

const dbRows: DbCourse[] = JSON.parse(readFileSync(dbPath, "utf8"))
const bySlug = new Map(dbRows.map((row) => [row.slug, row]))

let differences = 0

/**
 * Canonicalises a value for comparison: object keys are sorted recursively,
 * because Postgres jsonb does not preserve the key order it was given (it
 * stores keys sorted by length then bytewise). Array order IS preserved by
 * jsonb and is meaningful here, so arrays are left alone.
 */
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as Record<string, unknown>)
        .sort()
        .map((key) => [key, canonical((value as Record<string, unknown>)[key])])
    )
  }
  return value
}

function compare(slug: string, field: string, expected: unknown, actual: unknown) {
  const a = JSON.stringify(canonical(expected ?? null))
  const b = JSON.stringify(canonical(actual ?? null))
  if (a !== b) {
    differences += 1
    console.log(`  DIFF ${slug}.${field}`)
    console.log(`    file: ${a.slice(0, 180)}`)
    console.log(`    db:   ${b.slice(0, 180)}`)
  }
}

console.log(`Comparing ${courses.length} courses in the file against ${dbRows.length} in the database\n`)

for (const course of courses) {
  const row = bySlug.get(course.slug)

  if (!row) {
    differences += 1
    console.log(`  MISSING ${course.slug} is not in the database`)
    continue
  }

  compare(course.slug, "legacy_id", course.id, row.legacy_id)
  compare(course.slug, "title", course.title, row.title)
  compare(course.slug, "short_description", course.shortDescription, row.short_description)
  compare(course.slug, "long_description", course.longDescription, row.long_description)
  compare(course.slug, "category", course.category, row.category)
  compare(course.slug, "issuing_body", course.issuingBody, row.issuing_body)
  compare(course.slug, "level", course.level, row.level)
  compare(course.slug, "duration", course.duration, row.duration_hours)
  compare(course.slug, "price_usd", course.priceUsd, Number(row.price_usd))
  compare(course.slug, "currency", course.currency ?? "USD", row.currency)
  compare(course.slug, "delivery_modes", course.deliveryModes, row.delivery_modes)
  compare(course.slug, "featured", course.featured, row.featured)
  compare(course.slug, "image_url", course.imageUrl ?? null, row.image_url)
  compare(course.slug, "hero_image_url", course.heroImageUrl ?? null, row.hero_image_url)
  compare(course.slug, "delivery_schedules", course.deliverySchedules ?? [], row.delivery_schedules)
  compare(course.slug, "outcomes", course.outcomes ?? [], row.outcomes)
  compare(course.slug, "who_its_for", course.whoItsFor ?? [], row.who_its_for)
  compare(course.slug, "faq", course.faq ?? [], row.faq)
  compare(course.slug, "audience_categories", course.audienceCategories ?? [], row.audience_categories)
  compare(course.slug, "why_choose_us", course.whyChooseUs ?? null, row.why_choose_us)
  compare(course.slug, "exam_info", course.examInfo ?? null, row.exam_info)
  compare(course.slug, "program_overview", course.programOverview ?? null, row.program_overview)
}

const extra = dbRows.filter((row) => !courses.some((c) => c.slug === row.slug))
for (const row of extra) {
  differences += 1
  console.log(`  EXTRA ${row.slug} exists in the database but not in the file`)
}

console.log(
  differences === 0
    ? "\nOK - every field matches. Safe to cut the public pages over."
    : `\n${differences} difference(s) found. Do NOT cut over until resolved.`
)

process.exit(differences === 0 ? 0 : 1)
