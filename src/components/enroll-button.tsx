"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createRazorpayOrder } from "@/server/actions/payments"
import Script from "next/script"

interface EnrollButtonProps {
  courseId: string
  userId?: string
  price: number
  courseTitle: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function EnrollButton({ courseId, userId, price, courseTitle }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleEnroll = async () => {
    if (!userId) {
      router.push("/auth/signin?redirect=/courses")
      return
    }

    if (!razorpayLoaded) {
      toast({
        title: "Error",
        description: "Payment gateway is loading. Please try again in a moment.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Create order on server
      const order = await createRazorpayOrder(courseId, userId, price)

      // Initialize Razorpay checkout
      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "EduDubai",
        description: courseTitle,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment on server
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            const result = await verifyResponse.json()

            if (result.success) {
              toast({
                title: "Success",
                description: "Payment successful! You are now enrolled.",
              })
              router.push("/dashboard?success=true")
              router.refresh()
            } else {
              throw new Error(result.error || "Payment verification failed")
            }
          } catch (error: any) {
            toast({
              title: "Error",
              description: error.message || "Payment verification failed",
              variant: "destructive",
            })
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#1e3a5f",
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          toast({
            title: "Error",
            description: "Failed to load payment gateway",
            variant: "destructive",
          })
        }}
      />
      <Button
        onClick={handleEnroll}
        disabled={loading || !razorpayLoaded}
        className="w-full"
        variant="gold"
        size="lg"
      >
        {loading ? "Processing..." : razorpayLoaded ? "Enroll Now" : "Loading..."}
      </Button>
    </>
  )
}
