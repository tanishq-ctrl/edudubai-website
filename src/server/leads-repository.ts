/**
 * Persistence for inbound enquiries.
 *
 * Leads used to be sent straight to Systeme.io and stored nowhere we own, so a
 * CRM outage or a lapsed plan meant losing them outright. These tables are now
 * the system of record and the CRM is a mirror.
 *
 * ORDERING MATTERS: always record() before syncing to the CRM, then call
 * markSynced(). A failed CRM call must never cost us the lead, and the
 * crm_synced flag makes unsynced rows easy to find and replay later.
 *
 * Writes go through the service-role client: `leads` and `carf_submissions`
 * have RLS enabled with no policies, so no browser role can reach them.
 */

import { createAdminClient } from "@/lib/supabase/admin"
import { logger } from "@/lib/logger"

export type LeadSource =
  | "CONTACT"
  | "CORPORATE"
  | "BROCHURE"
  | "COURSE_APPLICATION"
  | "GENERAL"

export type LeadInput = {
  source: LeadSource
  name: string
  email: string
  phone?: string | null
  company?: string | null
  courseSlug?: string | null
  courseTitle?: string | null
  message?: string | null
  preferredDelivery?: "IN_PERSON" | "LIVE_VIRTUAL" | "HYBRID" | null
  metadata?: Record<string, unknown>
}

export type CarfSubmissionInput = {
  name: string
  email: string
  company: string
  score?: number | null
  riskLevel?: string | null
  answers?: Record<string, unknown>
}

/**
 * Stores a lead and returns its id, or null if it could not be stored.
 *
 * Never throws: a failure here must not break the visitor's form submission.
 * The error is logged loudly because a silent failure would mean lost leads,
 * which is the exact problem this table exists to solve.
 */
export async function recordLead(input: LeadInput): Promise<string | null> {
  const supabase = createAdminClient()

  if (!supabase) {
    console.error("[leads] cannot record lead: Supabase service role not configured")
    return null
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      source: input.source,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      company: input.company ?? null,
      course_slug: input.courseSlug ?? null,
      course_title: input.courseTitle ?? null,
      message: input.message ?? null,
      preferred_delivery: input.preferredDelivery ?? null,
      metadata: input.metadata ?? {},
    })
    .select("id")
    .single()

  if (error) {
    console.error("[leads] failed to record lead:", error.message)
    return null
  }

  logger.debug("[leads] recorded", { id: data.id, source: input.source })
  return data.id as string
}

/** Records the CRM sync outcome for a lead. Best effort. */
export async function markLeadSynced(
  leadId: string | null,
  crmContactId?: string | null
): Promise<void> {
  if (!leadId) return

  const supabase = createAdminClient()
  if (!supabase) return

  const { error } = await supabase
    .from("leads")
    .update({ crm_synced: true, crm_contact_id: crmContactId ?? null })
    .eq("id", leadId)

  if (error) {
    logger.debug("[leads] failed to mark synced:", error.message)
  }
}

/** Stores a CARF diagnostic submission. Never throws. */
export async function recordCarfSubmission(
  input: CarfSubmissionInput
): Promise<string | null> {
  const supabase = createAdminClient()

  if (!supabase) {
    console.error("[carf] cannot record submission: Supabase service role not configured")
    return null
  }

  const { data, error } = await supabase
    .from("carf_submissions")
    .insert({
      name: input.name,
      email: input.email,
      company: input.company,
      score: input.score ?? null,
      risk_level: input.riskLevel ?? null,
      answers: input.answers ?? {},
    })
    .select("id")
    .single()

  if (error) {
    console.error("[carf] failed to record submission:", error.message)
    return null
  }

  logger.debug("[carf] recorded", { id: data.id })
  return data.id as string
}

/** Records the CRM sync outcome for a CARF submission. Best effort. */
export async function markCarfSynced(
  submissionId: string | null,
  crmContactId?: string | null
): Promise<void> {
  if (!submissionId) return

  const supabase = createAdminClient()
  if (!supabase) return

  const { error } = await supabase
    .from("carf_submissions")
    .update({ crm_synced: true, crm_contact_id: crmContactId ?? null })
    .eq("id", submissionId)

  if (error) {
    logger.debug("[carf] failed to mark synced:", error.message)
  }
}
