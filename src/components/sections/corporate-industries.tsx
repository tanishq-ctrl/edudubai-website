import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Fuel,
  Building2,
  Home,
  Truck,
  Banknote,
  Heart,
} from "lucide-react"

const industries = [
  {
    icon: Fuel,
    title: "Oil & Gas",
    description: "Compliance and risk management for energy sector operations",
  },
  {
    icon: Building2,
    title: "Construction",
    description: "Regulatory compliance and safety training for construction firms",
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "AML compliance and due diligence for property transactions",
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Trade finance compliance and supply chain risk management",
  },
  {
    icon: Banknote,
    title: "Financial Services",
    description: "Comprehensive AML, sanctions, and regulatory training",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Compliance and risk management for healthcare organizations",
  },
]

export function CorporateIndustries() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Industry Expertise
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          Specialized training solutions across key sectors
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((industry, index) => {
          const Icon = industry.icon
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all border-2 border-neutral-border hover:border-brand-gold"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-brand-navy/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-navy" />
                  </div>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-text-muted">{industry.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

