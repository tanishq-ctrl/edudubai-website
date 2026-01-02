"use server"

import { razorpay, verifyPaymentSignature } from "@/lib/razorpay"
import { dataStore } from "@/lib/data/seed"
import { sendEnrollmentEmail } from "@/lib/email"

// In-memory storage for payment metadata (replace with DB later)
const paymentMetadata = new Map<string, { courseId: string; userId: string }>()

export async function createRazorpayOrder(courseId: string, userId: string, amount: number) {
  try {
    const course = dataStore.getCourseById(courseId)

    if (!course) {
      throw new Error("Course not found")
    }

    // Create order in Razorpay
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (INR smallest unit)
      currency: "INR",
      receipt: `course_${courseId}_${userId}_${Date.now()}`,
      notes: {
        courseId,
        userId,
        courseTitle: course.title,
      },
    }

    const order = await razorpay.orders.create(options)

    // Store metadata in memory
    paymentMetadata.set(order.id, { courseId, userId })

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    }
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw error
  }
}

export async function verifyRazorpayPayment(
  orderId: string,
  paymentId: string,
  signature: string
) {
  try {
    // Verify signature
    const isValid = verifyPaymentSignature(orderId, paymentId, signature)
    
    if (!isValid) {
      throw new Error("Invalid payment signature")
    }

    // Get metadata from memory
    const metadata = paymentMetadata.get(orderId)
    if (!metadata) {
      throw new Error("Order metadata not found")
    }

    const { courseId, userId } = metadata

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId)

    if (payment.status !== "captured" && payment.status !== "authorized") {
      throw new Error("Payment not successful")
    }

    // Create payment record
    const paymentRecord = dataStore.createPayment({
      userId,
      courseId,
      amount: payment.amount / 100, // Convert from paise to rupees
      currency: payment.currency.toUpperCase(),
      status: "COMPLETED",
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
    })

    // Create or update enrollment
    const existingEnrollment = dataStore.getEnrollment(userId, courseId)
    if (!existingEnrollment) {
      dataStore.createEnrollment(userId, courseId)
    }

    // Send enrollment email
    try {
      const course = dataStore.getCourseById(courseId)
      const user = dataStore.getUserById(userId)

      if (course && user?.email) {
        await sendEnrollmentEmail(user.email, course.title)
      }
    } catch (error) {
      console.error("Error sending enrollment email:", error)
    }

    // Clean up metadata
    paymentMetadata.delete(orderId)

    return { success: true, courseId, userId }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error)
    throw error
  }
}
