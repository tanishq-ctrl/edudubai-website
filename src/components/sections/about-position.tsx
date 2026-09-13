import { Section, Eyebrow } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

const supporting = [
  {
    title: "Built by practitioners",
    body: "Our faculty are serving MLROs, heads of compliance and former regulators. Case material comes from live enforcement actions, not textbook scenarios.",
  },
  {
    title: "Accredited where it counts",
    body: "Programmes map to ACAMS, GCI and partner-body credentials, so the certificate carries weight with the regulator as well as the employer.",
  },
]

/**
 * The page's argument, stated once at full size.
 *
 * /about previously went straight from hero to a ten-card grid, so the site
 * never said why it teaches the way it does. This band exists to make that
 * claim before any list of capabilities.
 *
 * The label column is narrow and the statement wide on purpose -- an even
 * split would read as a two-column layout rather than as an aside next to a
 * statement.
 */
export function AboutPosition() {
  return (
    <Section tone="deep" size="sm">
      <div className="grid gap-12 lg:grid-cols-[11rem_1fr] lg:gap-20">
        <Reveal variant="fade">
          <Eyebrow marker="dot">Our position</Eyebrow>
        </Reveal>

        <div>
          <Reveal variant="up">
            <p className="max-w-measure-lg font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
              Programmes are designed around the decisions a compliance professional
              has to make.
            </p>
          </Reveal>

          <Reveal variant="up" delay={110}>
            <p className="mt-7 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
              Every EduDubai programme starts from the decision a professional actually has to
              make, then works backwards to the regulation behind it.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2" step={110} variant="up">
            {supporting.map((item) => (
              <div key={item.title} className="panel-dark rounded-sm p-7">
                <h3 className="text-lg text-content-on-dark">{item.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-content-on-dark-muted">{item.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}
