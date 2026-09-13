import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"

import { Reveal } from "@/components/motion"

/**
 * Split-screen shell shared by every auth screen.
 *
 * The brand panel is hidden below `lg` rather than stacked: on a phone the
 * only thing that matters is the form, and pushing it below a decorative
 * panel would put the primary action off-screen on load.
 *
 * Two things were wrong here and both are fixed below. The shell claimed
 * `min-h-screen` from the top of the document while the site header is fixed
 * over it, so the panel's own wordmark rendered underneath the header and was
 * clipped. And the panel still carried the two `orb` washes and the navy grid
 * that were removed everywhere else in the re-theme, which is the surface
 * that read as generated. The ground is now a flat ink field with one crimson
 * hairline, and every measure is offset by `--header-h`.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div
      className="grid lg:grid-cols-2"
      style={{ minHeight: "calc(100svh - var(--header-h))", marginTop: "var(--header-h)" }}
    >
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-ink-950 text-white grain lg:block">
        {/* The band ends on a rule, not a glow. */}
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-px bg-crimson-600" />

        <div
          className="relative z-10 flex h-full flex-col justify-between"
          style={{ padding: "clamp(2rem, 0.5rem + 5svh, 4rem)" }}
        >
          <Link href="/" aria-label="EduDubai home" className="inline-block">
            <div className="relative h-10 w-36">
              <Image
                src="/edudubai-logo.png"
                alt="EduDubai"
                fill
                sizes="144px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          </Link>

          <div className="max-w-md">
            <Quote aria-hidden="true" className="h-7 w-7 text-crimson-300" />
            <p
              className="mt-5 font-display leading-snug text-white"
              style={{ fontSize: "clamp(1.125rem, 0.9rem + 0.6vw + 0.4svh, 1.5rem)" }}
            >
              Completing the CCM certification through EduDubai was a turning point. The
              instructors are clearly practitioners, not just lecturers, which makes the GCI
              curriculum much easier to grasp.
            </p>
            <p className="mt-5 text-sm text-white/70">
              Priya Sharma · Risk &amp; Governance Manager
            </p>
          </div>

          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { v: "2,500+", l: "Professionals trained" },
              { v: "12+", l: "Jurisdictions" },
              { v: "8+", l: "Certifications" },
            ].map((s) => (
              <div key={s.l}>
                <dd className="font-display text-2xl text-white">{s.v}</dd>
                <dt className="mt-1 text-2xs text-white/70">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      {/* Form panel */}
      <main
        className="flex items-center justify-center bg-surface px-gutter"
        style={{ paddingBlock: "clamp(2rem, 0.5rem + 5svh, 4.5rem)" }}
      >
        <Reveal variant="up" className="w-full max-w-[26rem]">
          <Link href="/" aria-label="EduDubai home" className="mb-10 inline-block lg:hidden">
            <div className="relative h-9 w-32">
              <Image
                src="/edudubai-logo.png"
                alt="EduDubai"
                fill
                sizes="128px"
                className="object-contain object-left"
                style={{ filter: "brightness(0)" }}
              />
            </div>
          </Link>

          <header className="mb-8">
            <h1 className="text-3xl tracking-tight">{title}</h1>
            {subtitle ? <p className="mt-3 text-content-muted">{subtitle}</p> : null}
          </header>

          {children}

          {footer ? <div className="mt-8">{footer}</div> : null}
        </Reveal>
      </main>
    </div>
  )
}
