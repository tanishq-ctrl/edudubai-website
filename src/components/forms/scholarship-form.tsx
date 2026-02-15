"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CheckCircle2 } from "lucide-react"

export function ScholarshipForm() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)

        const applicationData = {
            fullName: formData.get("fullName") as string,
            email: formData.get("email") as string,
            mobile: formData.get("mobile") as string,
            country: formData.get("country") as string,
            nationality: formData.get("nationality") as string,
            jobTitle: formData.get("jobTitle") as string,
            organization: formData.get("organization") as string,
            yearsExperience: formData.get("yearsExperience") as string,
            previouslyAttempted: formData.get("previouslyAttempted") as string,
            reasonForApplying: formData.get("reasonForApplying") as string,
            selfFunding: formData.get("selfFunding") as string,
            availabilityConfirm: formData.get("availabilityConfirm") === "on",
            accuracyConfirm: formData.get("accuracyConfirm") === "on",
            typedName: formData.get("typedName") as string,
            date: formData.get("date") as string,
        }

        try {
            const response = await fetch("/api/scholarship", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(applicationData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to submit application")
            }

            // Google Ads Conversion Tracking
            if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "conversion", {
                    send_to: "AW-17858231822/Kt1dCLPxp_IbEI78u8NC",
                    value: 1.0,
                    currency: "AED",
                    event_category: "scholarship_application",
                    event_label: "CAMS Ramadan Scholarship 2026"
                });
            }

            setSubmitted(true)
        } catch (err) {
            console.error("Submission error:", err)
            setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto bg-white border-2 border-slate-200 rounded-lg shadow-lg p-6 sm:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 bg-green-50 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">Application Received!</h3>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                            Thank you for applying to the <span className="font-semibold">CAMS Ramadan Global Scholarship 2026</span>.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500">
                            Our team will review your application and contact you via email within 5-7 business days.
                        </p>
                    </div>
                    <Button
                        onClick={() => window.location.href = '/courses'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md w-full sm:w-auto"
                    >
                        Explore Our Courses
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-white border-2 border-slate-300 rounded-lg shadow-lg overflow-hidden">
                {/* Form Title */}
                <div className="bg-white border-b-2 border-slate-300 py-6 sm:py-8 px-4 sm:px-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-slate-800 uppercase tracking-wide">
                        Ramadan Global Scholarship 2026 - Application Form
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                    {/* BASIC INFORMATION */}
                    <section className="border-2 border-slate-300 rounded-md p-4 sm:p-6 mt-2">
                        <div className="relative -mt-7 sm:-mt-9 mb-6">
                            <div className="inline-block bg-slate-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md">
                                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide">Basic Information</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="fullName" className="text-xs font-semibold text-slate-700">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    required
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                                    Email ID <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    required
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="mobile" className="text-xs font-semibold text-slate-700">
                                    Mobile Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="mobile"
                                    name="mobile"
                                    type="tel"
                                    placeholder="+971 50 123 4567"
                                    required
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="country" className="text-xs font-semibold text-slate-700">
                                    Country of Residence <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    placeholder="United Arab Emirates"
                                    required
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="nationality" className="text-xs font-semibold text-slate-700">
                                    Nationality <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="nationality"
                                    name="nationality"
                                    placeholder="Indian"
                                    required
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>
                        </div>
                    </section>

                    {/* PROFESSIONAL BACKGROUND */}
                    <section className="border-2 border-slate-300 rounded-md p-4 sm:p-6 mt-2">
                        <div className="relative -mt-7 sm:-mt-9 mb-6">
                            <div className="inline-block bg-slate-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md">
                                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide">Professional Background</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="jobTitle" className="text-xs font-semibold text-slate-700">
                                    Current Job Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    placeholder="AML Analyst"
                                    required
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="organization" className="text-xs font-semibold text-slate-700">
                                    Organization / Employer
                                </Label>
                                <Input
                                    id="organization"
                                    name="organization"
                                    placeholder="Company Name"
                                    className="h-10 bg-slate-50 border-slate-300 text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-slate-700">
                                    Years of Experience <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup name="yearsExperience" required className="flex flex-wrap gap-3 mt-2">
                                    <div className="flex items-center space-x-1.5">
                                        <RadioGroupItem value="0-2" id="exp1" className="h-3.5 w-3.5" />
                                        <Label htmlFor="exp1" className="text-xs font-medium cursor-pointer">0–2 Years</Label>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <RadioGroupItem value="3-5" id="exp2" className="h-3.5 w-3.5" />
                                        <Label htmlFor="exp2" className="text-xs font-medium cursor-pointer">3–5 Years</Label>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <RadioGroupItem value="6-10" id="exp3" className="h-3.5 w-3.5" />
                                        <Label htmlFor="exp3" className="text-xs font-medium cursor-pointer">6–10 Years</Label>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <RadioGroupItem value="10+" id="exp4" className="h-3.5 w-3.5" />
                                        <Label htmlFor="exp4" className="text-xs font-medium cursor-pointer">10+ Years</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-1.5 md:col-span-3">
                                <Label className="text-xs font-semibold text-slate-700">
                                    Have you previously attempted the CAMS® exam? <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup name="previouslyAttempted" required className="flex flex-wrap gap-4 sm:gap-6 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="prev-yes" className="h-3.5 w-3.5" />
                                        <Label htmlFor="prev-yes" className="text-xs font-medium cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="prev-no" className="h-3.5 w-3.5" />
                                        <Label htmlFor="prev-no" className="text-xs font-medium cursor-pointer">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </section>

                    {/* FINANCIAL NEED ASSESSMENT */}
                    <section className="border-2 border-slate-300 rounded-md p-4 sm:p-6 mt-2">
                        <div className="relative -mt-7 sm:-mt-9 mb-6">
                            <div className="inline-block bg-slate-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md">
                                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide">Financial Need Assessment</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="reasonForApplying" className="text-xs font-semibold text-slate-700">
                                    Why are you applying for the Ramadan Global Scholarship? <span className="text-red-500">*</span>
                                    <span className="text-slate-500 font-normal ml-1">(150–250 words)</span>
                                </Label>
                                <Textarea
                                    id="reasonForApplying"
                                    name="reasonForApplying"
                                    placeholder="Share your story, career goals, and how this scholarship would impact your professional development..."
                                    required
                                    rows={5}
                                    minLength={150}
                                    maxLength={250}
                                    className="bg-slate-50 border-slate-300 text-sm resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-slate-700">
                                    Are you currently self-funding your professional certifications? <span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup name="selfFunding" required className="flex flex-wrap gap-4 sm:gap-6 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="fund-yes" className="h-3.5 w-3.5" />
                                        <Label htmlFor="fund-yes" className="text-xs font-medium cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="fund-no" className="h-3.5 w-3.5" />
                                        <Label htmlFor="fund-no" className="text-xs font-medium cursor-pointer">No</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="partial" id="fund-partial" className="h-3.5 w-3.5" />
                                        <Label htmlFor="fund-partial" className="text-xs font-medium cursor-pointer">Employer partially supports</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </section>

                    {/* COMMITMENT DECLARATION */}
                    <section className="border-2 border-slate-300 rounded-md p-4 sm:p-6 mt-2">
                        <div className="relative -mt-7 sm:-mt-9 mb-6">
                            <div className="inline-block bg-slate-700 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md">
                                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide">Commitment Declaration</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Checkbox id="availabilityConfirm" name="availabilityConfirm" required className="mt-0.5" />
                                <label htmlFor="availabilityConfirm" className="text-xs font-medium text-slate-700 cursor-pointer leading-relaxed">
                                    I confirm my availability to attend 100 hours of live instructor-led training (25 Days × 4 Hours). <span className="text-red-500">*</span>
                                </label>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Checkbox id="accuracyConfirm" name="accuracyConfirm" required className="mt-0.5" />
                                <label htmlFor="accuracyConfirm" className="text-xs font-medium text-slate-700 cursor-pointer leading-relaxed">
                                    I confirm that the information provided is true and accurate. <span className="text-red-500">*</span>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1.5">
                                    <Label htmlFor="typedName" className="text-xs font-semibold text-slate-700">
                                        Typed Name (Signature) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="typedName"
                                        name="typedName"
                                        placeholder="Type your full name"
                                        required
                                        className="h-10 bg-slate-50 border-slate-300 text-sm"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="date" className="text-xs font-semibold text-slate-700">
                                        Date <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        defaultValue={new Date().toISOString().split('T')[0]}
                                        className="h-10 bg-slate-50 border-slate-300 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-300 rounded-md">
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 sm:px-12 py-2.5 rounded-md text-sm shadow-md w-full sm:w-auto"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Submitting...
                                </span>
                            ) : (
                                "Submit Application"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
