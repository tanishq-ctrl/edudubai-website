import { Container } from "@/components/container"

/**
 * Engagement process, as a numbered sequence.
 *
 * Numbered markers are a generic device when applied to content that is not
 * ordered. Here the five stages genuinely are a sequence, each depending on the
 * one before, so the numbering carries real information and a left rule shows
 * the progression.
 */

const stages: { title: string; detail: string }[] = [
  {
    title: "Scoping",
    detail:
      "We review your risk assessment, supervisory correspondence and existing training record to establish what the programme must cover.",
  },
  {
    title: "Design",
    detail:
      "A specialist drafts the curriculum, case studies and assessment against that scope, for your review before scheduling.",
  },
  {
    title: "Delivery",
    detail:
      "Sessions run in-person, live virtual or blended, scheduled around operational cover across your jurisdictions.",
  },
  {
    title: "Assessment",
    detail:
      "Pre- and post-assessment evidences competency movement, with remediation for participants who do not meet the threshold.",
  },
  {
    title: "Reporting",
    detail:
      "You receive attendance, completion and competency documentation in a form suitable for supervisory inspection.",
  },
]

export function CorporateProcess() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-section-sm text-content-on-dark grain">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-content-on-dark">Engagement process</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-content-on-dark-muted">
              Five stages, applied to every engagement from first scoping call through to the
              audit file.
            </p>
          </div>

          <ol className="lg:col-span-8">
            {stages.map((stage, i) => (
              <li
                key={stage.title}
                className="relative grid gap-3 py-7 pl-10 sm:grid-cols-12 sm:gap-8"
              >
                {/* Connector: fades out on the final stage so the sequence ends. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[3px] top-0 w-px bg-white/12 ${
                    i === stages.length - 1 ? "h-9" : "h-full"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-9 h-[7px] w-[7px] rounded-full bg-crimson-ink"
                />
                <div className="sm:col-span-4">
                  <span className="text-xs font-semibold tabular text-crimson-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-content-on-dark">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-[17px] leading-relaxed text-content-on-dark-muted sm:col-span-8">
                  {stage.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
