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
        <div className="relative w-full aspect-[4/3] bg-brand-navy p-6 flex items-center justify-center overflow-hidden border-b border-brand-gold/20">
          {/* Abstract light beam effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full -ml-24 -mb-24 pointer-events-none" />

          <div className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-700 rounded-lg overflow-hidden group-hover:scale-105 group-hover:-rotate-1">
            <CourseImage
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Premium "Live Now" or "Official" corner tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-brand-navy/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-2xl">
              Official Curriculum
            </span>
          </div>
        </div>
      )}
      <CardHeader className="flex-1 pb-4">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {course.deliveryModes.map((mode) => (
            <DeliveryFormatBadge key={mode} format={mode} className="text-xs" />
          ))}
          <Badge variant="secondary" className="text-xs">
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

