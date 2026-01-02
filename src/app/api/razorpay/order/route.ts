import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getRazorpayClient, usdToCents } from "@/lib/razorpay"
import { getCourseBySlug } from "@/lib/courses"
import { createClient } from "@/lib/supabase/server"

// Request validation schema
const createOrderSchema = z.object({
  courseSlug: z.string().min(1, "Course slug is required"),
})

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    let user
    try {
      const supabase = await createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      user = authUser
    } catch (error) {
      // Supabase might not be configured
      console.log("Auth check skipped:", error)
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required",
          message: "Please log in to enroll in courses",
        },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const validationResult = createOrderSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: validationResult.error.errors,
        },
        { status: 400 }
      )
    }

    const { courseSlug } = validationResult.data

    // Lookup course by slug
    const course = getCourseBySlug(courseSlug)

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: "Course not found",
        },
        { status: 404 }
      )
    }

    // Validate course price
    if (!course.priceUsd || course.priceUsd <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid course price",
        },
        { status: 400 }
      )
    }

    // Get Razorpay client
    let razorpay
    try {
      razorpay = getRazorpayClient()
    } catch (error: any) {
      console.error("Razorpay client initialization error:", error)
      return NextResponse.json(
        {
          success: false,
          error: "Payment service configuration error",
        },
        { status: 500 }
      )
    }

    // Convert USD to cents (smallest currency unit for USD)
    const amountInCents = usdToCents(course.priceUsd)

    // Create Razorpay order in USD
    // Receipt must be max 40 characters - use course ID + timestamp
    const timestamp = Date.now().toString()
    const receipt = `${course.id}_${timestamp}`.slice(0, 40) // Ensure max 40 chars

    const orderOptions = {
      amount: amountInCents,
      currency: "USD",
      receipt: receipt,
      notes: {
        courseSlug,
        courseId: course.id,
        courseTitle: course.title,
      },
    }

    let order
    try {
      order = await razorpay.orders.create(orderOptions)
    } catch (error: any) {
      console.error("Razorpay order creation error:", error)
      
      // Don't leak internal error details
      const errorMessage = error?.error?.description || "Failed to create payment order"
      
      return NextResponse.json(
        {
          success: false,
          error: "Payment order creation failed",
          message: errorMessage,
        },
        { status: 500 }
      )
    }

    // Return order details (never include key_secret)
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseTitle: course.title,
    })
  } catch (error: any) {
    console.error("Unexpected error in order creation:", error)
    
    // Never leak internal error details
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    )
  }
}

