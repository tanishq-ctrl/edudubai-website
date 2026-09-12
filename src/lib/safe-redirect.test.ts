import { describe, it, expect } from "vitest"
import { safeRedirectPath } from "./safe-redirect"

describe("safeRedirectPath", () => {
  it("allows same-origin absolute paths", () => {
    expect(safeRedirectPath("/dashboard/courses")).toBe("/dashboard/courses")
    expect(safeRedirectPath("/admin")).toBe("/admin")
  })

  it("preserves query strings and fragments on allowed paths", () => {
    expect(safeRedirectPath("/courses?filter=aml#top")).toBe("/courses?filter=aml#top")
  })

  it("falls back when no target is supplied", () => {
    expect(safeRedirectPath(null)).toBe("/dashboard")
    expect(safeRedirectPath(undefined)).toBe("/dashboard")
    expect(safeRedirectPath("")).toBe("/dashboard")
  })

  it("rejects absolute URLs on another origin", () => {
    expect(safeRedirectPath("https://evil.com")).toBe("/dashboard")
    expect(safeRedirectPath("http://evil.com/path")).toBe("/dashboard")
  })

  it("rejects protocol-relative URLs", () => {
    expect(safeRedirectPath("//evil.com")).toBe("/dashboard")
    expect(safeRedirectPath("//evil.com/path")).toBe("/dashboard")
  })

  it("rejects backslash variants that browsers normalise to //", () => {
    expect(safeRedirectPath("/\\evil.com")).toBe("/dashboard")
  })

  it("rejects relative paths that could escape the origin", () => {
    expect(safeRedirectPath("evil.com")).toBe("/dashboard")
    expect(safeRedirectPath("javascript:alert(1)")).toBe("/dashboard")
  })

  it("honours a custom fallback", () => {
    expect(safeRedirectPath("https://evil.com", "/")).toBe("/")
  })
})
