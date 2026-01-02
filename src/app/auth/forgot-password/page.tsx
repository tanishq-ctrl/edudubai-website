"use client"

import { useState } from "react"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
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
      // Validate email
      const validatedData = forgotPasswordSchema.parse({ email })

      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        validatedData.email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      )

      if (resetError) {
        setError(resetError.message || "An error occurred. Please try again.")
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
        <AuthCard
          title="Check Your Email"
          description="We've sent you a password reset link"
        >
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              If an account exists with {email}, we've sent a password reset link to your email.
              Please check your inbox and follow the instructions.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              onClick={() => {
                setSuccess(false)
                setEmail("")
              }}
              variant="outline"
              className="w-full"
            >
              Send Another Email
            </Button>

            <div className="text-center text-sm">
              <Link
                href="/auth/login"
                className="text-brand-navy hover:text-brand-navy-dark font-semibold hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Reset Password"
        description="Enter your email address and we'll send you a link to reset your password"
      >
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            href="/auth/login"
            className="text-brand-navy hover:text-brand-navy-dark font-semibold hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}

