import { Container } from "@/components/container"

/**
 * What we deliver — rendered as a definition list, not a card grid.
 *
 * Four identical rounded cards with the same radius, shadow and hover-lift is
 * the default treatment and it appeared on every section of every page. The
 * content here is four defined terms, so a definition list is both the honest
 * structure and visually distinct from the sections around it.
 */

const pillars: { term: string; definition: string }[] = [
  {
    term: "Risk-based scoping",
    definition:
      "Programmes are built against your organisation's own risk assessment and regulatory obligations, not a standard syllabus.",
  },
  {
    term: "Sector-specific content",
    definition:
      "Material is written to the obligations of your sector, with typologies and case studies drawn from it.",
  },
  {
    term: "Audit-ready evidence",
    definition:
      "Attendance, completion and competency records are issued in a form that withstands supervisory review.",
  },
  {
    term: "Measurable outcomes",
    definition:
      "Pre- and post-assessment establishes competency movement rather than attendance alone.",
  },
]

export function CorporatePillars() {
  return (
    <section className="relative border-b border-line bg-surface-sunken py-section-sm">
      {/* Hairline that ties the band to the dark field above it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">
              What we deliver
            </h2>
            <p className="mt-5 text-content-muted">
              Four commitments that hold on every engagement, regardless of sector or cohort
              size.
            </p>
          </div>

          <dl className="lg:col-span-8">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.term}
                className="group grid gap-3 border-t border-line py-8 transition-colors duration-slow ease-out-expo hover:border-gold-400/50 sm:grid-cols-12 sm:gap-8"
              >
                <dt className="sm:col-span-5">
                  <span
                    aria-hidden="true"
                    className="block text-xs font-semibold tabular text-gold-ink"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block text-lg font-semibold tracking-tight text-navy-900">
                    {pillar.term}
                  </span>
                </dt>
                <dd className="leading-relaxed text-content-muted sm:col-span-7">
                  {pillar.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
