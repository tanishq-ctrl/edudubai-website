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
    <div className="min-h-screen flex items-center justify-center bg-neutral-bg-subtle/50 relative overflow-hidden px-6 pt-20">
      {/* Cinematic Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-navy/5 rounded-full blur-[120px] -mr-32 -mt-32" />

      <div className="w-full max-w-[600px] relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_48px_100px_-24px_rgba(0,0,0,0.15)] overflow-hidden border-t-8 border-t-brand-gold">
          <div className="flex flex-col md:flex-row h-full">
            {/* Info Panel */}
            <div className="hidden md:flex md:w-1/3 bg-brand-navy p-8 text-white flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="space-y-6 relative z-10">
                <h3 className="text-xl font-bold leading-tight">
                  Global Specialist Recovery
                </h3>
                <ul className="space-y-4 text-xs text-white/60 font-medium">
                  <li className="flex gap-2">✓ Encrypted Connection</li>
                  <li className="flex gap-2">✓ DIFC/ADGM Study Hub</li>
                  <li className="flex gap-2">✓ Verified Identity Check</li>
                </ul>
              </div>
              <div className="relative z-10 pt-12">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-brand-gold" />
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12">
              <div className="space-y-8">
                {success ? (
                  <div className="space-y-8 animate-fade-in text-center py-6">
                    <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tight leading-none">Transmission Sent</h2>
                      <p className="text-neutral-text-muted text-[10px] font-bold uppercase tracking-widest mt-6 bg-neutral-bg-subtle py-3 px-4 rounded-xl border border-neutral-border/30">
                        Check your specialist mailbox for the link.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                      <Button
                        onClick={() => {
                          setSuccess(false)
                          setEmail("")
                        }}
                        variant="outline"
                        className="h-11 border-neutral-border/50 text-brand-navy font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-neutral-bg-subtle transition-all"
                      >
                        Resend Connection
                      </Button>

                      <Link
                        href="/auth/login"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold hover:text-brand-navy flex items-center justify-center gap-2 transition-all mt-4"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back to Sign In
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold block mb-2">
                        Authorization Protocol
                      </span>
                      <h1 className="text-3xl font-black text-brand-navy tracking-tight leading-none uppercase">
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
                        <Label className="text-[10px] font-bold uppercase text-neutral-text-muted">Registered Email</Label>
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

        <p className="mt-8 text-center text-neutral-text-muted/30 text-[9px] font-black uppercase tracking-[0.5em] italic">
          Authorized Credentials Management • EduDubai
        </p>
      </div>
    </div>
  )
}
