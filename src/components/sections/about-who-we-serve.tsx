import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, Shield, FileText, Briefcase } from "lucide-react"

const targetAudiences = [
  {
    icon: Users,
    title: "Front Line Officers & Branch Managers",
    subtitle: "First Line of Defense",
  },
  {
    icon: Building2,
    title: "Head Office Compliance & Risk Teams",
    subtitle: "Second Line of Defense",
  },
  {
    icon: Shield,
    title: "Internal Auditors",
    subtitle: "Third Line of Defense",
  },
  {
    icon: FileText,
    title: "Accounts & Finance Professionals",
  },
  {
    icon: Briefcase,
    title: "MLRO Professionals",
  },
]

const industries = [
  "Banking, Insurance, Custodial, and Investment Entities",
  "Virtual Asset Service Providers (VASPs)",
  "Exchange & Remittance Houses",
  "DNFBPs - Real Estate, Corporate Service Providers (CSPs), Law Firms, Chartered Accountants",
  "DPMS - Dealers in Precious Metals and Stones (Gold, Diamond and Jewellery)",
]

export function AboutWhoWeServe() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Who We Serve
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-3xl mx-auto text-justify">
          Our programs cater to a wide range of professionals and sectors:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {targetAudiences.map((audience, index) => {
          const Icon = audience.icon
          return (
            <Card
              key={index}
              className="border-2 border-neutral-border hover:border-brand-gold transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-navy/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{audience.title}</CardTitle>
                    {audience.subtitle && (
                      <p className="text-sm text-neutral-text-muted mt-1">
                        {audience.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="border-2 border-brand-gold/20 bg-gradient-to-br from-white to-brand-gold/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <Building2 className="h-6 w-6 text-brand-gold" />
            </div>
            <CardTitle className="text-2xl">MLRO Professionals in Industries</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {industries.map((industry, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                <p className="text-neutral-text leading-relaxed text-justify">{industry}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

