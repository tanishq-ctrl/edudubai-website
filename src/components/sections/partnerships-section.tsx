import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck } from "lucide-react"

import { Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Reveal, TiltCard } from "@/components/motion"

type Partner = {
  name: string
  logo: string
  title: string
  blurb: string
  points: string[]
  cta: { text: string; href: string }
}

const partners: Partner[] = [
  {
    name: "GCI Global Compliance Institute",
    logo: "/images/partners/gci-australia.png",
    title: "Global Compliance Institute",
    blurb:
      "As the authorised MENA partner for the Global Compliance Institute, EduDubai delivers its full suite of specialised compliance certifications, covering AML, sanctions and KYC with an operational focus appropriate to supervised institutions.",
    points: ["Authorised training centre", "Official examination preparation", "Certified instructors"],
    cta: { text: "Explore GCI courses", href: "/courses?body=GCI" },
  },
  {
    name: "HOCK International",
    logo: "/images/partners/hock-international.png",
    title: "HOCK International",
    blurb:
      "EduDubai partners with HOCK International to deliver CMA preparation, combining HOCK study materials, video library and examination software with live classroom instruction.",
    points: ["CMA exam specialists", "Comprehensive study suite", "PassMap™ technology"],
    // The original markup rendered this button with no link at all -- a dead
    // control. Routed to the enquiry page, which is where CMA details live.
    cta: { text: "View CMA details", href: "/contact" },
  },
]

export function PartnershipsSection() {
  return (
    <Section tone="paper" size="md" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-[28rem] w-[28rem] orb [--orb:rgb(var(--navy-700)/0.05)]" />
        <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] orb [--orb:rgb(var(--gold-400)/0.05)]" />
      </div>

      <SectionHeading
        eyebrow="Accreditations"
        title="Authorised training partnerships"
        lead="EduDubai is an authorised training partner to international certification bodies. Candidates study the official curriculum on which the examination is based."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {partners.map((partner, i) => (
          <Reveal key={partner.name} variant="up" delay={i * 130}>
            <TiltCard className="h-full rounded-lg">
              <article className="group flex h-full flex-col rounded-lg border border-line bg-surface-raised p-8 shadow-sm transition-all duration-slow ease-out-expo hover:border-gold-400/50 hover:shadow-lg sm:p-10">
                <header className="flex items-start justify-between gap-6">
                  <div className="relative h-14 w-44">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="176px"
                      className="object-contain object-left"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/12 text-gold-mark"
                  >
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </header>

                <h3 className="mt-8 text-2xl ">{partner.title}</h3>

                <p className="mt-4 flex-grow leading-relaxed text-content-muted">{partner.blurb}</p>

                <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
                  {partner.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-content">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Button asChild variant="default" size="lg" className="mt-8 w-full">
                  <Link href={partner.cta.href}>
                    {partner.cta.text}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
