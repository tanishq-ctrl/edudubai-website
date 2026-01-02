import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { Course } from "@/lib/types"
import { MapPin, Video, BookOpen } from "lucide-react"

interface CourseDeliveryFormatsProps {
  course: Course
}

const formatConfig = {
  IN_PERSON: {
    icon: MapPin,
    title: "In-Person Training",
    description:
      "Traditional classroom training with face-to-face interaction and hands-on learning experiences. Network with peers and learn in a structured environment.",
  },
  LIVE_VIRTUAL: {
    icon: Video,
    title: "Live Virtual Sessions",
    description:
      "Interactive online sessions with expert instructors in real-time. Participate from anywhere with live Q&A, breakout rooms, and collaborative exercises.",
  },
  SELF_PACED: {
    icon: BookOpen,
    title: "Self-Paced eLearning",
    description:
      "Learn at your own pace with on-demand video content, interactive modules, and downloadable resources. Access course materials anytime, anywhere.",
  },
}

export function CourseDeliveryFormats({ course }: CourseDeliveryFormatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Delivery Formats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {course.deliveryModes.map((mode) => {
            const config = formatConfig[mode]
            const Icon = config.icon

            return (
              <div
                key={mode}
                className="p-6 border-2 border-neutral-border rounded-lg hover:border-brand-gold transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-gold/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <DeliveryFormatBadge format={mode} />
                </div>
                <h3 className="font-semibold text-brand-navy mb-2">{config.title}</h3>
                <p className="text-sm text-neutral-text-muted">{config.description}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
