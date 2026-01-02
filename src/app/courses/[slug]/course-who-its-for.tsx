import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/lib/types"
import { Users } from "lucide-react"

interface CourseWhoItsForProps {
  course: Course
}

export function CourseWhoItsFor({ course }: CourseWhoItsForProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Users className="h-6 w-6 text-brand-gold" />
          Who This Course Is For
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {course.whoItsFor.map((persona, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
              <span className="text-neutral-text">{persona}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
