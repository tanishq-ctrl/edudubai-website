import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { CourseImage } from "@/components/course-image"
import { getCourseBySlugNew } from "@/server/actions/courses"
import { Award, BookOpen, TrendingUp } from "lucide-react"

const examPrepTracks = [
  {
    slug: "anti-money-laundering-specialist",
    icon: Award,
    badge: "EduDubai",
  },
  {
    slug: "fatca-crs-specialist",
    icon: BookOpen,
    badge: "FCS",
  },
  {
    slug: "sanctions-compliance-specialist",
    icon: TrendingUp,
    badge: "SCS",
  },
]

export async function ExamPrepTracksSection() {
  const tracks = await Promise.all(
    examPrepTracks.map(async (track) => {
      const course = await getCourseBySlugNew(track.slug)
      return course ? { ...track, course } : null
    })
  )

  const validTracks = tracks.filter((track): track is NonNullable<typeof track> => track !== null)

  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Exam Preparation Tracks
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          Comprehensive preparation programs for globally recognized certifications
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validTracks.map((track) => {
          const Icon = track.icon
          const course = track.course

          return (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-lg transition-all border-2 border-neutral-border hover:border-brand-gold h-full flex flex-col group"
            >
              {/* Certification Image */}
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
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <span className="text-xs font-semibold text-brand-navy bg-neutral-bg-subtle px-3 py-1 rounded-full">
                    {track.badge}
                  </span>
                </div>
                <CardTitle className="text-xl mb-3">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {course.shortDescription}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {course.deliveryModes.map((mode) => (
                    <DeliveryFormatBadge key={mode} format={mode} />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-text-muted">Duration</span>
                  <span className="font-medium">{course.duration} hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-text-muted">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="pt-4 border-t border-neutral-border">
                  <div className="text-sm text-neutral-text-muted mb-1">Starting from</div>
                  <div className="text-2xl font-bold text-brand-navy mb-4">
                    ${course.priceUsd.toLocaleString()}
                  </div>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/courses/${course.slug}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

