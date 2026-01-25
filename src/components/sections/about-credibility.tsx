import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, BookOpen, Building2 } from "lucide-react"

const credibilityBlocks = [
  {
    icon: Users,
    value: "12,400+",
    label: "Certified Specialists",
    description: "Empowering the next generation of compliance leaders in MENA",
  },
  {
    icon: BookOpen,
    value: "42+",
    label: "Global Programs",
    description: "Authorized curriculum for ACAMS, GCI, and Regulatory bodies",
  },
  {
    icon: Award,
    value: "92%",
    label: "Exam Pass Rate",
    description: "Industry-leading first-time success for rigorous certifications",
  },
  {
    icon: Building2,
    value: "250+",
    label: "Banking Partners",
    description: "Trusted by leading GCC financial institutions and law firms",
  },
]

export function AboutCredibility() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Our Track Record
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          Proven results and trusted by professionals and organizations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {credibilityBlocks.map((block, index) => {
          const Icon = block.icon
          return (
            <Card
              key={index}
              className="text-center border-2 border-neutral-border hover:border-brand-gold transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <Icon className="h-8 w-8 text-brand-gold" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                  {block.value}
                </div>
                <div className="text-sm font-semibold text-brand-navy mb-2">
                  {block.label}
                </div>
                <div className="text-xs text-neutral-text-muted">
                  {block.description}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

