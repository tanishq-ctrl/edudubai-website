import { NextRequest, NextResponse } from "next/server"
import { verifyWebhookSignature } from "@/lib/razorpay"
import { sendEnrollmentEmail } from "@/lib/email"

// Ensure this route uses Node.js runtime for Vercel serverless
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Razorpay Webhook Handler
 * 
 * IMPORTANT: This endpoint uses req.text() to get the raw body string
 * for signature verification. Do NOT use req.json() before verifying
 * the signature, as it will corrupt the signature verification.
 * 
 * Webhook URL: https://your-domain.com/api/webhooks/razorpay
 */
export async function POST(req: NextRequest) {
  try {
    // Get raw body as string for signature verification
    // This is critical - must be raw string, not parsed JSON
    const body = await req.text()
    const signature = req.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature)
    
    if (!isValid) {
      console.error("Invalid webhook signature received")
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      )
    }

    const event = JSON.parse(body)

    // Handle payment.captured event
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity
      const orderId = payment.order_id

      // Fetch order to get metadata
      const order = event.payload.payment.entity.order_id
      
      // Extract metadata from notes (if stored in order)
      // Note: Razorpay stores notes in the order, we need to fetch it
      // For now, we'll handle this in the verify endpoint
      // This webhook is mainly for additional verification and logging

      // Create payment record if not exists
      try {
        // Lazy import Prisma to avoid initialization during build
        const { prisma } = await import("@/lib/prisma")
        await prisma.payment.upsert({
          where: {
            stripeId: payment.id, // Using stripeId field for Razorpay payment ID
          },
          create: {
            userId: payment.notes?.userId || "unknown",
            courseId: payment.notes?.courseId || null,
            amount: payment.amount / 100, // Convert from paise to rupees
            currency: payment.currency.toUpperCase(),
            status: "COMPLETED",
            stripeId: payment.id,
            stripeSessionId: orderId,
          },
          update: {
            status: "COMPLETED",
          },
        })
      } catch (error) {
        console.error("Error creating payment record:", error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    )
  }
}

