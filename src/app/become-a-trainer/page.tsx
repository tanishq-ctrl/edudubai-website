import { Container } from "@/components/container"
import { TrainerApplicationForm } from "@/components/trainer/trainer-application-form"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, FileText, Users, Award } from "lucide-react"

const qualificationAreas = [
  "AML/CFT",
  "Sanctions",
  "TBML",
  "FATCA/CRS",
  "Tax",
  "Governance",
  "Risk",
  "Data/AI",
]

const howItWorks = [
  {
    step: "1",
    title: "Apply",
    description: "Complete the application form with your credentials and experience",
  },
  {
    step: "2",
    title: "Screening",
    description: "Our team reviews your application and qualifications",
  },
  {
    step: "3",
    title: "Onboarding",
    description: "Successful candidates are onboarded to our trainer network",
  },
  {
    step: "4",
    title: "Assignments",
    description: "Receive training assignments based on your expertise",
  },
]

const whatWeLookFor = [
  "Minimum 5 years of relevant industry experience",
  "Proven track record in compliance, risk, or finance training",
  "Professional certifications (CAMS, CFCS, CTP, etc.)",
  "Excellent communication and presentation skills",
  "Ability to deliver engaging, practical training sessions",
  "Commitment to maintaining high educational standards",
]

export default function BecomeATrainerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-bg to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy/90 text-white pt-32 pb-16 md:pt-36 md:pb-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Become a Trainer
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join EduDubai&apos;s network of expert trainers and help professionals excel in compliance, risk management, and finance.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {qualificationAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorks.map((item, index) => (
                  <Card key={index} className="border-2 border-neutral-border hover:border-brand-gold transition-all text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-brand-gold">{item.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-brand-navy mb-2">{item.title}</h3>
                      <p className="text-sm text-neutral-text-muted">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Application Form */}
            <TrainerApplicationForm />
          </div>

          {/* Sticky Sidebar - What We Look For */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-brand-gold/20 bg-gradient-to-br from-white to-brand-gold/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-gold/10 rounded-lg">
                      <Award className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy">What We Look For</h3>
                  </div>
                  <ul className="space-y-4">
                    {whatWeLookFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-text leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
