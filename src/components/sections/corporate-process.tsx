import { Card, CardContent } from "@/components/ui/card"
import { Search, Settings, Play, CheckCircle2, FileText } from "lucide-react"

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "We analyze your training needs, risk profile, and compliance requirements",
  },
  {
    icon: Settings,
    title: "Customize",
    description: "Our experts design a tailored program aligned with your objectives",
  },
  {
    icon: Play,
    title: "Deliver",
    description: "Flexible delivery through in-person, live virtual, or self-paced formats",
  },
  {
    icon: CheckCircle2,
    title: "Assess",
    description: "Comprehensive evaluation to measure competency and knowledge retention",
  },
  {
    icon: FileText,
    title: "Report",
    description: "Detailed analytics and certification documentation for audit readiness",
  },
]

export function CorporateProcess() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Our Process
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          A proven methodology for delivering exceptional corporate training
        </p>
      </div>
      <div className="relative">
        {/* Timeline line - hidden on mobile, visible on desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-brand-gold transform -translate-y-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <Card className="hover:shadow-lg transition-all border-2 border-neutral-border hover:border-brand-gold h-full">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="p-4 bg-brand-gold/10 rounded-full">
                          <Icon className="h-6 w-6 text-brand-gold" />
                        </div>
                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 bg-brand-navy text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-brand-navy mb-2 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-text-muted">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

