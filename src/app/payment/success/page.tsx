import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, BookOpen, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { PaymentSuccessClient } from "./page-client"
import { WhatsAppButton } from "@/components/whatsapp-button"

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    course?: string
    order_id?: string
    payment_id?: string
  }>
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const params = await searchParams
  return (
    <>
      <PaymentSuccessClient />
      <Container className="pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-brand-gold">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-brand-gold/20 rounded-full">
                  <CheckCircle2 className="h-16 w-16 text-brand-gold" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-lg mb-6">
                Your enrollment has been confirmed. Welcome to EduDubai!
              </CardDescription>

              <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-lg p-6 mb-6">
                <p className="text-brand-navy font-semibold mb-2">
                  ✓ Payment verified successfully
                </p>
                <p className="text-sm text-neutral-text-muted">
                  Access details will be shared shortly via email. Our team is preparing your course materials and will reach out with next steps.
                </p>
              </div>

              <div className="bg-neutral-bg-subtle rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-brand-navy mb-4">Payment Details</h3>
                <div className="space-y-2 text-sm">
                  {params.order_id && (
                    <div className="flex justify-between">
                      <span className="text-neutral-text-muted">Order ID:</span>
                      <span className="font-mono text-xs">{params.order_id}</span>
                    </div>
                  )}
                  {params.payment_id && (
                    <div className="flex justify-between">
                      <span className="text-neutral-text-muted">Payment ID:</span>
                      <span className="font-mono text-xs">{params.payment_id}</span>
                    </div>
                  )}
                  {params.course && (
                    <div className="flex justify-between">
                      <span className="text-neutral-text-muted">Course:</span>
                      <span className="font-medium">{params.course.replace(/-/g, " ")}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <WhatsAppButton
                    message={`Hi, I just enrolled in ${params.course ? params.course.replace(/-/g, " ") : "a course"}. Can you help me with next steps?`}
                    source="payment_success"
                    size="lg"
                    className="bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-semibold"
                  />
                  <Button asChild size="lg" variant="outline">
                    <Link href="/dashboard">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Go to Dashboard
                    </Link>
                  </Button>
                </div>
                {params.course && (
                  <div className="text-center">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/courses/${params.course}`}>
                        View Course Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  )
}

