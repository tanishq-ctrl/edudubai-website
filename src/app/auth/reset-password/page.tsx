"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, Lock } from "lucide-react"
import { z } from "zod"
import { logger } from "@/lib/logger"

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
        logger.debug("[ResetPassword] Verifying with code...")
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
    <AuthShell
      title="Choose a new password"
      subtitle="Set a new password for your account. You will be signed in with it straight away."
      footer={
        <p className="text-center text-2xs text-content-subtle">
          Remembered it?{" "}
          <Link href="/auth/login" className="underline underline-offset-2 hover:text-content">
            Back to sign in
          </Link>
          .
        </p>
      }
    >
      <div>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least six characters"
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              <>
                Update password
                <Lock className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </AuthShell>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <Loader2 className="h-8 w-8 animate-spin text-crimson-300" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}

