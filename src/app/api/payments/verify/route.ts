import { NextRequest, NextResponse } from "next/server"
import { verifyRazorpayPayment } from "@/server/actions/payments"

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await req.json()

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment parameters" },
        { status: 400 }
      )
    }

    const result = await verifyRazorpayPayment(orderId, paymentId, signature)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Payment verification failed" },
      { status: 500 }
    )
  }
}

