import type { Metadata } from "next"

import { CorporateHero } from "./corporate-hero"
import { CorporateProof } from "./corporate-proof"
import { CorporatePillars } from "@/components/sections/corporate-pillars"
import { CorporateIndustries } from "@/components/sections/corporate-industries"
import { CorporateProcess } from "@/components/sections/corporate-process"
import { CorporateLeadForm } from "@/components/corporate-lead-form"
import { Container } from "@/components/container"
import { CorporateTrainingPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "Corporate Compliance Training",
  description:
    "Compliance, risk and governance training for regulated institutions. Programmes scoped against your risk assessment and evidenced for supervisory review.",
  alternates: { canonical: "/corporate-training" },
}

/**
 * The single corporate page. `/corporate` 301s here (see next.config.js).
 *
 * Structure follows the Trust & Authority order for a B2B audience —
 * mission/credibility, then proof, then the solution, then one clear CTA path.
 *
 * Each section deliberately uses a DIFFERENT structural device: a
 * specification table, an accreditation list, a definition list, a data table,
 * a numbered sequence, then the form. Previously every section on every page
 * was the same eyebrow/title/lead heading over a grid of identical cards,
 * which is what made the site read as templated.
 */
export default function CorporateTrainingPage() {
  return (
    <>
      <CorporateTrainingPageClient />

      <CorporateHero />
      <CorporateProof />
      <CorporatePillars />
      <CorporateIndustries />
      <CorporateProcess />

      {/* One CTA path, at the end, where a scoping conversation belongs. */}
      <section
        id="request-proposal"
        className="relative isolate scroll-mt-24 overflow-hidden border-b border-gold-400/25 bg-gradient-to-b from-gold-50 via-gold-50 to-surface py-section-sm"
      >
        <div
          aria-hidden="true"
          className="orb [--orb:rgb(var(--gold-400)/0.16)] pointer-events-none absolute -right-24 -top-24 -z-10 h-[28rem] w-[28rem]"
        />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">Request a proposal</h2>
              <p className="mt-5 leading-relaxed text-content">
                Tell us the sector, the cohort and the obligation you need covered. A
                specialist will respond within one business day with scope, scheduling and
                fees.
              </p>
              <p className="mt-8 border-t border-gold-400/30 pt-6 text-sm text-content">
                Prefer to talk first? Call{" "}
                <a
                  href="tel:+971503130946"
                  className="font-medium text-navy-700 underline underline-offset-4"
                >
                  +971 50 3130 946
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:training@edudubai.org"
                  className="font-medium text-navy-700 underline underline-offset-4"
                >
                  training@edudubai.org
                </a>
                .
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl bg-surface p-7 shadow-[0_40px_80px_-40px_rgb(var(--navy-900)/0.45)] ring-1 ring-navy-900/8 sm:p-9">
                <CorporateLeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
