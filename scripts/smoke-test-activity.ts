/**
 * Exercises the admin_activity view against the real database, then removes
 * everything it created.
 *
 * Checks the things that would quietly break the feed: that each source table
 * actually surfaces, that ordering is newest-first across a UNION ALL, that
 * kind filtering works, and that the offset pagination does not drop or
 * duplicate rows at the page boundary.
 *
 * Only touches rows carrying the marker email, and asserts the view is back to
 * its starting size afterwards.
 *
 * Run with:
 *   npx vite-node -c vitest.config.ts scripts/smoke-test-activity.ts
 */

import { createAdminClient } from "../src/lib/supabase/admin"

const MARKER = `zz-activity-${Date.now()}@example.invalid`
const PAGE_SIZE = 25

let failures = 0
function check(label: string, ok: boolean, detail?: unknown) {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${label}`)
  if (!ok) {
    failures += 1
    if (detail !== undefined) console.log("        ", detail)
  }
}

const supabase = createAdminClient()
if (!supabase) {
  console.error("Service role client unavailable")
  process.exit(1)
}

const { count: baseline } = await supabase
  .from("admin_activity")
  .select("id", { count: "exact", head: true })
console.log(`Baseline: ${baseline ?? 0} activity rows\n`)

// --- seed: enough leads to cross a page boundary ---------------------------
const LEAD_COUNT = PAGE_SIZE + 5
const leadRows = Array.from({ length: LEAD_COUNT }, (_, index) => ({
  source: "CONTACT",
  name: `Activity Test ${String(index).padStart(2, "0")}`,
  email: MARKER,
  message: `message ${index}`,
  // Spread over time so ordering is deterministic rather than insertion-order.
  created_at: new Date(Date.now() - index * 60_000).toISOString(),
}))

const { error: leadError } = await supabase.from("leads").insert(leadRows)
check(`inserted ${LEAD_COUNT} leads`, !leadError, leadError?.message)

const { error: carfError } = await supabase.from("carf_submissions").insert({
  name: "Activity Test CARF",
  email: MARKER,
  company: "Test Co",
  score: 55,
  risk_level: "HIGH",
})
check("inserted carf submission", !carfError, carfError?.message)

// --- the view surfaces both -------------------------------------------------
const { data: mine, error: mineError } = await supabase
  .from("admin_activity")
  .select("kind, id, occurred_at, person_name, person_email, summary, status")
  .eq("person_email", MARKER)
  .order("occurred_at", { ascending: false })

check("view returns the seeded rows", !mineError, mineError?.message)
check(
  "leads and carf both surface",
  (mine?.filter((r) => r.kind === "LEAD").length ?? 0) === LEAD_COUNT &&
    (mine?.filter((r) => r.kind === "CARF").length ?? 0) === 1,
  mine?.length
)

check(
  "carf summary includes company and risk level",
  mine?.some((r) => r.kind === "CARF" && r.summary === "Test Co - HIGH") ?? false,
  mine?.find((r) => r.kind === "CARF")?.summary
)

// --- ordering ---------------------------------------------------------------
const times = (mine ?? []).map((r) => new Date(r.occurred_at).getTime())
const sortedDesc = [...times].sort((a, b) => b - a)
check("rows come back newest first", JSON.stringify(times) === JSON.stringify(sortedDesc))

// --- kind filtering ---------------------------------------------------------
const { data: onlyCarf } = await supabase
  .from("admin_activity")
  .select("kind")
  .eq("person_email", MARKER)
  .eq("kind", "CARF")
check(
  "kind filter narrows to one type",
  (onlyCarf?.length ?? 0) === 1 && onlyCarf?.every((r) => r.kind === "CARF"),
  onlyCarf?.length
)

// --- pagination across the page boundary ------------------------------------
async function page(offset: number) {
  const { data } = await supabase
    .from("admin_activity")
    .select("id, kind, occurred_at")
    .eq("person_email", MARKER)
    .order("occurred_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE)
  return data ?? []
}

const first = await page(0)
const second = await page(PAGE_SIZE)

check("first page detects that more exist", first.length > PAGE_SIZE, first.length)

const firstIds = first.slice(0, PAGE_SIZE).map((r) => `${r.kind}-${r.id}`)
const secondIds = second.slice(0, PAGE_SIZE).map((r) => `${r.kind}-${r.id}`)
const overlap = firstIds.filter((id) => secondIds.includes(id))

check("pages do not overlap", overlap.length === 0, overlap)
check(
  "pages together cover every seeded row",
  new Set([...firstIds, ...secondIds]).size === LEAD_COUNT + 1,
  new Set([...firstIds, ...secondIds]).size
)

// --- cleanup ----------------------------------------------------------------
console.log("\nCleaning up...")
const { error: delLeads } = await supabase.from("leads").delete().eq("email", MARKER)
const { error: delCarf } = await supabase.from("carf_submissions").delete().eq("email", MARKER)
check("deleted seeded rows", !delLeads && !delCarf, delLeads?.message ?? delCarf?.message)

const { count: after } = await supabase
  .from("admin_activity")
  .select("id", { count: "exact", head: true })
check(`activity back to baseline (${baseline ?? 0})`, (after ?? -1) === (baseline ?? 0), after)

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`)
process.exit(failures === 0 ? 0 : 1)
