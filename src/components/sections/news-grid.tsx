import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  Globe2,
  ShieldCheck,
  Layers,
  Cpu,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const highlights = [
  { icon: Globe2, label: "GCC & Middle East Coverage" },
  { icon: ShieldCheck, label: "ISO/IEC 27001 & EU GDPR" },
  { icon: Layers, label: "End-to-End Compliance Lifecycle" },
  { icon: Cpu, label: "Gen AI Training for Banks" },
]

export function NewsGrid() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-neutral-bg-subtle via-slate-50 to-neutral-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/5 via-transparent to-brand-gold/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">

        {/* Press Release Card */}
        <Card className="border-2 border-neutral-border/50 shadow-xl bg-white/80 backdrop-blur-sm max-w-5xl mx-auto overflow-hidden">
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-gold" />

          <CardContent className="p-8 md:p-12">

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-full">
                Strategic Partnership
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-text-muted">
                <CalendarDays className="h-3.5 w-3.5" />
                April 2, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-text-muted">
                <MapPin className="h-3.5 w-3.5" />
                Washington, D.C. &amp; Dubai
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-3xl md:text-4xl lg:text-[44px] font-black text-brand-navy leading-tight mb-3">
              Trans World Compliance and Edu-Dubai Announce Strategic Partnership
            </h3>
            <p className="text-brand-gold font-semibold text-base md:text-lg mb-8 leading-snug">
              Delivering End-to-End Tax Regulatory Compliance Capability Across the Middle East and Beyond
            </p>

            {/* Partnership visual */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-10 border border-neutral-border/40 shadow-sm">
              <Image
                src="/images/twc-edudubai-partnership.png"
                alt="Trans World Compliance and Edu-Dubai Connected Compliance Partnership"
                width={1200}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Body */}
            <div className="space-y-5 text-neutral-text leading-relaxed text-[15px] text-justify mb-10">
              <p>
                <strong className="text-brand-navy font-bold">Trans World Compliance (TWC)</strong>, headquartered in Washington, D.C., USA, a global provider of regulatory reporting software for financial institutions, tax authorities, and governments, and{" "}
                <strong className="text-brand-navy font-bold">Edu-Dubai</strong>, a premier regulatory compliance training and consulting firm serving professionals across India, the Middle East, and global markets, today announced a strategic partnership to deliver integrated compliance capability to financial institutions across the region.
              </p>
              <p>
                The partnership unites two deeply complementary organizations. Edu-Dubai equips compliance professionals with globally recognized certifications and bespoke corporate training and consulting spanning FATCA, CRS, Taxation, AML, sanctions, and regulatory governance, and role-based Generative AI (Gen AI) training tailored for banking professionals. TWC provides the technology that translates that expertise into accurate, automated regulatory reporting. Together, they address the full compliance lifecycle, covering everything from mastering regulatory expertise and rules to executing them with precision, into a single, connected compliance solution that provides policies, procedures, training, and regulatory reporting.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-neutral-border/60 mb-10" />

            {/* Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* David Olenzak — TWC */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-border/40 bg-white">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-navy rounded-l-2xl" />
                <div className="p-7 pl-8">
                  {/* Author row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-full bg-brand-navy flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-sm">DO</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-brand-navy leading-tight">David Olenzak</p>
                      <p className="text-[11px] text-neutral-text-muted leading-tight">President &amp; Founder, Trans World Compliance</p>
                    </div>
                  </div>
                  {/* Decorative quote mark */}
                  <div className="text-[80px] leading-none font-black text-brand-navy/8 select-none -mt-2 mb-1">&ldquo;</div>
                  <p className="text-[14px] italic text-neutral-text leading-relaxed -mt-6">
                    Financial institutions in the region face growing pressure to meet international tax transparency standards, and doing so requires both knowledgeable teams and reliable technology. Edu-Dubai has built an exceptional reputation for developing compliance professionals across the GCC and beyond. This partnership allows us to extend our reach in the Middle East while ensuring that the institutions we serve have access to both the human expertise and the reporting infrastructure they need.
                  </p>
                </div>
              </div>

              {/* Sonali Prabhu — Edu-Dubai */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-gold/30 bg-white">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold rounded-l-2xl" />
                <div className="p-7 pl-8">
                  {/* Author row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-navy font-black text-sm">SP</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-brand-navy leading-tight">Sonali Prabhu</p>
                      <p className="text-[11px] text-neutral-text-muted leading-tight">CEO &amp; Founder, Edu-Dubai</p>
                    </div>
                  </div>
                  {/* Decorative quote mark */}
                  <div className="text-[80px] leading-none font-black text-brand-gold/15 select-none -mt-2 mb-1">&ldquo;</div>
                  <p className="text-[14px] italic text-neutral-text leading-relaxed -mt-6">
                    Regulatory reporting is the operational reality that follows everything our clients learn. Partnering with TWC gives our network of trained professionals, and the institutions they represent, a trusted path to putting that knowledge into practice. This is a natural fit.
                  </p>
                </div>
              </div>
            </div>

            {/* Continuation */}
            <p className="text-neutral-text leading-relaxed text-[15px] text-justify mb-10">
              The Middle East has become an increasingly critical jurisdiction for international tax compliance. As CRS, FATCA, and emerging frameworks such as CARF continue to take hold across the region, financial institutions face intensifying scrutiny to demonstrate both competency and operational readiness. The TWC and Edu-Dubai partnership addresses that challenge directly, combining regulatory expertise, professional development, and proven reporting technology into a single, connected offering.
            </p>

            {/* Key highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl border-2 border-neutral-border/50 bg-white hover:border-brand-gold hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 bg-neutral-bg-subtle rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-brand-navy" />
                  </div>
                  <span className="text-xs font-bold text-brand-navy/80 leading-snug">{label}</span>
                </div>
              ))}
            </div>

            {/* Compliance standards */}
            <div className="rounded-2xl bg-brand-navy p-6 md:p-8 mb-10">
              <h4 className="text-white font-black text-lg mb-2">
                Compliance &amp; Data Security Standards
              </h4>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                TWC&apos;s regulatory reporting platform is built on globally recognized security and privacy frameworks, ensuring the highest standards of data protection and regulatory integrity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["ISO/IEC 27001 Compliant", "EU GDPR Compliant"].map((s) => (
                  <div key={s} className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold flex-shrink-0" />
                    <span className="text-white font-semibold text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="rounded-2xl border-2 border-neutral-border/50 bg-white p-6 hover:border-brand-gold hover:shadow-lg transition-all duration-300">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-3">
                  About Trans World Compliance
                </p>
                <p className="text-[13px] text-neutral-text leading-relaxed text-justify mb-4">
                  Trans World Compliance is a specialist provider of regulatory reporting solutions for financial institutions, tax authorities, and governments worldwide. Its flagship products, CRS/FATCA One and TACS (Tax Authority Compliance Suite), support compliance with CRS, FATCA, and CARF. TWC works with clients across multiple jurisdictions to simplify complex reporting obligations and reduce compliance risk.
                </p>
                <a
                  href="https://www.transworldcompliance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-navy hover:text-brand-gold transition-colors underline underline-offset-2"
                >
                  www.transworldcompliance.com
                </a>
              </div>

              <div className="rounded-2xl border-2 border-neutral-border/50 bg-white p-6 hover:border-brand-gold hover:shadow-lg transition-all duration-300">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-3">
                  About Edu-Dubai
                </p>
                <p className="text-[13px] text-neutral-text leading-relaxed text-justify mb-4">
                  Edu-Dubai is a premier compliance training and consulting organisation serving professionals and organisations across India, the Middle East, and global markets. As the authorised Training Partner for GCI and affiliated with HOCK International, Edu-Dubai delivers globally recognised certifications in CAMS, CMA, CIA, Enrolled Agent, AML, FATCA/CRS, CARF, sanctions, and regulatory governance.
                </p>
                <a
                  href="https://www.edudubai.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-navy hover:text-brand-gold transition-colors underline underline-offset-2"
                >
                  www.edudubai.org
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-border/50">
              <div>
                <p className="text-sm font-bold text-brand-navy mb-1">
                  Ready to put knowledge into practice?
                </p>
                <p className="text-xs text-neutral-text-muted">
                  Explore our compliance certifications and corporate training programmes.
                </p>
              </div>
              <Button
                asChild
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-semibold shrink-0 group"
              >
                <Link href="/courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

          </CardContent>
        </Card>

      </Container>
    </section>
  )
}
