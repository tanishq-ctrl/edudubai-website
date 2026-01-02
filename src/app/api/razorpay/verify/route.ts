import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { verifyPaymentSignature, getRazorpayClient } from "@/lib/razorpay"
import { memoryStore } from "@/lib/memory-store"
import { sendLeadNotification, sendEnrollmentEmail } from "@/lib/email"
import { getCourseBySlug } from "@/lib/courses"
import { createClient } from "@/lib/supabase/server"
import { createPayment, createEnrollment } from "@/server/dashboard/queries"

// Request validation schema
const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, "Order ID is required"),
  razorpay_payment_id: z.string().min(1, "Payment ID is required"),
  razorpay_signature: z.string().min(1, "Signature is required"),
  courseSlug: z.string().min(1, "Course slug is required").optional(),
  email: z.string().email().optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const validationResult = verifyPaymentSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid request",
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseSlug,
      email,
    } = validationResult.data

    // Verify payment signature
    let isValid = false
    try {
      isValid = verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      )
    } catch (error: any) {
      console.error("Payment signature verification error:", error)
      return NextResponse.json(
        {
          ok: false,
          error: "Signature verification failed",
          message: error.message || "Invalid signature",
        },
        { status: 400 }
      )
    }

    if (!isValid) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid payment signature",
        },
        { status: 400 }
      )
    }

    // Check authentication
    let user
    try {
      const supabase = await createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      user = authUser
    } catch (error) {
      console.error("Auth check error:", error)
    }

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Authentication required",
          message: "Please log in to complete payment",
        },
        { status: 401 }
      )
    }

    // Get course details
    if (!courseSlug) {
      return NextResponse.json(
        {
          ok: false,
          error: "Course slug is required",
        },
        { status: 400 }
      )
    }
    const course = getCourseBySlug(courseSlug)
    if (!course) {
      return NextResponse.json(
        {
          ok: false,
          error: "Course not found",
        },
        { status: 404 }
      )
    }

    // Get order details from Razorpay to get amount
    let amountUsd = course.priceUsd
    try {
      const razorpay = getRazorpayClient()
      const order = await razorpay.orders.fetch(razorpay_order_id)
      // Convert from cents to USD
      amountUsd = Number(order.amount) / 100
    } catch (error) {
      console.error("Error fetching order details:", error)
      // Use course price as fallback
    }

    // Create payment record in database
    try {
      await createPayment(
        user.id,
        "RAZORPAY",
        razorpay_order_id,
        razorpay_payment_id,
        courseSlug,
        amountUsd,
        "USD",
        "SUCCESS"
      )
    } catch (error) {
      console.error("Error creating payment record:", error)
      // Continue even if payment record creation fails
    }

    // Create enrollment record in database
    try {
      // Use first delivery mode as default, or "LIVE_VIRTUAL"
      const deliveryMode = course.deliveryModes?.[0] || "LIVE_VIRTUAL"
      await createEnrollment(
        user.id,
        courseSlug,
        course.title,
        deliveryMode
      )
    } catch (error) {
      console.error("Error creating enrollment record:", error)
      // Continue even if enrollment creation fails
    }

    // Also store in memory store for backward compatibility
    const paymentRecord = memoryStore.recordPayment({
      courseSlug: courseSlug || "unknown",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      email: user.email || email,
    })

    // Send notification to admin
    try {
      await sendLeadNotification({
        type: "PAYMENT_SUCCESS",
        payload: {
          type: "PAYMENT_SUCCESS",
          name: email ? email.split("@")[0] : "Learner",
          email: email || "no-email@edudubai.org",
          courseTitle: course?.title || "Course Enrollment",
          courseSlug: courseSlug || "unknown",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
      })
    } catch (error) {
      console.error("Error sending payment notification:", error)
      // Don't fail the request if email fails
    }

    // Send confirmation email to learner if email provided
    if (email && course) {
      try {
        await sendEnrollmentEmail(email, course.title)
      } catch (error) {
        console.error("Error sending enrollment email to learner:", error)
        // Don't fail the request if email fails
      }
    }

    // Payment signature is valid
    return NextResponse.json({
      ok: true,
    })
  } catch (error: any) {
    console.error("Unexpected error in payment verification:", error)
    
    // Never leak internal error details
    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
      },
      { status: 500 }
    )
  }
}

