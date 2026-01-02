"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Target, TrendingUp } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { trackPageView } from "@/lib/analytics"
import { PageHeroImage } from "@/components/sections/page-hero-image"
import { Container } from "@/components/container"

export default function CorporateTrainingPage() {
  useEffect(() => {
    trackPageView("/corporate-training", "Corporate Training")
  }, [])

  const services = [
    {
      icon: Target,
      title: "Customized Programs",
      description: "Tailored training solutions designed for your organization&apos;s specific needs",
    },
    {
      icon: Users,
      title: "Team Training",
      description: "Group sessions for teams of any size, from startups to enterprises",
    },
    {
      icon: Building2,
      title: "On-Site Delivery",
      description: "We come to you - in-person training at your office location",
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Track ROI and performance improvements with our analytics dashboard",
    },
  ]

  return (
    <>
      <PageHeroImage
        image="/hero/corporate.jpg"
        imageAlt="Corporate Training Solutions"
        title="Corporate Training Solutions"
        description="Empower your workforce with world-class professional development programs tailored to your organization&apos;s needs."
        eyebrow="EduDubai • Corporate Training"
      />
      <Container className="py-12 md:py-16">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon className="h-10 w-10 text-brand-navy mb-4" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-brand-navy mb-2">1. Needs Assessment</h3>
              <p className="text-neutral-text-muted">We analyze your organization&apos;s training requirements and skill gaps</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-2">2. Custom Program Design</h3>
              <p className="text-neutral-text-muted">Our experts create tailored curriculum aligned with your business objectives</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-2">3. Flexible Delivery</h3>
              <p className="text-neutral-text-muted">Choose from in-person, live virtual, or self-paced formats</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-2">4. Ongoing Support</h3>
              <p className="text-neutral-text-muted">Continuous monitoring and support to ensure maximum impact</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Team?</h2>
        <p className="text-xl text-white/90 mb-6">
          Let&apos;s discuss how we can help your organization achieve its training goals
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <LeadCaptureForm
            trigger={<Button size="lg" className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light">Request Proposal</Button>}
            title="Request Corporate Training Proposal"
            description="Tell us about your training needs and we&apos;ll create a customized proposal"
            formType="contact"
          />
          <WhatsAppButton source="corporate_training" size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" />
        </div>
      </div>
      </Container>
    </>
  )
}
