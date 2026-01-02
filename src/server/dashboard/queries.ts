import { createClient } from "@/lib/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"

export interface Enrollment {
  id: string
  user_id: string
  course_slug: string
  course_title: string
  delivery_mode: string
  status: "ACTIVE" | "COMPLETED" | "CANCELLED"
  start_date: string | null
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  provider: string
  order_id: string
  payment_id: string
  course_slug: string
  amount_usd: number
  currency: string
  status: "SUCCESS" | "FAILED" | "PENDING"
  created_at: string
}

export interface SupportRequest {
  id: string
  user_id: string
  subject: string
  message: string
  status: string
  created_at: string
}

export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching enrollments:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getUserEnrollments:", error)
    return []
  }
}

export async function getUserPayments(userId: string): Promise<Payment[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching payments:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getUserPayments:", error)
    return []
  }
}

export async function getUserSupportRequests(userId: string): Promise<SupportRequest[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("support_requests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching support requests:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getUserSupportRequests:", error)
    return []
  }
}

export async function getDashboardStats(userId: string) {
  try {
    const supabase = await createClient()
    
    // Get enrollments count by status
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("status")
      .eq("user_id", userId)

    const activeCourses = enrollments?.filter((e: { status: string }) => e.status === "ACTIVE").length || 0
    const completedCourses = enrollments?.filter((e: { status: string }) => e.status === "COMPLETED").length || 0

    // Get payments count
    const { data: payments } = await supabase
      .from("payments")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "SUCCESS")

    const paymentsCount = payments?.length || 0

    // Get first active enrollment for "Continue Learning"
    const { data: activeEnrollment } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "ACTIVE")
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    return {
      activeCourses,
      completedCourses,
      paymentsCount,
      continueLearning: activeEnrollment as Enrollment | null,
    }
  } catch (error) {
    console.error("Error in getDashboardStats:", error)
    return {
      activeCourses: 0,
      completedCourses: 0,
      paymentsCount: 0,
      continueLearning: null,
    }
  }
}

export async function createEnrollment(
  userId: string,
  courseSlug: string,
  courseTitle: string,
  deliveryMode: string
): Promise<Enrollment | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        user_id: userId,
        course_slug: courseSlug,
        course_title: courseTitle,
        delivery_mode: deliveryMode,
        status: "ACTIVE",
        start_date: new Date().toISOString().split("T")[0],
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating enrollment:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createEnrollment:", error)
    return null
  }
}

export async function createPayment(
  userId: string,
  provider: string,
  orderId: string,
  paymentId: string,
  courseSlug: string,
  amountUsd: number,
  currency: string,
  status: "SUCCESS" | "FAILED" | "PENDING"
): Promise<Payment | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("payments")
      .insert({
        user_id: userId,
        provider,
        order_id: orderId,
        payment_id: paymentId,
        course_slug: courseSlug,
        amount_usd: amountUsd,
        currency,
        status,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating payment:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createPayment:", error)
    return null
  }
}

export async function createSupportRequest(
  userId: string,
  subject: string,
  message: string
): Promise<SupportRequest | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("support_requests")
      .insert({
        user_id: userId,
        subject,
        message,
        status: "OPEN",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating support request:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in createSupportRequest:", error)
    return null
  }
}

