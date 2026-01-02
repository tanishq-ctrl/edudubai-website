import Razorpay from "razorpay"
import crypto from "crypto"

/**
 * Get Razorpay client instance
 * This should only be used on the server side
 */
export function getRazorpayClient(): Razorpay {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay credentials not configured. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables."
    )
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

/**
 * Convert USD to cents (smallest currency unit for USD)
 * @param usd - Amount in USD dollars
 * @returns Amount in cents (multiplied by 100)
 */
export function usdToCents(usd: number): number {
  if (usd < 0) {
    throw new Error("Amount cannot be negative")
  }
  return Math.round(usd * 100)
}

/**
 * Convert rupees to paise (smallest currency unit for INR)
 * @param rupees - Amount in rupees
 * @returns Amount in paise (multiplied by 100)
 * @deprecated Use usdToCents for USD payments
 */
export function rupeesToPaise(rupees: number): number {
  if (rupees < 0) {
    throw new Error("Amount cannot be negative")
  }
  return Math.round(rupees * 100)
}

/**
 * Convert USD to INR (for Razorpay payment processing)
 * Uses current exchange rate from environment or defaults to 83.33
 * @param usd - Amount in USD
 * @returns Amount in INR
 * @deprecated No longer needed - using USD directly
 */
export function usdToInr(usd: number): number {
  if (usd < 0) {
    throw new Error("Amount cannot be negative")
  }
  // Get exchange rate from env or use default (83.33 ≈ 1 USD)
  const exchangeRate = parseFloat(process.env.USD_TO_INR_RATE || "83.33")
  return Math.round(usd * exchangeRate)
}

/**
 * Verify payment signature using HMAC SHA256
 * @param orderId - Razorpay order ID
 * @param paymentId - Razorpay payment ID
 * @param signature - Signature received from Razorpay
 * @returns true if signature is valid, false otherwise
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keySecret) {
    throw new Error("RAZORPAY_KEY_SECRET not configured")
  }

  if (!orderId || !paymentId || !signature) {
    return false
  }

  const payload = `${orderId}|${paymentId}`
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(payload)
    .digest("hex")

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(signature)
  )
}

/**
 * Verify webhook signature
 * @param payload - Raw webhook payload string
 * @param signature - Signature from X-Razorpay-Signature header
 * @returns true if signature is valid, false otherwise
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET not configured")
  }

  if (!payload || !signature) {
    return false
  }

  const generatedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(payload)
    .digest("hex")

  return crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(signature)
  )
}

// Legacy export for backward compatibility (lazy initialization)
let _razorpayInstance: Razorpay | null = null

export function getRazorpayInstance(): Razorpay {
  if (!_razorpayInstance) {
    _razorpayInstance = getRazorpayClient()
  }
  return _razorpayInstance
}

// For backward compatibility with existing code
export const razorpay = new Proxy({} as Razorpay, {
  get(_target, prop) {
    const instance = getRazorpayInstance()
    const value = (instance as any)[prop]
    if (typeof value === "function") {
      return value.bind(instance)
    }
    return value
  },
})
