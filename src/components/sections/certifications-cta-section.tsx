import { ClipboardCheck } from "lucide-react"

import { Section } from "@/components/section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Reveal, SplitText, Spotlight } from "@/components/motion"

export function CertificationsCtaSection() {
  const whatsappMessage =
    "Hi, I'd like to schedule a readiness diagnostic to determine which certification path is right for me."

  return (
    <Section tone="navy" size="md" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 orb [--orb:rgb(var(--gold-400)/0.1)]" />
        <div className="absolute inset-0 bg-grid-navy bg-grid opacity-35" />
      </div>

      <Spotlight className="mx-auto max-w-3xl rounded-xl text-center">
        <Reveal variant="scale">
          <span
            aria-hidden="true"
            className="inline-flex h-16 w-16 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-gold-400"
          >
            <ClipboardCheck className="h-7 w-7" />
          </span>
        </Reveal>

        <h2 className="mt-8 text-3xl text-white sm:text-4xl">
          <SplitText text="Identify the right certification pathway" as="span" className="block" />
        </h2>

        <Reveal variant="up" delay={240}>
          <p className="mx-auto mt-6 max-w-measure text-lg leading-relaxed text-white/70">
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
          <p className="mt-8 text-2xs font-semibold uppercase tracking-[0.24em] text-white/35">
            Confidential · Response within one business day
          </p>
        </Reveal>
      </Spotlight>
    </Section>
  )
}
