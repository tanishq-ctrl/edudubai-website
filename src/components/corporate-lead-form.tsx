"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitCorporateLead } from "@/server/actions/leads"
import { CheckCircle2 } from "lucide-react"
import { TurnstileWidget } from "@/components/turnstile-widget"

export function CorporateLeadForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    trainingNeed: "",
    preferredDelivery: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await submitCorporateLead(formData, turnstileToken)
      if (!result.success) {
        alert(result.error || "Validation failed. Please check your inputs.")
        return
      }
      setSuccess(true)
      // Reset form
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        trainingNeed: "",
        preferredDelivery: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto border-gold-400/40">
        <CardContent className="p-10 text-center sm:p-12">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/15">
              <CheckCircle2 className="h-9 w-9 text-gold-mark" />
            </div>
          </div>
          <h3 className="mt-6 text-2xl ">
            Thank You for Your Interest!
          </h3>
          <p className="mt-4 text-content-muted">
            We&apos;ve received your corporate training inquiry. Our team will contact you
            within 24 hours to discuss your training needs.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="mt-8"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="company" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
              Company Name *
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              required
              placeholder="e.g. Global Finance Ltd"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
              Your Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Full Name"
            />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
              Corporate Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              placeholder="email@company.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              placeholder="+971 -- --- ----"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="trainingNeed" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
            Training Requirements *
          </Label>
          <Textarea
            id="trainingNeed"
            value={formData.trainingNeed}
            onChange={(e) =>
              setFormData({ ...formData, trainingNeed: e.target.value })
            }
            required
            placeholder="Briefly describe your team's training goals..."
            className="bg-neutral-bg border-neutral-border min-h-[100px] focus:ring-brand-gold"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="preferredDelivery" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
            Delivery Format *
          </Label>
          <Select
            value={formData.preferredDelivery}
            onValueChange={(value) =>
              setFormData({ ...formData, preferredDelivery: value })
            }
            required
          >
            <SelectTrigger className="bg-neutral-bg border-neutral-border">
              <SelectValue placeholder="Select delivery format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IN_PERSON">In-Person (Institutional)</SelectItem>
              <SelectItem value="LIVE_VIRTUAL">Live Virtual (Interactive)</SelectItem>
              <SelectItem value="HYBRID">Hybrid Model</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TurnstileWidget onToken={setTurnstileToken} />
        <Button
          type="submit"
          className="w-full bg-brand-navy text-white hover:bg-brand-navy-dark font-black uppercase tracking-widest text-sm py-8 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl"
          disabled={loading || !turnstileToken}
        >
          {loading ? "Processing..." : "Submit Proposal Request"}
        </Button>
      </form>
    </div>
  )
}

