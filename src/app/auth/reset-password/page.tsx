"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle } from "lucide-react"
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
    let attempts = 0
    const maxAttempts = 15 // Wait up to 7.5 seconds

    const checkSession = async () => {
      const supabase = createClient()

      // 1. Check for errors in the URL hash (common when links are old)
      const hash = window.location.hash
      if (hash.includes("error_description")) {
        const params = new URLSearchParams(hash.substring(1).replace(/&/g, '&'))
        const errorMsg = params.get("error_description")?.replace(/\+/g, ' ')
        setError(errorMsg || "This reset link is no longer valid. Please request a new one.")
        setLoading(false)
        return
      }

      // 2. Check current session
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setError(null)
        setLoading(false)
        console.log("[ResetPassword] Recovery session confirmed.")
        return
      }

      // 3. Polling for session (Supabase client often needs a few seconds to parse the hash)
      if (attempts < maxAttempts) {
        attempts++
        setTimeout(checkSession, 500)
      } else {
        setError("Your session could not be verified. This usually happens if the link is old or already used.")
        setLoading(false)
      }
    }

    checkSession()
  }, [])

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Reset Password"
        description="Enter your new password"
      >
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={loading}
            />
            <p className="text-xs text-neutral-text-muted">
              Must be at least 6 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </AuthCard>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
        <AuthCard title="Reset Password" description="Enter your new password">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-brand-navy" />
          </div>
        </AuthCard>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}

