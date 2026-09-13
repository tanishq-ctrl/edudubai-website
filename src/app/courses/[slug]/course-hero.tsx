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

/**
 * Per-course extras keyed by `Course.id`.
 *
 * NOTE: `id` maps from `legacy_id`, not the uuid primary key, and two courses
 * have an id that differs from their slug -- so these must stay keyed on id.
 * Previously each entry was a copy-pasted JSX block per course.
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
    <section className="relative isolate overflow-hidden bg-ink-950 pb-section-sm pt-[calc(var(--header-h)+2.5rem)] text-white grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] orb [--orb:rgb(var(--gold-400)/0.08)]" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 orb [--orb:rgb(var(--navy-700)/0.35)]" />
        <div className="absolute inset-0 bg-grid-navy bg-grid opacity-30" />
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb -- mirrors the BreadcrumbList JSON-LD on the page. */}
        <Reveal variant="fade">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-2xs text-white/45">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-300">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="h-3 w-3" />
              <li>
                <Link href="/courses" className="transition-colors hover:text-gold-300">
                  Courses
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="h-3 w-3" />
              <li aria-current="page" className="truncate text-white/70">
                {course.title}
              </li>
            </ol>
          </nav>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-gold-400 px-3.5 py-1.5 text-2xs font-bold uppercase tracking-wider text-navy-900">
                  {course.category.replace(/_/g, " ")}
                </span>
                {course.deliveryModes.map((mode) => (
                  <DeliveryFormatBadge key={mode} format={mode} />
                ))}
              </div>
            </Reveal>

            <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                {/* Capped one step below the marketing heroes: course names
                    are long ("Certified Anti-Money Laundering Specialist
                    (CAMS)") and ran to four lines at the larger size. */}
                <h1 className="text-3xl text-white sm:text-4xl">
                  <SplitText text={course.title} as="span" className="block" step={35} />
                </h1>
                <Reveal variant="up" delay={260}>
                  <p className="mt-5 text-lg leading-relaxed text-white/70">
                    {course.shortDescription}
                  </p>
                </Reveal>
              </div>

              {seal ? (
                <Reveal variant="scale" delay={200}>
                  <Image
                    src={seal.src}
                    alt={seal.alt}
                    width={280}
                    height={280}
                    className="h-28 w-28 shrink-0 animate-float drop-shadow-2xl lg:h-44 lg:w-44"
                  />
                </Reveal>
              ) : null}
            </div>

            <Reveal variant="up" delay={340}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ApplyNowDialog
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  size="xl"
                  className="w-full sm:w-auto"
                />
                <WhatsAppButton
                  message={whatsappMessage}
                  source={`course_${course.slug}_hero`}
                  variant="outline-light"
                  size="xl"
                  className="w-full sm:w-auto"
                >
                  Ask a question
                </WhatsAppButton>

                {handbook ? (
                  <Button asChild variant="ghost-light" size="xl" className="w-full sm:w-auto">
                    <a href={handbook.href} download={handbook.filename}>
                      <Download aria-hidden="true" className="h-4 w-4" />
                      {handbook.label}
                    </a>
                  </Button>
                ) : null}
              </div>
            </Reveal>

            <Reveal variant="up" delay={420}>
              <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 rounded-lg border border-white/10 bg-white/[0.07] p-6 sm:grid-cols-3">
                <div>
                  <dt className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                    <Clock aria-hidden="true" className="h-3 w-3" />
                    Duration
                  </dt>
                  <dd className="mt-2 font-display text-xl text-white">{course.duration} hours</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                    <GraduationCap aria-hidden="true" className="h-3 w-3" />
                    Level
                  </dt>
                  <dd className="mt-2 font-display text-xl capitalize text-white">
                    {course.level.toLowerCase()}
                  </dd>
                </div>
                <div>
                  <dt className="text-2xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                    Enrolment
                  </dt>
                  <dd className="mt-2 flex items-center gap-2 font-display text-xl text-white">
                    Open
                    <span aria-hidden="true" className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {heroImage ? (
            <Reveal variant="scale" delay={200} className="lg:col-span-5">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[24rem] overflow-hidden rounded-xl shadow-xl ring-1 ring-white/12">
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

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gold-line opacity-50" />
    </section>
  )
}
