"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Chrome, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showVerification, setShowVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const next = searchParams.get("next") || "/dashboard"
          router.replace(next)
        }
      } catch (err) {
        console.log("Auth check skipped:", err)
      }
    }
    checkUser()
  }, [router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const validatedData = registerSchema.parse(formData)

      // 1. Capture Lead (CRM Sync)
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: validatedData.email,
            name: validatedData.fullName,
            source: "standalone_registration"
          }),
        })
      } catch (leadErr) {
        console.error("Failed to capture lead:", leadErr)
        // Continue with registration even if lead capture fails
      }

      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: { data: { full_name: validatedData.fullName } },
      })
      if (signUpError) {
        setError(signUpError.message)
        return
      }
      setShowVerification(true)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifying(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: verificationCode,
        type: 'signup'
      })
      if (verifyError) {
        setError(verifyError.message)
        return
      }
      const next = searchParams.get("next") || "/dashboard"
      router.push(next)
    } catch (err) {
      setError("Failed to verify code.")
    } finally {
      setVerifying(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const siteUrl = window.location.origin
      const callbackUrl = `${siteUrl}/auth/callback?next=/dashboard`
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callbackUrl },
      })
      if (oauthError) throw oauthError
    } catch (err: any) {
      setError(err.message)
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-neutral-bg overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Pane - Executive Info */}
        <div className="hidden lg:flex w-[45%] bg-brand-navy p-20 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />

          <div className="relative z-10 space-y-16">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-white leading-tight tracking-tight uppercase">
                Your Global <br />
                <span className="text-brand-gold">Specialist Journey</span> Starts here
              </h2>
              <p className="text-white/60 text-xl font-medium leading-relaxed max-w-md">
                Join the MENA region&apos;s most prestigious network of certified compliance and financial specialists.
              </p>
            </div>

            <div className="space-y-8">
              {[
                "Instant Course Access Post-Payment",
                "Recognized Certification Badge",
                "Premium Networking Hub",
                "Elite Study Resources"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-gold/20 group-hover:border-brand-gold/30 transition-all shadow-xl">
                    <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                  </div>
                  <span className="text-white/80 text-lg font-bold tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-20 border-t border-white/10 pt-8 w-[calc(100%-160px)]">
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/30 whitespace-nowrap">
              Trusted by Leaders at DIFC, ADGM, and Global Banks
            </p>
          </div>
        </div>

        {/* Right Pane - Registration Form */}
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 lg:px-20 bg-neutral-bg-subtle/30 overflow-y-auto">
          <div className="w-full max-w-[550px]">
            <div className="bg-white border border-neutral-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-14 rounded-[3rem] relative transition-all">
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-brand-gold" />

              {showVerification ? (
                <div className="space-y-10 animate-fade-in py-6">
                  <div className="text-center space-y-4">
                    <h1 className="text-3xl font-black text-brand-navy tracking-tight">Security Verification</h1>
                    <p className="text-neutral-text-muted text-[11px] font-black tracking-[0.2em] uppercase">Checking connection to {formData.email}</p>
                  </div>

                  <form onSubmit={handleVerify} className="space-y-8 text-center">
                    <Input
                      id="code"
                      type="text"
                      placeholder="000 000"
                      maxLength={6}
                      className="h-20 text-center text-5xl tracking-[0.5em] font-black bg-neutral-bg-subtle border-0 rounded-2xl"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                      required
                      disabled={verifying}
                    />

                    <Button
                      type="submit"
                      className="w-full h-16 bg-brand-navy hover:bg-brand-navy-dark text-white font-black text-xl rounded-2xl shadow-xl transition-all"
                      disabled={verifying || verificationCode.length !== 6}
                    >
                      {verifying ? "Processing..." : "Complete Enrollment"}
                    </Button>

                    <button
                      type="button"
                      className="text-neutral-text-muted/60 hover:text-brand-navy text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                      onClick={() => setShowVerification(false)}
                    >
                      ← Return to Registration
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-10">
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-black text-brand-navy tracking-tight">Create Account</h1>
                    <p className="text-neutral-text-muted text-[11px] font-black tracking-[0.2em] uppercase">Join the MENA elite certification network</p>
                  </div>

                  {error && (
                    <div className="p-4 border border-red-500/20 bg-red-50 text-red-700 rounded-2xl flex gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <p className="text-xs font-bold leading-relaxed">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted ml-2">Full Specialist Name</Label>
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-text-muted/40 group-focus-within:text-brand-gold transition-colors" />
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                          className="h-16 pl-14 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted ml-2">Corporate Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-text-muted/40 group-focus-within:text-brand-gold transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="h-16 pl-14 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted ml-2">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          className="h-16 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold tracking-widest"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted ml-2">Confirm</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                          className="h-16 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold tracking-widest"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 bg-brand-navy hover:bg-brand-navy-dark text-white font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex gap-3 items-center justify-center group mt-4"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : <>Enroll Specialist <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform" /></>}
                    </Button>
                  </form>

                  <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-border/50" />
                    </div>
                    <div className="relative flex justify-center text-[10px] font-black tracking-[0.3em] uppercase italic">
                      <span className="bg-white px-6 text-neutral-text-muted/50">Rapid Sync</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-15 border-2 border-neutral-border hover:bg-neutral-bg-subtle text-brand-navy font-black rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-95"
                    onClick={handleGoogleSignUp}
                    disabled={loading || googleLoading}
                  >
                    {googleLoading ? (
                      "Connecting..."
                    ) : (
                      <>
                        <Chrome className="h-6 w-6 text-red-500" />
                        Sync with Google
                      </>
                    )}
                  </Button>

                  <div className="mt-10 text-center">
                    <p className="text-neutral-text-muted/70 text-sm font-bold">
                      Already part of the network?{" "}
                      <Link
                        href={`/auth/login${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
                        className="text-brand-gold hover:text-brand-navy font-black underline underline-offset-4 decoration-2 transition-all"
                      >
                        Authenticate here
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-10 text-center text-neutral-text-muted/30 text-[10px] font-black uppercase tracking-[0.5em] italic">
              Verified Secure Enrollment Portal • EduDubai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-navy">
        <Loader2 className="h-10 w-10 animate-spin text-brand-gold" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
