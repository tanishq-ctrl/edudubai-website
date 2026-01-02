/**
 * Environment variable validation helper
 * Validates required environment variables at runtime
 */

const requiredEnvVars = {
  // Public (client-side accessible)
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  
  // Server-only (never exposed to client)
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
} as const

const optionalEnvVars = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ADMIN_NOTIFY_EMAIL: process.env.ADMIN_NOTIFY_EMAIL || "training@edudubai.org",
  TRAINER_UPLOAD_BUCKET: process.env.TRAINER_UPLOAD_BUCKET || "trainer-uploads",
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
} as const

/**
 * Get site URL with fallback
 */
export function getSiteUrl(): string {
  return requiredEnvVars.NEXT_PUBLIC_SITE_URL
}

/**
 * Validate required environment variables
 * Call this in server-side code to ensure all required vars are set
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []
  
  // Check required vars (exclude NEXT_PUBLIC_SITE_URL as it has fallback)
  const required = {
    NEXT_PUBLIC_SUPABASE_URL: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: requiredEnvVars.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    SUPABASE_SERVICE_ROLE_KEY: requiredEnvVars.SUPABASE_SERVICE_ROLE_KEY,
    RAZORPAY_KEY_SECRET: requiredEnvVars.RAZORPAY_KEY_SECRET,
    RAZORPAY_WEBHOOK_SECRET: requiredEnvVars.RAZORPAY_WEBHOOK_SECRET,
    RESEND_API_KEY: requiredEnvVars.RESEND_API_KEY,
  }
  
  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      missing.push(key)
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Get environment variable with validation
 * Use this for server-only variables to ensure they're set
 */
export function getRequiredEnv(key: keyof typeof requiredEnvVars): string {
  const value = requiredEnvVars[key]
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`)
  }
  return value
}

/**
 * Get optional environment variable with fallback
 */
export function getOptionalEnv(key: keyof typeof optionalEnvVars): string {
  return optionalEnvVars[key] || ""
}

