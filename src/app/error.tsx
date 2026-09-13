"use client"

import { useEffect } from "react"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

/**
 * Route-level error boundary. Catches render and data-fetching errors in any
 * page below the root layout so visitors get a branded recovery screen instead
 * of the default Next.js error page.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Server-side details are redacted in production; the digest is the only
    // safe handle for correlating this with the server log.
    console.error("Unhandled application error:", error.digest ?? error.message)
  }, [error])

  return (
    <Container className="py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-surface-sunken rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-content-muted" />
        </div>
        <h1 className="text-3xl font-bold text-navy-700 mb-4">Something Went Wrong</h1>
        <p className="text-content-muted mb-8">
          We hit an unexpected problem loading this page. Please try again, or
          contact us if it keeps happening.
        </p>
        {error.digest && (
          <p className="text-xs text-content-muted mb-8">
            Reference: <code>{error.digest}</code>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="bg-navy-900 hover:bg-navy-900"
          >
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
