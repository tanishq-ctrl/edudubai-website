import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Target, FileCheck, BarChart3 } from "lucide-react"

const pillars = [
  {
    icon: Shield,
    title: "Risk-Based Training",
    description:
      "Training programs designed around your organization's specific risk profile and compliance requirements.",
  },
  {
    icon: Target,
    title: "Sector-Specific",
    description:
      "Industry-tailored content for Oil & Gas, Construction, Real Estate, Financial Services, and more.",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready",
    description:
      "Comprehensive documentation and certification to demonstrate compliance readiness to regulators.",
  },
  {
    icon: BarChart3,
    title: "Measurable Outcomes",
    description:
      "Track progress, assess competency, and measure ROI with detailed analytics and reporting.",
  },
]

export function CorporatePillars() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Our Four Pillars
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          A comprehensive approach to corporate training excellence
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-all border-2 border-neutral-border hover:border-brand-gold"
            >
              <CardHeader>
                <div className="p-3 bg-brand-gold/10 rounded-lg w-fit mb-4">
                  <Icon className="h-6 w-6 text-brand-gold" />
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {pillar.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

