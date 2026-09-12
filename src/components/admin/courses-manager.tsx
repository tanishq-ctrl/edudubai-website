"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pencil,
  Plus,
  Archive,
  ArchiveRestore,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react"
import {
  archiveCourse,
  restoreCourse,
  setCoursePublished,
  reorderCourses,
  type AdminCourse,
} from "@/server/actions/admin-courses"

/**
 * Course list for the admin panel.
 *
 * Deliberately has no delete control: archiving is the only removal path, so
 * a course's nested content cannot be destroyed from the browser.
 */
export function CoursesManager({ courses }: { courses: AdminCourse[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [showArchived, setShowArchived] = useState(false)

  const active = courses.filter((course) => !course.archivedAt)
  const archived = courses.filter((course) => course.archivedAt)
  const visible = showArchived ? archived : active

  function run(action: () => Promise<{ success: boolean; error?: string }>) {
    setError(null)
    startTransition(async () => {
      const result = await action()
      if (!result.success) {
        setError(result.error ?? "Something went wrong.")
        return
      }
      router.refresh()
    })
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...active]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    run(() => reorderCourses(next.map((course) => course.rowId)))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant={showArchived ? "outline" : "default"}
            size="sm"
            onClick={() => setShowArchived(false)}
          >
            Active ({active.length})
          </Button>
          <Button
            variant={showArchived ? "default" : "outline"}
            size="sm"
            onClick={() => setShowArchived(true)}
          >
            Archived ({archived.length})
          </Button>
        </div>

        <Button asChild className="bg-brand-navy hover:bg-brand-navy-dark">
          <Link href="/admin/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Link>
        </Button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      {visible.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-neutral-text-muted">
            {showArchived ? "Nothing archived." : "No courses yet."}
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {visible.map((course, index) => (
          <Card key={course.rowId} className={isPending ? "opacity-60" : undefined}>
            <CardContent className="flex flex-wrap items-center gap-4 py-4">
              {!showArchived && (
                <div className="flex flex-col">
                  <button
                    type="button"
                    aria-label={`Move ${course.title} up`}
                    disabled={index === 0 || isPending}
                    onClick={() => move(index, -1)}
                    className="p-1 text-neutral-text-muted hover:text-brand-navy disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${course.title} down`}
                    disabled={index === active.length - 1 || isPending}
                    onClick={() => move(index, 1)}
                    className="p-1 text-neutral-text-muted hover:text-brand-navy disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-brand-navy">{course.title}</span>
                  {course.published ? (
                    <Badge className="bg-green-600 hover:bg-green-700">Live</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                  {course.featured && <Badge variant="secondary">Featured</Badge>}
                  <Badge variant="outline">{course.issuingBody}</Badge>
                </div>
                <p className="mt-1 truncate text-sm text-neutral-text-muted">
                  /{course.slug} &middot; {course.level} &middot; ${course.priceUsd} &middot;{" "}
                  {course.duration}h
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {!course.archivedAt && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => run(() => setCoursePublished(course.rowId, !course.published))}
                    >
                      {course.published ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" /> Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" /> Publish
                        </>
                      )}
                    </Button>

                    {course.published && (
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/courses/${course.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View {course.title}</span>
                        </Link>
                      </Button>
                    )}

                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/courses/${course.rowId}`}>
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPending}
                      onClick={() => {
                        if (
                          confirm(
                            `Archive "${course.title}"?\n\nIt will be removed from the public site. You can restore it from the Archived tab.`
                          )
                        ) {
                          run(() => archiveCourse(course.rowId))
                        }
                      }}
                    >
                      <Archive className="h-4 w-4 mr-1" /> Archive
                    </Button>
                  </>
                )}

                {course.archivedAt && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => run(() => restoreCourse(course.rowId))}
                  >
                    <ArchiveRestore className="h-4 w-4 mr-1" /> Restore
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-neutral-text-muted">
        Courses are archived, never deleted, so their content stays recoverable. Restored
        courses come back as drafts.
      </p>
    </div>
  )
}
