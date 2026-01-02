import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { resend } from "@/lib/resend"

// Use service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Validation schema
const applicationSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  country: z.string().min(1),
  linkedin_url: z.string().url(),
  portfolio_url: z.string().url().optional().nullable(),
  current_role: z.string().min(2),
  experience_years: z.number().min(0),
  training_years: z.number().min(0),
  specializations: z.array(z.string()).min(1),
  delivery_modes: z.array(z.string()).min(1),
  regions: z.array(z.string()).min(1),
  certifications: z.string().min(10),
  summary: z.string().min(200).max(1200),
  languages: z.array(z.string()).min(1),
  regulated_entities: z.boolean(),
  creates_assessments: z.boolean(),
  availability: z.string().min(1),
  fee_model: z.string().min(1),
  rate_currency: z.string().min(1),
  rate_min: z.number().min(0),
  rate_max: z.number().optional().nullable(),
  start_date: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  cv_file_url: z.string().optional(),
  sample_deck_url: z.string().optional().nullable(),
  consent: z.boolean().refine((val) => val === true),
})

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing:", {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey,
      })
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      )
    }

    const formData = await request.formData()

    // Extract files
    const cvFile = formData.get("cv_file") as File | null
    const sampleDeckFile = formData.get("sample_deck") as File | null

    if (!cvFile) {
      return NextResponse.json(
        { error: "CV file is required" },
        { status: 400 }
      )
    }

    // Validate file sizes
    if (cvFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "CV file must be less than 10MB" },
        { status: 400 }
      )
    }

    if (sampleDeckFile && sampleDeckFile.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Sample deck must be less than 20MB" },
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
    const cvFileName = `cv_${timestamp}_${cvFile.name}`
    const sampleDeckFileName = sampleDeckFile
      ? `deck_${timestamp}_${sampleDeckFile.name}`
      : null

    // Upload CV
    const cvArrayBuffer = await cvFile.arrayBuffer()
    const { data: cvUploadData, error: cvUploadError } = await supabase.storage
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

    // Store file paths (not URLs) - we'll generate signed URLs on-demand via API route
    const cvFilePath = cvFileName
    const sampleDeckFilePath = sampleDeckFileName

    // Upload sample deck if provided
    if (sampleDeckFile) {
      const deckArrayBuffer = await sampleDeckFile.arrayBuffer()
      const { data: deckUploadData, error: deckUploadError } = await supabase.storage
        .from(bucketName)
        .upload(sampleDeckFileName!, deckArrayBuffer, {
          contentType: sampleDeckFile.type,
          upsert: false,
        })

      if (deckUploadError) {
        console.error("Sample deck upload error:", deckUploadError)
        // Don't fail the whole submission if deck upload fails
      }
    }

    // Parse form data
    const applicationData = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      portfolio_url: (formData.get("portfolio_url") as string) || null,
      current_role: formData.get("current_role") as string,
      experience_years: parseInt(formData.get("experience_years") as string),
      training_years: parseInt(formData.get("training_years") as string),
      specializations: JSON.parse(formData.get("specializations") as string),
      delivery_modes: JSON.parse(formData.get("delivery_modes") as string),
      regions: JSON.parse(formData.get("regions") as string),
      certifications: formData.get("certifications") as string,
      summary: formData.get("summary") as string,
      languages: JSON.parse(formData.get("languages") as string),
      regulated_entities: formData.get("regulated_entities") === "true",
      creates_assessments: formData.get("creates_assessments") === "true",
      availability: formData.get("availability") as string,
      fee_model: formData.get("fee_model") as string,
      rate_currency: formData.get("rate_currency") as string,
      rate_min: parseInt(formData.get("rate_min") as string),
      rate_max: formData.get("rate_max")
        ? parseInt(formData.get("rate_max") as string)
        : null,
      start_date: (formData.get("start_date") as string) || null,
      notes: (formData.get("notes") as string) || null,
      cv_file_url: cvFilePath,
      sample_deck_url: sampleDeckFilePath,
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
        { error: "Failed to save application" },
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
              <p><strong>Current Role:</strong> ${validatedData.current_role}</p>
              <p><strong>Experience:</strong> ${validatedData.experience_years} years industry, ${validatedData.training_years} years training</p>
              <p><strong>Specializations:</strong> ${validatedData.specializations.join(", ")}</p>
              <p><strong>Regions:</strong> ${validatedData.regions.join(", ")}</p>
              <p><strong>Availability:</strong> ${validatedData.availability}</p>
              <p><strong>Fee Model:</strong> ${validatedData.fee_model}</p>
              <p><strong>Rate:</strong> ${validatedData.rate_min} ${validatedData.rate_currency}${validatedData.rate_max ? ` - ${validatedData.rate_max}` : ""}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #1e3a5f;">Professional Summary</h3>
              <p style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${validatedData.summary}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #1e3a5f;">Certifications</h3>
              <p style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${validatedData.certifications}</p>
            </div>
            <div style="margin: 20px 0;">
              <p><strong>LinkedIn:</strong> <a href="${validatedData.linkedin_url}" target="_blank">${validatedData.linkedin_url}</a></p>
              ${validatedData.portfolio_url ? `<p><strong>Portfolio:</strong> <a href="${validatedData.portfolio_url}" target="_blank">${validatedData.portfolio_url}</a></p>` : ""}
              <p><strong>CV:</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://edudubai.com'}/api/trainer/files/${encodeURIComponent(cvFilePath)}" target="_blank">Download CV</a></p>
              ${sampleDeckFilePath ? `<p><strong>Sample Deck:</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://edudubai.com'}/api/trainer/files/${encodeURIComponent(sampleDeckFilePath)}" target="_blank">Download Sample Deck</a></p>` : ""}
            </div>
            <p style="color: #666; font-size: 14px;">Please review this application within 5-7 business days.</p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError)
      // Don't fail the submission if email fails
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
              <h3 style="color: #1e3a5f; margin-top: 0;">What&apos;s Next?</h3>
              <ul style="line-height: 1.8;">
                <li>Our team will review your application within 5-7 business days</li>
                <li>We&apos;ll contact you via email if we need any additional information</li>
                <li>If selected, we&apos;ll reach out to discuss next steps and onboarding</li>
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
      // Don't fail the submission if email fails
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

