"use client"

import { useEffect } from "react"

/**
 * Last-resort boundary for errors thrown by the root layout itself.
 *
 * This replaces the whole document, so it must render its own <html> and
 * <body> and cannot rely on the site shell, fonts, or Tailwind classes being
 * mounted — styles are inlined deliberately.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Root layout error:", error.digest ?? error.message)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Something Went Wrong
          </h1>
          <p style={{ color: "#475569", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            We hit an unexpected problem. Please try again, or email{" "}
            <a href="mailto:training@edudubai.org" style={{ color: "#1e3a5f" }}>
              training@edudubai.org
            </a>{" "}
            if it keeps happening.
          </p>
          {error.digest && (
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "1.5rem" }}>
              Reference: <code>{error.digest}</code>
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: "#1e3a5f",
              color: "#fff",
              border: 0,
              borderRadius: "0.375rem",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
