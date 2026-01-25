"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, Lock } from "lucide-react"
import { z } from "zod"

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don&apos;t match",
  path: ["confirmPassword"],
})

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const checkVerification = async () => {
      const supabase = createClient()

      // 1. Check if we have a code in the URL (from the new template)
      const code = searchParams.get("code")

      if (code) {
        console.log("[ResetPassword] Verifying with code...")
        const { error: verifyError } = await supabase.auth.exchangeCodeForSession(code)
        if (verifyError) {
          setError("This reset link has expired or was already used. Please request a new one.")
          setLoading(false)
          return
        }
        setError(null)
        setLoading(false)
        return
      }

      // 2. Fallback: Check current session (if redirected by AuthHandler)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setError(null)
        setLoading(false)
        return
      }

      // 3. Last fallback: Check hash
      const hash = window.location.hash
      if (hash.includes("error_description")) {
        setError("Your reset session has expired. Please request a new link.")
        setLoading(false)
        return
      }

      // If nothing found after loading, show error
      setTimeout(async () => {
        const { data: { session: secondCheck } } = await supabase.auth.getSession()
        if (!secondCheck) {
          setError("We couldn't verify your reset link. Please try requesting a new one.")
        }
        setLoading(false)
      }, 2000)
    }

    setLoading(true)
    checkVerification()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form data
      const validatedData = resetPasswordSchema.parse(formData)

      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        password: validatedData.password,
      })

      if (updateError) {
        setError(updateError.message || "An error occurred. Please try again.")
        return
      }

      // Redirect to login
      router.push("/auth/login?message=Password reset successful")
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy relative overflow-hidden px-6">
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="w-full max-w-[500px] relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_48px_80px_-24px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Info Bar */}
            <div className="hidden md:flex md:w-[140px] bg-brand-navy p-6 text-white flex-col justify-between relative overflow-hidden border-r border-white/5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -mr-12 -mt-12" />
              <div className="relative z-10 space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold vertical-text transform rotate-180" style={{ writingMode: 'vertical-lr' }}>
                  SECURITY
                </div>
              </div>
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-brand-gold" />
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12">
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/10 mb-4 inline-block">
                    Authorization Protocol
                  </span>
                  <h1 className="text-3xl font-black text-brand-navy tracking-tight leading-loose uppercase">
                    New Security Key
                  </h1>
                </div>

                {error && (
                  <div className="p-4 border border-red-500/10 bg-red-50 text-red-700 rounded-xl flex gap-3 text-xs font-bold shadow-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-[10px] font-bold uppercase text-neutral-text-muted">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold tracking-widest"
                    />
                    <p className="text-[9px] text-neutral-text-muted/60 font-medium px-1">Must be at least 6 characters</p>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase text-neutral-text-muted">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold tracking-widest"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all hover:scale-[1.02] mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Reset Security Key"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-white/20 text-[9px] font-black uppercase tracking-[0.5em] italic">
          Authorized Password Update Portal
        </p>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-navy">
        <Loader2 className="h-10 w-10 animate-spin text-brand-gold" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}

