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
    <div className="min-h-screen flex items-center justify-center bg-brand-navy relative overflow-hidden px-6">
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="w-full max-w-[500px] relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_48px_80px_-24px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Info Bar (Optional, matches popup) */}
            <div className="hidden md:flex md:w-[140px] bg-brand-navy p-6 text-white flex-col justify-between relative overflow-hidden border-r border-white/5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -mr-12 -mt-12" />
              <div className="relative z-10 space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold vertical-text transform rotate-180" style={{ writingMode: 'vertical-lr' }}>
                  AUTHENTICATION
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
                    Welcome Back
                  </span>
                  <h1 className="text-3xl font-black text-brand-navy tracking-tight leading-loose uppercase">
                    Sign In
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
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase text-neutral-text-muted">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-[10px] font-bold uppercase text-neutral-text-muted">Password</Label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-[9px] font-black uppercase text-brand-gold hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={loading}
                      className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold transition-all font-bold tracking-widest"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all hover:scale-[1.02] flex gap-2 mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Enter Dashboard <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative pt-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-border/50" />
                  </div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em] bg-white px-3">
                    <span className="text-neutral-text-muted/50">OR</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={loading || googleLoading}
                  className="w-full h-11 border-neutral-border/50 rounded-xl flex gap-3 text-xs font-bold hover:bg-neutral-bg-subtle transition-all active:scale-95 shadow-sm"
                >
                  {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Chrome className="h-4 w-4 text-red-500" /> Continue with Google</>}
                </Button>

                <div className="text-center pt-2">
                  <p className="text-neutral-text-muted/70 text-xs font-bold">
                    New specialist?{" "}
                    <Link
                      href={`/auth/register${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
                      className="text-brand-navy font-black hover:underline underline-offset-4 decoration-2"
                    >
                      Register Now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-white/20 text-[9px] font-black uppercase tracking-[0.5em] italic">
          EduDubai Professional Specialist Network
        </p>
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
