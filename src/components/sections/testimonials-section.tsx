"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Al-Mansoori",
    role: "Senior Consultant",
    company: "Deloitte",
    content: "EduDubai&apos;s courses transformed my career. The practical insights and expert instruction helped me secure a promotion within 6 months.",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "Project Manager",
    company: "Emirates Group",
    content: "The self-paced format was perfect for my busy schedule. I could learn at my own pace while applying concepts directly to my work.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    company: "ADNOC",
    content: "Outstanding quality and comprehensive curriculum. The live virtual sessions were engaging and the instructors were industry experts.",
    rating: 5,
  },
  {
    name: "Mohammed Al-Rashid",
    role: "IT Director",
    company: "Etisalat",
    content: "Best investment in my professional development. The certifications are recognized industry-wide and opened new career opportunities.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/80 relative overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-indigo-100/20"></div>
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            What Our Learners Say
          </h2>
          <p className="text-lg md:text-xl text-neutral-text-muted max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-neutral-border/50 bg-gradient-to-br from-white via-white/95 to-slate-50/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
            <CardContent className="pt-8 pb-8 px-8">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-amber-200/30 via-yellow-200/20 to-orange-200/30 p-4 rounded-xl shadow-md">
                  <Quote className="h-8 w-8 text-amber-600 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-neutral-text mb-8 italic leading-relaxed">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-brand-navy">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-sm text-neutral-text-muted">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <span key={i} className="text-brand-gold text-2xl">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-10 bg-brand-gold shadow-lg"
                    : "w-2.5 bg-neutral-border hover:bg-brand-gold/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

