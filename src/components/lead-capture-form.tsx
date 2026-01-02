"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { trackBrochureDownload, trackContactFormSubmit } from "@/lib/analytics"
import { submitBrochureLead, submitContactLead } from "@/server/actions/leads"

interface LeadCaptureFormProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  courseId?: string
  courseSlug?: string
  formType?: "brochure" | "contact" | "newsletter"
}

export function LeadCaptureForm({
  trigger,
  title = "Get Your Free Brochure",
  description = "Enter your details to download our course brochure",
  courseId,
  courseSlug,
  formType = "brochure",
}: LeadCaptureFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
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

    try {
      if (formType === "brochure") {
        const result = await submitBrochureLead({
          ...formData,
          courseId,
          courseSlug,
        })
        if (!result.success) {
          alert(result.error || "Validation failed. Please check your inputs.")
          return
        }
        trackBrochureDownload(courseId)
        // Reset form and close
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
        setOpen(false)
        alert("Thank you! We've sent the brochure to your email.")
      } else {
        // For other form types (contact, newsletter), use contact lead
        const result = await submitContactLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message || (formType === "newsletter" ? "Newsletter signup request" : "Contact form submission"),
        })
        if (!result.success) {
          alert(result.error || "Validation failed. Please check your inputs.")
          return
        }
        trackContactFormSubmit(formType)
        // Reset form and close
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
        setOpen(false)
        alert("Thank you! We&apos;ll be in touch soon.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            {formType === "contact" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : formType === "brochure" ? "Download Brochure" : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

