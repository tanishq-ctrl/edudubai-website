"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react"

import { Container } from "@/components/container"
import { Reveal } from "@/components/motion"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const columns: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: "Learn",
    links: [
      { name: "All Courses", href: "/courses" },
      { name: "Exam preparation", href: "/courses" },
      { name: "Events", href: "/events" },
      { name: "CARF Diagnostic", href: "/tools/carf" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Corporate Training", href: "/corporate-training" },
      { name: "Become a Trainer", href: "/become-a-trainer" },
      { name: "News", href: "/news" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/policies/privacy" },
      { name: "Terms of Service", href: "/policies/terms" },
      { name: "Refund Policy", href: "/policies/refund" },
    ],
  },
]

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/growwithedudubai/", Icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/edudubai-india-mena/", Icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/@Edudubai", Icon: Youtube },
  { name: "X", href: "https://x.com/EduDubai_off", Icon: Twitter },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61571238204920", Icon: Facebook },
]

const phones = [
  { region: "India", display: "+91 96656 42862", href: "tel:+919665642862" },
  { region: "MENA", display: "+971 50 3130 946", href: "tel:+971503130946" },
]

export function SiteFooter() {
  const [logoError, setLogoError] = React.useState(false)
  const pathname = usePathname()

  /* The dashboard is an app shell: a marketing footer under a signed-in
     workspace is chrome the reader did not ask for. See SiteHeader. */
  if (pathname.startsWith("/dashboard")) return null

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-content-on-dark grain">
      {/* Ambient wash: keeps a very large flat dark area from reading as dead. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      </div>

      <Container>
        {/* ---------------- Closing CTA ---------------- */}
        <Reveal variant="up">
          <div className="flex flex-col gap-8 border-b border-white/10 py-section-sm lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-measure-sm">
              <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-300">
                Advisory
              </p>
              <h2 className="mt-4 text-3xl text-white sm:text-4xl">
                Speak to an advisor
              </h2>
              <p className="mt-4 text-content-on-dark-muted">
                Our advisors will help you identify the certification pathway appropriate to your
                role, seniority and jurisdiction.
              </p>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gold-400 px-7 py-4 font-semibold text-navy-900 transition-all duration-slow ease-out-expo hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-gold"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Speak to an advisor
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>

        {/* ---------------- Link grid ---------------- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-section-sm md:grid-cols-3 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" aria-label="EduDubai home" className="inline-block">
              {!logoError ? (
                <div className="relative h-10 w-36">
                  <Image
                    src="/edudubai-logo.png"
                    alt="EduDubai"
                    fill
                    sizes="144px"
                    className="object-contain object-left brightness-0 invert"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <span className="font-display text-2xl font-semibold text-white">
                  Edu<span className="text-gold-400">Dubai</span>
                </span>
              )}
            </Link>

            <p className="mt-5 max-w-measure-xs text-sm leading-relaxed text-content-on-dark-muted">
              Accredited AML, sanctions and financial crime certification training for compliance
              professionals in regulated institutions worldwide.
            </p>

            <ul className="mt-7 flex gap-2">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/65 transition-all duration-slow ease-out-expo hover:-translate-y-0.5 hover:border-gold-400/50 hover:bg-white/10 hover:text-gold-300"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <h3 className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-300">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <h3 className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-300">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href="mailto:training@edudubai.org"
                  className="group flex items-start gap-2.5 text-sm text-content-on-dark-muted transition-colors hover:text-gold-300"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <span className="break-all">training@edudubai.org</span>
                </a>
              </li>
              {phones.map((p) => (
                <li key={p.region}>
                  <a
                    href={p.href}
                    className="group flex items-start gap-2.5 text-sm text-content-on-dark-muted transition-colors hover:text-gold-300"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                    <span className="flex flex-col">
                      <span className="text-2xs font-semibold uppercase tracking-widest text-white/60">
                        {p.region}
                      </span>
                      {p.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- Baseline ---------------- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/45 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} EduDubai. All rights reserved.</p>
          <p className="text-white/60">Accredited compliance education for regulated institutions.</p>
        </div>
      </Container>
    </footer>
  )
}

/** Link with a gold rule that wipes in from the left on hover. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block py-1 text-sm text-content-on-dark-muted",
        "transition-colors duration-fast hover:text-white",
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold-400 transition-transform duration-slow ease-out-expo group-hover:scale-x-100"
      />
    </Link>
  )
}
