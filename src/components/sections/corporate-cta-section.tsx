import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion"

const outcomes = [
  "Scoped to your institutional risk assessment",
  "Delivered live across multiple jurisdictions",
  "Attendance and completion reporting for audit",
]

/**
 * Closing conversion band for organisations, before the footer.
 *
 * This is the homepage's ONE crimson field, and it is here rather than higher
 * up because this is the band that carries the decision. Everything above it
 * alternates paper / ink / sunken, so the brand colour arrives once, at full
 * strength, instead of being sprinkled over every section.
 *
 * Because the ground is crimson, the primary action cannot also be crimson.
 * It uses the Button `secondary` variant, which is the paper-coloured fill in
 * the same component, rather than hand-rolled classes: a paper button on a
 * crimson field reads as the primary here, and `outline-light` sits beside it.
 *
 * Removed: the radial glow, the grid tile, the cursor-following spotlight and
 * the magnetic pull on the button. A flat field, a rule, and a button that
 * stays where the reader put their cursor.
 */
export function CorporateCTASection() {
  return (
    <Section tone="crimson" size="sm">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal variant="fade">
          <p className="inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.24em] text-content-on-dark/80">
            <span aria-hidden="true" className="h-px w-10 bg-content-on-dark/45" />
            For organisations
          </p>
        </Reveal>

        <Reveal variant="up" delay={80}>
          <h2 className="mt-6 text-4xl tracking-tight text-content-on-dark sm:text-5xl">
            <span className="block">Institution-wide</span>
            <span className="block">compliance training.</span>
          </h2>
        </Reveal>

        <Reveal variant="up" delay={160}>
          <p className="mx-auto mt-6 max-w-measure text-[17px] leading-relaxed text-content-on-dark/85">
            Customised AML, sanctions and governance programmes for compliance functions in the
            GCC, India and international markets.
          </p>
        </Reveal>

        <Reveal variant="up" delay={220}>
          <ul className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {outcomes.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-content-on-dark/85">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-content-on-dark/60"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="up" delay={280}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" variant="secondary">
              <Link href="/corporate-training">
                Corporate programmes
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline-light">
              <Link href="/contact">Request a proposal</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
