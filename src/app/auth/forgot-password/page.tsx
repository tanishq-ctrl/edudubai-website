"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, CheckCircle2, Mail, ArrowLeft, Send, Lock, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"

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
    <AuthShell
      title={view === "success" ? "Password reset" : "Forgot your password"}
      subtitle={
        view === "request"
          ? "Enter your email address and we will send you a reset code."
          : view === "verify"
            ? "Enter the verification code we sent you."
            : view === "reset"
              ? "Choose a new password for your account."
              : "Your password has been updated."
      }
      footer={
        <p className="text-center text-2xs text-content-subtle">
          Need help? <Link href="/contact" className="underline underline-offset-2 hover:text-content">Contact our team</Link>.
        </p>
      }
    >
      <div>
          {view === "success" ? (
            <div className="space-y-6 text-center py-6">
              <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="mb-2 text-xl font-semibold text-content-strong">
                  Password Updated Successfully
                </h2>
                <p className="text-sm text-content">
                  Redirecting you to login...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-sm flex gap-3 text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {view === "request" && (
                <form onSubmit={handleRequestReset} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Sending code...
                      </>
                    ) : (
                      <>
                        Send Reset Code
                        <Send className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {view === "verify" && (
                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="otp" >
                      Verification Code
                    </Label>
                    <p className="text-xs text-content mb-2">
                      Code sent to {email}
                    </p>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      maxLength={6}
                      required
                      disabled={loading}
                      className="h-14 text-center text-2xl tracking-widest font-semibold "
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <ShieldCheck className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setView("request")}
                    className="w-full text-sm text-content hover:text-crimson-600 font-medium"
                  >
                    ← Back to email
                  </button>
                </form>
              )}

              {view === "reset" && (
                <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="newPassword" >
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Create a strong password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={loading}
                      
                    />
                    <p className="text-xs text-content-muted">
                      Password must be at least 6 characters
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Updating password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <Lock className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              <div className="text-center pt-4 border-t border-line">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-content hover:text-crimson-600 font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </div>
          )}
      </div>
    </AuthShell>
  )
}
