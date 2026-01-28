import { Container } from "@/components/container"
import { PolicyHero } from "@/components/sections/policy-hero"
import { PolicyContent } from "@/components/sections/policy-content"
import { PolicyPageClient } from "./page-client"

const termsContent = {
  title: "Terms and Conditions",
  lastUpdated: "Last updated: January 2025",
  sections: [
    {
      title: "Welcome to Edu Dubai",
      content: [
        "These Terms and Conditions (\"Terms\") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms."
      ],
    },
    {
      title: "1. Services Provided and Pricing",
      content: [
        "Edu Dubai offers educational services, including academic courses, training programs, and related materials.",
        "• We reserve the right to modify or discontinue any service without prior notice.",
        "• All prices are listed in USD and are subject to change at our discretion."
      ],
    },
    {
      title: "2. Payment Methods",
      content: [
        "We accept online payments through VISA and MasterCard credit/debit cards in USD.",
        "• Edu Dubai reserves the right to determine acceptable payment methods and may refuse certain types of transactions."
      ],
    },
    {
      title: "3. Delivery Policy",
      content: [
        "• Course materials and services will be delivered electronically or made available for download through our website.",
        "• For any physical materials, delivery arrangements will be communicated, and applicable fees may be charged."
      ],
    },
    {
      title: "4. Refund and Cancellation Policy",
      content: [
        "Refunds and Cancellations for Edu Dubai Training delivery Fees:",
        "• Cancellations made more than 7 days before the course start date are eligible for a full refund minus a non-refundable administrative fee of USD 50. The refund will be processed within 7 working days and credited to your bank account.",
        "• Cancellations made within 7 days of the course start date are not eligible for a refund. However, you have the option to enroll in a similar course in the next available batch at no additional training fee.",
        "Third-Party Certification Fees:",
        "• All fees for third-party certification registrations are non-refundable. Once enrolled, cancellation or refund is not permitted.",
        "• Rescheduling of certification exams may be subject to the policies of the third-party certification body. Any additional fees for rescheduling are your responsibility.",
        "Course Cancellation by Edu Dubai:",
        "• If we cancel a course, you will be offered a full refund or the option to enroll in a similar course. The refund will be processed within 7 working days and credited to your bank account."
      ],
    },
    {
      title: "6. Minors",
      content: [
        "• Users under the age of 18 must obtain permission from a parent or legal guardian to use our services.",
        "• Transactions made by minors should be supervised by an adult."
      ],
    },
    {
      title: "7. Privacy Policy",
      content: [
        "Your privacy is important to us. We are committed to protecting your personal information. Please review our Privacy Policy for details on how we collect, use, and safeguard your data."
      ],
    },
    {
      title: "8. Intellectual Property Rights",
      content: [
        "All content on the Edu Dubai website, including text, graphics, logos, and software, is the property of Edu Dubai and is protected by Indian and international copyright laws."
      ],
    },
    {
      title: "9. Limitation of Liability",
      content: [
        "Edu Dubai will not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services."
      ],
    },
    {
      title: "10. Governing Law and Jurisdiction",
      content: [
        "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India."
      ],
    },
    {
      title: "11. Changes to Terms and Conditions",
      content: [
        "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services signifies your acceptance of the updated Terms."
      ],
    },
    {
      title: "12. Contact Information",
      content: [
        "For any questions or concerns regarding these Terms, please contact us."
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

