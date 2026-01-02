import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const filename = params.filename

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
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

    const bucketName = process.env.TRAINER_UPLOAD_BUCKET || "trainer-uploads"

    // Generate a signed URL that expires in 1 hour
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filename, 3600) // 1 hour expiration

    if (error) {
      console.error("Error generating signed URL:", error)
      return NextResponse.json(
        { error: "File not found or access denied" },
        { status: 404 }
      )
    }

    if (!data?.signedUrl) {
      return NextResponse.json(
        { error: "Failed to generate download URL" },
        { status: 500 }
      )
    }

    // Redirect to the signed URL
    return NextResponse.redirect(data.signedUrl)
  } catch (error) {
    console.error("Error in file download route:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

