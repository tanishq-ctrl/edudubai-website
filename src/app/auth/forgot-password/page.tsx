"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, CheckCircle2, Mail, ArrowLeft, Send, Lock, ShieldCheck } from "lucide-react"
import Link from "next/link"

type ViewState = "request" | "verify" | "reset" | "success"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<ViewState>("request")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)

      if (resetError) {
        setError(resetError.message)
        return
      }

      setView("verify")
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery'
      })

      if (verifyError) {
        setError(verifyError.message)
        return
      }

      setView("reset")
    } catch (err: any) {
      setError(err.message || "Invalid or expired code.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      setView("success")
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Failed to update password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-bg-subtle/50 relative overflow-hidden px-6 pt-20 pb-20">
      {/* Cinematic Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-navy/5 rounded-full blur-[120px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="w-full max-w-[650px] relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_48px_100px_-24px_rgba(0,0,0,0.15)] overflow-hidden border-t-8 border-t-brand-gold">
          <div className="flex flex-col md:flex-row h-full min-h-[450px]">
            {/* Info Panel */}
            <div className="hidden md:flex md:w-1/3 bg-brand-navy p-8 text-white flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="space-y-6 relative z-10">
                <h3 className="text-xl font-bold leading-tight">
                  Security Recovery
                </h3>
                <ul className="space-y-4 text-xs text-white/60 font-medium">
                  <li className="flex gap-2 items-center">
                    <ShieldCheck className="h-4 w-4 text-brand-gold" />
                    <span>Encrypted Protocol</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ShieldCheck className="h-4 w-4 text-brand-gold" />
                    <span>Identity Verification</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ShieldCheck className="h-4 w-4 text-brand-gold" />
                    <span>Secure Reset</span>
                  </li>
                </ul>
              </div>
              <div className="relative z-10 pt-12">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-brand-gold" />
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-8">
                {view === "success" ? (
                  <div className="space-y-8 animate-fade-in text-center py-6">
                    <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tight leading-none">Security Updated</h2>
                      <p className="text-neutral-text-muted text-[11px] font-bold uppercase tracking-widest mt-6 bg-green-50/50 py-3 px-4 rounded-xl border border-green-200/50">
                        Password reset successful. Redirecting to login...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold block mb-2">
                        {view === "request" ? "Authentication Protocol" : view === "verify" ? "Security Check" : "Final Step"}
                      </span>
                      <h1 className="text-3xl font-black text-brand-navy tracking-tight leading-none uppercase">
                        {view === "request" ? "Recover Access" : view === "verify" ? "Verify Identity" : "New Security Key"}
                      </h1>
                      {view === "verify" && (
                        <p className="text-[10px] text-neutral-text-muted font-bold mt-2 uppercase tracking-widest">
                          Verification code sent to {email}
                        </p>
                      )}
                    </div>

                    {error && (
                      <div className="p-4 border border-red-500/10 bg-red-50 text-red-700 rounded-xl flex gap-3 text-[11px] font-bold shadow-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        {error}
                      </div>
                    )}

                    {view === "request" && (
                      <form onSubmit={handleRequestReset} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Account Email</Label>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all flex gap-2"
                          disabled={loading}
                        >
                          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send Verification Code <Send className="h-5 w-5" /></>}
                        </Button>
                      </form>
                    )}

                    {view === "verify" && (
                      <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Enter 6-Digit Code</Label>
                          <Input
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            maxLength={6}
                            required
                            className="h-16 text-center text-3xl font-black tracking-[0.5em] bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold"
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <Button
                            type="submit"
                            className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all flex gap-2"
                            disabled={loading || otp.length !== 6}
                          >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Verify Identity <ShieldCheck className="h-5 w-5" /></>}
                          </Button>

                          <button
                            type="button"
                            onClick={() => setView("request")}
                            className="text-[10px] font-black uppercase tracking-widest text-neutral-text-muted hover:text-brand-navy transition-all py-2"
                          >
                            Back to email
                          </button>
                        </div>
                      </form>
                    )}

                    {view === "reset" && (
                      <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">New Secure Password</Label>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="h-12 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold tracking-widest"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all flex gap-2"
                          disabled={loading}
                        >
                          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Finalize Recovery <Lock className="h-5 w-5" /></>}
                        </Button>
                      </form>
                    )}

                    {view !== "success" && (
                      <div className="text-center pt-2">
                        <Link
                          href="/auth/login"
                          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-text-muted hover:text-brand-navy transition-all"
                        >
                          <ArrowLeft className="h-4 w-4" /> Return to Login
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-neutral-text-muted/30 text-[9px] font-black uppercase tracking-[0.5em] italic">
          Authorized Credentials Management • EduDubai Professional Specialist Network
        </p>
      </div>
    </div>
  )
}
