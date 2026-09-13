import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-surface-sunken rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Compass className="h-12 w-12 text-content-muted" />
        </div>
        <h1 className="text-3xl font-bold text-navy-700 mb-4">Page Not Found</h1>
        <p className="text-content-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-navy-900 hover:bg-navy-900">
            <Link href="/">Go to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
