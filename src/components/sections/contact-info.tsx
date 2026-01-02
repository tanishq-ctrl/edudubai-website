import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <Mail className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <div className="font-semibold text-brand-navy mb-1">Email</div>
              <a
                href="mailto:training@edudubai.org"
                className="text-neutral-text-muted hover:text-brand-navy transition-colors"
              >
                training@edudubai.org
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <Phone className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <div className="font-semibold text-brand-navy mb-1">Phone</div>
              <a
                href="tel:+919665642862"
                className="text-neutral-text-muted hover:text-brand-navy transition-colors"
              >
                +91 9665642862
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <MapPin className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <div className="font-semibold text-brand-navy mb-1">Address</div>
              <div className="text-neutral-text-muted">
                Business Bay<br />
                Dubai, UAE
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-gold/10 rounded-lg">
              <Clock className="h-5 w-5 text-brand-gold" />
            </div>
            <div>
              <div className="font-semibold text-brand-navy mb-1">Office Hours</div>
              <div className="text-neutral-text-muted text-sm">
                Monday - Friday<br />
                9:00 AM - 6:00 PM GST<br />
                <span className="text-xs text-neutral-text-muted/80">Saturday & Sunday: Closed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white border-0">
        <CardHeader>
          <CardTitle className="text-white">Quick Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 mb-4">
            Prefer to chat? Connect with our advisors on WhatsApp for instant support.
          </p>
          <WhatsAppButton
            source="contact_page"
            variant="default"
            className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-semibold"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-neutral-text-muted">Email</span>
              <span className="font-medium text-brand-navy">Within 24 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-text-muted">WhatsApp</span>
              <span className="font-medium text-brand-navy">Instant</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-text-muted">Phone</span>
              <span className="font-medium text-brand-navy">During office hours</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

