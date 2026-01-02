"use server"

import { z } from "zod"
import { sendLeadNotification, sendBrochureEmail } from "@/lib/email"
import { getCourseBySlugNew } from "./courses"

// Validation schemas
const contactLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const corporateLeadSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  trainingNeed: z.string().min(10, "Training need must be at least 10 characters"),
  preferredDelivery: z.enum(["IN_PERSON", "LIVE_VIRTUAL", "SELF_PACED", "HYBRID"]),
})

const brochureLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  courseId: z.string().optional(),
  courseSlug: z.string().optional(),
})

export async function submitContactLead(data: unknown) {
  try {
    const validated = contactLeadSchema.parse(data)

    await sendLeadNotification({
      type: "contact",
      payload: {
        type: "contact",
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        company: validated.company,
        message: validated.message,
      },
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation failed",
      }
    }
    console.error("Error submitting contact lead:", error)
    
    // Return a user-friendly error message instead of throwing
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to send message. Please check your connection and try again."
    
    return {
      success: false,
      error: errorMessage,
    }
  }
}

export async function submitCorporateLead(data: unknown) {
  try {
    const validated = corporateLeadSchema.parse(data)

    await sendLeadNotification({
      type: "corporate",
      payload: {
        type: "corporate",
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        company: validated.company,
        trainingNeed: validated.trainingNeed,
        preferredDelivery: validated.preferredDelivery,
      },
    })

    // Send confirmation email to the lead
    await sendBrochureEmail({
      to: validated.email,
      courseTitle: "Corporate Training Proposal",
      recipientName: validated.name,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation failed",
      }
    }
    console.error("Error submitting corporate lead:", error)
    throw error
  }
}

export async function submitBrochureLead(data: unknown) {
  try {
    const validated = brochureLeadSchema.parse(data)

    let courseTitle = "Course Brochure"
    if (validated.courseSlug) {
      const course = await getCourseBySlugNew(validated.courseSlug)
      if (course) {
        courseTitle = course.title
      }
    } else if (validated.courseId) {
      // If we only have courseId, we'd need to fetch it differently
      // For now, use generic title
      courseTitle = "Course Brochure"
    }

    // Send notification to admin
    await sendLeadNotification({
      type: "brochure",
      payload: {
        type: "brochure",
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        company: validated.company,
        courseTitle,
        courseId: validated.courseId,
      },
    })

    // Send brochure email to user
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://edudubai.com"
    const brochureLink = validated.courseSlug
      ? `${appUrl}/courses/${validated.courseSlug}`
      : `${appUrl}/courses`

    await sendBrochureEmail({
      to: validated.email,
      courseTitle,
      brochureLink,
      recipientName: validated.name,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation failed",
      }
    }
    console.error("Error submitting brochure lead:", error)
    throw error
  }
}
