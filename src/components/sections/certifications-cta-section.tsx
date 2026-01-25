import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ClipboardCheck } from "lucide-react"

export function CertificationsCtaSection() {
  const whatsappMessage =
    "Hi, I'd like to schedule a readiness diagnostic to determine which certification path is right for me."

  return (
    <section className="relative bg-brand-navy text-white py-20 md:py-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] repeat" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center justify-center p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <ClipboardCheck className="h-10 w-10 text-brand-gold" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Ready to <span className="text-brand-gold">Verify Your Expertise?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              Not sure which certification path aligns with your career goals?
              Partner with our Global Advisors for a personalized readiness assessment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <WhatsAppButton
              message={whatsappMessage}
              source="certifications_cta"
              variant="default"
              size="lg"
              className="bg-brand-gold text-brand-navy hover:bg-white hover:text-brand-navy font-bold px-12 py-8 text-lg rounded-xl shadow-2xl transition-all hover:scale-105 border-0"
            />
          </div>

          <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">
            Confidential Assessment • Quick Response
          </p>
        </div>
      </Container>
    </section>
  )
}

