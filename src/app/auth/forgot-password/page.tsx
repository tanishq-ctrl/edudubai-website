"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, CheckCircle2, Mail, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const validatedData = forgotPasswordSchema.parse({ email })
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        validatedData.email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      )
      if (resetError) {
        setError(resetError.message)
        return
      }
      setSuccess(true)
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
                  RECOVERY
                </div>
              </div>
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-brand-gold" />
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12">
              <div className="space-y-8">
                {success ? (
                  <div className="space-y-8 animate-fade-in text-center">
                    <div>
                      <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-black text-brand-navy uppercase tracking-tight">Transmission Sent</h2>
                      <p className="text-neutral-text-muted text-[10px] font-bold uppercase tracking-wider mt-4">
                        A secure master key has been sent to your email.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                      <Button
                        onClick={() => {
                          setSuccess(false)
                          setEmail("")
                        }}
                        variant="outline"
                        className="h-11 border-neutral-border text-brand-navy font-black rounded-xl text-xs hover:bg-neutral-bg-subtle"
                      >
                        Resend Connection
                      </Button>

                      <Link
                        href="/auth/login"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold hover:text-brand-navy flex items-center justify-center gap-2 transition-all"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back to Sign In
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/10 mb-4 inline-block">
                        Access Recovery
                      </span>
                      <h1 className="text-3xl font-black text-brand-navy tracking-tight leading-loose uppercase">
                        Recover Access
                      </h1>
                    </div>

                    {error && (
                      <div className="p-4 border border-red-500/10 bg-red-50 text-red-700 rounded-xl flex gap-3 text-xs font-bold shadow-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-[10px] font-bold uppercase text-neutral-text-muted">Registered Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 bg-neutral-bg-subtle border-0 rounded-xl focus:ring-2 focus:ring-brand-gold font-bold"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-7 text-base rounded-2xl shadow-xl transition-all flex gap-2"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Transmit Security Link <Send className="h-5 w-5" /></>}
                      </Button>
                    </form>

                    <div className="text-center pt-2">
                      <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-text-muted hover:text-brand-navy transition-all"
                      >
                        <ArrowLeft className="h-4 w-4" /> Return to Login
                      </Link>
                    </div>
                  </div>
                )}
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
