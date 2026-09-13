import Link from "next/link"
import { ArrowUpRight, Clock, GraduationCap, MapPin, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { CourseImage } from "@/components/course-image"
import { cn } from "@/lib/utils"
import { Course } from "@/lib/types"

interface CourseCardProps {
  course: Course
  /** Priority-load the image for cards above the fold. */
  priority?: boolean
  className?: string
}

/**
 * Course tile.
 *
 * The whole card is one link via a stretched overlay rather than a nested
 * anchor plus a button: a card-inside-a-card link is invalid markup and gives
 * screen readers two targets for the same destination. The visible "View
 * details" affordance is decorative and marked aria-hidden.
 */
export function CourseCard({ course, priority = false, className }: CourseCardProps) {
  const live = course.deliveryModes.includes("LIVE_VIRTUAL")
  const inPerson = course.deliveryModes.includes("IN_PERSON")
  const format =
    live && inPerson
      ? { label: "Live + in-person", live: true }
      : live
        ? { label: "Live virtual", live: true }
        : inPerson
          ? { label: "In-person", live: false }
          : null

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface-raised",
        // Structure comes from the rule, not from a lift and a shadow: the
        // hover state darkens the border to crimson and nothing else.
        "transition-colors duration-fast ease-out-expo hover:border-crimson-600",
        "focus-within:border-crimson-600",
        className,
      )}
    >
      {course.imageUrl ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-950">
          <CourseImage
            src={course.imageUrl}
            alt=""
            fill
            priority={priority}
            className="object-cover object-[center_15%]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* The one permitted gradient: a scrim inside a photograph, there so
              the badge stays legible over any image. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/25"
          />

          {/* A credential mark, so the dot is gold rather than a status green. */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-content-strong">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-mark" />
            {course.issuingBody
              ? `${course.issuingBody.replace(/_/g, " ")} · Official curriculum`
              : "Official curriculum"}
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/*
           One line, always. Rendering a chip per delivery mode put three on a
           row that only fits two, so every card carried a ragged second line of
           metadata -- 61px of it -- before the title had even started. Most
           programmes run both formats, so the pair is stated once.
        */}
        <div className="flex items-center gap-2">
          <span className="truncate rounded-full bg-crimson-50 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-crimson-700">
            {course.category.replace(/_/g, " ")}
          </span>
          {format ? (
            <Badge
              variant={format.live ? "success" : "secondary"}
              className="shrink-0 whitespace-nowrap uppercase tracking-wider"
            >
              {format.live ? (
                <Video aria-hidden="true" className="h-3 w-3" />
              ) : (
                <MapPin aria-hidden="true" className="h-3 w-3" />
              )}
              {format.label}
            </Badge>
          ) : null}
        </div>

        <h3 className="mt-5 text-lg leading-snug transition-colors duration-fast group-hover:text-crimson-600">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
            <span className="line-clamp-3">{course.title}</span>
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 text-[17px] leading-relaxed text-content-muted">
          {course.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <dl className="flex items-center gap-5 text-xs font-medium text-content-muted">
            <div className="flex items-center gap-1.5">
              <Clock aria-hidden="true" className="h-3.5 w-3.5 text-content-subtle" />
              <dt className="sr-only">Duration</dt>
              <dd>{course.duration} hrs</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap aria-hidden="true" className="h-3.5 w-3.5 text-content-subtle" />
              <dt className="sr-only">Level</dt>
              <dd className="capitalize">{course.level.toLowerCase()}</dd>
            </div>
          </dl>

          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-content-muted transition-colors duration-fast ease-out-expo group-hover:border-crimson-600 group-hover:bg-crimson-600 group-hover:text-content-on-dark"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
