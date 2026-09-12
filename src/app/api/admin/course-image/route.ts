import { NextRequest, NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth-guards"
import { createAdminClient } from "@/lib/supabase/admin"
import { enforceRateLimit } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const BUCKET = "course-images"
const MAX_BYTES = 5 * 1024 * 1024

/**
 * Content types we are willing to store and serve.
 *
 * Deliberately excludes SVG: it can carry scripts, and the bucket is public,
 * so an uploaded SVG would be a stored-XSS vector served from our own domain.
 */
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
])

/**
 * Uploads a course image.
 *
 * Admin-only and service-role backed: the bucket is public for reading, but
 * writes never happen from the browser.
 */
export async function POST(request: NextRequest) {
  const limited = enforceRateLimit(request, "course-image", { limit: 20, windowMs: 60_000 })
  if (limited) return limited

  const admin = await getCurrentAdmin()
  if (!admin) {
    // 404 rather than 403: don't advertise that this endpoint exists.
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const supabase = createAdminClient()
  if (!supabase) {
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 })
  }

  let file: File | null = null
  try {
    const form = await request.formData()
    const candidate = form.get("file")
    if (candidate instanceof File) file = candidate
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 })
  }

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File is too large. Maximum is ${MAX_BYTES / 1024 / 1024}MB.` },
      { status: 413 }
    )
  }

  const extension = ALLOWED.get(file.type)
  if (!extension) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPEG, PNG, WebP or AVIF." },
      { status: 415 }
    )
  }

  // Generated name: never trust the client's filename for a storage path.
  const objectName = `${crypto.randomUUID()}.${extension}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(objectName, file, { contentType: file.type, upsert: false })

  if (error) {
    console.error("[course-image] upload failed:", error.message)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(objectName)

  logger.debug("[course-image] uploaded", { objectName })

  return NextResponse.json({ url: publicUrl })
}
