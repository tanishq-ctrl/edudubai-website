import { Container } from "@/components/container"
import { PolicyHero } from "@/components/sections/policy-hero"
import { PolicyContent } from "@/components/sections/policy-content"
import { PolicyPageClient } from "./page-client"

const refundContent = {
  title: "Refund Policy",
  lastUpdated: "Last updated: January 2025",
  sections: [
    {
      title: "Training Delivery Fees",
      content: [
        "<strong>Refunds and Cancellations for Edu Dubai Training delivery Fees:</strong>",
        "• Cancellations made more than 7 days before the course start date are eligible for a full refund minus a <strong>non-refundable administrative fee of USD 50</strong>. The refund will be processed within 7 working days and credited to your bank account.",
        "• Cancellations made within 7 days of the course start date are <strong>not eligible for a refund</strong>. However, you have the option to enroll in a similar course in the next available batch at no additional training fee.",
      ],
    },
    {
      title: "Third-Party Certification Fees",
      content: [
        "• All fees for third-party certification registrations are <strong>non-refundable</strong>. Once enrolled, <strong>cancellation or refund is not permitted</strong>.",
        "• Rescheduling of certification exams may be subject to the policies of the third-party certification body. Any additional fees for rescheduling are your responsibility.",
      ],
    },
    {
      title: "Course Cancellation by Edu Dubai",
      content: [
        "• If we cancel a course, you will be offered a full refund or the option to enroll in a similar course. The refund will be processed within 7 working days and credited to your bank account.",
      ],
    },
  ],
}

export default function RefundPolicyPage() {
  return (
    <>
      <PolicyPageClient />
      <PolicyHero title={refundContent.title} lastUpdated={refundContent.lastUpdated} />
      <Container className="py-12 md:py-16">
        <PolicyContent sections={refundContent.sections} />
      </Container>
    </>
  )
}

