"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, Download, GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ApplyNowDialog } from "@/components/apply-now-dialog"
import { Reveal, SplitText } from "@/components/motion"
import { Course } from "@/lib/types"

interface CourseHeroProps {
  course: Course
}

/* ===========================================================================
   Course detail hero.
   ---------------------------------------------------------------------------
   This hero was hand-tuned against a single 845px-tall viewport: fixed rem
   padding, fixed `mt-*` gaps, a `vw`-only type ramp and a photograph whose
   height was set by its aspect ratio alone. All of those are width-aware and
   height-blind, so below about 845px the specification strip and the buttons
   fell under the fold.

   Every vertical measure below is therefore a clamp with an `svh` term, in the
   same contract HeroShell documents: the whole hero fits from 620px to 1000px
   of viewport height at 1440px wide. The photograph is the thing that gives up
   space on a short screen; the actions never move. If you add a block here,
   give it an svh-aware clamp -- a fixed `mt-6` or a `vw`-only clamp puts the
   bug straight back.

   The ground is a flat ink field. The two radial orbs and the grid overlay it
   used to carry are gone and must not return.
   ========================================================================= */

const PAD_TOP = "calc(var(--header-h) + clamp(0.85rem, 0.2rem + 2.2svh, 2.25rem))"
const PAD_BOTTOM = "clamp(1.5rem, 0.5rem + 3.5svh, 3.25rem)"
const CRUMB_GAP = "clamp(0.75rem, 0.3rem + 1.6svh, 1.75rem)"
const STACK_GAP = "clamp(0.85rem, 0.35rem + 1.7svh, 1.6rem)"
const COL_GAP = "clamp(1.5rem, 0.6rem + 3svh, 2.75rem)"
/* Capped below the marketing heroes: course names are long ("Certified
   Anti-Money Laundering Specialist (CAMS)") and a document title should not be
   set like a campaign line. */
const TITLE_SIZE = "clamp(1.6rem, 0.9rem + 1.9vw + 1svh, 2.85rem)"
/* The photograph shrinks first, so the strip below it keeps its place. */
const MEDIA_HEIGHT = "clamp(9rem, 38svh, 26rem)"

/**
 * Per-course extras keyed by `Course.id`.
 *
 * NOTE: `id` maps from `legacy_id`, not the uuid primary key, and two courses
 * have an id that differs from their slug -- so these must stay keyed on id.
 */
const COURSE_SEALS: Record<string, { src: string; alt: string }> = {
  cgss: { src: "/images/badges/cgss-seal.png", alt: "CGSS exam preparation seal" },
  cams: { src: "/images/badges/cams-seal.png", alt: "CAMS exam preparation seal" },
  tbml: { src: "/images/badges/tbml-seal.png", alt: "TBML exam preparation seal" },
}

const COURSE_HANDBOOKS: Record<string, { href: string; filename: string; label: string }> = {
  cgss: { href: "/handbooks/cgss-handbook.pdf", filename: "CGSS-Handbook.pdf", label: "CGSS handbook" },
  cams: { href: "/handbooks/cams-handbook.pdf", filename: "CAMS-Handbook.pdf", label: "CAMS handbook" },
  tbml: { href: "/handbooks/tbml-handbook.pdf", filename: "TBML-Handbook.pdf", label: "TBML handbook" },
  "certified-compliance-manager": {
    href: "/handbooks/ccm-handbook.pdf",
    filename: "CCM-Handbook.pdf",
    label: "CCM handbook",
  },
}

export function CourseHero({ course }: CourseHeroProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about: ${course.title}`
  const seal = COURSE_SEALS[course.id]
  const handbook = COURSE_HANDBOOKS[course.id]
  const heroImage = course.heroImageUrl || course.imageUrl

  return (
    <section
      className="relative isolate overflow-hidden bg-ink-950 text-content-on-dark grain"
      style={{ paddingTop: PAD_TOP, paddingBottom: PAD_BOTTOM }}
    >
      <Container className="relative z-10">
        {/* Breadcrumb -- mirrors the BreadcrumbList JSON-LD on the page. */}
        <Reveal variant="fade">
          <nav aria-label="Breadcrumb" style={{ marginBottom: CRUMB_GAP }}>
            <ol className="flex flex-wrap items-center gap-1.5 text-2xs text-content-on-dark-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-crimson-ink">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="h-3 w-3" />
              <li>
                <Link href="/courses" className="transition-colors hover:text-crimson-ink">
                  Courses
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="h-3 w-3" />
              <li aria-current="page" className="truncate text-content-on-dark">
                {course.title}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div
          className="grid items-center lg:grid-cols-12"
          style={{ gap: COL_GAP }}
        >
          <div className="flex min-w-0 flex-col lg:col-span-7" style={{ gap: STACK_GAP }}>
            <Reveal variant="fade">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* A subject label, not a credential: it stays a neutral chip
                    so the gold seal remains the only credential mark here. */}
                <span className="rounded-full border border-white/20 px-3.5 py-1.5 text-2xs font-semibold uppercase tracking-wider text-content-on-dark">
                  {course.category.replace(/_/g, " ")}
                </span>
                {course.deliveryModes.map((mode) => (
                  <DeliveryFormatBadge key={mode} format={mode} />
                ))}
              </div>
            </Reveal>

            <div
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between"
              style={{ gap: STACK_GAP }}
            >
              <div className="flex min-w-0 max-w-2xl flex-col" style={{ gap: STACK_GAP }}>
                <h1
                  className="font-semibold tracking-tight text-content-on-dark"
                  style={{ fontSize: TITLE_SIZE, lineHeight: 1.08 }}
                >
                  <SplitText text={course.title} as="span" className="block" step={35} />
                </h1>
                <Reveal variant="up" delay={260}>
                  <p className="max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
                    {course.shortDescription}
                  </p>
                </Reveal>
              </div>

              {seal ? (
                <Reveal variant="fade" delay={200} className="shrink-0">
                  <Image
                    src={seal.src}
                    alt={seal.alt}
                    width={280}
                    height={280}
                    className="h-20 w-20 lg:h-28 lg:w-28"
                  />
                </Reveal>
              ) : null}
            </div>

            <Reveal variant="up" delay={340}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ApplyNowDialog
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  size="lg"
                  className="w-full sm:w-auto"
                />
                <WhatsAppButton
                  message={whatsappMessage}
                  source={`course_${course.slug}_hero`}
                  variant="outline-light"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Ask a question
                </WhatsAppButton>

                {handbook ? (
                  <Button asChild variant="ghost-light" size="lg" className="w-full sm:w-auto sm:px-4">
                    <a href={handbook.href} download={handbook.filename}>
                      <Download aria-hidden="true" className="h-4 w-4" />
                      {handbook.label}
                    </a>
                  </Button>
                ) : null}
              </div>
            </Reveal>

            <Reveal variant="up" delay={420}>
              {/* A solid panel, not a translucent one: `bg-white/[0.07]` glass
                  read as a smudge over the flat ground. */}
              <dl className="flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-3 rounded-sm border border-white/10 bg-ink-900 px-5 py-4">
                <div className="flex items-baseline gap-2.5">
                  <dt className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-crimson-ink">
                    <Clock aria-hidden="true" className="h-3 w-3" />
                    Duration
                  </dt>
                  <dd className="font-display text-base font-semibold text-content-on-dark">
                    {course.duration} hours
                  </dd>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <dt className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-crimson-ink">
                    <GraduationCap aria-hidden="true" className="h-3 w-3" />
                    Level
                  </dt>
                  <dd className="font-display text-base font-semibold capitalize text-content-on-dark">
                    {course.level.toLowerCase()}
                  </dd>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <dt className="text-2xs font-semibold uppercase tracking-[0.18em] text-crimson-ink">
                    Enrolment
                  </dt>
                  {/* Open enrolment is a live signal, which is the one thing
                      amber is for. A flat dot, no pulse ring. */}
                  <dd className="flex items-center gap-2 font-display text-base font-semibold text-content-on-dark">
                    Open
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {heroImage ? (
            <Reveal variant="fade" delay={200} className="min-w-0 lg:col-span-5">
              <div
                className="relative mx-auto aspect-[3/4] w-auto overflow-hidden rounded-sm border border-white/10"
                style={{ height: MEDIA_HEIGHT }}
              >
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 384px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>

      {/* The band ends on a rule, not a fade. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-crimson-600" />
    </section>
  )
}
