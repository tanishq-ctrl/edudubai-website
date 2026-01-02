import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, BookOpen, Building2 } from "lucide-react"

const credibilityBlocks = [
  {
    icon: Users,
    value: "10,000+",
    label: "Professionals Trained",
    description: "Trusted by thousands of professionals across industries",
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Courses Available",
    description: "Comprehensive curriculum covering all major domains",
  },
  {
    icon: Award,
    value: "95%",
    label: "Satisfaction Rate",
    description: "Consistently high ratings from our learners",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Corporate Clients",
    description: "Serving leading organizations across the region",
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

