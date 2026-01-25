"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { clearAuthCookies, isInvalidCookieError } from "@/lib/auth-utils"
import { Loader2, AlertCircle, Chrome, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) setError(decodeURIComponent(errorParam))

    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error && isInvalidCookieError(error)) {
          clearAuthCookies()
          await supabase.auth.signOut()
          return
        }
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
      const validatedData = loginSchema.parse(formData)
      const supabase = createClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      })

      if (signInError) {
        setError(signInError.message || "Invalid email or password")
        setLoading(false)
        return
      }

      const next = searchParams.get("next") || "/dashboard"
      window.location.href = next
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError("An error occurred. Please try again.")
      }
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const next = searchParams.get("next") || "/dashboard"
      const siteUrl = window.location.origin
      const callbackUrl = `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (oauthError) throw oauthError
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google")
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-neutral-bg overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Pane - Executive Info */}
        <div className="hidden lg:flex w-[45%] bg-brand-navy p-20 flex-col justify-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />

          <div className="relative z-10 space-y-16">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-white leading-tight tracking-tight uppercase">
                Empowering the <br />
                <span className="text-brand-gold">Compliance Elite</span>
              </h2>
              <p className="text-white/60 text-xl font-medium leading-relaxed max-w-md">
                Access your personalized training environment and track your progress towards global certification.
              </p>
            </div>

            <div className="space-y-8">
              {[
                "Instant Exam Diagnostic Access",
                "Personalized Study Roadmap",
                "Global Certification Tracking",
                "Direct Trainer Consultation"
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
              Official Certification Partner • DIFC • ADGM • UAE
            </p>
          </div>
        </div>

        {/* Right Pane - Professional Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 lg:px-20 bg-neutral-bg-subtle/30 overflow-y-auto">
          <div className="w-full max-w-[500px]">
            <div className="bg-white border border-neutral-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-14 rounded-[3rem] relative transition-all">
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-brand-gold" />

              <div className="text-center mb-12 space-y-3">
                <h1 className="text-4xl font-black text-brand-navy tracking-tight">Welcome Back</h1>
                <p className="text-neutral-text-muted text-[11px] font-black tracking-[0.2em] uppercase">Sign in to your learning portal</p>
              </div>

              {error && (
                <div className="mb-8 p-4 border border-red-500/20 bg-red-50 text-red-700 rounded-2xl flex gap-3 items-start">
                  <AlertCircle className="h-5 w-5 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted ml-2">Email Connection</Label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-text-muted/40 group-focus-within:text-brand-gold transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                      className="h-16 pl-14 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold text-brand-navy placeholder:font-medium placeholder:text-neutral-text-muted/40"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-2">
                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted">Security Key</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold hover:text-brand-navy transition-all"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-text-muted/40 group-focus-within:text-brand-gold transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={loading}
                      className="h-16 pl-14 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold tracking-widest"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 bg-brand-navy hover:bg-brand-navy-dark text-white font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex gap-3 items-center justify-center group"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-7 w-7 animate-spin" />
                  ) : (
                    <>
                      Push to Dashboard <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-12">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-border/50" />
                </div>
                <div className="relative flex justify-center text-[10px] font-black tracking-[0.3em] uppercase italic">
                  <span className="bg-white px-6 text-neutral-text-muted/50">Rapid Access</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-15 border-2 border-neutral-border hover:bg-neutral-bg-subtle text-brand-navy font-black rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-95 text-base"
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
              >
                {googleLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Chrome className="h-6 w-6 text-red-500" />
                    Sync with Google
                  </>
                )}
              </Button>

              <div className="mt-12 text-center">
                <p className="text-neutral-text-muted/70 text-sm font-bold">
                  New to the academy?{" "}
                  <Link
                    href={`/auth/register${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
                    className="text-brand-gold hover:text-brand-navy font-black underline underline-offset-4 decoration-2 transition-all"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            <p className="mt-12 text-center text-neutral-text-muted/30 text-[10px] font-black uppercase tracking-[0.5em] italic">
              256-Bit SSL Encypted Authorization Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-navy">
        <Loader2 className="h-10 w-10 animate-spin text-brand-gold" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
