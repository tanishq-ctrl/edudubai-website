import { Container } from "@/components/container"

/**
 * Accreditation rail: the closing band of the hero field, not a separate
 * white strip.
 *
 * Proof belongs where credibility is being established. As its own pale band
 * between the hero and the body it read as filler; sitting on the same dark
 * field, under a hairline, it reads as the footnote to the specification.
 */

const accreditations = [
  "Authorised Training Partner, Global Compliance Institute",
  "ACAMS examination preparation provider",
  "Affiliated training provider, HOCK International",
]

const figures = [
  { value: "2,500+", label: "professionals trained" },
  { value: "850+", label: "sessions delivered" },
  { value: "12", label: "jurisdictions" },
]

export function CorporateProof() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink-950 text-content-on-dark grain"
      style={{ paddingBottom: "clamp(1.25rem, 0.4rem + 2.6svh, 3.5rem)" }}
    >
      <Container>
        <div aria-hidden="true" className="h-px w-full bg-white/12" />

        <div
          className="grid lg:grid-cols-12 lg:gap-12"
          style={{
            paddingTop: "clamp(1.25rem, 0.4rem + 2.6svh, 3rem)",
            gap: "clamp(1rem, 0.4rem + 1.8svh, 2rem)",
          }}
        >
          <ul
            className="flex flex-col lg:col-span-7"
            style={{ gap: "clamp(0.5rem, 0.2rem + 0.9svh, 0.875rem)" }}
          >
            {accreditations.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-[17px] text-content-on-dark">
                <span
                  aria-hidden="true"
                  className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-crimson-ink"
                />
                {item}
              </li>
            ))}
          </ul>

          <dl className="flex gap-10 lg:col-span-5 lg:justify-end">
            {figures.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tabular tracking-tight text-content-on-dark">
                    {f.value}
                  </span>
                  <span className="mt-1 block text-2xs uppercase tracking-[0.14em] text-content-on-dark-muted">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
