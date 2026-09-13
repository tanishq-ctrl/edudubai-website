import Link from "next/link"

import { Container } from "@/components/container"

/**
 * Role-to-pathway table.
 *
 * The grid answers "what do you offer"; it does not answer "which one applies
 * to me", which is the question a visitor scanning eight similar certifications
 * is actually asking. A table maps role to recommendation directly.
 */

const pathways: { role: string; rationale: string; code: string; slug: string }[] = [
  {
    role: "MLRO / Head of Compliance",
    rationale: "Enterprise-wide AML programme ownership and regulatory defence.",
    code: "CAMS",
    slug: "cams",
  },
  {
    role: "Sanctions officer",
    rationale: "Screening controls, escalation and OFAC/UN regime exposure.",
    code: "CGSS",
    slug: "certified-global-sanctions-specialist",
  },
  {
    role: "Compliance manager",
    rationale: "Governance, internal controls and regulatory reporting.",
    code: "CCM",
    slug: "certified-compliance-manager",
  },
  {
    role: "Finance / tax reporting",
    rationale: "Cross-border tax transparency and reporting obligations.",
    code: "FCS",
    slug: "fatca-crs-specialist",
  },
  {
    role: "Trade finance",
    rationale: "Trade-based laundering typologies and detection.",
    code: "TBML",
    slug: "trade-based-money-laundering",
  },
]

export function PathwayTable() {
  return (
    <section className="border-t border-line bg-surface-sunken py-section-md">
      <Container>
        <div className="max-w-measure">
          <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">
            Which pathway applies to your role
          </h2>
          <p className="mt-4 text-content-muted">
            If you are choosing between programmes, start from the responsibility you hold.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl bg-surface shadow-[0_24px_60px_-32px_rgb(var(--navy-900)/0.35)] ring-1 ring-navy-900/8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">
                Recommended certification for each compliance role
              </caption>
              <thead>
                <tr className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                  <th scope="col" className="py-4 pl-6 pr-6 text-sm font-semibold">
                    Role
                  </th>
                  <th scope="col" className="py-4 pr-6 text-sm font-semibold">
                    Why
                  </th>
                  <th scope="col" className="py-4 pr-6 text-sm font-semibold">
                    Programme
                  </th>
                </tr>
              </thead>
              <tbody>
                {pathways.map((p) => (
                  <tr
                    key={p.code}
                    className="border-b border-line align-middle transition-colors duration-fast last:border-0 hover:bg-gold-50/70"
                  >
                    <th
                      scope="row"
                      className="py-4 pl-6 pr-6 text-sm font-medium text-content-strong"
                    >
                      {p.role}
                    </th>
                    <td className="py-4 pr-6 text-sm text-content-muted">{p.rationale}</td>
                    <td className="py-4 pr-6">
                      <Link
                        href={`/courses/${p.slug}`}
                        className="inline-flex items-center rounded-full border border-gold-400 px-3.5 py-1.5 text-xs font-semibold text-gold-ink transition-colors duration-fast hover:bg-gold-400 hover:text-navy-900"
                      >
                        {p.code}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  )
}
