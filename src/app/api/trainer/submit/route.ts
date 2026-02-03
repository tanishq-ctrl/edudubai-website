import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { resend } from "@/lib/resend"

// Use service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Simplified validation schema matching the new one-step form
const applicationSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  country: z.string().min(1),
  linkedin_url: z.string().url(),
  video_url: z.string().url().optional().nullable(),
  cv_file_url: z.string(),
  consent: z.boolean().refine((val) => val === true),
})

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing")
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      )
    }

    const formData = await request.formData()

    // Extract files
    const cvFile = formData.get("cv_file") as File | null

    if (!cvFile) {
      return NextResponse.json(
        { error: "CV file is required" },
        { status: 400 }
      )
    }

    // Validate file sizes (10MB)
    if (cvFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "CV file must be less than 10MB" },
        { status: 400 }
      )
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Upload files to Supabase Storage
    const bucketName = process.env.TRAINER_UPLOAD_BUCKET || "trainer-uploads"
    const timestamp = Date.now()
    const cvFileName = `cv_${timestamp}_${cvFile.name.replace(/\s+/g, '_')}`

    // Upload CV
    const cvArrayBuffer = await cvFile.arrayBuffer()
    const { error: cvUploadError } = await supabase.storage
      .from(bucketName)
      .upload(cvFileName, cvArrayBuffer, {
        contentType: cvFile.type,
        upsert: false,
      })

    if (cvUploadError) {
      console.error("CV upload error:", cvUploadError)
      return NextResponse.json(
        { error: "Failed to upload CV file" },
        { status: 500 }
      )
    }

    // Parse application data
    const applicationData = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      video_url: (formData.get("video_url") as string) || null,
      cv_file_url: cvFileName,
      consent: formData.get("consent") === "true",
    }

    // Validate data
    const validatedData = applicationSchema.parse(applicationData)

    // Insert into database
    const { data: dbData, error: dbError } = await supabase
      .from("trainer_applications")
      .insert({
        ...validatedData,
        status: "NEW",
      })
      .select()
      .single()

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save application to database" },
        { status: 500 }
      )
    }

    const applicationId = dbData.id

    // Send admin notification email
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || "training@edudubai.org"
    try {
      await resend.emails.send({
        from: "EduDubai <onboarding@resend.dev>",
        to: adminEmail,
        subject: `New Trainer Application: ${validatedData.full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1e3a5f;">New Trainer Application Received</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Application ID:</strong> ${applicationId}</p>
              <p><strong>Name:</strong> ${validatedData.full_name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Phone:</strong> ${validatedData.phone}</p>
              <p><strong>Country:</strong> ${validatedData.country}</p>
              ${validatedData.video_url ? `<p><strong>Video Link:</strong> <a href="${validatedData.video_url}" target="_blank">${validatedData.video_url}</a></p>` : "<p><strong>Video Link:</strong> Not provided</p>"}
            </div>
            <div style="margin: 20px 0;">
              <p><strong>LinkedIn:</strong> <a href="${validatedData.linkedin_url}" target="_blank">${validatedData.linkedin_url}</a></p>
              <p><strong>CV:</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://edudubai.com'}/api/trainer/files/${encodeURIComponent(cvFileName)}" target="_blank">Download CV</a></p>
            </div>
            <p style="color: #666; font-size: 14px;">This application was submitted via the new simplified one-step form.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError)
    }

    // Send applicant confirmation email
    try {
      await resend.emails.send({
        from: "EduDubai <onboarding@resend.dev>",
        to: validatedData.email,
        subject: "Trainer Application Received - EduDubai",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h1 style="color: #1e3a5f;">Thank you for your application!</h1>
            <p>Dear ${validatedData.full_name},</p>
            <p>We have successfully received your trainer application. Your application reference ID is:</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="font-size: 24px; font-weight: bold; color: #1e3a5f; font-family: monospace;">${applicationId}</p>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e3a5f; margin-top: 0;">What's Next?</h3>
              <ul style="line-height: 1.8;">
                <li>Our team will review your credentials and video explanation</li>
                <li>We'll contact you via email if we need any additional information</li>
                <li>If selected, we'll reach out to discuss next steps and onboarding</li>
              </ul>
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
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
    }

    return NextResponse.json({
      ok: true,
      applicationId,
    })
  } catch (error) {
    console.error("Trainer application error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "An error occurred processing your application" },
      { status: 500 }
    )
  }
}
