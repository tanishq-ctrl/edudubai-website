import type { Metadata } from "next"
import { Container } from "@/components/container"
import { TrainerApplicationForm } from "@/components/trainer/trainer-application-form"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, FileText, Users, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Become a Trainer",
  description:
    "Join EduDubai's global faculty of compliance and financial crime practitioners. Apply to deliver certification and corporate training programmes.",
  alternates: { canonical: "/become-a-trainer" },
}

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
      {/*
         Midnight band, left aligned. This was centred copy over a full-bleed
         bright photograph, which is the template /about was rebuilt away from,
         and the text needed three separate drop-shadows to stay legible over
         it. The subject chips carry the information the photograph did not.
      */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-navy-900 to-ink-975 py-section-sm text-white grain">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-48 h-[42rem] w-[42rem] bloom-gold" />
          <div className="absolute -right-32 top-56 h-[46rem] w-[46rem] bloom-navy" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-measure-lg">
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
              Join the faculty
            </h1>
            <p className="mt-6 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
              EduDubai works with practising compliance professionals who teach from current
              casework. If you hold a senior role in a regulated institution and have delivered
              training before, we would like to hear from you.
            </p>

            <ul className="mt-9 flex list-none flex-wrap gap-2">
              {qualificationAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-medium text-white/85"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Application Form */}
            <TrainerApplicationForm />

            {/* How It Works - Moved below form */}
            <section className="mt-20">
              <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
                How applications are assessed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4 p-6 bg-white rounded-xl border border-line shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-gold-ink">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg text-navy-700">{item.title}</h3>
                      <p className="text-sm text-content-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>


          {/* Sticky Sidebar - Eligibility Criteria */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto">

              <Card className="border-2 border-gold-400/30 bg-white shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-navy-900 to-navy-900/90 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <Award className="h-7 w-7 text-gold-mark" />
                    <h3 className="text-xl tracking-tight">Eligibility</h3>
                  </div>
                </div>
                <CardContent className="p-8 space-y-7">
                  <div className="space-y-6">
                    <div className="pb-5 border-b border-line">
                      <h4 className="font-bold text-navy-700 flex items-center gap-2.5 mb-3 text-base">
                        <div className="p-1.5 bg-gold-400/10 rounded-md">
                          <Users className="h-4 w-4 text-gold-mark" />
                        </div>
                        Experience
                      </h4>
                      <p className="text-[15px] text-content leading-relaxed">
                        A minimum of <span className="font-semibold text-navy-700">5 years</span> of practical experience in GRC, Anti-Financial Crime, Accounting, Auditing, or Taxation, ideally in a senior role within a reputable financial institution. Retired bankers and seasoned professionals are highly encouraged to apply.
                      </p>
                    </div>

                    <div className="pb-5 border-b border-line">
                      <h4 className="font-bold text-navy-700 flex items-center gap-2.5 mb-3 text-base">
                        <div className="p-1.5 bg-gold-400/10 rounded-md">
                          <Award className="h-4 w-4 text-gold-mark" />
                        </div>
                        Certification
                      </h4>
                      <p className="text-[15px] text-content leading-relaxed mb-2">
                        Professional certification in Compliance or Anti-Financial Crime from recognized bodies such as:
                      </p>
                      <p className="text-[15px] font-semibold text-navy-700 leading-relaxed">
                        ACCA, CIA, ACFCS, ACAMS, GCI, ICA, CISI, IIA, ACFE, or CIMA
                      </p>
                    </div>



                    <div>
                      <h4 className="font-bold text-navy-700 flex items-center gap-2.5 mb-3 text-base">
                        <div className="p-1.5 bg-gold-400/10 rounded-md">
                          <FileText className="h-4 w-4 text-gold-mark" />
                        </div>
                        Training Delivery
                      </h4>
                      <p className="text-[15px] text-content leading-relaxed">
                        At least <span className="font-semibold text-navy-700">3 years</span> of experience in both face-to-face, in-person or virtual training delivery with reputable providers. Recommendations may be requested.
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
