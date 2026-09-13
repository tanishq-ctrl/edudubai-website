import { Container } from "@/components/container"

/**
 * Catalogue head, page-specific and deliberately NOT the shared page hero.
 *
 * On a browse page the catalogue is the hero: a full-height photograph would
 * push the thing the visitor came for below the fold. So this is a compact
 * flat ink band carrying only orientation and counts, sized to hand over to
 * the filter bar immediately.
 *
 * The ground is a flat field. It used to be two stacked radial gradients with
 * a gold orb floating over them; light with no source over a colour with no
 * edge is the strongest generated-looking device there is. Do not put it back.
 *
 * Every vertical measure carries an svh term so the band, the standfirst and
 * the figures all clear the fold from 620px to 1000px of viewport height.
 */

/** Both width AND height terms, so a short viewport shrinks the title. */
const TITLE_SIZE = "clamp(1.9rem, 1rem + 2.2vw + 1.2svh, 3.25rem)"

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
    <section
      className="relative isolate overflow-hidden bg-ink-950 text-content-on-dark grain"
      style={{
        paddingTop: "calc(var(--header-h) + clamp(1.25rem, 0.3rem + 3.5svh, 3rem))",
        paddingBottom: "clamp(2rem, 0.8rem + 4.5svh, 4.5rem)",
      }}
    >
      <Container>
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16"
          style={{ gap: "clamp(1.25rem, 0.5rem + 2.5svh, 2rem)" }}
        >
          <div className="max-w-2xl">
            <h1
              className="font-semibold tracking-tight text-content-on-dark"
              style={{ fontSize: TITLE_SIZE, lineHeight: 1.06 }}
            >
              Professional certifications
            </h1>
            <p
              className="max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted"
              style={{ marginTop: "clamp(0.75rem, 0.3rem + 1.5svh, 1.25rem)" }}
            >
              Accredited ACAMS and GCI programmes, delivered live by practising compliance
              professionals in line with each issuing body&rsquo;s examination blueprint.
            </p>
          </div>

          <dl className="flex shrink-0 gap-10">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tabular tracking-tight text-content-on-dark">
                    {f.value}
                  </span>
                  <span className="mt-1 block text-2xs uppercase tracking-[0.18em] text-content-on-dark-muted">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* The band ends on a rule, not a fade. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-crimson-600" />
    </section>
  )
}
