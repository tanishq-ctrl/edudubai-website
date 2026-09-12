/**
 * Exercises the lead and CARF repositories against the real database, then
 * deletes everything it wrote.
 *
 * Inserts through the actual application code rather than raw SQL, so it
 * catches the things that actually break: wrong column names, RLS blocking the
 * service role, constraint violations from the enum-ish text columns.
 *
 * Every row is tagged so cleanup is unambiguous, and the script fails loudly
 * if cleanup leaves anything behind.
 *
 * Run with:
 *   npx vite-node -c vitest.config.ts scripts/smoke-test-leads.ts
 */

import { createAdminClient } from "../src/lib/supabase/admin"
import {
  recordLead,
  markLeadSynced,
  recordCarfSubmission,
  markCarfSynced,
} from "../src/server/leads-repository"

const MARKER = `smoke-test-${Date.now()}@example.invalid`

let failures = 0

function check(label: string, ok: boolean, detail?: unknown) {
  console.log(`${ok ? "  ok  " : "  FAIL"} ${label}`)
  if (!ok) {
    failures += 1
    if (detail !== undefined) console.log("       ", detail)
  }
}

const supabase = createAdminClient()
if (!supabase) {
  console.error("Service role client unavailable - check SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

console.log(`Using marker email ${MARKER}\n`)

// --- leads, one row per source ---------------------------------------------
const sources = [
  { source: "CONTACT" as const, message: "smoke test message" },
  { source: "CORPORATE" as const, message: "need", preferredDelivery: "HYBRID" as const },
  { source: "BROCHURE" as const, courseSlug: "cams", courseTitle: "CAMS" },
  { source: "COURSE_APPLICATION" as const, courseSlug: "cams", courseTitle: "CAMS" },
  { source: "GENERAL" as const },
]

const leadIds: string[] = []

for (const extra of sources) {
  const id = await recordLead({
    name: "Smoke Test",
    email: MARKER,
    phone: "+000000000",
    company: "Smoke Test Ltd",
    ...extra,
  })
  check(`recordLead(${extra.source})`, Boolean(id), id)
  if (id) leadIds.push(id)
}

// --- crm sync flag ----------------------------------------------------------
if (leadIds[0]) {
  await markLeadSynced(leadIds[0], "crm-contact-123")
  const { data } = await supabase
    .from("leads")
    .select("crm_synced, crm_contact_id")
    .eq("id", leadIds[0])
    .single()
  check(
    "markLeadSynced sets crm_synced and contact id",
    data?.crm_synced === true && data?.crm_contact_id === "crm-contact-123",
    data
  )
}

// --- carf -------------------------------------------------------------------
const carfId = await recordCarfSubmission({
  name: "Smoke Test",
  email: MARKER,
  company: "Smoke Test Ltd",
  score: 42,
  riskLevel: "MEDIUM",
  answers: { q1: "a", nested: { q2: ["b", "c"] } },
})
check("recordCarfSubmission", Boolean(carfId), carfId)

if (carfId) {
  await markCarfSynced(carfId, "crm-contact-456")
  const { data } = await supabase
    .from("carf_submissions")
    .select("score, risk_level, answers, crm_synced")
    .eq("id", carfId)
    .single()
  check(
    "carf row round-trips score, risk and jsonb answers",
    data?.score === 42 &&
      data?.risk_level === "MEDIUM" &&
      JSON.stringify(data?.answers) === JSON.stringify({ q1: "a", nested: { q2: ["b", "c"] } }) &&
      data?.crm_synced === true,
    data
  )
}

// --- the combined view ------------------------------------------------------
const { data: activity, error: activityError } = await supabase
  .from("admin_activity")
  .select("kind, person_email, summary")
  .eq("person_email", MARKER)

check(
  "admin_activity surfaces both leads and carf rows",
  !activityError &&
    (activity?.filter((r) => r.kind === "LEAD").length ?? 0) === leadIds.length &&
    (activity?.filter((r) => r.kind === "CARF").length ?? 0) === (carfId ? 1 : 0),
  activityError?.message ?? activity
)

// --- constraint enforcement -------------------------------------------------
const { error: badSource } = await supabase
  .from("leads")
  .insert({ source: "NOT_A_SOURCE", name: "x", email: MARKER })
check("invalid source is rejected by the check constraint", Boolean(badSource))

// --- cleanup ----------------------------------------------------------------
console.log("\nCleaning up...")

const { error: delLeads } = await supabase.from("leads").delete().eq("email", MARKER)
const { error: delCarf } = await supabase.from("carf_submissions").delete().eq("email", MARKER)

check("deleted test leads", !delLeads, delLeads?.message)
check("deleted test carf rows", !delCarf, delCarf?.message)

const { count: leadsLeft } = await supabase
  .from("leads")
  .select("*", { count: "exact", head: true })
  .eq("email", MARKER)
const { count: carfLeft } = await supabase
  .from("carf_submissions")
  .select("*", { count: "exact", head: true })
  .eq("email", MARKER)

check("no test rows remain", (leadsLeft ?? 0) === 0 && (carfLeft ?? 0) === 0, {
  leadsLeft,
  carfLeft,
})

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`)
process.exit(failures === 0 ? 0 : 1)
