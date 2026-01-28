import { Container } from "@/components/container"
import { PolicyHero } from "@/components/sections/policy-hero"
import { PolicyContent } from "@/components/sections/policy-content"
import { PolicyPageClient } from "./page-client"

const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: January 2025",
  sections: [
    {
      title: "Introduction",
      content: [
        "This Privacy Policy outlines how Edu Dubai (\"we,\" \"our,\" or \"us\") collects, uses, and protects the personal information of users (\"you\" or \"your\") who visit our website www.edudubai.org and use our services in India.",
        "We are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This policy explains the types of personal data we collect, how we use it, and the measures we take to safeguard it."
      ],
    },
    {
      title: "2. Information We Collect",
      content: [
        "• <strong>Personal Information:</strong> Name, email address, phone number, mailing address, and other contact details provided when you register or fill out forms on our website.",
        "• <strong>Payment Information:</strong> Credit/debit card details and transaction history when you make payments for our services.",
        "• <strong>Technical Data:</strong> IP address, browser type, operating system, and browsing behaviour collected through cookies and similar technologies."
      ],
    },
    {
      title: "3. Use of Cookies",
      content: [
        "Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand your preferences and improve our services.",
        "<strong>Purpose of Cookies:</strong>",
        "• Remember your login details.",
        "• Analyze website traffic and usage patterns.",
        "• Customize content based on your interests.",
        "<strong>Managing Cookies:</strong>",
        "• You can choose to accept or decline cookies through your browser settings.",
        "• Disabling cookies may affect website functionality."
      ],
    },
    {
      title: "4. How We Use Your Information",
      content: [
        "• <strong>To Provide Services:</strong> Process registrations, payments, and deliver educational content.",
        "• <strong>Communication:</strong> Send notifications, updates, and respond to inquiries.",
        "• <strong>Marketing:</strong> Share promotional materials, with your consent.",
        "• <strong>Improvement:</strong> Analyze data to enhance our website and services."
      ],
    },
    {
      title: "5. Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
        "• <strong>Encryption:</strong> Sensitive data like payment information is encrypted during transmission.",
        "• <strong>Access Control:</strong> Personal data is accessible only to authorized personnel who need it for designated purposes."
      ],
    },
    {
      title: "6. Third-Party Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "• We may share data with trusted partners who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.",
        "• We may disclose information when required by law."
      ],
    },
    {
      title: "7. External Links",
      content: [
        "Our website may contain links to external sites. We are not responsible for the content or privacy practices of these websites. We encourage you to review their privacy policies."
      ],
    },
    {
      title: "8. Social Media Platforms",
      content: [
        "Engagement with our content on social media platforms is subject to the terms and privacy policies of those platforms. We advise caution when sharing personal information on social media."
      ],
    },
    {
      title: "9. Children's Privacy",
      content: [
        "Our services are not intended for users under the age of 18 without parental consent. We do not knowingly collect personal information from minors."
      ],
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.",
        "• <strong>Notification of Changes:</strong> Updates will be posted on this page with the revised date.",
        "• <strong>Effective Date:</strong> Changes become effective when posted."
      ],
    },
    {
      title: "11. Your Rights",
      content: [
        "Under Indian law, you have the right to:",
        "• Access and review the personal information we hold about you.",
        "• Request corrections to inaccurate or incomplete data.",
        "• Withdraw consent for data processing where applicable."
      ],
    },
    {
      title: "12. Contact Us",
      content: [
        "For questions or concerns about this Privacy Policy or your personal data, please contact us."
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

