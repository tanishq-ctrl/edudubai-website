import { NextResponse } from "next/server"
import { enforceRateLimit } from "@/lib/rate-limit"
import { logger } from "@/lib/logger"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Database keep-alive and health probe.
 *
 * Supabase pauses free-tier projects after 7 consecutive days without
 * DATABASE activity. Rendering a page is not database activity — the probe
 * has to actually issue a query, which is why this route runs `SELECT 1`
 * rather than just returning 200.
 *
 * Invoked by the Vercel cron declared in `vercel.json`. When `CRON_SECRET` is
 * set, Vercel sends it as a bearer token and anything else is rejected, so the
 * endpoint cannot be used by outsiders to generate database load.
 */
export async function GET(request: Request) {
  const limited = enforceRateLimit(request, "health-db", { limit: 6, windowMs: 60_000 })
  if (limited) return limited

  const cronSecret = process.env.CRON_SECRET

  if (cronSecret) {
    const authorization = request.headers.get("authorization")
    if (authorization !== `Bearer ${cronSecret}`) {
      // 404 rather than 401: don't advertise that this endpoint exists.
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
  }

  try {
    const { default: prisma } = await import("@/lib/prisma")

    // Cheapest possible statement that still counts as database activity.
    await prisma.$queryRaw`SELECT 1`

    logger.debug("[health/db] keep-alive query succeeded")

    return NextResponse.json(
      { ok: true, checkedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error) {
    // Surfaced so a failing cron is visible in Vercel's logs rather than silent.
    console.error("[health/db] keep-alive query failed:", error)

    return NextResponse.json(
      { ok: false, error: "Database unreachable" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    )
  }
}
