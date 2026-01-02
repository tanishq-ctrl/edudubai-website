"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { EnrollRazorpay } from "@/components/enroll-razorpay"
import { Course } from "@/lib/types"
import { Download } from "lucide-react"

interface CourseSidebarProps {
  course: Course
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about: ${course.title}`

  return (
    <Card className="border-2 border-neutral-border">
      <CardHeader>
        <CardTitle className="text-2xl">Course Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price */}
        <div>
          <div className="text-sm text-neutral-text-muted mb-1">Price</div>
          <div className="text-3xl font-bold text-brand-navy">
            ${course.priceUsd.toLocaleString()}
          </div>
        </div>

        {/* Delivery Modes */}
        <div>
          <div className="text-sm font-medium text-brand-navy mb-3">Available Formats</div>
          <div className="flex flex-wrap gap-2">
            {course.deliveryModes.map((mode) => (
              <DeliveryFormatBadge key={mode} format={mode} />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-4 border-t border-neutral-border">
          <EnrollRazorpay
            courseSlug={course.slug}
            courseTitle={course.title}
            size="lg"
            className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white"
          />
          <WhatsAppButton
            message={whatsappMessage}
            source={`course_sidebar_${course.slug}`}
            variant="outline"
            size="lg"
            className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
          />
          <LeadCaptureForm
            trigger={
              <Button
                variant="outline"
                size="lg"
                className="w-full border-brand-gold text-brand-navy hover:bg-brand-gold hover:text-brand-navy"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </Button>
            }
            title={`Download ${course.title} Brochure`}
            description="Enter your details to receive the course brochure via email"
            courseId={course.id}
            courseSlug={course.slug}
            formType="brochure"
          />
        </div>

        {/* Course Info */}
        <div className="pt-4 border-t border-neutral-border space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-text-muted">Duration</span>
            <span className="font-medium">{course.duration} hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-text-muted">Level</span>
            <span className="font-medium">{course.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-text-muted">Category</span>
            <span className="font-medium">{course.category.replace(/_/g, " ")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
