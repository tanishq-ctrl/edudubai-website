import Link from "next/link"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Database, 
  Shield, 
  Briefcase, 
  DollarSign, 
  Users 
} from "lucide-react"

const categories = [
  {
    name: "Strategy & Consulting",
    icon: TrendingUp,
    count: 12,
    href: "/courses?category=strategy",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-100 to-pink-50",
    hoverGradient: "from-purple-200 to-pink-100",
    borderColor: "hover:border-purple-400",
  },
  {
    name: "Data & Analytics",
    icon: Database,
    count: 15,
    href: "/courses?category=data",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-100 to-cyan-50",
    hoverGradient: "from-blue-200 to-cyan-100",
    borderColor: "hover:border-blue-400",
  },
  {
    name: "Technology",
    icon: Shield,
    count: 18,
    href: "/courses?category=technology",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-100 to-violet-50",
    hoverGradient: "from-indigo-200 to-violet-100",
    borderColor: "hover:border-indigo-400",
  },
  {
    name: "Project Management",
    icon: Briefcase,
    count: 10,
    href: "/courses?category=project-management",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-100 to-teal-50",
    hoverGradient: "from-emerald-200 to-teal-100",
    borderColor: "hover:border-emerald-400",
  },
  {
    name: "Finance",
    icon: DollarSign,
    count: 14,
    href: "/courses?category=finance",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-100 to-orange-50",
    hoverGradient: "from-amber-200 to-orange-100",
    borderColor: "hover:border-amber-400",
  },
  {
    name: "Leadership",
    icon: Users,
    count: 8,
    href: "/courses?category=leadership",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-100 to-pink-50",
    hoverGradient: "from-rose-200 to-pink-100",
    borderColor: "hover:border-rose-400",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/80 relative overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-indigo-100/20"></div>
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Popular Categories
          </h2>
          <p className="text-lg md:text-xl text-neutral-text-muted max-w-2xl mx-auto">
            Explore courses across diverse professional domains
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className={`h-full hover:shadow-2xl transition-all duration-300 ${category.borderColor} border-2 border-neutral-border/50 cursor-pointer group bg-gradient-to-br from-white via-white/98 to-slate-50/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-1`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br ${category.bgGradient} p-4 rounded-xl group-hover:bg-gradient-to-br ${category.hoverGradient} transition-all shadow-md`}>
                        <Icon className={`h-7 w-7 group-hover:scale-110 transition-transform ${category.gradient.includes('purple') ? 'text-purple-600' : category.gradient.includes('blue') ? 'text-blue-600' : category.gradient.includes('indigo') ? 'text-indigo-600' : category.gradient.includes('emerald') ? 'text-emerald-600' : category.gradient.includes('amber') ? 'text-amber-600' : 'text-rose-600'}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold">
                        {category.count} courses
                      </Badge>
                    </div>
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block`}>
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

