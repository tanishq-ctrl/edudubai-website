import { Container } from "@/components/container"

/**
 * Engagement process — a numbered sequence.
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
    <section className="relative isolate overflow-hidden border-b border-line bg-ink-950 py-section-sm text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(110%_90%_at_100%_0%,rgb(var(--navy-700)/0.85),transparent_62%),radial-gradient(90%_80%_at_0%_100%,rgb(var(--navy-800)/0.7),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="orb [--orb:rgb(var(--gold-400)/0.12)] pointer-events-none absolute -left-32 bottom-0 -z-10 h-96 w-96"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grain" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-white">Engagement process</h2>
            <p className="mt-4 text-white/70">
              Five stages, applied to every engagement from first scoping call through to the
              audit file.
            </p>
          </div>

          <ol className="lg:col-span-8">
            {stages.map((stage, i) => (
              <li
                key={stage.title}
                className="group relative grid gap-3 py-7 pl-10 sm:grid-cols-12 sm:gap-8"
              >
                {/* Connector: fades out on the final stage so the sequence ends. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[3px] top-0 w-px ${
                    i === stages.length - 1
                      ? "h-10 bg-gradient-to-b from-white/20 to-transparent"
                      : "h-full bg-white/12"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-9 h-[7px] w-[7px] rounded-full bg-gold-400 ring-4 ring-gold-400/15 transition-transform duration-slow ease-out-expo group-hover:scale-125"
                />
                <div className="sm:col-span-4">
                  <span className="text-xs font-semibold tabular text-gold-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white">
                    {stage.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-white/70 sm:col-span-8">
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
