import { Container } from "@/components/container"

/**
 * Accreditation rail — the closing band of the hero field, not a separate
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
    <section className="relative isolate overflow-hidden bg-ink-950 pb-14 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(100%_120%_at_0%_0%,rgb(var(--navy-800)/0.9),rgb(var(--ink-950)))]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain" />

      <Container>
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        <div className="grid gap-8 pt-12 lg:grid-cols-12 lg:gap-12">
          <ul className="flex flex-col gap-3.5 lg:col-span-7">
            {accreditations.map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-sm text-white/80">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400 ring-4 ring-gold-400/15"
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
                  <span className="block text-2xl font-semibold tabular tracking-tight text-white">
                    {f.value}
                  </span>
                  <span className="mt-1 block text-2xs text-white/45">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
