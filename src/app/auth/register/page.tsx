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
import { AuthShell } from "@/components/auth/auth-shell"

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
    <AuthShell
      title={showVerification ? "Verify your email" : "Create your account"}
      subtitle={
        showVerification
          ? `We sent a six-digit code to ${formData.email}.`
          : "Register to track your enrolments, course materials and certificates."
      }
      footer={
        <p className="text-center text-2xs text-content-subtle">
          By creating an account you agree to our{" "}
          <Link href="/policies/terms" className="underline underline-offset-2 hover:text-content">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/policies/privacy" className="underline underline-offset-2 hover:text-content">
            Privacy Policy
          </Link>
          .
        </p>
      }
    >
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {showVerification ? (
        <form onSubmit={handleVerify} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              maxLength={6}
              className="h-14 text-center text-2xl font-semibold tracking-[0.4em]"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              required
              disabled={verifying}
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={verifying || verificationCode.length !== 6}>
            {verifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Complete registration"
            )}
          </Button>

          <button
            type="button"
            className="text-sm font-medium text-content-muted underline-offset-4 hover:text-content hover:underline"
            onClick={() => setShowVerification(false)}
          >
            Back to registration
          </button>
        </form>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least six characters"
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface px-4 text-content-muted">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            disabled={loading || googleLoading}
            size="lg"
            className="w-full"
          >
            {googleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Chrome className="mr-2 h-4 w-4" />
            )}
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-content-muted">
            Already have an account?{" "}
            <Link
              href={`/auth/login${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
              className="font-semibold text-crimson-600 underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      )}
    </AuthShell>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-crimson-300" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
