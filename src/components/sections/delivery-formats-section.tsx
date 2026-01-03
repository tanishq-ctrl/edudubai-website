import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Video, BookOpen } from "lucide-react"

const formats = [
  {
    icon: MapPin,
    title: "In-Person",
    description: "Traditional classroom training with face-to-face interaction and hands-on learning experiences.",
    color: "text-indigo-600",
    bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-50",
    borderColor: "hover:border-indigo-400",
    shadowColor: "hover:shadow-indigo-200/40",
  },
  {
    icon: Video,
    title: "Live Virtual",
    description: "Real-time online sessions with expert instructors, interactive discussions, and live Q&A.",
    color: "text-cyan-600",
    bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-50",
    borderColor: "hover:border-cyan-400",
    shadowColor: "hover:shadow-cyan-200/40",
  },
  {
    icon: BookOpen,
    title: "Self-Paced eLearning",
    description: "Learn at your own pace with comprehensive course materials, videos, and assessments available 24/7.",
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-50",
    borderColor: "hover:border-emerald-400",
    shadowColor: "hover:shadow-emerald-200/40",
  },
]

export function DeliveryFormatsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/80 relative overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-indigo-100/20"></div>
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            Flexible Delivery Formats
          </h2>
          <p className="text-lg md:text-xl text-neutral-text-muted max-w-2xl mx-auto">
            Choose the learning format that best fits your schedule and learning style
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formats.map((format) => {
            const Icon = format.icon
            return (
              <Card key={format.title} className={`hover:shadow-2xl ${format.shadowColor} transition-all duration-300 border-2 border-neutral-border/50 ${format.borderColor} bg-gradient-to-br from-white via-white/98 to-slate-50/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-2`}>
                <CardHeader>
                  <div className={`${format.bgColor} w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className={`h-10 w-10 ${format.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{format.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-neutral-text">
                    {format.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

