"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
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
import { Loader2, CheckCircle2, UserPlus, LogIn, Mail, ShieldCheck, Chrome, ArrowRight, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function LeadFormPopup() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [view, setView] = useState<"register" | "login" | "forgot-password">("register")
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const hasSubmitted = sessionStorage.getItem("lead_submitted")
        const isAuthPage = pathname.includes("/auth") || pathname.includes("/payment") || pathname.includes("/dashboard")

        if (!hasSubmitted && !isAuthPage) {
            const timer = setTimeout(() => {
                setOpen(true)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [pathname])

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true)
        try {
            const supabase = createClient()
            const siteUrl = window.location.origin
            const callbackUrl = `${siteUrl}/auth/callback?next=/dashboard`

            const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: callbackUrl,
                },
            })

            if (oauthError) throw oauthError
        } catch (error: any) {
            console.error("Google Auth error:", error)
            alert(error.message || "Could not connect to Google")
        } finally {
            setGoogleLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const name = formData.get("name") as string
        const company = formData.get("company") as string
        const phone = formData.get("phone") as string
        const course = formData.get("course") as string
        const password = formData.get("password") as string

        try {
            const supabase = createClient()

            if (view === "forgot-password") {
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/auth/reset-password`,
                })
                if (resetError) throw resetError
                setSubmitted(true)
                return
            }

            // 1. Capture Lead (CRM Sync) - Skip if just logging in
            if (view === "register") {
                await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, name, company, phone, course, source: "popup_registration" }),
                })
            }

            // 2. Register/Login user in Supabase
            if (view === "register") {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                            company: company,
                            phone: phone,
                        }
                    }
                })
                if (signUpError) throw signUpError
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (signInError) throw signInError
            }

            setSubmitted(true)
            sessionStorage.setItem("lead_submitted", "true")

            setTimeout(() => {
                setOpen(false)
                router.push("/dashboard")
                router.refresh()
            }, 2000)

        } catch (error: any) {
            console.error("Auth/Lead error:", error)
            alert(error.message || "An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[550px] border-t-8 border-t-brand-gold p-0 overflow-hidden bg-white shadow-2xl">
                {submitted ? (
                    <div className="py-20 flex flex-col items-center text-center space-y-6 animate-fade-in px-6">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center ring-8 ring-green-50">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
                                {view === "forgot-password" ? "Request Sent" : "Success"}
                            </h3>
                            <p className="text-lg text-neutral-text-muted">
                                {view === "forgot-password"
                                    ? `We've sent a recovery link to your email.`
                                    : "Redirecting you to your professional dashboard..."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Info Panel */}
                        <div className="hidden md:flex md:w-1/3 bg-brand-navy p-8 text-white flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="space-y-6 relative z-10 text-center md:text-left">
                                <h3 className="text-xl font-bold leading-tight">
                                    Global Specialist Onboarding
                                </h3>
                                <ul className="space-y-4 text-xs text-white/60 font-medium">
                                    <li className="flex gap-2">✓ Exam Diagnostic Access</li>
                                    <li className="flex gap-2">✓ DIFC/ADGM Study Circles</li>
                                    <li className="flex gap-2">✓ Instant Course Enrollment</li>
                                </ul>
                            </div>
                        </div>

                        {/* Form Panel */}
                        <div className="flex-1 p-8">
                            <DialogHeader className="mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">
                                        {view === "register" ? "Enrollment" : view === "login" ? "Welcome Back" : "Password Recovery"}
                                    </span>
                                </div>
                                <DialogTitle className="text-3xl font-black text-brand-navy tracking-tight leading-none">
                                    {view === "forgot-password" ? "Recover Access" : view === "register" ? "Create Account" : "Sign In"}
                                </DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {view === "register" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Full Name</Label>
                                                <Input name="name" placeholder="John" required className="h-11 bg-neutral-bg-subtle border-0 rounded-xl" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Phone</Label>
                                                <Input name="phone" placeholder="+971" required className="h-11 bg-neutral-bg-subtle border-0 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Company</Label>
                                            <Input name="company" placeholder="DIFC / ADGM / Firm Name" required className="h-11 bg-neutral-bg-subtle border-0 rounded-xl" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Interested In</Label>
                                            <Select name="course" required>
                                                <SelectTrigger className="h-11 bg-neutral-bg-subtle border-0 rounded-xl">
                                                    <SelectValue placeholder="Select Specialization" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cams">Certified Anti-Money Laundering Specialist (CAMS)</SelectItem>
                                                    <SelectItem value="cgss">Certified Global Sanctions Specialist (CGSS)</SelectItem>
                                                    <SelectItem value="ccm">Certified Compliance Manager (CCM)</SelectItem>
                                                    <SelectItem value="aml-specialist">Anti-Money Laundering Specialist (AMLS)</SelectItem>
                                                    <SelectItem value="sanctions-specialist">Sanctions Compliance Specialist (SCS)</SelectItem>
                                                    <SelectItem value="regulatory-specialist">Regulatory Compliance Specialist (RCS)</SelectItem>
                                                    <SelectItem value="fatca-crs">FATCA & CRS Specialist (FCS)</SelectItem>
                                                    <SelectItem value="tbml">Trade Based Money Laundering (TBML)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-1">
                                    <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Email Address</Label>
                                    <Input name="email" type="email" placeholder="you@company.com" required className="h-11 bg-neutral-bg-subtle border-0 rounded-xl" />
                                </div>

                                {view !== "forgot-password" && (
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Password</Label>
                                            {view === "login" && (
                                                <button
                                                    type="button"
                                                    onClick={() => setView("forgot-password")}
                                                    className="text-[9px] font-bold uppercase text-brand-gold hover:underline"
                                                >
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <Input name="password" type="password" placeholder="••••••••" required className="h-11 bg-neutral-bg-subtle border-0 rounded-xl" />
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            {view === "register" ? "Generate Access" : view === "login" ? "Enter Dashboard" : "Push Reset Link"}
                                            <ArrowRight className="h-5 w-5" />
                                        </>
                                    )}
                                </Button>

                                <div className="space-y-4 pt-2">
                                    <div className="relative">
                                        <Separator className="bg-neutral-border/50" />
                                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-black text-neutral-text-muted">OR</span>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleGoogleSignIn}
                                        disabled={googleLoading}
                                        className="w-full h-11 border-neutral-border/50 rounded-xl flex gap-3 text-xs font-bold"
                                    >
                                        {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Chrome className="h-4 w-4 text-red-500" /> Continue with Google</>}
                                    </Button>

                                    <div className="text-center">
                                        {view === "forgot-password" ? (
                                            <button type="button" onClick={() => setView("login")} className="text-brand-navy font-bold text-xs flex items-center justify-center gap-1 w-full hover:underline">
                                                <ArrowLeft className="h-3 w-3" /> Back to Sign In
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setView(view === "register" ? "login" : "register")}
                                                className="text-brand-navy font-bold text-xs hover:underline"
                                            >
                                                {view === "register" ? "Already a student? Log In" : "New specialist? Register Now"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
