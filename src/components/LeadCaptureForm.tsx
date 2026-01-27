"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle2 } from "lucide-react"

interface LeadCaptureFormProps {
    courseTitle: string
    courseId: string
    courseSlug: string
}

export function LeadCaptureForm({ courseTitle, courseId, courseSlug }: LeadCaptureFormProps) {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const name = formData.get("name") as string
        const phone = formData.get("phone") as string

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name,
                    phone,
                    course: courseTitle,
                    courseId,
                    courseSlug,
                    source: "course_page_free_session_form"
                }),
            })

            if (!response.ok) throw new Error("Failed to submit")

            setSubmitted(true)
            localStorage.setItem(`lead_submitted_${courseSlug}`, "true")
        } catch (err) {
            console.error("Submission error:", err)
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <Card className="border-t-8 border-t-green-500 shadow-2xl overflow-hidden bg-white border-2 border-slate-100 animate-fade-in sm:min-h-[500px] flex flex-col justify-center">
                <CardContent className="py-12 px-8 flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-brand-navy">Seat Reserved!</h3>
                        <p className="text-base font-medium text-slate-500 leading-relaxed">
                            Thank you for registering for the <br />
                            <span className="text-brand-navy font-bold">{courseTitle}</span> <br />
                            Master Class.
                        </p>
                    </div>
                    <p className="text-sm text-slate-400">
                        We&apos;ve sent the session details and joining link to your email address.
                        Please check your inbox (and spam folder).
                    </p>
                    <div className="pt-4 w-full">
                        <Button
                            onClick={() => window.location.href = '/courses'}
                            className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-bold py-6 rounded-full shadow-lg"
                        >
                            Explore More Courses
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-t-8 border-t-[#FF2D55] shadow-2xl overflow-hidden bg-white border-2 border-slate-100">
            <CardHeader className="pb-2 pt-5 px-5 sm:px-6">
                <CardTitle className="text-lg md:text-xl font-black text-brand-navy leading-tight tracking-tight">
                    Join the Free {courseTitle} Master Class
                </CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">
                    Gain expert insights and start your professional journey today.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-5 sm:px-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Full Name*
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="First and Last Name"
                            required
                            className="h-10 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55] text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Email Address*
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="h-10 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55] text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Phone Number*
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            required
                            className="h-10 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55] text-sm"
                        />
                    </div>

                    <div className="flex items-start space-x-2 pt-1.5">
                        <Checkbox id="consent" required className="mt-0.5 h-3.5 w-3.5" />
                        <label
                            htmlFor="consent"
                            className="text-[11px] font-semibold leading-tight text-slate-700 cursor-pointer"
                        >
                            I agree to receive the {courseTitle} course outline, program updates, and
                            regulatory insights from EduDubai.
                        </label>
                    </div>

                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF2D55] hover:bg-[#E6294D] text-white font-bold py-3 h-auto rounded-full flex flex-col shadow-lg shadow-[#FF2D55]/20 group transition-all mt-3"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <span className="text-base leading-none mb-0.5">Reserve My Free Seat</span>
                                <span className="text-[10px] font-medium opacity-90 leading-none">(First Session Free)</span>
                            </>
                        )}
                    </Button>

                    <p className="text-[9px] text-center text-slate-400 font-medium pt-1.5">
                        Secure connection. 100% Privacy Protected.
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
