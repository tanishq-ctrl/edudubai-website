import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"
import { CheckCircle, CalendarDays, MapPin, Globe2, ShieldCheck, Layers, Cpu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function NewsGrid() {
  return (
    <Section tone="sunken" size="md">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-1.5 text-2xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
              Press Release
            </span>
            <div className="text-xs text-content-muted">
              Strategic Partnership Announcement
            </div>
          </div>

          <Reveal variant="up">
          <article className="bg-surface-raised rounded-xl border border-line shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-navy-800 via-navy-600 to-gold-400" />
            <div className="px-8 py-10 md:px-12 md:py-14">
              <h2 className="text-2xl sm:text-3xl mb-4">
                Trans World Compliance and Edu-Dubai Announce Strategic Partnership
              </h2>
              <div className="flex flex-wrap gap-4 text-xs text-content-muted mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  April 7, 2026
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Washington, D.C. &amp; Dubai
                </span>
              </div>
              <p className="text-lg text-gold-ink mb-10 leading-snug">
                Delivering End-to-End Tax Regulatory Compliance Capability Across the Middle East and Beyond
              </p>

              <div className="relative w-full rounded-lg overflow-hidden mb-10 border border-line shadow-sm">
                <Image
                  src="/images/twc-edudubai-partnership.png"
                  alt="Trans World Compliance and Edu-Dubai Connected Compliance Partnership"
                  width={1200}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="max-w-none text-content space-y-6 leading-relaxed">
                <p>
                  <strong className="text-brand-navy">Trans World Compliance (TWC)</strong>, headquartered in Washington, D.C., USA, a global provider of regulatory reporting software for financial institutions, tax authorities, and governments, and <strong className="text-brand-navy">Edu-Dubai</strong>, a premier regulatory compliance training and consulting firm serving professionals across India, the Middle East, and global markets, today announced a strategic partnership to deliver integrated compliance capability to financial institutions across the region.
                </p>
                <p>
                  The partnership unites two deeply complementary organizations. Edu-Dubai equips compliance professionals with globally recognized certifications and bespoke corporate training and consulting spanning FATCA, CRS, Taxation, AML, sanctions, and regulatory governance, and role-based Generative AI (Gen AI) training tailored for banking professionals. TWC provides the technology that translates that expertise into accurate, automated regulatory reporting. Together, they address the full compliance lifecycle -- from mastering the regulatory expertise and rules to executing them with precision -- into a single, connected compliance solution that provides policies, procedures, training, and regulatory reporting.
                </p>
              </div>

              <div className="my-12 h-px bg-line" />

              <div className="grid gap-6 md:grid-cols-2 mb-12">
                <blockquote className="order-1 md:order-2 relative bg-surface-raised rounded-lg p-6 border border-line shadow-sm">
                  <p className="text-base italic text-content leading-relaxed mb-5">
                    &ldquo;Regulatory reporting is the operational reality that follows everything our clients learn. Partnering with TWC gives our network of trained professionals — and the institutions they represent — a trusted path to putting that knowledge into practice. This is a natural fit.&rdquo;
                  </p>
                  <footer className="text-sm text-content-muted">
                    — <span className="font-semibold text-content-strong">Sonali Prabhu</span>, CEO &amp; Founder, Edu-Dubai
                  </footer>
                </blockquote>

                <blockquote className="order-2 md:order-1 relative bg-surface-raised rounded-lg p-6 border border-line shadow-sm">
                  <p className="text-base italic text-content leading-relaxed mb-5">
                    &ldquo;Financial institutions in the region face growing pressure to meet international tax transparency standards, and doing so requires both knowledgeable teams and reliable technology. Edu-Dubai has built an exceptional reputation for developing compliance professionals across the GCC and beyond. This partnership allows us to extend our reach in the Middle East while ensuring that the institutions we serve have access to both the human expertise and the reporting infrastructure they need.&rdquo;
                  </p>
                  <footer className="text-sm text-content-muted">
                    — <span className="font-semibold text-content-strong">David Olenzak</span>, President &amp; Founder, Trans World Compliance
                  </footer>
                </blockquote>
              </div>

              <p className="text-content leading-relaxed mb-10">
                The Middle East has become an increasingly critical jurisdiction for international tax compliance. As CRS, FATCA, and emerging frameworks such as CARF continue to take hold across the region, financial institutions face intensifying scrutiny to demonstrate both competency and operational readiness. The TWC - Edu-Dubai partnership addresses that challenge directly by combining regulatory expertise, professional development, and proven reporting technology into a single, connected offering.
              </p>

              <div className="rounded-lg border border-line bg-surface-sunken p-6 md:p-8 mb-10">
                <h3 className="text-lg mb-2">
                  Compliance &amp; Data Security Standards
                </h3>
                <p className="text-sm text-content-muted mb-6">
                  TWC&apos;s regulatory reporting platform is built on globally recognized security and privacy frameworks, ensuring the highest standards of data protection and regulatory integrity.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "ISO/IEC 27001 Compliant",
                    "EU GDPR Compliant",
                  ].map((standard) => (
                    <div key={standard} className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-raised px-4 py-3">
                      <CheckCircle className="h-5 w-5 text-gold-mark flex-shrink-0" />
                      <span className="text-sm font-medium text-content-strong">{standard}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-10">
                <div className="rounded-lg border border-line bg-surface-raised p-6">
                  <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-ink mb-3">About Trans World Compliance</p>
                  <p className="text-sm text-content leading-relaxed">
                    Trans World Compliance is a specialist provider of regulatory reporting solutions for financial institutions, tax authorities, and governments worldwide. Its flagship products -- CRS/FATCA One and TACS (Tax Authority Compliance Suite) -- support compliance with international tax transparency frameworks including CRS, FATCA, and CARF. TWC works with clients across multiple jurisdictions to simplify complex reporting obligations and reduce compliance risk. Learn more at{" "}
                    <a className="text-navy-700 underline" href="https://www.transworldcompliance.com" target="_blank" rel="noopener noreferrer">www.transworldcompliance.com</a>.
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-surface-raised p-6">
                  <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-ink mb-3">About Edu-Dubai</p>
                  <p className="text-sm text-content leading-relaxed">
                    Edu-Dubai is a premier compliance training and consulting organisation serving professionals and organisations across India, the Middle East, and global markets. As the authorised Training Partner for the Global Compliance Institute (GCI) and an affiliated training provider with HOCK International, Edu-Dubai delivers globally recognised certifications and bespoke corporate training programmes in CAMS, CMA, CIA, Enrolled Agent, AML, FATCA/CRS, CARF, sanctions, and regulatory governance. Learn more at{" "}
                    <a className="text-navy-700 underline" href="https://www.edudubai.org" target="_blank" rel="noopener noreferrer">www.edudubai.org</a>.
                  </p>
                </div>
              </div>

              <div className="mt-10 mb-12">
                <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-ink mb-4">Key Highlights</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "GCC & Middle East coverage", icon: Globe2 },
                    { label: "ISO/IEC 27001 & EU GDPR", icon: ShieldCheck },
                    { label: "End-to-end compliance lifecycle", icon: Layers },
                    { label: "Gen AI training for banks", icon: Cpu },
                  ].map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3 rounded-lg border border-line bg-surface-raised px-4 py-3">
                      <div className="h-9 w-9 rounded-full bg-navy-900 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-gold-300" />
                      </div>
                      <span className="text-sm font-medium text-content">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="rounded-lg border border-line bg-surface-raised px-6 py-5">
                  <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-ink mb-2">Primary Action</p>
                  <p className="text-sm text-content-muted">Explore what this partnership unlocks for your team.</p>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center group rounded-full bg-navy-700 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-slow ease-out-expo hover:-translate-y-0.5 hover:bg-navy-600 hover:shadow-lg"
                >
                  Explore Compliance Training
                </Link>
              </div>
            </div>
          </article>
          </Reveal>
        </div>
    </Section>
  )
}
