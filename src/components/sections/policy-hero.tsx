import { Container } from "@/components/container"
import { Reveal, SplitText } from "@/components/motion"

interface PolicyHeroProps {
  title: string
  lastUpdated?: string
}

/** Text-only hero for the policy pages -- no artwork, deliberately quiet. */
export function PolicyHero({ title, lastUpdated }: PolicyHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pb-section-sm pt-[calc(var(--header-h)+3rem)] text-white">

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade">
            <p className="mb-5 inline-flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.24em] text-gold-300">
              <span aria-hidden="true" className="h-px w-10 bg-gold-400/70" />
              Policies
            </p>
          </Reveal>

          <h1 className="text-3xl text-white sm:text-4xl">
            <SplitText text={title} as="span" className="block" />
          </h1>

          {lastUpdated ? (
            <Reveal variant="up" delay={220}>
              <p className="mt-5 text-sm text-white/55">{lastUpdated}</p>
            </Reveal>
          ) : null}
        </div>
      </Container>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gold-line opacity-50" />
    
      {/* The band ends on a rule, not a fade. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-crimson-600" />
    </section>
  )
}
