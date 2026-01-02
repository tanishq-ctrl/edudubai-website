"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthCard } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, Chrome } from "lucide-react"
import Link from "next/link"
import { z } from "zod"

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don&apos;t match",
  path: ["confirmPassword"],
})

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    // Scroll to top on mount to ensure heading is visible
    window.scrollTo(0, 0)

    // Check for OAuth errors in URL
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }

    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const next = searchParams.get("next") || "/dashboard"
          router.replace(next)
        }
      } catch (err) {
        // Supabase might not be configured, ignore
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
      // Validate form data
      const validatedData = registerSchema.parse(formData)

      const supabase = createClient()
      
      // Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            full_name: validatedData.fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message || "An error occurred during registration")
        return
      }

      // Profile will be automatically created by database trigger
      // If trigger doesn't exist, we can manually create it here as fallback
      if (authData.user) {
        try {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: authData.user.id,
              full_name: validatedData.fullName,
            })

          if (profileError && !profileError.message.includes("duplicate")) {
            console.error("Profile creation error:", profileError)
            // Don't fail registration if profile creation fails
            // The profile can be created later via trigger or manually
          }
        } catch (err) {
          // Profile table might not exist or trigger handles it
          console.log("Profile will be created by trigger or manually")
        }
      }

      // Wait for cookies to be set
      await new Promise(resolve => setTimeout(resolve, 500))

      // Verify session is set (if email confirmation is not required)
      const { data: { session: verifySession }, error: verifyError } = await supabase.auth.getSession()
      console.log('[Register] Session after sign up:', {
        hasSession: !!verifySession,
        userId: verifySession?.user?.id || null,
        error: verifyError?.message || null,
      })

      // Get the redirect destination
      const next = searchParams.get("next") || "/dashboard"
      
      // If session exists, redirect to dashboard
      // If not (email confirmation might be required), still redirect
      if (verifySession) {
        console.log('[Register] Redirecting to:', next)
        window.location.href = next
      } else {
        // Email confirmation might be required, but redirect anyway
        // The middleware will handle authentication
        console.log('[Register] No session yet, redirecting anyway:', next)
        window.location.href = next
      }
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

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const next = searchParams.get("next") || "/dashboard"
      
      // Get the callback URL
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (oauthError) {
        setError(oauthError.message || "Failed to sign up with Google")
        setGoogleLoading(false)
        return
      }

      // The OAuth flow will redirect the user
      // No need to handle redirect here as Supabase handles it
    } catch (err) {
      console.error('[Register] Google OAuth error:', err)
      setError("An error occurred with Google sign-up. Please try again.")
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Create Account"
        description="Join thousands of professionals advancing their careers"
      >
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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
            className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-neutral-text-muted">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-2"
          onClick={handleGoogleSignUp}
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </>
          )}
        </Button>

        <Separator className="my-6" />

        <div className="text-center text-sm">
          <span className="text-neutral-text-muted">Already have an account? </span>
          <Link
            href={`/auth/login${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
            className="text-brand-navy hover:text-brand-navy-dark font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}

