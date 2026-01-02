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
import { clearAuthCookies, isInvalidCookieError } from "@/lib/auth-utils"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { Chrome } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
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
    // Check for OAuth errors in URL
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }

    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        
        // If there's an auth error with invalid cookies, clear them
        if (error && isInvalidCookieError(error)) {
          console.log('[Login] Clearing invalid cookies')
          clearAuthCookies()
          await supabase.auth.signOut()
          return
        }
        
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

      if (!data.user) {
        setError("Login failed. Please try again.")
        setLoading(false)
        return
      }

      if (!data.session) {
        setError("Session not created. Please try again.")
        setLoading(false)
        return
      }

      // The browser client automatically sets cookies via createBrowserClient
      // Wait for cookies to be written
      await new Promise(resolve => setTimeout(resolve, 500))

      // Verify the session is accessible on the client
      const { data: { session: verifySession }, error: verifyError } = await supabase.auth.getSession()
      
      console.log('[Login] Session verification:', {
        hasSession: !!verifySession,
        userId: verifySession?.user?.id || null,
        error: verifyError?.message || null,
      })

      if (!verifySession) {
        console.error('[Login] Session verification failed:', verifyError)
        setError("Session not persisted. Please try again.")
        setLoading(false)
        return
      }

      // Get the redirect destination
      const next = searchParams.get("next") || "/dashboard"
      
      // Use window.location for a full page reload to ensure middleware sees fresh cookies
      // This is more reliable than router.push for auth flows
      console.log('[Login] Redirecting to:', next)
      window.location.href = next
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof Error && err.message.includes("Missing Supabase")) {
        setError("Authentication is not configured. Please contact support.")
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
      
      // Get the callback URL
      const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (oauthError) {
        setError(oauthError.message || "Failed to sign in with Google")
        setGoogleLoading(false)
        return
      }

      // The OAuth flow will redirect the user
      // No need to handle redirect here as Supabase handles it
    } catch (err) {
      console.error('[Login] Google OAuth error:', err)
      setError("An error occurred with Google sign-in. Please try again.")
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard
        title="Welcome Back"
        description="Sign in to your account to continue learning"
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-brand-navy hover:text-brand-navy-dark hover:underline"
              >
                Forgot password?
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
                Signing in...
              </>
            ) : (
              "Sign In"
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
          onClick={handleGoogleSignIn}
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
          <span className="text-neutral-text-muted">Don't have an account? </span>
          <Link
            href={`/auth/register${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
            className="text-brand-navy hover:text-brand-navy-dark font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </AuthCard>
    </div>
  )
}
