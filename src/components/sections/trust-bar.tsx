"use client"

import { Container } from "@/components/container"
import { PartnerLogo } from "@/components/partner-logo"

// Financial institutions from the image
// Each partner has a name and an image path
// If image doesn't exist, it will fallback to text
const partners = [
  // Original 14 partners
  { name: "HSBC", imagePath: "/images/partners/hsbc.png" },
  { name: "Credit Suisse", imagePath: "/images/partners/credit-suisse.png" },
  { name: "ADCB", imagePath: "/images/partners/adcb.png" },
  { name: "MUFG", imagePath: "/images/partners/mufg.png" },
  { name: "Mizuho", imagePath: "/images/partners/mizuho.png" },
  { name: "Societe Generale", imagePath: "/images/partners/societe-generale.png" },
  { name: "Commonwealth Bank", imagePath: "/images/partners/commonwealth-bank.png" },
  { name: "Crédit Agricole", imagePath: "/images/partners/credit-agricole.png" },
  { name: "ICBC", imagePath: "/images/partners/icbc.png" },
  { name: "Agricultural Bank of China", imagePath: "/images/partners/abc.png" },
  { name: "Bank of America", imagePath: "/images/partners/bank-of-america.png" },
  { name: "Barclays", imagePath: "/images/partners/barclays.png" },
  { name: "GCI Australia", imagePath: "/images/partners/gci-australia.png" },
  { name: "Hock International", imagePath: "/images/partners/hock-international.png" },
  // Additional 20 partners - Global Banks
  { name: "JPMorgan Chase", imagePath: "/images/partners/jpmorgan-chase.png" },
  { name: "Standard Chartered", imagePath: "/images/partners/standard-chartered.png" },
  { name: "Deutsche Bank", imagePath: "/images/partners/deutsche-bank.png" },
  { name: "BNP Paribas", imagePath: "/images/partners/bnp-paribas.png" },
  { name: "Citibank", imagePath: "/images/partners/citibank.png" },
  { name: "UBS", imagePath: "/images/partners/ubs.png" },
  // Middle East & Gulf Region Banks
  { name: "Emirates NBD", imagePath: "/images/partners/emirates-nbd.png" },
  { name: "First Abu Dhabi Bank", imagePath: "/images/partners/fab.png" },
  { name: "Dubai Islamic Bank", imagePath: "/images/partners/dib.png" },
  { name: "Qatar National Bank", imagePath: "/images/partners/qnb.png" },
  { name: "Mashreq Bank", imagePath: "/images/partners/mashreq.png" },
  // Compliance & Professional Organizations
  { name: "ACAMS", imagePath: "/images/partners/acams.png" },
  { name: "ICA", imagePath: "/images/partners/ica.png" },
  // Technology & Compliance Software
  { name: "Refinitiv", imagePath: "/images/partners/refinitiv.png" },
  { name: "LexisNexis", imagePath: "/images/partners/lexisnexis.png" },
  // Exchange Houses & FinTech
  { name: "Al Ansari Exchange", imagePath: "/images/partners/al-ansari.png" },
  { name: "Global Exchange", imagePath: "/images/partners/uae-exchange.png" },
]

export function TrustBar() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-br from-neutral-bg-subtle via-slate-50 to-neutral-bg border-y border-neutral-border/50 overflow-hidden relative">
      {/* Subtle brand-aligned gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/5 via-transparent to-brand-gold/5"></div>
      <Container className="relative z-10">
        <div className="text-center mb-4">
          <p className="text-sm md:text-base font-bold text-brand-navy uppercase tracking-wide">
            Trusted by AML & Compliance Professionals Worldwide
          </p>
        </div>

        {/* Infinite scrolling logo banner */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            <div className="flex items-center gap-12 flex-shrink-0">
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="opacity-100 transition-all duration-300 hover:scale-105"
                >
                  <PartnerLogo
                    src={partner.imagePath}
                    alt={partner.name}
                  />
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-12 flex-shrink-0" aria-hidden="true">
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="opacity-100 transition-all duration-300 hover:scale-105"
                >
                  <PartnerLogo
                    src={partner.imagePath}
                    alt={partner.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
