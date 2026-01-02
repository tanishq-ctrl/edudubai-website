import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { CourseImage } from "@/components/course-image"
import { Clock, Award } from "lucide-react"
import { Course } from "@/lib/types"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-neutral-border hover:border-brand-gold h-full flex flex-col group bg-gradient-to-br from-white via-white/98 to-slate-50/90">
      {/* Course Image */}
      {course.imageUrl && (
        <div className="relative w-full aspect-video bg-gradient-to-br from-brand-navy to-brand-navy-dark overflow-hidden">
          <CourseImage
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <CardHeader className="flex-1 pb-4">
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex flex-wrap gap-2 flex-1">
            {course.deliveryModes.map((mode) => (
              <DeliveryFormatBadge key={mode} format={mode} />
            ))}
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {course.category.replace(/_/g, " ")}
          </Badge>
        </div>
        <CardTitle className="text-xl mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-navy transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm text-neutral-text-muted leading-relaxed">
          {course.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="flex items-center gap-4 text-sm text-neutral-text-muted pb-2">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-brand-gold" />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-brand-gold" />
            <span className="capitalize">{course.level.toLowerCase()}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-neutral-border">
          <div>
            <span className="text-xs text-neutral-text-muted block mb-1">Starting from</span>
            <div className="text-2xl font-bold text-brand-navy">
              ${course.priceUsd.toLocaleString()}
            </div>
          </div>
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
          >
            <Link href={`/courses/${course.slug}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

