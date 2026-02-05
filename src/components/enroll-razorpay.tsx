"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

interface EnrollRazorpayProps {
  courseSlug: string
  courseTitle?: string
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  scrollToId?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function EnrollRazorpay({
  courseSlug,
  courseTitle,
  className,
  size = "lg",
  variant = "default",
  scrollToId,
}: EnrollRazorpayProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const loadRazorpayScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve()
        return
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve())
        existingScript.addEventListener("error", () => reject(new Error("Failed to load Razorpay script")))
        return
      }

      // Load the script
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Razorpay script"))
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsAuthenticated(!!user)
      } catch (error) {
        console.error("Error checking auth:", error)
        setIsAuthenticated(false)
      } finally {
        setCheckingAuth(false)
      }
    }
    checkAuth()
  }, [])

  const validateEmail = (email: string): boolean => {
    if (!email) return true // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEnrollClick = () => {
    // Mobile optimized: scroll to lead form if scrollToId is provided
    if (scrollToId && window.innerWidth < 1024) { // lg breakpoint is 1024px
      const element = document.getElementById(scrollToId)
      if (element) {
        // Account for loose/fixed header height (approx 80px) plus some breathing room
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
        return
      }
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to register with next parameter
      router.push(`/auth/register?next=/courses/${courseSlug}`)
      return
    }

    // Show email dialog first
    setShowEmailDialog(true)
  }

  const handleEmailSubmit = async () => {
    // Validate email if provided
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError("")
    const userEmail = email || undefined
    setShowEmailDialog(false)
    await handleEnroll(userEmail)
  }

  const handleEnroll = async (userEmail?: string) => {
    if (loading) return

    setLoading(true)

    try {
      // Step 1: Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseSlug }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || "Failed to create payment order")
      }

      const orderData = await orderResponse.json()

      if (!orderData.orderId) {
        throw new Error(orderData.error || "Failed to create payment order")
      }

      // Step 2: Load Razorpay script
      await loadRazorpayScript()

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout failed to load")
      }

      // Step 3: Open Razorpay checkout
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      if (!razorpayKey) {
        throw new Error("Razorpay key not configured")
      }

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EduDubai",
        description: courseTitle || orderData.courseTitle || "Course Enrollment",
        order_id: orderData.orderId,
        notes: {
          courseSlug,
        },
        handler: async function (response: any) {
          try {
            // Step 4: Verify payment on server
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseSlug,
                email: userEmail,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.ok) {
              // Redirect to success page
              window.location.href = `/payment/success?course=${courseSlug}&order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`
            } else {
              // Redirect to failed page
              window.location.href = `/payment/failed?course=${courseSlug}&error=${encodeURIComponent(verifyData.error || "Payment verification failed")}`
            }
          } catch (error: any) {
            console.error("Payment verification error:", error)
            window.location.href = `/payment/failed?course=${courseSlug}&error=${encodeURIComponent(error.message || "Payment verification failed")}`
          }
        },
        prefill: {
          // You can prefill customer details if available
        },
        theme: {
          color: "#1e3a5f", // Brand navy color
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response)
        window.location.href = `/payment/failed?course=${courseSlug}&error=${encodeURIComponent(response.error?.description || "Payment failed")}`
        setLoading(false)
      })

      razorpay.open()
    } catch (error: any) {
      console.error("Enrollment error:", error)
      alert(error.message || "Failed to initiate payment. Please try again.")
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleEnrollClick}
        disabled={loading || checkingAuth}
        className={className}
        size={size}
        variant={variant}
      >
        {loading || checkingAuth ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {checkingAuth ? "Checking..." : "Processing..."}
          </>
        ) : (
          scrollToId ? (
            <>
              <span className="lg:hidden">Reserve My Free Seat</span>
              <span className="hidden lg:inline">Enroll Now</span>
            </>
          ) : (
            "Enroll Now"
          )
        )}
      </Button>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Almost there!</DialogTitle>
            <DialogDescription>
              Enter your email to receive course access details and confirmation. (Optional)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError("")
                }}
                className={emailError ? "border-red-500" : ""}
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
              <p className="text-xs text-neutral-text-muted">
                You can skip this step, but we recommend providing your email for course access.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={async () => {
                setShowEmailDialog(false)
                setEmail("")
                setEmailError("")
                await handleEnroll(undefined)
              }}
            >
              Skip
            </Button>
            <Button onClick={handleEmailSubmit} disabled={loading}>
              Continue to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

