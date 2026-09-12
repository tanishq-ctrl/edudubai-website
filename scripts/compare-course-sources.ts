/**
 * Compares the file-backed catalogue against the database-backed one through
 * the same mapping the pages use.
 *
 * verify-course-seed.ts checks the raw rows; this checks what the components
 * actually receive after rowToCourse() -- field names, optional-vs-null, and
 * number coercion on price. Both must pass before COURSES_SOURCE=db.
 *
 * Run with:  npx vite-node scripts/compare-course-sources.ts
 */

import { courses as fileCourses } from "../src/lib/courses"
import { getAllCoursesFromDb } from "../src/lib/courses-db"

/** jsonb does not preserve object key order, so compare canonically. */
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

/** Drops undefined keys so `{a: undefined}` and `{}` compare equal. */
function normalise(course: unknown): string {
  return JSON.stringify(canonical(JSON.parse(JSON.stringify(course))))
}

const dbCourses = await getAllCoursesFromDb()

console.log(`file: ${fileCourses.length} courses`)
console.log(`db:   ${dbCourses.length} courses\n`)

if (dbCourses.length === 0) {
  console.error("Database returned nothing. Check NEXT_PUBLIC_SUPABASE_* env vars and RLS.")
  process.exit(1)
}

const dbBySlug = new Map(dbCourses.map((course) => [course.slug, course]))
let differences = 0

for (const fileCourse of fileCourses) {
  const dbCourse = dbBySlug.get(fileCourse.slug)

  if (!dbCourse) {
    differences += 1
    console.log(`MISSING ${fileCourse.slug}`)
    continue
  }

  if (normalise(fileCourse) !== normalise(dbCourse)) {
    differences += 1
    console.log(`DIFF ${fileCourse.slug}`)

    // Narrow it to the offending fields rather than dumping both objects.
    const keys = new Set([...Object.keys(fileCourse), ...Object.keys(dbCourse)])
    for (const key of keys) {
      const a = normalise((fileCourse as any)[key] ?? null)
      const b = normalise((dbCourse as any)[key] ?? null)
      if (a !== b) {
        console.log(`  ${key}`)
        console.log(`    file: ${a.slice(0, 160)}`)
        console.log(`    db:   ${b.slice(0, 160)}`)
      }
    }
  }
}

// Order matters: the courses page renders them in array order.
const fileOrder = fileCourses.map((c) => c.slug).join(",")
const dbOrder = dbCourses.map((c) => c.slug).join(",")
if (fileOrder !== dbOrder) {
  differences += 1
  console.log("DIFF ordering")
  console.log(`  file: ${fileOrder}`)
  console.log(`  db:   ${dbOrder}`)
}

console.log(
  differences === 0
    ? "OK - the database catalogue is identical to the file, including order."
    : `\n${differences} difference(s). Do not set COURSES_SOURCE=db yet.`
)

process.exit(differences === 0 ? 0 : 1)
