import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Reveal, Magnetic, SplitText, Spotlight } from "@/components/motion"

const outcomes = [
  "Scoped to your institutional risk assessment",
  "Delivered live across multiple jurisdictions",
  "Attendance and completion reporting for audit",
]

/** Closing conversion band for organisations, before the footer. */
export function CorporateCTASection() {
  return (
    <Section tone="navy" size="md" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[52rem] -translate-x-1/2 orb [--orb:rgb(var(--gold-400)/0.1)]" />
        <div className="absolute inset-0 bg-grid-navy bg-grid opacity-40" />
      </div>

      <Spotlight className="mx-auto max-w-4xl rounded-xl text-center">
        <Reveal variant="fade">
          <p className="inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.24em] text-gold-300">
            <span aria-hidden="true" className="h-px w-10 bg-gold-400/70" />
            For organisations
            <span aria-hidden="true" className="h-px w-10 bg-gold-400/70" />
          </p>
        </Reveal>

        <h2 className="mt-6 text-4xl text-white sm:text-5xl">
          <SplitText text="Institution-wide" as="span" className="block" />
          <SplitText
            text="compliance training."
            as="span"
            className="block text-gold-300"
            delay={160}
          />
        </h2>

        <Reveal variant="up" delay={240}>
          <p className="mx-auto mt-6 max-w-measure text-lg text-white/75">
            Customised AML, sanctions and governance programmes for compliance functions in the
            GCC, India and international markets.
          </p>
        </Reveal>

        <Reveal variant="up" delay={320}>
          <ul className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {outcomes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/65">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="up" delay={400}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild size="xl" variant="gold">
                <Link href="/corporate-training">
                  Corporate programmes
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="xl" variant="outline-light">
              <Link href="/contact">Request a proposal</Link>
            </Button>
          </div>
        </Reveal>
      </Spotlight>
    </Section>
  )
}
