"use client"

import { useState, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  ClipboardCheck,
  UserPlus,
  LifeBuoy,
  GraduationCap,
  Award,
  Loader2,
} from "lucide-react"
import {
  listActivity,
  type ActivityItem,
  type ActivityKind,
} from "@/server/actions/admin-activity"

const KINDS: Array<{ value: ActivityKind | "ALL"; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "LEAD", label: "Leads" },
  { value: "CARF", label: "CARF" },
  { value: "TRAINER", label: "Trainers" },
  { value: "SUPPORT", label: "Support" },
  { value: "ENROLLMENT", label: "Enrollments" },
  { value: "SCHOLARSHIP", label: "Scholarships" },
]

const ICONS: Record<ActivityKind, typeof Mail> = {
  LEAD: Mail,
  CARF: ClipboardCheck,
  TRAINER: UserPlus,
  SUPPORT: LifeBuoy,
  ENROLLMENT: GraduationCap,
  SCHOLARSHIP: Award,
}

const KIND_STYLES: Record<ActivityKind, string> = {
  LEAD: "bg-blue-100 text-blue-800",
  CARF: "bg-purple-100 text-purple-800",
  TRAINER: "bg-amber-100 text-amber-800",
  SUPPORT: "bg-rose-100 text-rose-800",
  ENROLLMENT: "bg-green-100 text-green-800",
  SCHOLARSHIP: "bg-teal-100 text-teal-800",
}

/** "3 hours ago" style, falling back to a date beyond a week. */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ""

  const seconds = Math.round((Date.now() - then) / 1000)
  if (seconds < 60) return "just now"

  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.round(hours / 24)
  if (days <= 7) return `${days}d ago`

  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function ActivityFeed({
  initialItems,
  initialHasMore,
  counts,
}: {
  initialItems: ActivityItem[]
  initialHasMore: boolean
  counts: Record<string, number>
}) {
  const [kind, setKind] = useState<ActivityKind | "ALL">("ALL")
  const [items, setItems] = useState(initialItems)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isPending, startTransition] = useTransition()

  function selectKind(next: ActivityKind | "ALL") {
    setKind(next)
    startTransition(async () => {
      const page = await listActivity({ kind: next })
      setItems(page.items)
      setHasMore(page.hasMore)
    })
  }

  function loadMore() {
    startTransition(async () => {
      const page = await listActivity({ kind, offset: items.length })
      setItems((current) => [...current, ...page.items])
      setHasMore(page.hasMore)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {KINDS.map((option) => (
          <Button
            key={option.value}
            variant={kind === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => selectKind(option.value)}
            disabled={isPending}
            className={kind === option.value ? "bg-crimson-600 hover:bg-crimson-700 text-content-on-dark" : ""}
          >
            {option.label}
            {counts[option.value] !== undefined && (
              <span className="ml-1.5 text-xs opacity-70">{counts[option.value]}</span>
            )}
          </Button>
        ))}
      </div>

      {items.length === 0 && !isPending && (
        <Card>
          <CardContent className="py-10 text-center text-content-muted">
            Nothing here yet. New leads, diagnostics and applications will appear as they
            come in.
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = ICONS[item.kind] ?? Mail
          return (
            <Card key={`${item.kind}-${item.id}`}>
              <CardContent className="flex flex-wrap items-center gap-3 py-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    KIND_STYLES[item.kind] ?? "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-content-strong">
                      {item.personName || item.personEmail || "Unknown"}
                    </span>
                    <Badge variant="outline" className="text-2xs">
                      {item.kind}
                    </Badge>
                    {item.status && item.status !== "NEW" && (
                      <Badge variant="secondary" className="text-2xs">
                        {item.status}
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-sm text-content-muted">
                    {item.summary || "—"}
                    {item.personEmail && item.personName ? ` · ${item.personEmail}` : ""}
                  </p>
                </div>

                <time
                  dateTime={item.occurredAt}
                  title={new Date(item.occurredAt).toLocaleString()}
                  className="shrink-0 text-xs text-content-muted"
                >
                  {relativeTime(item.occurredAt)}
                </time>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {isPending && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-content-muted" />
        </div>
      )}

      {hasMore && !isPending && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}
