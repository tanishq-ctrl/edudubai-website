/**
 * Exercises the course admin write path against the real database, then
 * removes everything it created.
 *
 * The server actions themselves cannot run here (they call getCurrentAdmin(),
 * which needs a request context), so this drives the same service-role client
 * and the same column mapping the actions use. It catches column-name drift,
 * constraint violations and RLS surprises.
 *
 * IMPORTANT: it only ever touches rows whose slug starts with the test prefix,
 * and verifies the real catalogue is untouched at the end.
 *
 * Run with:
 *   npx vite-node -c vitest.config.ts scripts/smoke-test-admin-courses.ts
 */

import { createAdminClient } from "../src/lib/supabase/admin"
import { createPublicClient } from "../src/lib/supabase/public"
import { rowToCourse } from "../src/lib/courses-db"

const PREFIX = "zz-smoke-test-"
const SLUG = `${PREFIX}${Date.now()}`

let failures = 0
function check(label: string, ok: boolean, detail?: unknown) {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${label}`)
  if (!ok) {
    failures += 1
    if (detail !== undefined) console.log("        ", detail)
  }
}

const admin = createAdminClient()
const publicClient = createPublicClient()

if (!admin || !publicClient) {
  console.error("Supabase clients unavailable - check env vars")
  process.exit(1)
}

const before = await admin.from("courses").select("id", { count: "exact", head: true })
const baseline = before.count ?? 0
console.log(`Baseline: ${baseline} courses\n`)

// --- create -----------------------------------------------------------------
const { data: created, error: createError } = await admin
  .from("courses")
  .insert({
    slug: SLUG,
    legacy_id: SLUG,
    title: "Smoke Test Course",
    short_description: "short",
    long_description: "long",
    category: "AML_CFT",
    issuing_body: "ACAMS",
    level: "ADVANCED",
    duration_hours: 10,
    price_usd: 123.45,
    currency: "USD",
    delivery_modes: ["LIVE_VIRTUAL"],
    featured: false,
    published: false,
    display_order: 999,
    outcomes: ["a", "b"],
    who_its_for: ["someone"],
    faq: [{ question: "q", answer: "a" }],
    delivery_schedules: [{ name: "n", schedule: "s", duration: "d" }],
    audience_categories: [{ title: "t", roles: ["r"] }],
    exam_info: { format: "Online", questions: "10" },
    program_overview: { whatIs: "x" },
    why_choose_us: { title: "t", description: "d", points: ["p"] },
  })
  .select("id, slug")
  .single()

check("create course", Boolean(created) && !createError, createError?.message)
const rowId = created?.id as string

// --- unpublished drafts must be invisible publicly --------------------------
const draftPublic = await publicClient.from("courses").select("slug").eq("slug", SLUG)
check("unpublished draft is hidden from anon", (draftPublic.data?.length ?? 0) === 0)

// --- publish ----------------------------------------------------------------
await admin.from("courses").update({ published: true }).eq("id", rowId)
const livePublic = await publicClient.from("courses").select("slug").eq("slug", SLUG)
check("published course is visible to anon", (livePublic.data?.length ?? 0) === 1)

// --- round-trip through the mapper -----------------------------------------
const { data: fullRow } = await admin.from("courses").select("*").eq("id", rowId).single()
const mapped = rowToCourse(fullRow as any)
check(
  "rowToCourse round-trips nested content",
  mapped.outcomes.length === 2 &&
    mapped.faq.length === 1 &&
    mapped.priceUsd === 123.45 &&
    mapped.id === SLUG &&
    mapped.deliverySchedules?.length === 1 &&
    mapped.whyChooseUs?.points?.length === 1,
  mapped
)

// --- archive ----------------------------------------------------------------
await admin
  .from("courses")
  .update({ archived_at: new Date().toISOString(), published: false })
  .eq("id", rowId)
const archivedPublic = await publicClient.from("courses").select("slug").eq("slug", SLUG)
check("archived course is hidden from anon", (archivedPublic.data?.length ?? 0) === 0)

// An archived row that is somehow still published must STILL be hidden: the
// RLS policy checks archived_at, not just published.
await admin.from("courses").update({ published: true }).eq("id", rowId)
const archivedButPublished = await publicClient.from("courses").select("slug").eq("slug", SLUG)
check(
  "archived + published is still hidden (policy checks archived_at)",
  (archivedButPublished.data?.length ?? 0) === 0
)

// --- restore ----------------------------------------------------------------
await admin.from("courses").update({ archived_at: null, published: false }).eq("id", rowId)
const { data: restored } = await admin
  .from("courses")
  .select("archived_at, published")
  .eq("id", rowId)
  .single()
check(
  "restore clears archived_at and leaves it unpublished",
  restored?.archived_at === null && restored?.published === false,
  restored
)

// --- constraints ------------------------------------------------------------
const { error: badSlug } = await admin
  .from("courses")
  .insert({
    slug: "Not A Valid Slug",
    title: "x",
    short_description: "x",
    long_description: "x",
    category: "x",
    issuing_body: "ACAMS",
    level: "ADVANCED",
    duration_hours: 1,
    price_usd: 1,
  })
check("invalid slug rejected by check constraint", Boolean(badSlug))

const { error: dupSlug } = await admin.from("courses").insert({
  slug: SLUG,
  title: "x",
  short_description: "x",
  long_description: "x",
  category: "x",
  issuing_body: "ACAMS",
  level: "ADVANCED",
  duration_hours: 1,
  price_usd: 1,
})
check("duplicate slug rejected by unique index", dupSlug?.code === "23505", dupSlug?.code)

const { error: badLevel } = await admin.from("courses").insert({
  slug: `${PREFIX}bad-level`,
  title: "x",
  short_description: "x",
  long_description: "x",
  category: "x",
  issuing_body: "ACAMS",
  level: "WIZARD",
  duration_hours: 1,
  price_usd: 1,
})
check("invalid level rejected by check constraint", Boolean(badLevel))

// --- updated_at trigger -----------------------------------------------------
const { data: beforeUpdate } = await admin
  .from("courses")
  .select("updated_at")
  .eq("id", rowId)
  .single()
await new Promise((resolve) => setTimeout(resolve, 1100))
await admin.from("courses").update({ title: "Smoke Test Course 2" }).eq("id", rowId)
const { data: afterUpdate } = await admin
  .from("courses")
  .select("updated_at")
  .eq("id", rowId)
  .single()
check(
  "updated_at trigger fires on update",
  new Date(afterUpdate!.updated_at).getTime() > new Date(beforeUpdate!.updated_at).getTime()
)

// --- cleanup ----------------------------------------------------------------
console.log("\nCleaning up...")
const { error: cleanupError } = await admin.from("courses").delete().like("slug", `${PREFIX}%`)
check("deleted all test courses", !cleanupError, cleanupError?.message)

const after = await admin.from("courses").select("id", { count: "exact", head: true })
check(
  `catalogue back to baseline (${baseline})`,
  (after.count ?? -1) === baseline,
  after.count
)

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`)
process.exit(failures === 0 ? 0 : 1)
