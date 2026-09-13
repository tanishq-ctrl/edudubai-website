import { Container } from "@/components/container"

/**
 * Catalogue head — page-specific, deliberately NOT the shared PageHeroImage.
 *
 * On a browse page the catalogue is the hero: a full-height photograph would
 * push the thing the visitor came for below the fold. So this is a compact
 * navy band carrying only orientation and counts, sized to hand over to the
 * filter bar immediately.
 *
 * The filter bar itself straddles the boundary between this band and the grid
 * below (see page.tsx), which makes the control the visitor needs first the
 * most prominent object on the page.
 */

export function CoursesHero({
  total,
  bodies,
  hours,
}: {
  total: number
  bodies: number
  /** Span of programme lengths, e.g. "16-100". */
  hours: string
}) {
  const facts = [
    { value: total, label: total === 1 ? "programme" : "programmes" },
    { value: bodies, label: "issuing bodies" },
    { value: hours, label: "hours" },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pb-28 pt-[calc(var(--header-h)+3.5rem)] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(110%_90%_at_10%_0%,rgb(var(--navy-700)/0.9),transparent_62%),radial-gradient(90%_80%_at_100%_100%,rgb(var(--navy-800)/0.75),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="orb [--orb:rgb(var(--gold-400)/0.13)] pointer-events-none absolute -right-24 -top-32 -z-10 h-[30rem] w-[30rem]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain" />

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
              Professional certifications
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Accredited ACAMS and GCI programmes, delivered live by practising compliance
              professionals in line with each issuing body&rsquo;s examination blueprint.
            </p>
          </div>

          <dl className="flex shrink-0 gap-10">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tabular tracking-tight text-white">
                    {f.value}
                  </span>
                  <span className="mt-1 block text-2xs text-white/60">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
