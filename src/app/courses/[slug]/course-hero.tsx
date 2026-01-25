import Image from "next/image"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { EnrollRazorpay } from "@/components/enroll-razorpay"
import { Course } from "@/lib/types"
import { Clock, Award, Star } from "lucide-react"

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about: ${course.title}`

  return (
    <section className="relative w-full min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden bg-brand-navy pt-20">
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 z-0">
        {/* Deep mesh gradient for authoritative feel */}
        <div className="absolute inset-0 bg-[#0A192F]" />

        {/* Abstract light currents */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-brand-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full" />

        {/* Subtle grid pattern for precision/compliance feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <Container className="relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Content - Text and Information */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10 animate-fade-up">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Badge className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light border-0 px-4 py-1.5 font-bold shadow-lg shadow-brand-gold/20 tracking-wide">
                {course.category.replace(/_/g, " ")}
              </Badge>
              {course.deliveryModes.map((mode) => (
                <DeliveryFormatBadge key={mode} format={mode} className="py-1.5 px-3 shadow-xl backdrop-blur-md bg-white/10 border border-white/20" />
              ))}
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight uppercase">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
                {course.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
              <div className="space-y-1">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">Duration</span>
                <p className="text-white font-bold text-xl">{course.duration} Hours</p>
              </div>
              <div className="space-y-1">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">Level</span>
                <p className="text-white font-bold text-xl uppercase tracking-tighter">{course.level}</p>
              </div>
              <div className="space-y-1">
                <span className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em]">Enrollment</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-xl uppercase tracking-tighter">Open</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <EnrollRazorpay
                courseSlug={course.slug}
                courseTitle={course.title}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-navy hover:from-brand-gold-light hover:to-brand-gold font-black px-12 py-8 text-xl tracking-wide shadow-2xl shadow-brand-gold/20"
              />
              <WhatsAppButton
                message={whatsappMessage}
                source={`course_${course.slug}`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 px-10 py-8 text-lg font-bold"
              />
            </div>
          </div>

          {/* Right Content - Modern Straight Catalogue Display */}
          <div className="lg:col-span-5 flex justify-center items-center lg:perspective-1000 mt-12 lg:mt-0">
            {(course.heroImageUrl || course.imageUrl) && (
              <div className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[3/4] group">
                {/* Master shadow effect */}
                <div className="absolute -inset-10 bg-brand-gold/10 blur-[100px] rounded-full group-hover:bg-brand-gold/20 transition-all duration-700" />

                {/* Catalogue Frame - Straightened */}
                <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 group-hover:scale-105 transition-all duration-700 ease-out">
                  <Image
                    src={course.heroImageUrl || course.imageUrl!}
                    alt={course.title}
                    fill
                    priority
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Premium Floating Badge - Straightened */}
                <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-brand-gold text-brand-navy p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-2xl transition-transform cursor-default z-30">
                  <p className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest leading-none mb-1">Tuition Fee</p>
                  <p className="text-xl lg:text-3xl font-black tracking-tighter leading-none">${course.priceUsd.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  )
}
