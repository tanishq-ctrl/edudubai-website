import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function CourseNotFound() {
  return (
    <Container className="py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-neutral-bg-subtle rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-12 w-12 text-neutral-text-muted" />
        </div>
        <h1 className="text-3xl font-bold text-brand-navy mb-4">Course Not Found</h1>
        <p className="text-neutral-text-muted mb-8">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-brand-navy hover:bg-brand-navy-dark">
            <Link href="/courses">Browse All Courses</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}

