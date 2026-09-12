import { describe, it, expect, vi, afterEach } from "vitest"
import { rateLimit, getClientIp, enforceRateLimit } from "./rate-limit"

afterEach(() => {
  vi.useRealTimers()
})

/** Each test uses a unique key so the module-level bucket map stays isolated. */
let counter = 0
const key = () => `test-${counter++}`

describe("rateLimit", () => {
  it("allows requests up to the limit", () => {
    const k = key()
    const opts = { limit: 3, windowMs: 60_000 }

    expect(rateLimit(k, opts)).toMatchObject({ success: true, remaining: 2 })
    expect(rateLimit(k, opts)).toMatchObject({ success: true, remaining: 1 })
    expect(rateLimit(k, opts)).toMatchObject({ success: true, remaining: 0 })
  })

  it("rejects the request that exceeds the limit", () => {
    const k = key()
    const opts = { limit: 2, windowMs: 60_000 }

    rateLimit(k, opts)
    rateLimit(k, opts)

    expect(rateLimit(k, opts)).toMatchObject({ success: false, remaining: 0 })
  })

  it("tracks identifiers independently", () => {
    const opts = { limit: 1, windowMs: 60_000 }
    const a = key()
    const b = key()

    expect(rateLimit(a, opts).success).toBe(true)
    expect(rateLimit(b, opts).success).toBe(true)
    expect(rateLimit(a, opts).success).toBe(false)
  })

  it("starts a fresh window once the previous one expires", () => {
    vi.useFakeTimers()
    const k = key()
    const opts = { limit: 1, windowMs: 1_000 }

    expect(rateLimit(k, opts).success).toBe(true)
    expect(rateLimit(k, opts).success).toBe(false)

    vi.advanceTimersByTime(1_001)

    expect(rateLimit(k, opts).success).toBe(true)
  })
})

describe("getClientIp", () => {
  it("takes the first entry of x-forwarded-for", () => {
    const req = new Request("https://example.com", {
      headers: { "x-forwarded-for": "203.0.113.5, 70.41.3.18" },
    })
    expect(getClientIp(req)).toBe("203.0.113.5")
  })

  it("falls back to x-real-ip", () => {
    const req = new Request("https://example.com", {
      headers: { "x-real-ip": "198.51.100.7" },
    })
    expect(getClientIp(req)).toBe("198.51.100.7")
  })

  it("returns a stable placeholder when no IP header is present", () => {
    expect(getClientIp(new Request("https://example.com"))).toBe("unknown")
  })
})

describe("enforceRateLimit", () => {
  const makeReq = (ip: string) =>
    new Request("https://example.com", { headers: { "x-forwarded-for": ip } })

  it("returns null while the caller is within budget", () => {
    const route = key()
    expect(enforceRateLimit(makeReq("1.1.1.1"), route, { limit: 1, windowMs: 60_000 })).toBeNull()
  })

  it("returns a 429 with Retry-After once over budget", () => {
    const route = key()
    const opts = { limit: 1, windowMs: 60_000 }
    const req = makeReq("2.2.2.2")

    enforceRateLimit(req, route, opts)
    const blocked = enforceRateLimit(req, route, opts)

    expect(blocked).not.toBeNull()
    expect(blocked!.status).toBe(429)
    expect(Number(blocked!.headers.get("Retry-After"))).toBeGreaterThan(0)
    expect(blocked!.headers.get("X-RateLimit-Limit")).toBe("1")
  })

  it("scopes limits per route so one endpoint cannot exhaust another", () => {
    const opts = { limit: 1, windowMs: 60_000 }
    const req = makeReq("3.3.3.3")
    const routeA = key()
    const routeB = key()

    expect(enforceRateLimit(req, routeA, opts)).toBeNull()
    expect(enforceRateLimit(req, routeB, opts)).toBeNull()
    expect(enforceRateLimit(req, routeA, opts)).not.toBeNull()
  })

  it("scopes limits per client IP", () => {
    const route = key()
    const opts = { limit: 1, windowMs: 60_000 }

    expect(enforceRateLimit(makeReq("4.4.4.4"), route, opts)).toBeNull()
    expect(enforceRateLimit(makeReq("5.5.5.5"), route, opts)).toBeNull()
    expect(enforceRateLimit(makeReq("4.4.4.4"), route, opts)).not.toBeNull()
  })
})
