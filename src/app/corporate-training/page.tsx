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
 * Structure follows the trust and authority order for a B2B audience:
 * mission and credibility, then proof, then the solution, then one CTA path.
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
        className="relative isolate scroll-mt-24 border-t border-line bg-surface-sunken py-section-sm"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-content-strong">Request a proposal</h2>
              <p className="mt-5 max-w-measure text-[17px] leading-relaxed text-content">
                Tell us the sector, the cohort and the obligation you need covered. A
                specialist will respond within one business day with scope, scheduling and
                fees.
              </p>
              <p className="mt-8 max-w-measure border-t border-line pt-6 text-[17px] leading-relaxed text-content">
                Prefer to talk first? Call{" "}
                <a
                  href="tel:+971503130946"
                  className="font-medium text-crimson-600 underline underline-offset-4"
                >
                  +971 50 3130 946
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:training@edudubai.org"
                  className="font-medium text-crimson-600 underline underline-offset-4"
                >
                  training@edudubai.org
                </a>
                .
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-sm border border-line bg-surface-raised p-7 sm:p-9">
                <CorporateLeadForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
