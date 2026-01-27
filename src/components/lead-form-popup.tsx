"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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
import { Loader2, CheckCircle2, Mail, ShieldCheck, ArrowRight, Phone, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function LeadFormPopup() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()

            const hasSubmitted = localStorage.getItem("lead_submitted")
            const isAuthPage = pathname.includes("/auth") || pathname.includes("/payment") || pathname.includes("/dashboard")

            // If user is already logged in, do not show popup
            if (session) return

            if (!hasSubmitted && !isAuthPage) {
                const timer = setTimeout(() => {
                    setOpen(true)
                }, 3000)
                return () => clearTimeout(timer)
            }
        }

        checkAuth()
    }, [pathname])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const name = formData.get("name") as string
        const phone = formData.get("phone") as string
        const course = formData.get("course") as string

        try {
            // 1. Capture Lead (CRM Sync to Systeme.io via API)
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name,
                    phone,
                    course,
                    source: "popup_v2_lead_only"
                }),
            })

            setSubmitted(true)
            localStorage.setItem("lead_submitted", "true")

            setTimeout(() => {
                setOpen(false)
            }, 3000)

        } catch (error: any) {
            console.error("Lead submission error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                hideCloseButton
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="sm:max-w-[550px] border-t-8 border-t-brand-gold p-0 overflow-hidden bg-white shadow-2xl"
            >
                {submitted ? (
                    <div className="py-20 flex flex-col items-center text-center space-y-6 animate-fade-in px-6">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center ring-8 ring-green-50">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-brand-navy tracking-tight uppercase">
                                You're on the list
                            </h3>
                            <p className="text-lg text-neutral-text-muted">
                                Don&apos;t miss this opportunity to advance your career.ceive the latest certification updates and exam alerts in your inbox.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Info Panel */}
                        <div className="hidden md:flex md:w-1/3 bg-brand-navy p-8 text-white flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="space-y-6 relative z-10">
                                <h3 className="text-xl font-bold leading-tight">
                                    Global Certification Updates
                                </h3>
                                <ul className="space-y-4 text-xs text-white/60 font-medium">
                                    <li className="flex gap-2 items-center">
                                        <ShieldCheck className="h-4 w-4 text-brand-gold" />
                                        <span>Exam Release Alerts</span>
                                    </li>
                                    <li className="flex gap-2 items-center">
                                        <ShieldCheck className="h-4 w-4 text-brand-gold" />
                                        <span>GCI Study Guides</span>
                                    </li>
                                    <li className="flex gap-2 items-center">
                                        <ShieldCheck className="h-4 w-4 text-brand-gold" />
                                        <span>Industry Briefings</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative z-10 pt-8">
                                <div className="text-[10px] font-bold uppercase text-white/40 tracking-widest">
                                    Join 5,000+ Professionals
                                </div>
                            </div>
                        </div>

                        {/* Form Panel */}
                        <div className="flex-1 p-8">
                            <DialogHeader className="mb-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold block mb-2">
                                    Stay Ahead of the Curve
                                </span>
                                <DialogTitle className="text-3xl font-black text-brand-navy tracking-tight leading-none uppercase">
                                    Certification Insider
                                </DialogTitle>
                                <DialogDescription className="text-xs text-neutral-text-muted mt-2 font-medium">
                                    Register now to get the complete course syllabus, exam guide, and free career consultation. It&apos;s fast and easy. on international professional certifications.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase text-neutral-text-muted flex gap-2 items-center">
                                        <User className="h-3 w-3" /> Full Name
                                    </Label>
                                    <Input
                                        name="name"
                                        placeholder="We&apos;ll send the details to your email immediately."
                                        required
                                        className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase text-neutral-text-muted flex gap-2 items-center">
                                        <Phone className="h-3 w-3" /> Phone Number
                                    </Label>
                                    <Input
                                        name="phone"
                                        placeholder="+91 -- --- ----"
                                        required
                                        className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase text-neutral-text-muted flex gap-2 items-center">
                                        <Mail className="h-3 w-3" /> Email Address
                                    </Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="you@company.com"
                                        required
                                        className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Interested In</Label>
                                    <Select name="course" required>
                                        <SelectTrigger className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold text-left">
                                            <SelectValue placeholder="Select Specialization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cams">CAMS Certification</SelectItem>
                                            <SelectItem value="cgss">CGSS Certification</SelectItem>
                                            <SelectItem value="ccm">CCM (Global Compliance)</SelectItem>
                                            <SelectItem value="aml-specialist">AML Specialist</SelectItem>
                                            <SelectItem value="sanctions-specialist">Sanctions Specialist</SelectItem>
                                            <SelectItem value="regulatory-specialist">Regulatory Specialist</SelectItem>
                                            <SelectItem value="corporate-training">Corporate Training</SelectItem>
                                            <SelectItem value="other">Other Inquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex gap-2 mt-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            Get Exclusive Updates <ArrowRight className="h-5 w-5" />
                                        </>
                                    )}
                                </Button>

                                <div className="pt-2 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="text-[10px] font-bold uppercase text-neutral-text-muted/60 hover:text-brand-navy transition-colors tracking-widest"
                                    >
                                        I'll explore first
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
