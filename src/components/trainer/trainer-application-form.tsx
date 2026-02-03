"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, Upload, FileText, Globe, User, Mail, Phone, Linkedin, Video } from "lucide-react"
import { z } from "zod"


// Simplified validation schema
const applicationSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.string().min(1, "Please select a country"),
  linkedin_url: z.string().url("Please enter a valid LinkedIn URL"),
  video_url: z.string().url("Please enter a valid Google Drive or Video URL").optional().or(z.literal("")),
  cv_file: z.instanceof(File, { message: "CV file is required" }),
  consent: z.boolean().refine((val) => val === true, "You must consent to proceed"),
})

const countries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "India",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Other",
]

export function TrainerApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    linkedin_url: "",
    video_url: "",
    cv_file: null as File | null,
    consent: false,
  })

  const validate = (): boolean => {
    try {
      applicationSchema.parse(formData)
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError("Validation failed. Please check your inputs.")
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validate()) return

    setLoading(true)

    try {
      const submitData = new FormData()

      // Append required fields
      submitData.append("full_name", formData.full_name)
      submitData.append("email", formData.email)
      submitData.append("phone", formData.phone)
      submitData.append("country", formData.country)
      submitData.append("linkedin_url", formData.linkedin_url)
      submitData.append("video_url", formData.video_url)
      submitData.append("cv_file", formData.cv_file!)
      submitData.append("consent", String(formData.consent))

      // Append default values for old required fields to satisfy API if needed
      // (Though we updated the API, it's safer to provide empty versions of keys it expects to parse)
      submitData.append("specializations", JSON.stringify([]))
      submitData.append("delivery_modes", JSON.stringify([]))
      submitData.append("regions", JSON.stringify([]))
      submitData.append("languages", JSON.stringify([]))

      const response = await fetch("/api/trainer/submit", {
        method: "POST",
        body: submitData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Submission failed")
      }

      setApplicationId(result.applicationId)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="animate-in fade-in zoom-in duration-500">
        <Card className="border-2 border-brand-gold/20 shadow-xl overflow-hidden">

          <div className="h-2 bg-brand-gold" />
          <CardHeader className="text-center pt-10">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-brand-navy">Application Received!</CardTitle>
            <CardDescription className="text-lg mt-2 px-6">
              Thank you for applying to join EduDubai. We're excited to review your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="bg-neutral-bg p-6 rounded-xl border border-neutral-border text-center">
              <p className="text-xs uppercase tracking-widest font-semibold text-neutral-text-muted mb-2">Reference ID</p>
              <p className="text-2xl font-mono font-bold text-brand-navy">{applicationId}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-brand-navy border-b pb-2">Next Steps</h3>
              <div className="grid gap-4 text-sm text-neutral-text">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold font-bold">1</div>
                  <p>Our academic board will review your credentials and video explanation.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold font-bold">2</div>
                  <p>You will receive an email confirmation with further instructions within 5-7 business days.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold font-bold">3</div>
                  <p>Shortlisted candidates will be invited for a virtual interview session.</p>
                </div>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 h-12 rounded-lg font-bold"
            >
              <a href="/">Return to Homepage</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }


  return (
    <Card className="border-0 shadow-2xl bg-white overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-brand-navy via-brand-gold to-brand-navy" />
      <CardHeader className="bg-neutral-bg/50 border-b p-8">
        <CardTitle className="text-3xl font-bold text-brand-navy">Join Our Expert Network</CardTitle>
        <CardDescription className="text-base text-neutral-text-muted mt-2">
          Fill out the form below to start your journey as an EduDubai trainer.
          The process takes less than 2 minutes.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8">
        {error && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <Alert variant="destructive" className="mb-8 border-2">

              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-sm font-medium ml-2">{error}</AlertDescription>
            </Alert>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info Group */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2 border-b pb-2">
                <User className="h-5 w-5 text-brand-gold" />
                Personal Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-neutral-text-muted" />
                  <Input
                    id="full_name"
                    className="pl-10 h-12 focus-visible:ring-brand-gold"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-text-muted" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10 h-12 focus-visible:ring-brand-gold"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-neutral-text-muted" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10 h-12 focus-visible:ring-brand-gold"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 00 000 0000"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country of Residence <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-5 w-5 text-neutral-text-muted z-10" />
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                    disabled={loading}
                  >
                    <SelectTrigger id="country" className="pl-10 h-12 focus:ring-brand-gold">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Professional Links & Uploads */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2 border-b pb-2">
                <Upload className="h-5 w-5 text-brand-gold" />
                Experience & Media
              </h3>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn Profile URL <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-2.5 h-5 w-5 text-neutral-text-muted" />
                  <Input
                    id="linkedin_url"
                    type="url"
                    className="pl-10 h-12 focus-visible:ring-brand-gold"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">Video Explanation Link</Label>
                <div className="relative">
                  <Video className="absolute left-3 top-2.5 h-5 w-5 text-neutral-text-muted" />
                  <Input
                    id="video_url"
                    type="url"
                    className="pl-10 h-12 focus-visible:ring-brand-gold"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="Google Drive, YouTube, or Loom link"
                    disabled={loading}
                  />
                </div>
                <p className="text-[11px] text-neutral-text-muted mt-1 leading-tight">
                  Share a brief video explaining any topic of your interest to help us evaluate your teaching style.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv_file">Upload CV/Resume (PDF) <span className="text-red-500">*</span></Label>
                <div
                  className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer group ${formData.cv_file
                    ? "border-green-500 bg-green-50/30"
                    : "border-neutral-border hover:border-brand-gold bg-neutral-bg/30"
                    }`}
                  onClick={() => document.getElementById("cv_file")?.click()}
                >
                  <Input
                    id="cv_file"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setFormData({ ...formData, cv_file: file })
                    }}
                    disabled={loading}
                  />
                  {formData.cv_file ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm font-semibold text-green-700">{formData.cv_file.name}</p>
                      <p className="text-xs text-green-600">Click to change file</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-gold/10 group-hover:bg-brand-gold/20 flex items-center justify-center mb-2 transition-colors">
                        <Upload className="h-6 w-6 text-brand-gold" />
                      </div>
                      <p className="text-sm font-semibold text-brand-navy">Click to upload or drag & drop</p>
                      <p className="text-xs text-neutral-text-muted">PDF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-start space-x-3 mb-8">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked === true })}
                className="mt-1 data-[state=checked]:bg-brand-gold data-[state=checked]:border-brand-gold"
                disabled={loading}
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed text-neutral-text-muted cursor-pointer font-normal">
                I agree to the <a href="/terms" className="text-brand-gold hover:underline font-semibold">Terms & Conditions</a> and consent to EduDubai processing my professional data for trainer evaluation purposes.
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light h-14 rounded-xl text-lg font-bold shadow-lg shadow-brand-gold/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing Application...
                </div>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
