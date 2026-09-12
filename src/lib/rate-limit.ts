/**
 * Fixed-window rate limiter for API routes.
 *
 * LIMITATION: state is held in the module scope of a single serverless
 * instance. On Vercel each concurrent lambda keeps its own counters, so the
 * effective limit is `limit x instances`, and counters reset on cold start.
 * That is enough to stop naive scripted abuse and runaway retry loops — it is
 * NOT a defence against a distributed attacker. Move to a shared store
 * (Upstash Redis, or a Postgres table) before relying on it for anything
 * stronger.
 */

import { NextResponse } from "next/server"

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

/** Drop expired buckets so the map cannot grow without bound. */
function evictExpired(now: number): void {
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) {
      buckets.delete(key)
    }
  })
}

export type RateLimitResult = {
  success: boolean
  limit: number
  remaining: number
  /** Unix ms at which the current window expires. */
  resetAt: number
}

export type RateLimitOptions = {
  /** Max requests allowed per window. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

/**
 * Consumes one token for `identifier`. Call once per request.
 */
export function rateLimit(
  identifier: string,
  { limit, windowMs }: RateLimitOptions
): RateLimitResult {
  const now = Date.now()

  // Cheap amortised cleanup — the map only holds active windows.
  if (buckets.size > 5000) {
    evictExpired(now)
  }

  const existing = buckets.get(identifier)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(identifier, { count: 1, resetAt })
    return { success: true, limit, remaining: limit - 1, resetAt }
  }

  existing.count += 1

  return {
    success: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  }
}

/**
 * Best-effort client IP.
 *
 * On Vercel `x-forwarded-for` is set by the platform edge and its first entry
 * is the real client. Off-platform this header is client-spoofable, so treat
 * the result as a throttling key, never as an identity.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

/**
 * Applies a rate limit keyed on route name + client IP.
 *
 * Returns a 429 `NextResponse` when the caller is over budget, or `null` when
 * the request may proceed:
 *
 *   const limited = enforceRateLimit(req, "leads", { limit: 5, windowMs: 60_000 })
 *   if (limited) return limited
 */
export function enforceRateLimit(
  request: Request,
  routeKey: string,
  options: RateLimitOptions
): NextResponse | null {
  const result = rateLimit(`${routeKey}:${getClientIp(request)}`, options)

  if (result.success) return null

  const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000))

  return NextResponse.json(
    { error: "Too many requests. Please wait a moment and try again." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
      },
    }
  )
}
