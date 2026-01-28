"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Download } from "lucide-react"
import { EnrollRazorpay } from "@/components/enroll-razorpay"
import { Course } from "@/lib/types"
import { LeadCaptureForm } from "@/components/LeadCaptureForm"
import Image from "next/image"

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about: ${course.title}`

  return (
    <section className="relative w-full pt-24 pb-8 md:pt-28 md:pb-10 flex items-center bg-brand-navy overflow-hidden min-h-[500px] lg:min-h-[550px]">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A192F]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-brand-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5 animate-fade-up">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light border-0 px-4 py-1.5 font-bold shadow-lg shadow-brand-gold/20 tracking-wide uppercase text-[10px]">
                {course.category.replace(/_/g, " ")}
              </Badge>
              {course.deliveryModes.map((mode) => (
                <DeliveryFormatBadge key={mode} format={mode} className="py-1.5 px-3 backdrop-blur-md bg-white/10 border border-white/20 text-[10px]" />
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {course.title}
                </h1>
                <p className="text-base md:text-lg text-white/70 leading-relaxed font-medium">
                  {course.shortDescription}
                </p>
              </div>
              {course.id === 'cgss' && (
                <div className="flex-shrink-0 animate-fade-in animate-float">
                  <Image
                    src="/images/badges/cgss-seal.png"
                    alt="CGSS Exam Prep - 40 Credit Hours"
                    width={280}
                    height={280}
                    className="drop-shadow-2xl w-32 h-32 lg:w-60 lg:h-60"
                  />
                </div>
              )}
            </div>

            {/* Combined Info Grid and CTAs */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <EnrollRazorpay
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  size="lg"
                  className="w-full sm:w-auto bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-black px-10 py-6 text-lg rounded-full shadow-2xl shadow-brand-gold/20"
                />
                <WhatsAppButton
                  message={whatsappMessage}
                  source={`course_${course.slug}_hero`}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-lg font-bold rounded-full transition-colors"
                />
                {course.id === 'cgss' && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-lg font-bold rounded-full transition-colors"
                  >
                    <a href="/handbooks/cgss-handbook.pdf" download="CGSS-Handbook.pdf">
                      <Download className="w-4 h-4" />
                      CGSS Handbook
                    </a>
                  </Button>
                )}
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-w-3xl">
                <div className="space-y-0.5">
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">Duration</span>
                  <p className="text-white font-bold text-lg">{course.duration} Hours</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">Level</span>
                  <p className="text-white font-bold text-lg uppercase tracking-tighter">{course.level}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[#FF2D55] text-[10px] font-black uppercase tracking-[0.2em]">Training Fee</span>
                  <p className="text-white font-bold text-lg tracking-tighter">${course.priceUsd.toLocaleString()}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em]">Enrollment</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg uppercase tracking-tighter">Open</span>
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Lead Form */}
          <div className="lg:col-span-5 animate-fade-in lg:mt-0 mt-12 flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px]">
              <LeadCaptureForm
                courseTitle={course.title}
                courseId={course.id}
                courseSlug={course.slug}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
