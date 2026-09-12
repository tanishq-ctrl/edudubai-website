/**
 * Normalises a redirect target supplied by the client (typically a `next`
 * query parameter).
 *
 * Only same-origin, single-slash absolute paths are accepted. Absolute URLs,
 * protocol-relative `//host` paths and backslash variants are rejected —
 * otherwise an attacker can use our own login link to bounce a user off-site.
 */
export function safeRedirectPath(
  next: string | null | undefined,
  fallback = "/dashboard"
): string {
  if (!next) return fallback
  if (!next.startsWith("/")) return fallback
  // `//evil.com` and `/\evil.com` are both parsed as protocol-relative URLs.
  if (next.startsWith("//") || next.startsWith("/\\")) return fallback
  return next
}
