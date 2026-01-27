import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, BookOpen, Building2 } from "lucide-react"

const credibilityBlocks = [
  {
    icon: Users,
    value: "2,500+",
    label: "Certified Specialists",
    description: "Professionals trained and certified through our intensive programs",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: Award,
    value: "8+",
    label: "Elite Certifications",
    description: "Industry-recognized credentials from ACAMS, GCI, and more",
    gradient: "from-amber-600 to-orange-600",
  },
  {
    icon: Building2,
    value: "850+",
    label: "Professional Sessions",
    description: "High-impact training sessions delivered across global financial markets",
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    icon: BookOpen,
    value: "12+",
    label: "Global Jurisdictions",
    description: "Serving specialists across international regulatory hubs and global markets",
    gradient: "from-emerald-600 to-teal-600",
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
              className="text-center border-2 border-neutral-border/50 hover:border-brand-gold transition-all duration-300 hover:shadow-xl group bg-white/50 backdrop-blur-sm"
            >
              <CardContent className="pt-8 pb-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-neutral-bg-subtle rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`h-7 w-7 bg-gradient-to-br ${block.gradient} bg-clip-text`} style={{ color: block.gradient.split(' ')[0].replace('from-', '') }} />
                  </div>
                </div>
                <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-br ${block.gradient} bg-clip-text text-transparent mb-3 tracking-tight`}>
                  {block.value}
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-brand-navy mb-4">
                  {block.label}
                </div>
                <div className="text-[11px] leading-relaxed text-neutral-text-muted font-medium px-4">
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

