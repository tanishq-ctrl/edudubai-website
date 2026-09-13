import { Container } from "@/components/container"

/**
 * Sector experience — a compact table.
 *
 * Six icon cards was the previous treatment and repeated the card pattern used
 * three other times on the page. A table carries more information per row (the
 * obligation that actually applies to each sector) in less space, which is what
 * a reader scanning for their own sector needs.
 */

const sectors: { sector: string; obligations: string }[] = [
  { sector: "Banking & financial services", obligations: "AML/CFT, sanctions, FATCA/CRS, conduct" },
  { sector: "Exchange & remittance houses", obligations: "Transaction monitoring, PEP and sanctions screening" },
  { sector: "Virtual asset service providers", obligations: "Travel rule, CARF readiness, cryptoasset typologies" },
  { sector: "Real estate & corporate services", obligations: "DNFBP obligations, UBO verification, source of funds" },
  { sector: "Precious metals & stones", obligations: "DPMS thresholds, cash controls, STR filing" },
  { sector: "Insurance & investment", obligations: "Customer due diligence, governance, internal audit" },
]

export function CorporateIndustries() {
  return (
    <section className="border-b border-line bg-surface py-section-md">
      <Container>
        <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-navy-900">Sector experience</h2>
        <p className="mt-4 max-w-measure text-content-muted">
          Programme content is developed against the obligations specific to your sector.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl bg-surface shadow-[0_24px_60px_-32px_rgb(var(--navy-900)/0.35)] ring-1 ring-navy-900/8"><div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              Sectors served and the regulatory obligations covered for each
            </caption>
            <thead>
              <tr className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
                <th scope="col" className="py-4 pl-6 pr-6 text-sm font-semibold">
                  Sector
                </th>
                <th scope="col" className="py-4 pr-6 text-sm font-semibold">
                  Obligations covered
                </th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((row) => (
                <tr
                  key={row.sector}
                  className="border-b border-line align-top transition-colors duration-fast last:border-0 hover:bg-gold-50/70"
                >
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-6 text-sm font-medium text-content-strong"
                  >
                    {row.sector}
                  </th>
                  <td className="py-4 pr-6 text-sm text-content-muted">{row.obligations}</td>
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
