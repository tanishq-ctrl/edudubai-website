import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"

interface CourseWhyChooseUsProps {
    course: Course
}

export function CourseWhyChooseUs({ course }: CourseWhyChooseUsProps) {
    if (!course.whyChooseUs) {
        return null
    }

    return (
        <Card className="border-2 border-brand-gold/20 bg-gradient-to-br from-brand-gold/5 to-transparent">
            <CardHeader>
                <CardTitle className="text-2xl text-brand-navy">{course.whyChooseUs.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-lg text-neutral-text leading-relaxed">
                    {course.whyChooseUs.description}
                </p>
                <div className="space-y-4">
                    {course.whyChooseUs.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                                <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                            </div>
                            <p className="text-neutral-text leading-relaxed">
                                {point}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
