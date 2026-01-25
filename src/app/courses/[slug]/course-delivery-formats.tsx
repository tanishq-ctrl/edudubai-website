import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/lib/types"
import { Calendar, Clock } from "lucide-react"

interface CourseDeliveryFormatsProps {
  course: Course
}

export function CourseDeliveryFormats({ course }: CourseDeliveryFormatsProps) {
  if (!course.deliverySchedules || course.deliverySchedules.length === 0) {
    return null
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Delivery Formats & Timings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {course.deliverySchedules.map((schedule, index) => (
              <div
                key={index}
                className="p-6 border-2 border-neutral-border rounded-lg hover:border-brand-gold transition-colors"
              >
                <h3 className="font-semibold text-brand-navy text-lg mb-3">{schedule.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-neutral-text">Schedule</p>
                      <p className="text-sm text-neutral-text-muted">{schedule.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-neutral-text">Duration</p>
                      <p className="text-sm text-neutral-text-muted">{schedule.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
