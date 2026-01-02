"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trackPageView } from "@/lib/analytics"

export default function PoliciesPage() {
  useEffect(() => {
    trackPageView("/policies", "Policies")
  }, [])

  const policies = [
    {
      title: "Privacy Policy",
      content: `
        <h3 class="font-semibold text-brand-navy mb-2">Information We Collect</h3>
        <p class="text-neutral-text mb-4">
          We collect information that you provide directly to us, including name, email address, 
          phone number, and payment information when you enroll in our courses.
        </p>
        <h3 class="font-semibold text-brand-navy mb-2">How We Use Your Information</h3>
        <p class="text-neutral-text mb-4">
          We use the information we collect to provide, maintain, and improve our services, 
          process payments, send you course materials, and communicate with you about your enrollment.
        </p>
        <h3 class="font-semibold text-brand-navy mb-2">Data Security</h3>
        <p class="text-neutral-text">
          We implement appropriate security measures to protect your personal information against 
          unauthorized access, alteration, disclosure, or destruction.
        </p>
      `,
    },
    {
      title: "Terms of Service",
      content: `
        <h3 class="font-semibold text-brand-navy mb-2">Course Enrollment</h3>
        <p class="text-neutral-text mb-4">
          By enrolling in a course, you agree to complete the course materials and assessments 
          in accordance with the course requirements.
        </p>
        <h3 class="font-semibold text-brand-navy mb-2">Payment Terms</h3>
        <p class="text-neutral-text mb-4">
          All course fees are due at the time of enrollment. Payments are processed securely 
          through Razorpay. Refunds are available within 7 days of enrollment if you haven't 
          accessed more than 20% of the course content.
        </p>
        <h3 class="font-semibold text-brand-navy mb-2">Intellectual Property</h3>
        <p class="text-neutral-text">
          All course materials, including videos, documents, and assessments, are the intellectual 
          property of EduDubai and are for personal use only. Unauthorized distribution is prohibited.
        </p>
      `,
    },
    {
      title: "Refund Policy",
      content: `
        <h3 class="font-semibold text-brand-navy mb-2">Refund Eligibility</h3>
        <p class="text-neutral-text mb-4">
          Refunds are available within 7 days of enrollment, provided you haven't accessed more 
          than 20% of the course content. Refund requests must be submitted via email to 
          training@edudubai.org.
        </p>
        <h3 class="font-semibold text-brand-navy mb-2">Processing Time</h3>
        <p class="text-neutral-text mb-4">
          Refunds are processed within 5-7 business days and will be credited to the original 
          payment method.
        </p>
        <h3 class="font-semibold text-brand-navy mb-2">Non-Refundable Items</h3>
        <p class="text-neutral-text">
          Corporate training programs and customized courses are non-refundable once the program 
          has commenced.
        </p>
      `,
    },
  ]

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 md:pt-36 md:pb-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">Policies</h1>
        <p className="text-xl text-neutral-text-muted">
          Important information about our terms, privacy, and refund policies
        </p>
      </div>

      <div className="space-y-6">
        {policies.map((policy, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{policy.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: policy.content }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
