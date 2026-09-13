"use client"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
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
import { TurnstileWidget } from "@/components/turnstile-widget"
import { logger } from "@/lib/logger"

interface ApplyNowDialogProps {
    courseSlug: string
    courseTitle: string
    className?: string
    size?: ButtonProps["size"]
    variant?: ButtonProps["variant"]
}

export function ApplyNowDialog({
    courseSlug,
    courseTitle,
    className,
    size = "lg",
    variant = "gold",
}: ApplyNowDialogProps) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [turnstileToken, setTurnstileToken] = useState("")
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
            }, turnstileToken)

            if (result.success) {
                // Google Ads Conversion Tracking
                if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "conversion", {
                        send_to: "AW-17858231822/Kt1dCLPxp_IbEI78u8NC",
                        value: 1.0,
                        currency: "INR",
                        event_callback: () => logger.debug("Conversion tracked")
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
                <DialogContent className="overflow-hidden border-t-4 border-t-success p-0 focus:outline-none sm:max-w-[31rem] [&>button]:hidden">
                    <div className="p-8 pb-10 flex flex-col items-center text-center space-y-6">
                        <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-9 w-9 text-success" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl ">Enrolment request received</h3>
                            <p className="leading-relaxed text-content-muted">
                                We have received your request for <br />
                                <span className="font-semibold text-content-strong">{courseTitle}</span>.
                            </p>
                        </div>

                        <p className="mx-auto max-w-xs text-sm leading-relaxed text-content-subtle">
                            An advisor will contact you to confirm scheduling, fees and enrolment details.
                        </p>

                        <div className="pt-2 w-full">
                            <Button
                                onClick={handleClose}
                                size="lg"
                                className="w-full"
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
                Apply now
            </Button>

            <DialogContent className="gap-0 border-t-4 border-t-gold-400 p-0 focus:outline-none sm:max-w-[32rem]">
                <div className="p-6 pt-8">
                    <DialogHeader>
                        <DialogTitle className="text-xl leading-tight text-content-strong">
                            Programme enrolment
                        </DialogTitle>
                        <DialogDescription className="mt-2 text-sm text-content-muted">
                            Provide your details and an advisor will confirm scheduling, fees and next steps for <strong>{courseTitle}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="space-y-1">
                            <Label htmlFor="name" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
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
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "apply-name-error" : undefined}
                            />
                            {errors.name ? <p id="apply-name-error" className="text-xs font-medium text-danger">{errors.name}</p> : null}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="email" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
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
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "apply-email-error" : undefined}
                            />
                            {errors.email ? <p id="apply-email-error" className="text-xs font-medium text-danger">{errors.email}</p> : null}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="phone" className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
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
                                aria-invalid={Boolean(errors.phone)}
                                aria-describedby={errors.phone ? "apply-phone-error" : undefined}
                            />
                            {errors.phone ? <p id="apply-phone-error" className="text-xs font-medium text-danger">{errors.phone}</p> : null}
                        </div>

                        <div className="flex items-start space-x-2 pt-2">
                            <Checkbox id="consent" required className="mt-0.5 data-[state=checked]:border-gold-400 data-[state=checked]:bg-gold-400 data-[state=checked]:text-navy-900" />
                            <label
                                htmlFor="consent"
                                className="cursor-pointer text-xs leading-snug text-content-muted"
                            >
                                I consent to being contacted by EduDubai regarding this enrolment.
                            </label>
                        </div>

                        <TurnstileWidget onToken={setTurnstileToken} />
                        <Button
                            type="submit"
                            disabled={loading || !turnstileToken}
                            variant="gold"
                            size="lg"
                            className="mt-2 h-auto w-full flex-col py-4"
                        >
                            {loading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                    <span className="text-base font-semibold leading-none">Submit enrolment request</span>
                                    <span className="mt-1 text-2xs font-medium uppercase tracking-wider opacity-70">Places confirmed by an advisor</span>
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
