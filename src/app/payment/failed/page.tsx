import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PaymentFailedClient } from "./page-client"

interface PaymentFailedPageProps {
  searchParams: Promise<{
    course?: string
    error?: string
  }>
}

export default async function PaymentFailedPage({ searchParams }: PaymentFailedPageProps) {
  const params = await searchParams
  const errorMessage = params.error
    ? decodeURIComponent(params.error)
    : "Payment could not be processed"

  return (
    <>
      <PaymentFailedClient />
      <Container className="pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-red-200">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-50 rounded-full">
                  <XCircle className="h-16 w-16 text-red-500" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Payment Failed
              </CardTitle>
              <CardDescription className="text-lg mb-6">
                We couldn&apos;t process your payment. Please try again.
              </CardDescription>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {errorMessage}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-neutral-text-muted">
                  If you continue to experience issues, please contact our support team or try a different payment method.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {params.course && (
                    <Button asChild size="lg" className="bg-brand-navy hover:bg-brand-navy-dark text-white">
                      <Link href={`/courses/${params.course}`}>
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Try Again
                      </Link>
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline">
                    <Link href="/courses">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Browse Courses
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-border">
                  <p className="text-sm text-neutral-text-muted mb-4">
                    Need help? Contact our support team:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                    <a
                      href="mailto:training@edudubai.org"
                      className="text-brand-navy hover:text-brand-navy-dark underline"
                    >
                      training@edudubai.org
                    </a>
                    <span className="hidden sm:inline text-neutral-text-muted">|</span>
                    <a
                      href="tel:+919665642862"
                      className="text-brand-navy hover:text-brand-navy-dark underline"
                    >
                      +91 9665642862
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  )
}

