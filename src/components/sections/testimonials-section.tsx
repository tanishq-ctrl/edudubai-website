"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Al-Mansoori",
    role: "Senior Compliance Officer",
    content: "EduDubai's CAMS prep course was instrumental in my success. The focus on complex international regulations alongside global standards gave me a significant edge in my current role.",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "AML Analyst",
    content: "The practical case studies on Trade-Based Money Laundering were exceptionally detailed. I was able to implement new detection patterns in our monitoring system immediately after the workshop.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Risk & Governance Manager",
    content: "Completing the CCM certification through EduDubai was a turning point. The instructors are clearly practitioners, not just lecturers, which makes the complex GCI curriculum much easier to grasp.",
    rating: 5,
  },
  {
    name: "Mohammed Al-Rashid",
    role: "MLRO",
    content: "The executive level insights provided during the LIVE Virtual sessions were top-notch. It's rare to find training that balances theoretical compliance with the harsh realities of regulatory reporting.",
    rating: 5,
  },
  {
    name: "Fatima Al-Zahra",
    role: "KYC Specialist",
    content: "Excellent focus on Customer Due Diligence. The advanced KYC workshop cleared up many ambiguities regarding Ultimate Beneficial Ownership (UBO) structures that we struggle with daily.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Internal Audit Manager",
    content: "The Sanctions Compliance Specialist program was exceptionally well-structured. It has improved our internal audit-readiness significantly when dealing with complex OFAC and UN sanctions regimes.",
    rating: 5,
  },
  {
    name: "Hussain Abbas",
    role: "Head of Operations",
    content: "The FATCA & CRS reporting workshop was a lifesaver. What used to be a confusing manual process for our team is now handled with much more confidence thanks to the technical depth of the training.",
    rating: 5,
  },
  {
    name: "Lindsey Morgan",
    role: "Regulatory Liaison Officer",
    content: "The GCI curriculum and EduDubai's delivery style are perfectly matched. The clarity brought to cross-border regulatory requirements has made our communication with regional authorities much smoother.",
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
    <section className="py-12 md:py-14 bg-gradient-to-br from-neutral-bg-subtle via-slate-50 to-neutral-bg relative overflow-hidden">
      {/* Subtle brand-aligned gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/5 via-transparent to-brand-gold/5"></div>
      <Container className="relative z-10">
        <div className="text-center mb-10">
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
                <div className="bg-gradient-to-br from-brand-gold/20 via-brand-gold/10 to-brand-gold-light/20 p-4 rounded-xl shadow-md">
                  <Quote className="h-8 w-8 text-brand-gold flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-neutral-text mb-8 italic leading-relaxed">
                    &quot;{currentTestimonial.content}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg text-brand-navy">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-sm text-neutral-text-muted">
                        {currentTestimonial.role}
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
                className={`h-2.5 rounded-full transition-all ${index === currentIndex
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

