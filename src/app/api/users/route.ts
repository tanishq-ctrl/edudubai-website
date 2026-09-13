import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { enforceRateLimit } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"

// Mark route as dynamic to prevent build-time analysis
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const createUserSchema = z.object({
  id: z.string().min(1).max(64).optional(),
  email: z.string().email().max(255),
  name: z.string().trim().min(1).max(120).optional(),
})

/**
 * Creates (or no-ops on) the local `User` row for the caller's own account.
 *
 * This endpoint writes to the database, so it requires a valid Supabase
 * session and only ever provisions the signed-in user's own record — the
 * email and id are taken from the session, not the request body.
 */
export async function POST(req: NextRequest) {
  const limited = enforceRateLimit(req, "users", { limit: 10, windowMs: 60_000 })
  if (limited) return limited

  try {
    const supabase = await createClient()

    if (!supabase) {
      return NextResponse.json(
        { error: "Authentication is not configured" },
        { status: 503 }
      )
    }

    const {
      data: { user: sessionUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !sessionUser?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const parsed = createUserSchema.safeParse(await req.json())

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    // A caller may only provision their own account.
    if (parsed.data.email.toLowerCase() !== sessionUser.email.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Lazy import Prisma to avoid initialization during build
    const { default: prisma } = await import("@/lib/prisma")

    const user = await prisma.user.upsert({
      where: { email: sessionUser.email },
      update: {},
      create: {
        // Trust the session id over anything supplied by the client.
        id: sessionUser.id,
        email: sessionUser.email,
        name: parsed.data.name ?? null,
        role: "STUDENT",
      },
      select: { id: true, email: true, name: true, role: true },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    logger.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}
