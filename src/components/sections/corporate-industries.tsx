import { Container } from "@/components/container"

/**
 * Sector experience, as a compact table.
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
    <section className="border-b border-line bg-surface py-section-sm">
      <Container>
        <h2 className="text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] font-bold leading-tight tracking-[-0.03em] text-content-strong">Sector experience</h2>
        <p className="mt-4 max-w-measure text-[17px] leading-relaxed text-content-muted">
          Programme content is developed against the obligations specific to your sector.
        </p>

        <div className="mt-10 overflow-hidden rounded-sm border border-line bg-surface-raised"><div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              Sectors served and the regulatory obligations covered for each
            </caption>
            <thead>
              <tr className="bg-ink-950 text-content-on-dark">
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
                  className="border-b border-line align-top transition-colors duration-fast last:border-0 hover:bg-surface-sunken"
                >
                  <th
                    scope="row"
                    className="py-4 pl-6 pr-6 text-[17px] font-medium text-content-strong"
                  >
                    {row.sector}
                  </th>
                  <td className="py-4 pr-6 text-[17px] text-content-muted">{row.obligations}</td>
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
