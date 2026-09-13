"use client"

import { useEffect, useState, useTransition } from "react"
import { ExternalLink, Loader2, Mail, MessageCircle, Phone } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  getActivityDetail,
  updateActivityStatus,
  type ActivityItem,
  type ActivityKind,
} from "@/server/actions/admin-activity"
import { STATUS_OPTIONS } from "@/lib/activity-status"

/**
 * The record behind one row of the feed.
 *
 * The feed answers "something arrived"; this answers "what does it say and
 * what do I do about it". Before this panel existed the contact message, the
 * phone number, the CARF answers and the trainer's CV link were all written
 * to the database and readable nowhere -- an admin could see that an enquiry
 * had come in and had no way to act on it without opening Supabase.
 *
 * Every table has a different shape, so the body renders whatever fields the
 * row actually carries rather than a per-kind layout: the known-noisy columns
 * are dropped, `metadata` and `answers` are rendered as their own sections,
 * and anything left over is listed as a label/value pair.
 */

/** Columns that carry no meaning for a human reading the record. */
const HIDDEN_FIELDS = new Set([
  "id",
  "user_id",
  "userId",
  "crm_synced",
  "crm_contact_id",
  "metadata",
  "answers",
  "consent",
  "updated_at",
  "updatedAt",
])

const LABELS: Record<string, string> = {
  created_at: "Received",
  createdAt: "Received",
  full_name: "Name",
  fullName: "Name",
  course_title: "Course",
  course_slug: "Course slug",
  preferred_delivery: "Preferred delivery",
  linkedin_url: "LinkedIn",
  video_url: "Video",
  cv_file_url: "CV",
  risk_level: "Risk level",
  job_title: "Job title",
}

/**
 * Column name to something a person reads.
 *
 * Splits camelCase as well as snake_case: these tables mix the two, so the
 * scholarship rows were rendering "ReasonForApplying" and "YearsExperience"
 * verbatim.
 */
function label(key: string) {
  if (LABELS[key]) return LABELS[key]
  return key
    .replace(/[_.]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase())
}

function isUrl(value: unknown): value is string {
  return typeof value === "string" && /^https?:\/\//.test(value)
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—"
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleString()
  }
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

/** Renders a jsonb payload (lead metadata, CARF answers) as nested rows. */
function PayloadSection({ title, payload }: { title: string; payload: unknown }) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null
  const entries = Object.entries(payload as Record<string, unknown>)
  if (entries.length === 0) return null

  return (
    <section>
      <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-content-subtle">
        {title}
      </h3>
      <dl className="mt-3 border-t border-line">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-4 border-b border-line py-2.5 text-sm">
            <dt className="w-2/5 shrink-0 text-content-muted">{label(key)}</dt>
            <dd className="min-w-0 flex-1 break-words text-content">
              {value && typeof value === "object" ? (
                <span className="whitespace-pre-wrap font-mono text-xs">
                  {JSON.stringify(value, null, 2)}
                </span>
              ) : (
                formatValue(value)
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function ActivityDetail({
  item,
  open,
  onOpenChange,
  onStatusChange,
}: {
  item: ActivityItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (kind: ActivityKind, id: string, status: string) => void
}) {
  const [record, setRecord] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, startSaving] = useTransition()

  useEffect(() => {
    if (!open || !item) return
    let cancelled = false

    setLoading(true)
    setError(null)
    setRecord(null)

    getActivityDetail(item.kind, item.id)
      .then((data) => {
        if (cancelled) return
        if (!data) setError("This record could not be loaded.")
        setRecord(data)
      })
      .catch(() => {
        if (!cancelled) setError("This record could not be loaded.")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, item])

  const statuses = item ? STATUS_OPTIONS[item.kind] : undefined
  const currentStatus =
    (record?.status as string | undefined) ?? item?.status ?? undefined

  const email = (record?.email as string | undefined) ?? item?.personEmail ?? null
  /* The tables disagree on the column name: leads and trainers carry `phone`,
     scholarship applications carry `mobile`. */
  const phone =
    (record?.phone as string | undefined) ??
    (record?.mobile as string | undefined) ??
    null

  function setStatus(next: string) {
    if (!item) return
    startSaving(async () => {
      const result = await updateActivityStatus(item.kind, item.id, next)
      if (result.ok) {
        setRecord((current) => (current ? { ...current, status: next } : current))
        onStatusChange(item.kind, item.id, next)
      } else {
        setError(result.error ?? "Could not update the status")
      }
    })
  }

  /* Fields the row carries, minus the noise and minus what the header shows. */
  const fields = Object.entries(record ?? {}).filter(
    ([key, value]) =>
      !HIDDEN_FIELDS.has(key) &&
      key !== "status" &&
      key !== "name" &&
      key !== "email" &&
      value !== null &&
      value !== ""
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-lg">
        <SheetHeader className="space-y-2 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-2xs">
              {item?.kind}
            </Badge>
            {currentStatus ? (
              <Badge variant="secondary" className="text-2xs">
                {currentStatus}
              </Badge>
            ) : null}
          </div>
          <SheetTitle className="text-xl">
            {item?.personName || item?.personEmail || "Record"}
          </SheetTitle>
          <SheetDescription>
            {item ? new Date(item.occurredAt).toLocaleString() : null}
          </SheetDescription>
        </SheetHeader>

        {/* Acting on an enquiry starts with reaching the person. */}
        {(email || phone) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {email ? (
              <Button asChild variant="outline" size="sm">
                <a href={`mailto:${email}`}>
                  <Mail className="mr-2 h-3.5 w-3.5" />
                  Email
                </a>
              </Button>
            ) : null}
            {phone ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                    <Phone className="mr-2 h-3.5 w-3.5" />
                    Call
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={`https://wa.me/${phone.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </Button>
              </>
            ) : null}
          </div>
        )}

        {/* Triage, for the kinds whose table has a status column. */}
        {statuses ? (
          <div className="mt-6">
            <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-content-subtle">
              Status
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {statuses.map((option) => (
                <Button
                  key={option}
                  size="sm"
                  variant={option === currentStatus ? "primary" : "outline"}
                  disabled={isSaving || option === currentStatus}
                  onClick={() => setStatus(option)}
                >
                  {option.replace(/_/g, " ").toLowerCase()}
                </Button>
              ))}
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin self-center text-content-muted" />
              ) : null}
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-6 text-sm text-crimson-600">{error}</p> : null}

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-content-muted" />
          </div>
        ) : null}

        {record ? (
          <div className="mt-8 space-y-8 pb-10">
            <section>
              <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-content-subtle">
                Submission
              </h3>
              <dl className="mt-3 border-t border-line">
                {fields.map(([key, value]) => (
                  <div key={key} className="flex gap-4 border-b border-line py-2.5 text-sm">
                    <dt className="w-2/5 shrink-0 text-content-muted">{label(key)}</dt>
                    <dd className="min-w-0 flex-1 break-words text-content">
                      {isUrl(value) ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-crimson-600 underline underline-offset-4"
                        >
                          Open
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="whitespace-pre-wrap">{formatValue(value)}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <PayloadSection title="Form payload" payload={record.metadata} />
            <PayloadSection title="Answers" payload={record.answers} />
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
