import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"

interface CourseOutcomesProps {
  course: Course
}

export function CourseOutcomes({ course }: CourseOutcomesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">What You'll Learn</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {course.outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <span className="text-neutral-text">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
