import { Container } from "@/components/container"
import { PolicyHero } from "@/components/sections/policy-hero"
import { PolicyContent } from "@/components/sections/policy-content"
import { PolicyPageClient } from "./page-client"

const refundContent = {
  title: "Refund Policy",
  lastUpdated: "Last updated: January 2025",
  sections: [
    {
      title: "Refund Eligibility",
      content: [
        "Refunds are available under the following conditions:",
        "• Request submitted within 7 days of enrollment",
        "• Less than 20% of course content has been accessed",
        "• Refund request submitted via email to training@edudubai.org",
        "• No certification exam vouchers have been issued",
      ],
    },
    {
      title: "Processing Time",
      content: [
        "• Refund requests are reviewed within 2 business days",
        "• Approved refunds are processed within 5-7 business days",
        "• Refunds are credited to the original payment method",
        "• Processing fees may apply as per payment provider terms",
      ],
    },
    {
      title: "Non-Refundable Items",
      content: [
        "The following are not eligible for refunds:",
        "• Corporate training programs once commenced",
        "• Customized or bespoke training solutions",
        "• Certification exam fees paid to third-party organizations (e.g., ACAMS)",
        "• Courses accessed beyond 20% completion",
        "• Refund requests submitted after 7 days from enrollment",
      ],
    },
    {
      title: "Partial Refunds",
      content: [
        "In exceptional circumstances, partial refunds may be considered on a case-by-case basis. Contact our support team to discuss your situation.",
      ],
    },
    {
      title: "Course Transfers",
      content: [
        "Instead of a refund, you may request to transfer your enrollment to another course of equal or higher value. Transfer requests must be made within 7 days of enrollment.",
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

