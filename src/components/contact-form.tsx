"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactLead } from "@/server/actions/leads"
import { trackContactFormSubmit } from "@/lib/analytics"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await submitContactLead(formData, turnstileToken)
      if (!result.success) {
        setError(result.error || "Validation failed. Please check your inputs.")
        return
      }
      trackContactFormSubmit("contact")
      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    } catch (error: any) {
      console.error("Error submitting form:", error)
      const errorMessage = error?.message || "Something went wrong. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="border-gold-400/40">
        <CardContent className="p-10 text-center sm:p-12">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/15">
              <CheckCircle2 className="h-9 w-9 text-gold-mark" />
            </div>
          </div>
          <h3 className="mt-6 text-2xl ">
            Thank You for Your Message!
          </h3>
          <p className="mt-4 text-content-muted">
            We&apos;ve received your inquiry and will get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="mt-8"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-2xl ">Send us a message</h2>
        <p className="mt-2.5 text-content-muted">
          We respond within one business day. Fields marked * are required.
        </p>
      </header>
      <div>
        {error && (
          <div role="alert" className="mb-6 flex items-start gap-3 rounded-sm border border-danger/30 bg-danger/8 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-danger">Error</p>
              <p className="mt-1 text-sm text-danger/90">{error}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              placeholder="Tell us how we can help you..."
            />
          </div>
          <TurnstileWidget onToken={setTurnstileToken} />
          <Button type="submit" variant="gold" className="w-full" disabled={loading || !turnstileToken} size="lg">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  )
}
