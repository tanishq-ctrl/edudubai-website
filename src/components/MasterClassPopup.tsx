"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2, X } from "lucide-react"
import { courses } from "@/lib/courses"

export function MasterClassPopup() {
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedCourseId, setSelectedCourseId] = useState<string>("")

    // Auto-select course based on URL slug
    useEffect(() => {
        if (params?.slug) {
            const currentCourse = courses.find(c => c.slug === params.slug)
            if (currentCourse) {
                setSelectedCourseId(currentCourse.id)
            }
        }
    }, [params?.slug])

    // Open popup on mount if not submitted
    useEffect(() => {
        const hasSubmitted = localStorage.getItem("master_class_popup_submitted")
        if (!hasSubmitted) {
            // Small delay for better UX
            const timer = setTimeout(() => setOpen(true), 2000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const name = formData.get("name") as string
        const phone = formData.get("phone") as string

        // Find selected course details
        const course = courses.find(c => c.id === selectedCourseId)

        if (!course) {
            setError("Please select a course")
            setLoading(false)
            return
        }

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name,
                    phone,
                    course: course.title,
                    courseId: course.id,
                    courseSlug: course.slug,
                    source: "master_class_popup"
                }),
            })

            if (!response.ok) throw new Error("Failed to submit")

            // Google Ads Conversion Tracking (if applicable)
            if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "conversion", {
                    send_to: "AW-17858231822/Kt1dCLPxp_IbEI78u8NC",
                    event_category: "lead",
                    event_label: course.title
                });
            }

            setSubmitted(true)
            localStorage.setItem("master_class_popup_submitted", "true")

        } catch (err) {
            console.error("Submission error:", err)
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Success View
    if (submitted) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[500px] border-t-8 border-t-green-500 p-0 overflow-hidden bg-white [&>button]:hidden focus:outline-none">
                    <div className="p-8 pb-10 flex flex-col items-center text-center space-y-6">
                        <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mb-2 animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-brand-navy">Seat Reserved!</h3>
                            <p className="text-base font-medium text-slate-500 leading-relaxed">
                                Thank you for registering for the <br />
                                <span className="text-brand-navy font-bold">Master Class</span>.
                            </p>
                        </div>

                        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                            We&apos;ve sent the session details and joining link to your email address.
                            Please check your inbox (promotions and spam folder).
                        </p>

                        <div className="pt-2 w-full">
                            <Button
                                onClick={() => {
                                    setOpen(false)
                                    window.location.href = '/courses'
                                }}
                                className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-6 rounded-full shadow-lg"
                            >
                                Explore More Courses
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="sm:max-w-[480px] p-0 border-t-8 border-t-[#FF2D55] gap-0 focus:outline-none"
            >
                <div className="p-6 pt-8">
                    <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl font-black text-brand-navy leading-tight">
                            Join the Free Master Class
                        </DialogTitle>
                        <DialogDescription className="text-sm font-medium text-slate-500 mt-2">
                            Gain expert insights and start your professional journey today. Select your course below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Full Name*
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="First and Last Name"
                                required
                                className="h-11 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55]"
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
                                className="h-11 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55]"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="course" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Select Course*
                            </Label>
                            <Select
                                value={selectedCourseId}
                                onValueChange={setSelectedCourseId}
                                required
                            >
                                <SelectTrigger className="h-11 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55]">
                                    <SelectValue placeholder="Select a course..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                WhatsApp Number (Optional)
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="h-11 border-slate-200 focus:ring-[#FF2D55] focus:border-[#FF2D55]"
                            />
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <Checkbox id="consent" required className="mt-1 data-[state=checked]:bg-[#FF2D55] data-[state=checked]:border-[#FF2D55]" />
                            <label
                                htmlFor="consent"
                                className="text-xs font-medium leading-tight text-slate-600 cursor-pointer"
                            >
                                I agree to receive the course outline, program updates, and
                                regulatory insights from EduDubai.
                            </label>
                        </div>

                        {error && <p className="text-xs text-red-500 font-bold">{error}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF2D55] hover:bg-[#E6294D] text-white font-bold py-6 h-auto rounded-full flex flex-col shadow-lg shadow-[#FF2D55]/20 mt-2"
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    <span className="text-lg font-black uppercase tracking-wide leading-none mb-1">Reserve My Free Seat</span>
                                    <span className="text-xs font-bold opacity-90 leading-none">(First Session Free)</span>
                                </>
                            )}
                        </Button>

                        <p className="text-[10px] text-center text-slate-400 font-medium pb-2">
                            Secure connection. 100% Privacy Protected.
                        </p>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
