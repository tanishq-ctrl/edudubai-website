import { Container } from "@/components/container"
import { PolicyHero } from "@/components/sections/policy-hero"
import { PolicyContent } from "@/components/sections/policy-content"
import { PolicyPageClient } from "./page-client"

const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: January 2025",
  sections: [
    {
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us when you enroll in courses, create an account, or contact us. This includes:",
        "• Name, email address, and phone number",
        "• Payment information (processed securely through Razorpay)",
        "• Company information (for corporate training inquiries)",
        "• Course progress and completion data",
        "• Communication preferences",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "We use the information we collect to:",
        "• Provide, maintain, and improve our services",
        "• Process payments and manage enrollments",
        "• Send course materials and updates",
        "• Communicate with you about your account and courses",
        "• Send marketing communications (with your consent)",
        "• Respond to your inquiries and provide customer support",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:",
        "• Encryption of sensitive data in transit and at rest",
        "• Regular security assessments and updates",
        "• Access controls and authentication mechanisms",
        "• Secure payment processing through certified providers",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Course completion records and certifications are retained indefinitely for your access.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to:",
        "• Access your personal information",
        "• Correct inaccurate data",
        "• Request deletion of your data",
        "• Opt-out of marketing communications",
        "• Withdraw consent for data processing",
        "To exercise these rights, please contact us at training@edudubai.org",
      ],
    },
  ],
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PolicyPageClient />
      <PolicyHero title={privacyContent.title} lastUpdated={privacyContent.lastUpdated} />
      <Container className="py-12 md:py-16">
        <PolicyContent sections={privacyContent.sections} />
      </Container>
    </>
  )
}

