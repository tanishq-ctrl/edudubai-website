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
      <section
        className="relative bg-brand-navy text-white pt-32 pb-16 md:pt-36 md:pb-24 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero/trainer.jpg)',
        }}
      >

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-6">
              Become a Trainer
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] mb-8 max-w-2xl mx-auto">
              Join Edu Dubai today and leverage our global reach, attractive incentives, and the opportunity to make a significant impact in compliance training and consulting.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {qualificationAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Application Form */}
            <TrainerApplicationForm />

            {/* How It Works - Moved below form */}
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center lg:text-left">
                Our Evaluation Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-white rounded-xl border border-neutral-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-brand-gold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-navy mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>


          {/* Sticky Sidebar - Eligibility Criteria */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">

              <Card className="border-2 border-brand-gold/30 bg-white shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <Award className="h-7 w-7 text-brand-gold" />
                    <h3 className="text-2xl font-bold tracking-tight">Eligibility Criteria</h3>
                  </div>
                </div>
                <CardContent className="p-8 space-y-7">
                  <div className="space-y-6">
                    <div className="pb-5 border-b border-neutral-border/50">
                      <h4 className="font-bold text-brand-navy flex items-center gap-2.5 mb-3 text-base">
                        <div className="p-1.5 bg-brand-gold/10 rounded-md">
                          <Users className="h-4 w-4 text-brand-gold" />
                        </div>
                        Experience
                      </h4>
                      <p className="text-[15px] text-neutral-text leading-relaxed">
                        A minimum of <span className="font-semibold text-brand-navy">5 years</span> of practical experience in GRC, Anti-Financial Crime, Accounting, Auditing, or Taxation, ideally in a senior role within a reputable financial institution. Retired bankers and seasoned professionals are highly encouraged to apply.
                      </p>
                    </div>

                    <div className="pb-5 border-b border-neutral-border">
                      <h4 className="font-bold text-brand-navy flex items-center gap-2.5 mb-3 text-base">
                        <div className="p-1.5 bg-brand-gold/10 rounded-md">
                          <Award className="h-4 w-4 text-brand-gold" />
                        </div>
                        Certification
                      </h4>
                      <p className="text-[15px] text-neutral-text leading-relaxed mb-2">
                        Professional certification in Compliance or Anti-Financial Crime from recognized bodies such as:
                      </p>
                      <p className="text-[15px] font-semibold text-brand-navy leading-relaxed">
                        ACCA, CIA, ACFCS, ACAMS, GCI, ICA, CISI, IIA, ACFE, or CIMA
                      </p>
                    </div>



                    <div>
                      <h4 className="font-bold text-brand-navy flex items-center gap-2.5 mb-3 text-base">
                        <div className="p-1.5 bg-brand-gold/10 rounded-md">
                          <FileText className="h-4 w-4 text-brand-gold" />
                        </div>
                        Training Delivery
                      </h4>
                      <p className="text-[15px] text-neutral-text leading-relaxed">
                        At least <span className="font-semibold text-brand-navy">3 years</span> of experience in both face-to-face, in-person or virtual training delivery with reputable providers. Recommendations may be requested.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


        </div>
      </Container>
    </div>
  )
}
