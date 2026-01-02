import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ClipboardCheck } from "lucide-react"

export function CertificationsCtaSection() {
  const whatsappMessage =
    "Hi, I'd like to schedule a readiness diagnostic to determine which certification path is right for me."

  return (
    <section className="bg-brand-navy text-white py-16 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-brand-gold/20 rounded-full">
              <ClipboardCheck className="h-12 w-12 text-brand-gold" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Readiness Diagnostic?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Not sure which certification is right for you? Talk to our advisors for a 
            personalized assessment and recommended learning path.
          </p>
          <WhatsAppButton
            message={whatsappMessage}
            source="certifications_cta"
            variant="default"
            size="lg"
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-semibold"
          />
        </div>
      </Container>
    </section>
  )
}

