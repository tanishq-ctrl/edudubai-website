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
    <div className="min-h-screen flex flex-col pt-20 bg-neutral-bg overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Pane - Executive Info */}
        <div className="hidden lg:flex w-[45%] bg-brand-navy p-20 flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />

          <div className="relative z-10 space-y-16">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-white leading-tight tracking-tight uppercase">
                Secure <br />
                <span className="text-brand-gold">Access Recovery</span>
              </h2>
              <p className="text-white/60 text-xl font-medium leading-relaxed max-w-md">
                Initiating a secure credentials reset for your professional academy profile.
              </p>
            </div>

            <div className="space-y-8">
              {[
                "256-Bit Encrypted Link Delivery",
                "Instant Access Restoration",
                "Verified Security Protocol",
                "Global Identity Shield"
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
              Official EduDubai Security Protocol • MENA Region
            </p>
          </div>
        </div>

        {/* Right Pane - Reset form */}
        <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 lg:px-20 bg-neutral-bg-subtle/30 overflow-y-auto">
          <div className="w-full max-w-[500px]">
            <div className="bg-white border border-neutral-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-14 rounded-[3rem] relative transition-all">
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-brand-gold" />

              {success ? (
                <div className="text-center py-12 space-y-10 animate-fade-in">
                  <div className="flex justify-center">
                    <div className="h-28 w-28 bg-green-50 rounded-full flex items-center justify-center ring-[12px] ring-green-50/50">
                      <CheckCircle2 className="h-14 w-14 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-brand-navy tracking-tight uppercase">Transmission Success</h2>
                    <p className="text-neutral-text-muted text-base font-bold italic leading-relaxed">
                      If <span className="text-brand-navy underline decoration-brand-gold decoration-2">{email}</span> is registered, a secure recovery master key has been sent.
                    </p>
                  </div>

                  <div className="pt-8 flex flex-col gap-5">
                    <Button
                      onClick={() => {
                        setSuccess(false)
                        setEmail("")
                      }}
                      variant="outline"
                      className="h-16 border-2 border-neutral-border text-brand-navy font-black rounded-2xl text-lg hover:bg-neutral-bg-subtle"
                    >
                      Resend Connection
                    </Button>

                    <Link
                      href="/auth/login"
                      className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-gold hover:text-brand-navy flex items-center justify-center gap-3 transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" /> Back to Dashboard Login
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl font-black text-brand-navy tracking-tight">Access Recovery</h1>
                    <p className="text-neutral-text-muted text-[11px] font-black tracking-[0.2em] uppercase italic">Corporate ID matching required</p>
                  </div>

                  {error && (
                    <div className="p-4 border border-red-500/20 bg-red-50 text-red-700 rounded-2xl flex gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <p className="text-xs font-bold leading-relaxed text-left">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-text-muted ml-2">Registered Connection</Label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-text-muted/40 group-focus-within:text-brand-gold transition-all" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                          className="h-16 pl-14 bg-neutral-bg-subtle border-0 rounded-2xl focus:ring-2 focus:ring-brand-gold transition-all font-bold"
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
                        <>Transmit Security Link <Send className="h-6 w-6 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" /></>
                      )}
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <Link
                      href="/auth/login"
                      className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-neutral-text-muted hover:text-brand-gold transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" /> Return to Login
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-12 text-center text-neutral-text-muted/30 text-[10px] font-black uppercase tracking-[0.5em] italic whitespace-nowrap">
              Authorized Credentials Management • EduDubai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
