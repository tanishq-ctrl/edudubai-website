"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Target, TrendingUp, CheckCircle2 } from "lucide-react"
import { CorporateLeadForm } from "@/components/corporate-lead-form"
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
      description: "Tailored training solutions designed for your organization's specific needs and industry requirements.",
      color: "from-blue-500/10 to-transparent",
    },
    {
      icon: Users,
      title: "Team Training",
      description: "Scalable group sessions for teams of any size, from specialized startups to global enterprises.",
      color: "from-orange-500/10 to-transparent",
    },
    {
      icon: Building2,
      title: "On-Site Delivery",
      description: "Maximum convenience with professional training sessions delivered directly at your office location.",
      color: "from-purple-500/10 to-transparent",
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "Data-driven insights to track ROI and performance improvements with our analytics dashboard.",
      color: "from-emerald-500/10 to-transparent",
    },
  ]

  const approach = [
    {
      step: "01",
      title: "Needs Assessment",
      description: "Deep-dive analysis of your organization's unique requirements and critical skill gaps.",
    },
    {
      step: "02",
      title: "Custom Design",
      description: "Strategic curriculum development aligned perfectly with your core business objectives.",
    },
    {
      step: "03",
      title: "Flexible Delivery",
      description: "Seamless orchestration across in-person, live virtual, or executive bootcamp formats.",
    },
    {
      step: "04",
      title: "Ongoing Support",
      description: "Sustained post-training monitoring and mentorship to ensure long-term operational impact.",
    },
  ]

  return (
    <div className="bg-neutral-bg min-h-screen">
      <PageHeroImage
        image="/hero/corporate.jpg"
        imageAlt="Corporate Training Solutions"
        title="Corporate Training"
        titleClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
      />

      {/* Services Grid */}
      <Container className="py-24 -mt-12 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group border-none bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-3xl overflow-hidden"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${service.color}`} />
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-2xl bg-neutral-bg-subtle flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-7 w-7 text-brand-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-neutral-text-muted text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Our Approach Section */}
        <div className="mb-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-black text-brand-gold uppercase tracking-[0.3em]">Strategy & Execution</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-navy uppercase tracking-tight">Our Precision <span className="text-brand-gold">Approach</span></h3>
            <p className="text-neutral-text-muted max-w-2xl mx-auto font-medium">A standardized yet highly adaptable framework designed to deliver transformation at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-6xl font-black text-neutral-bg-subtle absolute -top-8 -left-4 group-hover:text-brand-gold/10 transition-colors duration-500 select-none">
                  {item.step}
                </div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-lg font-black text-brand-navy uppercase mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                    {item.title}
                  </h4>
                  <p className="text-neutral-text-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Form Section */}
        <div id="request-proposal" className="bg-brand-navy rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -ml-32 -mb-32" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
                  Ready to Transform <br />
                  <span className="text-brand-gold">Your Enterprise?</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed font-medium">
                  Connect with our institutional specialists to design a high-impact training roadmap for your team.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Global Certification Partnerships",
                  "MENA-Specific Regulatory Expertise",
                  "Advanced Learning Management Systems",
                  "Scalable Deployment Models"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90 font-bold uppercase tracking-wider text-xs">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-large">
              <CorporateLeadForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
