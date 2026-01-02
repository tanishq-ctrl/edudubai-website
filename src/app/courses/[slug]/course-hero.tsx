import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { EnrollRazorpay } from "@/components/enroll-razorpay"
import { Course } from "@/lib/types"
import { Clock, Award } from "lucide-react"

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about: ${course.title}`

  return (
    <div className="bg-gradient-to-b from-neutral-bg to-white border-b border-neutral-border">
      <Container className="pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-4xl">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {course.deliveryModes.map((mode) => (
              <DeliveryFormatBadge key={mode} format={mode} />
            ))}
            <Badge variant="secondary" className="text-sm">
              {course.category.replace(/_/g, " ")}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {course.level}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mb-6">
            {course.title}
          </h1>

          {/* Short Description */}
          <p className="text-lg md:text-xl text-neutral-text-muted mb-8 max-w-3xl">
            {course.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-neutral-text-muted">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{course.duration} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>{course.level} Level</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="text-sm text-neutral-text-muted mb-1">Starting from</div>
            <div className="text-4xl md:text-5xl font-bold text-brand-navy">
              ${course.priceUsd.toLocaleString()}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <EnrollRazorpay
              courseSlug={course.slug}
              courseTitle={course.title}
              size="lg"
              className="bg-brand-navy hover:bg-brand-navy-dark text-white"
            />
            <WhatsAppButton
              message={whatsappMessage}
              source={`course_${course.slug}`}
              variant="outline"
              size="lg"
              className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
