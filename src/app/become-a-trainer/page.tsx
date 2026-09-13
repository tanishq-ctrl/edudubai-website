import type { Metadata } from "next"
import { Container } from "@/components/container"
import { HeroShell } from "@/components/hero-shell"
import { TrainerApplicationForm } from "@/components/trainer/trainer-application-form"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Award } from "lucide-react"

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

export default function BecomeATrainerPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/*
         A flat ink field, left aligned. This was centred copy over a full-bleed
         bright photograph with two radial blooms, and the text needed three
         separate drop shadows to stay legible over it. The subject chips carry
         the information the photograph did not. HeroShell keeps the whole band
         inside the viewport from 620px of height upwards.
      */}
      <HeroShell
        tone="ink"
        eyebrow="Faculty"
        title="Join the faculty"
        lead="EduDubai works with practising compliance professionals who teach from current casework. If you hold a senior role in a regulated institution and have delivered training before, we would like to hear from you."
        fill={false}
      >
        <ul className="flex list-none flex-wrap gap-2">
          {qualificationAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-white/15 px-4 py-2 text-[15px] font-medium text-content-on-dark-muted"
            >
              {area}
            </li>
          ))}
        </ul>
      </HeroShell>

      <Container className="py-section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Application Form */}
            <TrainerApplicationForm />

            {/* How It Works - Moved below form */}
            <section className="mt-16">
              <h2 className="mb-8 text-3xl tracking-tight sm:text-4xl">
                How applications are assessed
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex gap-4 rounded-sm border border-line bg-surface-raised p-6 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-50">
                      <span className="text-lg font-semibold text-crimson-ink">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg text-content-strong">{item.title}</h3>
                      <p className="text-[17px] leading-relaxed text-content-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>


          {/* Sticky Sidebar - Eligibility Criteria */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-6 max-h-[calc(100svh-3rem)] overflow-y-auto">

              <Card className="overflow-hidden rounded-sm border-line bg-surface-raised shadow-sm">
                <div className="bg-ink-950 p-5 text-content-on-dark">
                  <div className="flex items-center gap-3">
                    {/* Gold stays for the credential mark. */}
                    <Award aria-hidden="true" className="h-7 w-7 text-gold-mark" />
                    <h3 className="text-xl tracking-tight">Eligibility</h3>
                  </div>
                </div>
                <div aria-hidden="true" className="h-px bg-crimson-600" />
                <CardContent className="p-8 space-y-7">
                  <div className="space-y-6">
                    <div className="pb-5 border-b border-line">
                      <h4 className="mb-3 flex items-center gap-2.5 text-base font-semibold text-content-strong">
                        <div className="rounded-sm bg-crimson-50 p-1.5">
                          <Users className="h-4 w-4 text-crimson-ink" />
                        </div>
                        Experience
                      </h4>
                      <p className="text-[17px] leading-relaxed text-content">
                        A minimum of <span className="font-semibold text-content-strong">5 years</span> of practical experience in GRC, Anti-Financial Crime, Accounting, Auditing, or Taxation, ideally in a senior role within a reputable financial institution. Retired bankers and seasoned professionals are highly encouraged to apply.
                      </p>
                    </div>

                    <div className="pb-5 border-b border-line">
                      <h4 className="mb-3 flex items-center gap-2.5 text-base font-semibold text-content-strong">
                        <div className="rounded-sm bg-crimson-50 p-1.5">
                          <Award className="h-4 w-4 text-crimson-ink" />
                        </div>
                        Certification
                      </h4>
                      <p className="mb-2 text-[17px] leading-relaxed text-content">
                        Professional certification in Compliance or Anti-Financial Crime from recognised bodies such as:
                      </p>
                      <p className="text-[17px] font-semibold leading-relaxed text-content-strong">
                        ACCA, CIA, ACFCS, ACAMS, GCI, ICA, CISI, IIA, ACFE, or CIMA
                      </p>
                    </div>



                    <div>
                      <h4 className="mb-3 flex items-center gap-2.5 text-base font-semibold text-content-strong">
                        <div className="rounded-sm bg-crimson-50 p-1.5">
                          <FileText className="h-4 w-4 text-crimson-ink" />
                        </div>
                        Training delivery
                      </h4>
                      <p className="text-[17px] leading-relaxed text-content">
                        At least <span className="font-semibold text-content-strong">3 years</span> of experience in both face-to-face, in-person or virtual training delivery with reputable providers. Recommendations may be requested.
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
