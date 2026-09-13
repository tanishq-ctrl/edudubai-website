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
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-ink-950 text-white grain lg:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[30rem] w-[30rem] orb [--orb:rgb(var(--navy-700)/0.35)]" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 orb [--orb:rgb(var(--gold-400)/0.1)]" />
          <div className="absolute inset-0 bg-grid-navy bg-grid opacity-30" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
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
            <Quote aria-hidden="true" className="h-8 w-8 text-gold-400" />
            <p className="mt-6 font-display text-2xl leading-snug text-white">
              Completing the CCM certification through EduDubai was a turning point. The
              instructors are clearly practitioners, not just lecturers, which makes the GCI
              curriculum much easier to grasp.
            </p>
            <p className="mt-6 text-sm text-white/50">
              Priya Sharma · Risk &amp; Governance Manager
            </p>
          </div>

          <dl className="flex gap-10">
            {[
              { v: "2,500+", l: "Professionals trained" },
              { v: "12+", l: "Jurisdictions" },
              { v: "8+", l: "Certifications" },
            ].map((s) => (
              <div key={s.l}>
                <dd className="font-display text-2xl text-white">{s.v}</dd>
                <dt className="mt-1 text-2xs text-white/45">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-surface px-gutter py-16 lg:py-20">
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
            <h1 className="text-3xl ">{title}</h1>
            {subtitle ? <p className="mt-3 text-content-muted">{subtitle}</p> : null}
          </header>

          {children}

          {footer ? <div className="mt-8">{footer}</div> : null}
        </Reveal>
      </main>
    </div>
  )
}
