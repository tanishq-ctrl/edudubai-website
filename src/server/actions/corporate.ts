"use server"

import { resend } from "@/lib/resend"

export async function sendCorporateTrainingLead(data: {
  company: string
  name: string
  email: string
  phone: string
  trainingNeed: string
  preferredDelivery: string
}) {
  try {
    // Send email to training team
    await resend.emails.send({
      from: "EduDubai <onboarding@resend.dev>",
      to: process.env.TRAINING_EMAIL || "training@edudubai.org",
      subject: `New Corporate Training Inquiry from ${data.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1e3a5f;">New Corporate Training Inquiry</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Contact Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Preferred Delivery:</strong> ${data.preferredDelivery}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #1e3a5f;">Training Need:</h3>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${data.trainingNeed}</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Please follow up with this lead within 24 hours.
          </p>
        </div>
      `,
    })

    // Send confirmation email to the lead
    await resend.emails.send({
      from: "EduDubai <onboarding@resend.dev>",
      to: data.email,
      subject: "Thank you for your corporate training inquiry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h1 style="color: #1e3a5f;">Thank you, ${data.name}!</h1>
          <p>We've received your corporate training inquiry from <strong>${data.company}</strong>.</p>
          <p>Our training team will review your requirements and contact you within 24 hours to discuss how we can help your organization.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a5f; margin-top: 0;">What's Next?</h3>
            <ul style="line-height: 1.8;">
              <li>Our team will analyze your training needs</li>
              <li>We'll create a customized proposal</li>
              <li>We'll schedule a consultation call</li>
            </ul>
          </div>
          <p>In the meantime, feel free to explore our courses or speak with an advisor.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://edudubai.com"}/courses" 
             style="display: inline-block; background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px;">
            Browse Our Courses
          </a>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending corporate training lead email:", error)
    throw error
  }
}

