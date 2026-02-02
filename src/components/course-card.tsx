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
    <Card className="group relative h-full flex flex-col bg-white border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg">
      {/* Course Image Header Section */}
      {course.imageUrl && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          {/* Image fills entire space - shifted down to avoid badge overlap */}
          <CourseImage
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover object-[center_10%]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Premium "Curriculum" Badge - More prominent */}
          <div className="absolute top-3 left-3 z-20">
            <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-slate-700 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1.5 rounded shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Official Curriculum
            </span>
          </div>
        </div>
      )}

      {/* Course Details Section */}
      <div className="flex-1 p-6 flex flex-col bg-white">
        {/* Category & Delivery Tags - Consistent styling */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <Badge className="bg-slate-100 text-slate-700 border-0 text-[10px] font-bold uppercase tracking-tight px-2.5 py-1 hover:bg-slate-200 transition-colors">
            {course.category.replace(/_/g, " ")}
          </Badge>
          {course.deliveryModes.map((mode) => (
            <DeliveryFormatBadge key={mode} format={mode} />
          ))}
        </div>

        {/* Title - Better spacing */}
        <h3 className="text-xl font-bold text-brand-navy mb-4 line-clamp-2 min-h-[3.5rem] leading-snug group-hover:text-brand-navy/80 transition-colors">
          {course.title}
        </h3>

        {/* Description - Better contrast */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
          {course.shortDescription}
        </p>

        {/* Stats & Metadata Row - Cleaner */}
        <div className="mt-auto flex items-center gap-6 text-xs font-semibold text-slate-500 mb-6 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-brand-gold" />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-3.5 w-3.5 text-brand-gold" />
            <span className="capitalize">{course.level.toLowerCase()}</span>
          </div>
        </div>

        {/* Footer Area: Price & CTA - Better alignment */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Starting from</span>
            <span className="text-3xl font-black text-brand-navy leading-none">
              ${course.priceUsd.toLocaleString()}
            </span>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold px-6 h-11 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link href={`/courses/${course.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

