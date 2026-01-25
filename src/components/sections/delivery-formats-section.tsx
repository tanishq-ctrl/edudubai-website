import { Container } from "@/components/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Video, BookOpen } from "lucide-react"

const formats = [
  {
    icon: MapPin,
    title: "In-Person",
    description: "Traditional classroom training with face-to-face interaction and hands-on learning.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100/50",
    borderColor: "hover:border-indigo-400",
    shadowColor: "hover:shadow-indigo-200/40",
  },
  {
    icon: Video,
    title: "Live Virtual",
    description: "Real-time online sessions with expert instructors, interactive discussions, and live Q&A.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100/50",
    borderColor: "hover:border-cyan-400",
    shadowColor: "hover:shadow-cyan-200/40",
  },
]

export function DeliveryFormatsSection() {
  return (
    <section className="py-12 md:py-16 bg-slate-50/50 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-navy mb-2">
            Flexible Delivery Formats
          </h2>
          <p className="text-base text-neutral-text-muted max-w-2xl mx-auto">
            Choose the learning format that best fits your schedule
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {formats.map((format) => {
            const Icon = format.icon
            return (
              <Card key={format.title} className={`hover:shadow-lg ${format.shadowColor} transition-all duration-300 border-2 border-neutral-border/50 ${format.borderColor} bg-white backdrop-blur-sm`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className={`${format.bgColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${format.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-neutral-text">{format.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-neutral-text">
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


