"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { submitCourseApplication } from "@/server/actions/leads"
import { useToast } from "@/hooks/use-toast"

interface ApplyNowDialogProps {
    courseSlug: string
    courseTitle: string
    className?: string
    size?: "default" | "sm" | "lg" | "icon"
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function ApplyNowDialog({
    courseSlug,
    courseTitle,
    className,
    size = "lg",
    variant = "default",
}: ApplyNowDialogProps) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
    })

    // Specific design colors from MasterClassPopup (Red accent)
    const ACCENT_COLOR_CLASS = "bg-[#FF2D55]"
    const ACCENT_HOVER_CLASS = "hover:bg-[#E6294D]"
    const ACCENT_BORDER_CLASS = "border-[#FF2D55]"
    const FOCUS_RING_CLASS = "focus:ring-[#FF2D55] focus:border-[#FF2D55]"

    const validateForm = () => {
        let isValid = true
        const newErrors = { name: "", email: "", phone: "" }

        if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters"
            isValid = false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
            isValid = false
        }

        if (formData.phone.trim().length < 5) {
            newErrors.phone = "Please enter a valid phone number"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setLoading(true)
        try {
            // Prepare payload, reusing courseTitle as 'courseInterest'
            const result = await submitCourseApplication({
                ...formData,
                courseTitle,
                courseSlug,
            })

            if (result.success) {
                // Google Ads Conversion Tracking
                if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "conversion", {
                        send_to: "AW-17858231822/Kt1dCLPxp_IbEI78u8NC",
                        value: 1.0,
                        currency: "INR",
                        event_callback: () => console.log("Conversion tracked")
                    });
                }

                setSuccess(true)
                // We handle success UI inside the dialog, no toast needed essentially, 
                // but keeping it for consistency if helpful.
            } else {
                toast({
                    title: "Submission Failed",
                    description: result.error || "Please try again later.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Submission error:", error)
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setOpen(false)
        // Reset form after a delay so it doesn't flash while closing
        setTimeout(() => {
            setSuccess(false)
            setFormData({ name: "", email: "", phone: "" })
            setErrors({ name: "", email: "", phone: "" })
        }, 300)
    }

    // Success View matching MasterClassPopup success state
    if (success) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                {/* Using MasterClassPopup trigger button logic is handled outside via the open state */}
                {/* We render the button that triggers the dialog below */}
                <Button
                    onClick={() => setOpen(true)}
                    className={className}
                    size={size}
                    variant={variant}
                >
                    Enroll Now
                </Button>

                <DialogContent className="sm:max-w-[500px] border-t-8 border-t-green-500 p-0 overflow-hidden bg-white [&>button]:hidden focus:outline-none">
                    <div className="p-8 pb-10 flex flex-col items-center text-center space-y-6">
                        <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mb-2 animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-12 w-12 text-green-500" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-brand-navy">Application Received!</h3>
                            <p className="text-base font-medium text-slate-500 leading-relaxed">
                                Thank you for your interest in <br />
                                <span className="text-brand-navy font-bold">{courseTitle}</span>.
                            </p>
                        </div>

                        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                            Our team will review your application and contact you shortly with the next steps.
                        </p>

                        <div className="pt-2 w-full">
                            <Button
                                onClick={handleClose}
                                className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-bold py-6 rounded-full shadow-lg"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    // Default Form View
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                onClick={() => setOpen(true)}
                className={className}
                size={size}
                variant={variant}
            >
                Enroll Now
            </Button>

            <DialogContent className={`sm:max-w-[480px] p-0 border-t-8 ${ACCENT_BORDER_CLASS} gap-0 focus:outline-none`}>
                <div className="p-6 pt-8">
                    <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl font-black text-brand-navy leading-tight">
                            Enroll Now for Free Master Class
                        </DialogTitle>
                        <DialogDescription className="text-sm font-medium text-slate-500 mt-2">
                            Start your professional journey with <strong>{courseTitle}</strong>. Fill in your details below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Full Name*
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value })
                                    if (errors.name) setErrors({ ...errors, name: "" })
                                }}
                                placeholder="First and Last Name"
                                className={`h-11 border-slate-200 ${FOCUS_RING_CLASS} ${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Email Address*
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value })
                                    if (errors.email) setErrors({ ...errors, email: "" })
                                }}
                                placeholder="name@company.com"
                                className={`h-11 border-slate-200 ${FOCUS_RING_CLASS} ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Contact Number*
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData({ ...formData, phone: e.target.value })
                                    if (errors.phone) setErrors({ ...errors, phone: "" })
                                }}
                                placeholder="+971 50 123 4567"
                                className={`h-11 border-slate-200 ${FOCUS_RING_CLASS} ${errors.phone ? "border-red-500" : ""}`}
                            />
                            {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <Checkbox id="consent" required className={`mt-1 data-[state=checked]:${ACCENT_COLOR_CLASS} data-[state=checked]:${ACCENT_BORDER_CLASS}`} />
                            <label
                                htmlFor="consent"
                                className="text-xs font-medium leading-tight text-slate-600 cursor-pointer"
                            >
                                I agree to be contacted by EduDubai regarding this course enrollment.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full ${ACCENT_COLOR_CLASS} ${ACCENT_HOVER_CLASS} text-white font-bold py-6 h-auto rounded-full flex flex-col shadow-lg shadow-red-500/20 mt-2`}
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    <span className="text-lg font-black uppercase tracking-wide leading-none mb-1">Reserve My Free Seat</span>
                                    <span className="text-base font-bold opacity-90 leading-none">(First Session Free)</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
