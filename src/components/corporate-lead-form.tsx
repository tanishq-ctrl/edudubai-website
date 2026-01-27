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

export function CorporateLeadForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
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
      const result = await submitCorporateLead(formData)
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
      <Card className="max-w-2xl mx-auto border-2 border-brand-gold">
        <CardContent className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-brand-gold/20 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-brand-gold" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-brand-navy mb-4">
            Thank You for Your Interest!
          </h3>
          <p className="text-lg text-neutral-text-muted mb-6">
            We&apos;ve received your corporate training inquiry. Our team will contact you
            within 24 hours to discuss your training needs.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="border-brand-gold text-brand-navy hover:bg-brand-gold"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-brand-navy font-bold uppercase tracking-wider text-[10px]">
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
              className="bg-neutral-bg border-neutral-border focus:ring-brand-gold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-brand-navy font-bold uppercase tracking-wider text-[10px]">
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
              className="bg-neutral-bg border-neutral-border focus:ring-brand-gold"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-brand-navy font-bold uppercase tracking-wider text-[10px]">
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
              className="bg-neutral-bg border-neutral-border focus:ring-brand-gold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-brand-navy font-bold uppercase tracking-wider text-[10px]">
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
              className="bg-neutral-bg border-neutral-border focus:ring-brand-gold"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainingNeed" className="text-brand-navy font-bold uppercase tracking-wider text-[10px]">
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
        <div className="space-y-2">
          <Label htmlFor="preferredDelivery" className="text-brand-navy font-bold uppercase tracking-wider text-[10px]">
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
        <Button
          type="submit"
          className="w-full bg-brand-navy text-white hover:bg-brand-navy-dark font-black uppercase tracking-widest text-sm py-8 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Proposal Request"}
        </Button>
      </form>
    </div>
  )
}

