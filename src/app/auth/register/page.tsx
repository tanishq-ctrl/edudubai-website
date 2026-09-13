"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Chrome, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { createClient } from "@/lib/supabase/client"
import { logger } from "@/lib/logger"

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
        logger.debug("Auth check skipped:", err)
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

        // Google Ads Conversion Tracking (Conversion Label can be added here once provided)
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "conversion", {
            send_to: "AW-17858231822",
            event_category: "registration",
            event_label: "standalone_registration"
          });
        }
      } catch (leadErr) {
        console.error("Failed to capture lead:", leadErr)
        // Continue with registration even if lead capture fails
      }

      const supabase = createClient()

      // Send OTP email (like forgot password does)
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: validatedData.email,
        options: {
          shouldCreateUser: false, // Don't auto-create, we'll do it after verification
        }
      })

      if (otpError) {
        // Ignore error if user doesn't exist - that's expected for new registrations
        logger.debug("OTP send info:", otpError.message)
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

      // Verify the OTP code
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: verificationCode,
        type: 'email' // Changed from 'signup' to 'email' for OTP verification
      })

      if (verifyError) {
        setError(verifyError.message)
        return
      }

      // After successful OTP verification, create the account
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
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
    <div className="flex min-h-screen items-start justify-center bg-surface px-4 pt-32 pb-24">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-3">
            Create Account
          </h1>
          <p className="text-content">
            Join Edu Dubai and start your learning journey
          </p>
        </div>

        <div className="rounded-lg border border-line bg-surface-raised shadow-sm p-8 md:p-12">
          {showVerification ? (
            <div className="max-w-md mx-auto space-y-6 text-center">
              <div>
                <h2 className="text-2xl font-bold text-navy-700 mb-2">
                  Verify Your Email
                </h2>
                <p className="text-sm text-content">
                  We&apos;ve sent a verification code to <br />
                  <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleVerify} className="flex flex-col gap-5">
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="h-14 text-center text-2xl tracking-widest font-semibold"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  required
                  disabled={verifying}
                />

                <Button
                  type="submit"
                  className="w-full w-full"
                  disabled={verifying || verificationCode.length !== 6}
                >
                  {verifying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>

                <button
                  type="button"
                  className="w-full text-sm text-content hover:text-navy-700 font-medium"
                  onClick={() => setShowVerification(false)}
                >
                  ← Back to registration
                </button>
              </form>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column - Form Fields */}
              <div>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-navy-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 "
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-navy-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 "
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-navy-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 "
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-navy-700">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 "
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Right Column - Google Sign In & Account Link */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-navy-700 mb-2">
                    Quick Registration
                  </h3>
                  <p className="text-sm text-content mb-6">
                    Sign up instantly with your Google account
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignUp}
                    disabled={loading || googleLoading}
                    className="w-full h-12 border-line hover:bg-neutral-bg text-base"
                  >
                    {googleLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <Chrome className="h-5 w-5 mr-2 text-red-500" />
                    )}
                    Continue with Google
                  </Button>
                </div>

                <div className="border-t border-line pt-6">
                  <p className="text-sm text-content text-center md:text-left">
                    Already have an account?{" "}
                    <Link
                      href={`/auth/login${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
                      className="text-navy-700 font-semibold hover:text-navy-700/80"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-content-muted">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
