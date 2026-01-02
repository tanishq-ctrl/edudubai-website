import { Container } from "@/components/container"
import { PolicyHero } from "@/components/sections/policy-hero"
import { PolicyContent } from "@/components/sections/policy-content"
import { PolicyPageClient } from "./page-client"

const termsContent = {
  title: "Terms of Service",
  lastUpdated: "Last updated: January 2025",
  sections: [
    {
      title: "Course Enrollment",
      content: [
        "By enrolling in a course, you agree to:",
        "• Complete course materials and assessments in accordance with course requirements",
        "• Maintain the confidentiality of course materials",
        "• Use course content solely for personal or authorized corporate training purposes",
        "• Not share login credentials or course access with unauthorized parties",
      ],
    },
    {
      title: "Payment Terms",
      content: [
        "• All course fees are due at the time of enrollment",
        "• Payments are processed securely through Razorpay",
        "• Prices are in US Dollars (USD) unless otherwise stated",
        "• Refunds are available within 7 days of enrollment if you haven't accessed more than 20% of course content",
        "• Corporate training programs may have different payment terms as specified in the agreement",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "All course materials, including videos, documents, presentations, assessments, and other content, are the intellectual property of EduDubai or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use course materials for personal learning purposes only.",
        "You may not:",
        "• Copy, reproduce, or distribute course materials",
        "• Create derivative works based on course content",
        "• Share course access with others",
        "• Use course materials for commercial purposes without authorization",
      ],
    },
    {
      title: "Certification",
      content: [
        "Certificates of completion are issued upon successful completion of course requirements. Certifications from third-party organizations (e.g., ACAMS, GCI) are subject to their respective terms and conditions.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "EduDubai provides educational content and services &apos;as is.&apos; We do not guarantee specific outcomes, job placements, or certification exam results. Our liability is limited to the amount paid for the course.",
      ],
    },
  ],
}

export default function TermsPage() {
  return (
    <>
      <PolicyPageClient />
      <PolicyHero title={termsContent.title} lastUpdated={termsContent.lastUpdated} />
      <Container className="py-12 md:py-16">
        <PolicyContent sections={termsContent.sections} />
      </Container>
    </>
  )
}

