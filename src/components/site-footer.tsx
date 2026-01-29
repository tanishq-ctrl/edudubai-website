"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, BookOpen, Instagram, Linkedin, Youtube, Twitter, Facebook } from "lucide-react"
import { Container } from "@/components/container"
import { getWhatsAppLink } from "@/lib/whatsapp"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Certifications", href: "/certifications" },
  { name: "Corporate Training", href: "/corporate-training" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Become a Trainer", href: "/become-a-trainer" },
]

const policies = [
  { name: "Privacy Policy", href: "/policies#privacy" },
  { name: "Terms of Service", href: "/policies#terms" },
  { name: "Refund Policy", href: "/policies#refund" },
]

export function SiteFooter() {
  const [logoError, setLogoError] = useState(false)

  return (
    <footer className="bg-brand-navy text-white">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand-gold">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-brand-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand-gold">
                Policies
              </h3>
              <ul className="space-y-3">
                {policies.map((policy) => (
                  <li key={policy.name}>
                    <Link
                      href={policy.href}
                      className="text-white/80 hover:text-brand-gold transition-colors text-sm"
                    >
                      {policy.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-brand-gold">
                Get in Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-brand-gold mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium mb-1">Email</div>
                    <a
                      href="mailto:training@edudubai.org"
                      className="text-white/80 hover:text-brand-gold transition-colors text-sm"
                    >
                      training@edudubai.org
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-brand-gold mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Regional Support</div>
                    <div className="flex flex-col gap-1.5">
                      <a
                        href="tel:+919665642862"
                        className="text-white/80 hover:text-brand-gold transition-colors text-[13px] flex items-center gap-2"
                      >
                        <span className="text-[10px] font-black uppercase text-brand-gold/60 border border-brand-gold/20 px-1.5 rounded">India</span>
                        +91 96656 42862
                      </a>
                      <a
                        href="tel:+971503130946"
                        className="text-white/80 hover:text-brand-gold transition-colors text-[13px] flex items-center gap-2"
                      >
                        <span className="text-[10px] font-black uppercase text-brand-gold/60 border border-brand-gold/20 px-1.5 rounded">MENA</span>
                        +971 50 3130 946
                      </a>
                    </div>
                  </div>
                </li>
                {/* <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-brand-gold mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium mb-1">Location</div>
                    <div className="text-white/80 text-sm">Global / India</div>
                  </div>
                </li> */}
                <li>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
                  >
                    <span className="mr-2">💬</span>
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <div className="flex space-x-5 mt-4">
                    <a href="https://www.instagram.com/growwithedudubai/" aria-label="Instagram" className="text-white/70 hover:text-brand-gold transition-colors">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://www.linkedin.com/company/edudubai-india-mena/" aria-label="LinkedIn" className="text-white/70 hover:text-brand-gold transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a href="https://www.youtube.com/@Edudubai" aria-label="YouTube" className="text-white/70 hover:text-brand-gold transition-colors">
                      <Youtube className="h-6 w-6" />
                    </a>
                    <a href="https://x.com/EduDubai_off" aria-label="X (Twitter)" className="text-white/70 hover:text-brand-gold transition-colors">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61571238204920" aria-label="Facebook" className="text-white/70 hover:text-brand-gold transition-colors">
                      <Facebook className="h-6 w-6" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                {!logoError ? (
                  <div className="relative h-8 w-24">
                    <Image
                      src="/edudubai-logo.png"
                      alt="EduDubai"
                      fill
                      className="object-contain opacity-90 brightness-0 invert"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <BookOpen className="h-5 w-5 text-brand-gold" />
                )}
                <span className="text-sm text-white/80">
                  © {new Date().getFullYear()} EduDubai. All rights reserved.
                </span>
              </div>
              <div className="text-sm text-white/60">
                Premium Professional Education Platform
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

