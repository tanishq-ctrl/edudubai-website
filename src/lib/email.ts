import { resend } from "@/lib/resend"

interface LeadNotificationPayload {
  type: "contact" | "corporate" | "brochure" | "PAYMENT_SUCCESS"
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  trainingNeed?: string
  preferredDelivery?: string
  courseTitle?: string
  courseId?: string
  courseSlug?: string
  orderId?: string
  paymentId?: string
}

export async function sendLeadNotification({
  type,
  payload,
}: {
  type: LeadNotificationPayload["type"]
  payload: LeadNotificationPayload
}) {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || "training@edudubai.org"

  const subjectMap = {
    contact: "New Contact Form Submission",
    corporate: `New Corporate Training Inquiry from ${payload.company || "Unknown"}`,
    brochure: `New Brochure Request: ${payload.courseTitle || "Course Brochure"}`,
    PAYMENT_SUCCESS: `Payment Successful: ${payload.courseTitle || "Course Enrollment"}`,
  }

  const getEmailContent = () => {
    switch (type) {
      case "contact":
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1e3a5f;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${payload.name}</p>
              <p><strong>Email:</strong> ${payload.email}</p>
              ${payload.phone ? `<p><strong>Phone:</strong> ${payload.phone}</p>` : ""}
              ${payload.company ? `<p><strong>Company:</strong> ${payload.company}</p>` : ""}
              ${payload.message ? `<p><strong>Message:</strong><br>${payload.message.replace(/\n/g, "<br>")}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">Please respond within 24 hours.</p>
          </div>
        `
      case "corporate":
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1e3a5f;">New Corporate Training Inquiry</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Company:</strong> ${payload.company || "Not provided"}</p>
              <p><strong>Contact Name:</strong> ${payload.name}</p>
              <p><strong>Email:</strong> ${payload.email}</p>
              <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
              <p><strong>Preferred Delivery:</strong> ${payload.preferredDelivery || "Not specified"}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #1e3a5f;">Training Need:</h3>
              <p style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${payload.trainingNeed || "Not provided"}</p>
            </div>
            <p style="color: #666; font-size: 14px;">Please follow up with this lead within 24 hours.</p>
          </div>
        `
      case "brochure":
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1e3a5f;">New Brochure Request</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${payload.name}</p>
              <p><strong>Email:</strong> ${payload.email}</p>
              ${payload.phone ? `<p><strong>Phone:</strong> ${payload.phone}</p>` : ""}
              ${payload.company ? `<p><strong>Company:</strong> ${payload.company}</p>` : ""}
              <p><strong>Course:</strong> ${payload.courseTitle || "General Brochure"}</p>
              ${payload.courseId ? `<p><strong>Course ID:</strong> ${payload.courseId}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">Brochure email has been sent to the lead.</p>
          </div>
        `
      case "PAYMENT_SUCCESS":
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1e3a5f;">Payment Successful - New Enrollment</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Course:</strong> ${payload.courseTitle || "Course Enrollment"}</p>
              ${payload.courseSlug ? `<p><strong>Course Slug:</strong> ${payload.courseSlug}</p>` : ""}
              ${payload.orderId ? `<p><strong>Order ID:</strong> ${payload.orderId}</p>` : ""}
              ${payload.paymentId ? `<p><strong>Payment ID:</strong> ${payload.paymentId}</p>` : ""}
              ${payload.email ? `<p><strong>Learner Email:</strong> ${payload.email}</p>` : ""}
              ${payload.name ? `<p><strong>Learner Name:</strong> ${payload.name}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">Payment has been verified and enrollment confirmed. ${payload.email ? "Confirmation email sent to learner." : "No email provided - manual follow-up may be required."}</p>
          </div>
        `
    }
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured. Please set it in your environment variables.")
    }

    const result = await resend.emails.send({
      from: "EduDubai <onboarding@resend.dev>",
      to: adminEmail,
      subject: subjectMap[type],
      html: getEmailContent(),
    })

    if (result.error) {
      console.error("Resend API error:", result.error)
      throw new Error(`Failed to send email: ${result.error.message || "Unknown error"}`)
    }

    console.log("Lead notification email sent successfully:", result.data?.id)
  } catch (error) {
    console.error("Error sending lead notification email:", error)
    throw error
  }
}

interface BrochureEmailParams {
  to: string
  courseTitle: string
  brochureLink?: string
  recipientName?: string
}

export async function sendBrochureEmail({
  to,
  courseTitle,
  brochureLink,
  recipientName,
}: BrochureEmailParams) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://edudubai.com"
  const defaultBrochureLink = brochureLink || `${appUrl}/courses`

  try {
    await resend.emails.send({
      from: "EduDubai <onboarding@resend.dev>",
      to,
      subject: `Your ${courseTitle} Brochure - EduDubai`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h1 style="color: #1e3a5f;">Thank you${recipientName ? `, ${recipientName}` : ""}!</h1>
          <p>We've received your request for the <strong>${courseTitle}</strong> brochure.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a5f; margin-top: 0;">What's Next?</h3>
            <ul style="line-height: 1.8;">
              <li>Our team will send you the detailed course brochure via email</li>
              <li>You can explore the course details on our website</li>
              <li>Speak with an advisor for personalized guidance</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${defaultBrochureLink}" 
               style="display: inline-block; background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              View Course Details
            </a>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If you have any questions, feel free to reply to this email or contact our support team.
          </p>
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The EduDubai Team
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error("Error sending brochure email:", error)
    throw error
  }
}

export async function sendEnrollmentEmail(to: string, courseTitle: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://edudubai.com"

  try {
    await resend.emails.send({
      from: "EduDubai <onboarding@resend.dev>",
      to,
      subject: `Welcome to ${courseTitle} - EduDubai`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h1 style="color: #1e3a5f;">Welcome to ${courseTitle}!</h1>
          <p>Congratulations! Your enrollment has been confirmed.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a5f; margin-top: 0;">What's Next?</h3>
            <ul style="line-height: 1.8;">
              <li>Access your course materials from your dashboard</li>
              <li>Check your email for course access instructions</li>
              <li>Join our community for support and networking</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${appUrl}/dashboard" 
               style="display: inline-block; background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Go to Dashboard
            </a>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            If you have any questions, feel free to reply to this email or contact our support team.
          </p>
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The EduDubai Team
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error("Error sending enrollment email:", error)
    throw error
  }
}

