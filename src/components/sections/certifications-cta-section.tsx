import { ClipboardCheck } from "lucide-react"

import { Section } from "@/components/section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Reveal, SplitText } from "@/components/motion"

/**
 * Closing call to action for the catalogue.
 *
 * A flat ink band. It used to carry a radial gold "orb", a grid overlay and a
 * pointer-following Spotlight glow: three layers of light with no source,
 * which is the single strongest generated-looking device on the site. The
 * band now gets its structure from value and from a single crimson rule.
 */
export function CertificationsCtaSection() {
  const whatsappMessage =
    "Hi, I'd like to schedule a readiness diagnostic to determine which certification path is right for me."

  return (
    <Section tone="ink" size="sm">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal variant="fade">
          <span
            aria-hidden="true"
            className="inline-flex h-14 w-14 items-center justify-center rounded-sm border border-white/10 bg-ink-900 text-gold-400"
          >
            <ClipboardCheck className="h-6 w-6" />
          </span>
        </Reveal>

        <h2 className="mt-8 text-3xl text-content-on-dark sm:text-4xl">
          <SplitText text="Identify the right certification pathway" as="span" className="block" />
        </h2>

        <Reveal variant="up" delay={240}>
          <p className="mx-auto mt-6 max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
            Request a readiness assessment. An advisor will review your experience, role and
            jurisdiction, then recommend the appropriate certification pathway.
          </p>
        </Reveal>

        <Reveal variant="up" delay={330}>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton
              message={whatsappMessage}
              source="certifications_cta"
              variant="gold"
              size="xl"
            />
          </div>
        </Reveal>

        <Reveal variant="fade" delay={420}>
          <p className="mx-auto mt-8 inline-block border-t border-white/10 pt-5 text-2xs font-semibold uppercase tracking-[0.24em] text-content-on-dark-muted">
            Confidential · Response within one business day
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
