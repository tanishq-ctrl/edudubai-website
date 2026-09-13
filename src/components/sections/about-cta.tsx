import Link from "next/link"

import { Section, Eyebrow } from "@/components/section"
import { Reveal } from "@/components/motion"

/**
 * Closing band for /about.
 *
 * Not `CorporateCTASection`. That one is navy and centred, which would follow
 * the navy credentials strip with a second navy block and land the page on the
 * same centred-conversion pattern every other page ends with.
 *
 * This is the one light band on an otherwise dark page, and it is saved for
 * last deliberately: after six dark bands the gold reads as arrival rather
 * than decoration.
 */
export function AboutCta() {
  return (
    <Section
      tone="transparent"
      size="md"
      className="bg-gradient-to-b from-gold-400 to-gold-200 text-navy-900"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <div>
          <Reveal variant="fade">
            {/* --gold-ink resolves against the light ground here, so the
                eyebrow stays legible without an override. */}
            <Eyebrow marker="dot" className="text-gold-700">
              Corporate training
            </Eyebrow>
          </Reveal>

          <Reveal variant="up" delay={70}>
            <h2 className="mt-6 max-w-measure-sm text-4xl tracking-tight text-navy-900 sm:text-5xl">
              Train a team, not a person.
            </h2>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy-900/75">
              Cohort programmes delivered in-house, mapped to your risk assessment and your
              regulator.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={210}>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full border-[1.5px] border-transparent bg-navy-900 px-8 py-4 text-center text-base font-semibold text-white transition-colors duration-slow ease-out-expo hover:bg-navy-800"
            >
              Request a proposal
            </Link>
            <Link
              href="/courses"
              className="whitespace-nowrap rounded-full border-[1.5px] border-navy-900/30 px-8 py-4 text-center text-base font-medium text-navy-900 transition-colors duration-slow ease-out-expo hover:border-navy-900/60"
            >
              Browse the catalogue
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
