"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Upload, X, FileText } from "lucide-react"
import { z } from "zod"

const TOTAL_STEPS = 5

// Validation schemas
const step1Schema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.string().min(1, "Please select a country"),
  linkedin_url: z.string().url("Please enter a valid LinkedIn URL"),
  portfolio_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

const step2Schema = z.object({
  current_role: z.string().min(2, "Current role is required"),
  experience_years: z.number().min(0, "Experience years must be 0 or greater"),
  training_years: z.number().min(0, "Training years must be 0 or greater"),
  specializations: z.array(z.string()).min(1, "Select at least one specialization"),
  delivery_modes: z.array(z.string()).min(1, "Select at least one delivery mode"),
  regions: z.array(z.string()).min(1, "Select at least one region"),
})

const step3Schema = z.object({
  certifications: z.string().min(10, "Certifications must be at least 10 characters"),
  summary: z.string().min(200, "Summary must be at least 200 characters").max(1200, "Summary must not exceed 1200 characters"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  regulated_entities: z.boolean(),
  creates_assessments: z.boolean(),
})

const step4Schema = z.object({
  availability: z.string().min(1, "Please select availability"),
  fee_model: z.string().min(1, "Please select fee model"),
  rate_currency: z.string().min(1, "Please select currency"),
  rate_min: z.number().min(0, "Minimum rate must be 0 or greater"),
  rate_max: z.number().optional().nullable(),
  start_date: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
})

const step5Schema = z.object({
  cv_file: z.instanceof(File, { message: "CV file is required" }),
  sample_deck: z.instanceof(File).optional().nullable(),
  consent: z.boolean().refine((val) => val === true, "You must consent to proceed"),
})

const specializations = [
  "AML/CFT",
  "Sanctions",
  "TBML",
  "FATCA/CRS",
  "Corporate Tax",
  "VAT",
  "Corporate Governance",
  "Risk Management",
  "KYC/CDD/EDD",
  "Regulatory Compliance",
  "Data Privacy/GDPR",
  "AI/RegTech",
]

const deliveryModes = [
  { value: "IN_PERSON", label: "In-Person" },
  { value: "LIVE_VIRTUAL", label: "Live Virtual" },
]

const regions = [
  "Global",
  "India",
  "Middle East",
  "Online Only",
]

const languages = [
  "English",
  "Arabic",
  "Hindi",
  "Urdu",
  "French",
  "Spanish",
  "Other",
]

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
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1
    full_name: "",
    email: "",
    phone: "",
    country: "",
    linkedin_url: "",
    portfolio_url: "",
    // Step 2
    current_role: "",
    experience_years: 0,
    training_years: 0,
    specializations: [] as string[],
    delivery_modes: [] as string[],
    regions: [] as string[],
    // Step 3
    certifications: "",
    summary: "",
    languages: [] as string[],
    regulated_entities: false,
    creates_assessments: false,
    // Step 4
    availability: "",
    fee_model: "",
    rate_currency: "AED",
    rate_min: 0,
    rate_max: null as number | null,
    start_date: "",
    notes: "",
    // Step 5
    cv_file: null as File | null,
    sample_deck: null as File | null,
    consent: false,
  })

  const validateStep = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          step1Schema.parse({
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            linkedin_url: formData.linkedin_url,
            portfolio_url: formData.portfolio_url || undefined,
          })
          return true
        case 2:
          step2Schema.parse({
            current_role: formData.current_role,
            experience_years: formData.experience_years,
            training_years: formData.training_years,
            specializations: formData.specializations,
            delivery_modes: formData.delivery_modes,
            regions: formData.regions,
          })
          return true
        case 3:
          step3Schema.parse({
            certifications: formData.certifications,
            summary: formData.summary,
            languages: formData.languages,
            regulated_entities: formData.regulated_entities,
            creates_assessments: formData.creates_assessments,
          })
          return true
        case 4:
          step4Schema.parse({
            availability: formData.availability,
            fee_model: formData.fee_model,
            rate_currency: formData.rate_currency,
            rate_min: formData.rate_min,
            rate_max: formData.rate_max,
            start_date: formData.start_date || undefined,
            notes: formData.notes || undefined,
          })
          return true
        case 5:
          if (!formData.cv_file) {
            setError("CV file is required")
            return false
          }
          step5Schema.parse({
            cv_file: formData.cv_file,
            sample_deck: formData.sample_deck || undefined,
            consent: formData.consent,
          })
          return true
        default:
          return false
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError("Validation failed. Please check your inputs.")
      }
      return false
    }
  }

  const handleNext = () => {
    setError(null)
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    setError(null)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setError(null)
    if (!validateStep(5)) {
      return
    }

    setLoading(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "cv_file" || key === "sample_deck") {
          if (value) {
            submitData.append(key, value as File)
          }
        } else if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else if (value !== null && value !== undefined && value !== "") {
          submitData.append(key, String(value))
        }
      })

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

  const toggleSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }))
  }

  const toggleDeliveryMode = (mode: string) => {
    setFormData((prev) => ({
      ...prev,
      delivery_modes: prev.delivery_modes.includes(mode)
        ? prev.delivery_modes.filter((m) => m !== mode)
        : [...prev.delivery_modes, mode],
    }))
  }

  const toggleRegion = (region: string) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }))
  }

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }))
  }

  if (success) {
    return (
      <Card className="border-2 border-brand-gold/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-brand-navy">Application Submitted!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for your interest in becoming a trainer with EduDubai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-brand-gold/10 p-6 rounded-lg border border-brand-gold/20">
            <p className="text-sm font-semibold text-brand-navy mb-2">Application Reference ID:</p>
            <p className="text-2xl font-mono font-bold text-brand-navy">{applicationId}</p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-brand-navy">What&apos;s Next?</h3>
            <ul className="space-y-2 text-sm text-neutral-text">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-1">•</span>
                <span>Our team will review your application within 5-7 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-1">•</span>
                <span>You&apos;ll receive an email confirmation with your application details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-1">•</span>
                <span>If selected, we&apos;ll contact you to discuss next steps</span>
              </li>
            </ul>
          </div>
          <Button
            asChild
            className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light"
          >
            <a href="/">Return to Home</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-neutral-border">
      <CardHeader>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-2xl font-bold text-brand-navy">
              Step {currentStep} of {TOTAL_STEPS}
            </CardTitle>
            <span className="text-sm text-neutral-text-muted">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-navy mb-4">Personal Details</h3>
              <p className="text-sm text-neutral-text-muted mb-6">
                Please provide your contact information and professional links.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9665642862"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                  disabled={loading}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
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
              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn URL *</Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio_url">Portfolio/Website URL (Optional)</Label>
                <Input
                  id="portfolio_url"
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Trainer Profile */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-navy mb-4">Trainer Profile</h3>
              <p className="text-sm text-neutral-text-muted mb-6">
                Tell us about your professional background and training experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="current_role">Current Role *</Label>
                <Input
                  id="current_role"
                  value={formData.current_role}
                  onChange={(e) => setFormData({ ...formData, current_role: e.target.value })}
                  placeholder="Senior Compliance Manager"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience_years">Years of Industry Experience *</Label>
                <Input
                  id="experience_years"
                  type="number"
                  min="0"
                  value={formData.experience_years || ""}
                  onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                  placeholder="10"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="training_years">Years of Training Experience *</Label>
                <Input
                  id="training_years"
                  type="number"
                  min="0"
                  value={formData.training_years || ""}
                  onChange={(e) => setFormData({ ...formData, training_years: parseInt(e.target.value) || 0 })}
                  placeholder="5"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label>Specializations * (Select at least one)</Label>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <Badge
                    key={spec}
                    variant={formData.specializations.includes(spec) ? "default" : "outline"}
                    className={`cursor-pointer ${formData.specializations.includes(spec)
                      ? "bg-brand-gold text-brand-navy"
                      : "hover:bg-brand-gold/10"
                      }`}
                    onClick={() => toggleSpecialization(spec)}
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label>Delivery Modes * (Select at least one)</Label>
              <div className="space-y-2">
                {deliveryModes.map((mode) => (
                  <div key={mode.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={mode.value}
                      checked={formData.delivery_modes.includes(mode.value)}
                      onCheckedChange={() => toggleDeliveryMode(mode.value)}
                      disabled={loading}
                    />
                    <Label htmlFor={mode.value} className="cursor-pointer">
                      {mode.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label>Regions * (Select at least one)</Label>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <Badge
                    key={region}
                    variant={formData.regions.includes(region) ? "default" : "outline"}
                    className={`cursor-pointer ${formData.regions.includes(region)
                      ? "bg-brand-gold text-brand-navy"
                      : "hover:bg-brand-gold/10"
                      }`}
                    onClick={() => toggleRegion(region)}
                  >
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Credentials & Compliance */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-navy mb-4">Credentials & Compliance</h3>
              <p className="text-sm text-neutral-text-muted mb-6">
                Share your certifications and professional background.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications & Qualifications *</Label>
              <Textarea
                id="certifications"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                placeholder="List your certifications (e.g., CAMS, CFCS, CTP, CPA, etc.)"
                rows={4}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">
                Professional Summary * ({formData.summary.length}/1200 characters)
              </Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Describe your professional background, expertise, and training philosophy (200-1200 characters)"
                rows={6}
                disabled={loading}
              />
              <p className="text-xs text-neutral-text-muted">
                Minimum 200 characters, maximum 1200 characters
              </p>
            </div>
            <div className="space-y-4">
              <Label>Languages * (Select at least one)</Label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Badge
                    key={lang}
                    variant={formData.languages.includes(lang) ? "default" : "outline"}
                    className={`cursor-pointer ${formData.languages.includes(lang)
                      ? "bg-brand-gold text-brand-navy"
                      : "hover:bg-brand-gold/10"
                      }`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="regulated_entities"
                  checked={formData.regulated_entities}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, regulated_entities: checked === true })
                  }
                  disabled={loading}
                />
                <Label htmlFor="regulated_entities" className="cursor-pointer">
                  I have experience working with regulated entities *
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="creates_assessments"
                  checked={formData.creates_assessments}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, creates_assessments: checked === true })
                  }
                  disabled={loading}
                />
                <Label htmlFor="creates_assessments" className="cursor-pointer">
                  I can create assessments and evaluation materials *
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability & Commercials */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-navy mb-4">Availability & Commercials</h3>
              <p className="text-sm text-neutral-text-muted mb-6">
                Let us know your availability and fee structure.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="availability">Availability *</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => setFormData({ ...formData, availability: value })}
                  disabled={loading}
                >
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full-Time</SelectItem>
                    <SelectItem value="PART_TIME">Part-Time</SelectItem>
                    <SelectItem value="PROJECT_BASED">Project-Based</SelectItem>
                    <SelectItem value="ON_DEMAND">On-Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee_model">Fee Model *</Label>
                <Select
                  value={formData.fee_model}
                  onValueChange={(value) => setFormData({ ...formData, fee_model: value })}
                  disabled={loading}
                >
                  <SelectTrigger id="fee_model">
                    <SelectValue placeholder="Select fee model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOURLY">Hourly Rate</SelectItem>
                    <SelectItem value="DAILY">Daily Rate</SelectItem>
                    <SelectItem value="PER_SESSION">Per Session</SelectItem>
                    <SelectItem value="PER_COURSE">Per Course</SelectItem>
                    <SelectItem value="NEGOTIABLE">Negotiable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate_currency">Currency *</Label>
                <Select
                  value={formData.rate_currency}
                  onValueChange={(value) => setFormData({ ...formData, rate_currency: value })}
                  disabled={loading}
                >
                  <SelectTrigger id="rate_currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    <SelectItem value="INR">INR (Indian Rupee)</SelectItem>
                    <SelectItem value="AED">AED (UAE Dirham)</SelectItem>
                    <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                    <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate_min">Minimum Rate *</Label>
                <Input
                  id="rate_min"
                  type="number"
                  min="0"
                  value={formData.rate_min || ""}
                  onChange={(e) => setFormData({ ...formData, rate_min: parseInt(e.target.value) || 0 })}
                  placeholder="1000"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate_max">Maximum Rate (Optional)</Label>
                <Input
                  id="rate_max"
                  type="number"
                  min="0"
                  value={formData.rate_max || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rate_max: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="5000"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date">Earliest Start Date (Optional)</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information you&apos;d like to share..."
                rows={4}
                disabled={loading}
              />
            </div>
          </div>
        )}

        {/* Step 5: Uploads & Consent */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-navy mb-4">Uploads & Consent</h3>
              <p className="text-sm text-neutral-text-muted mb-6">
                Upload your CV and optionally a sample training deck.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cv_file">CV/Resume * (PDF, max 10MB)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="cv_file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (file.size > 10 * 1024 * 1024) {
                        setError("CV file must be less than 10MB")
                        return
                      }
                      setFormData({ ...formData, cv_file: file })
                      setError(null)
                    }
                  }}
                  disabled={loading}
                  className="cursor-pointer"
                />
                {formData.cv_file && (
                  <div className="flex items-center gap-2 text-sm text-neutral-text-muted">
                    <FileText className="h-4 w-4" />
                    <span>{formData.cv_file.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, cv_file: null })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample_deck">Sample Training Deck (Optional) (PDF/PPT/PPTX, max 20MB)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="sample_deck"
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (file.size > 20 * 1024 * 1024) {
                        setError("Sample deck must be less than 20MB")
                        return
                      }
                      setFormData({ ...formData, sample_deck: file })
                      setError(null)
                    }
                  }}
                  disabled={loading}
                  className="cursor-pointer"
                />
                {formData.sample_deck && (
                  <div className="flex items-center gap-2 text-sm text-neutral-text-muted">
                    <FileText className="h-4 w-4" />
                    <span>{formData.sample_deck.name}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, sample_deck: null })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, consent: checked === true })
                  }
                  disabled={loading}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed">
                  I consent to Edu Dubai processing my personal data and application materials for the purpose of trainer recruitment and onboarding. I understand that my information will be kept confidential and used solely for this purpose. *
                </Label>
              </div>
            </div>
            <Alert className="bg-neutral-bg-subtle border-neutral-border">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                By submitting this application, you agree to our privacy policy and terms of service. Your information will be securely stored and used only for trainer recruitment purposes.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {currentStep < TOTAL_STEPS ? (
            <Button
              onClick={handleNext}
              disabled={loading}
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

