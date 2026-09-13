import type { ActivityKind } from "@/server/actions/admin-activity"

/**
 * The statuses each activity kind accepts, mirroring the check constraint on
 * its table.
 *
 * This lives outside the actions file on purpose: a `"use server"` module may
 * only export async functions, so a plain constant exported from there is a
 * build error ("A 'use server' file can only export async functions"). Both
 * the server action and the client panel import it from here.
 */
export const STATUS_OPTIONS: Partial<Record<ActivityKind, string[]>> = {
  LEAD: ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"],
  TRAINER: ["NEW", "REVIEWING", "APPROVED", "REJECTED"],
  SUPPORT: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
}
