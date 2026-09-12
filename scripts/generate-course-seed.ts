/**
 * Generates supabase/migrations/0006_seed_courses.sql from src/lib/courses.ts.
 *
 * The catalogue is the source of truth until the database takes over, so the
 * seed is generated rather than hand-written: no transcription errors, and it
 * can be regenerated if courses.ts changes before the cutover.
 *
 * Run with:  npx vite-node scripts/generate-course-seed.ts
 */

import { writeFileSync } from "node:fs"
import { courses } from "../src/lib/courses"

/** Quotes a value as a Postgres literal, or NULL. */
function lit(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "null"
  if (typeof value === "number") return String(value)
  if (typeof value === "boolean") return String(value)
  return `'${value.replace(/'/g, "''")}'`
}

/** Serialises a value as a jsonb literal. */
function json(value: unknown): string {
  if (value === undefined) return "null"
  return `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`
}

/** Serialises a string array as a Postgres text[] literal. */
function textArray(values: string[]): string {
  const inner = values.map((v) => `"${v.replace(/"/g, '\\"')}"`).join(",")
  return `'{${inner}}'::text[]`
}

const rows = courses.map((course, index) => {
  const columns = [
    lit(course.slug),
    lit(course.id),
    lit(course.title),
    lit(course.shortDescription),
    lit(course.longDescription),
    lit(course.category),
    lit(course.issuingBody),
    lit(course.level),
    course.duration,
    course.priceUsd,
    lit(course.currency ?? "USD"),
    textArray(course.deliveryModes),
    course.featured,
    "true", // published
    index, // display_order preserves the existing catalogue order
    lit(course.imageUrl ?? null),
    lit(course.heroImageUrl ?? null),
    json(course.deliverySchedules ?? []),
    json(course.outcomes ?? []),
    json(course.whoItsFor ?? []),
    json(course.faq ?? []),
    json(course.audienceCategories ?? []),
    json(course.whyChooseUs),
    json(course.examInfo),
    json(course.programOverview),
  ]
  return `  (\n    ${columns.join(",\n    ")}\n  )`
})

const sql = `-- 0006_seed_courses.sql
--
-- GENERATED FILE - do not edit by hand.
-- Regenerate with: npx vite-node scripts/generate-course-seed.ts
--
-- Seeds public.courses from src/lib/courses.ts, the static catalogue that has
-- been driving the public site. Content is copied verbatim, including the
-- nested schedules, outcomes, FAQ, exam info and audience categories that the
-- old Prisma courses model could not represent.
--
-- legacy_id preserves the original Course.id. It is NOT cosmetic:
-- src/app/courses/[slug]/course-hero.tsx switches on 'cams', 'cgss', 'tbml'
-- and 'certified-compliance-manager' to render per-course hero content, and
-- two courses have an id that differs from their slug (cgss, aml-specialist).
--
-- display_order preserves the array order of the original file so the
-- catalogue lists identically after the cutover.
--
-- Idempotent: re-running updates the existing rows by slug rather than
-- inserting duplicates.

begin;

alter table public.courses
  add column if not exists legacy_id text;

create unique index if not exists courses_legacy_id_idx
  on public.courses (legacy_id) where legacy_id is not null;

insert into public.courses (
  slug, legacy_id, title, short_description, long_description,
  category, issuing_body, level, duration_hours, price_usd, currency,
  delivery_modes, featured, published, display_order,
  image_url, hero_image_url,
  delivery_schedules, outcomes, who_its_for, faq, audience_categories,
  why_choose_us, exam_info, program_overview
) values
${rows.join(",\n")}
on conflict (slug) do update set
  legacy_id           = excluded.legacy_id,
  title               = excluded.title,
  short_description   = excluded.short_description,
  long_description    = excluded.long_description,
  category            = excluded.category,
  issuing_body        = excluded.issuing_body,
  level               = excluded.level,
  duration_hours      = excluded.duration_hours,
  price_usd           = excluded.price_usd,
  currency            = excluded.currency,
  delivery_modes      = excluded.delivery_modes,
  featured            = excluded.featured,
  display_order       = excluded.display_order,
  image_url           = excluded.image_url,
  hero_image_url      = excluded.hero_image_url,
  delivery_schedules  = excluded.delivery_schedules,
  outcomes            = excluded.outcomes,
  who_its_for         = excluded.who_its_for,
  faq                 = excluded.faq,
  audience_categories = excluded.audience_categories,
  why_choose_us       = excluded.why_choose_us,
  exam_info           = excluded.exam_info,
  program_overview    = excluded.program_overview;

commit;

-- Verification: expect ${courses.length} rows, all published, and the same
-- featured count as the source file (${courses.filter((c) => c.featured).length}).
select count(*) as total,
       count(*) filter (where published) as published,
       count(*) filter (where featured) as featured,
       count(*) filter (where jsonb_array_length(outcomes) > 0) as with_outcomes,
       count(*) filter (where jsonb_array_length(faq) > 0) as with_faq
from public.courses;

select slug, legacy_id, level, price_usd, display_order,
       jsonb_array_length(outcomes) as outcomes,
       jsonb_array_length(faq) as faq
from public.courses
order by display_order;
`

const target = new URL("../supabase/migrations/0006_seed_courses.sql", import.meta.url)
writeFileSync(target, sql)

console.log(`Wrote ${courses.length} courses to 0006_seed_courses.sql`)
for (const course of courses) {
  console.log(
    `  ${course.slug}  (id=${course.id})  outcomes=${course.outcomes?.length ?? 0}` +
      ` faq=${course.faq?.length ?? 0} schedules=${course.deliverySchedules?.length ?? 0}`
  )
}
