import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Globe, Building2, Scale, Users, ShoppingCart, Briefcase } from "lucide-react"

const expertiseAreas = [
  {
    icon: Shield,
    title: "KYC/CDD/EDD",
    description: "We specialize in training and guiding businesses to implement robust KYC, CDD, and EDD frameworks, ensuring effective customer identification, risk mitigation, and compliance with regulatory standards.",
  },
  {
    icon: FileText,
    title: "AML/CFT",
    description: "Equipping professionals with comprehensive knowledge on Anti-Money Laundering (AML) and Countering the Financing of Terrorism (CFT) practices, covering customer due diligence, transaction monitoring, risk assessments, and regulatory requirements.",
  },
  {
    icon: Globe,
    title: "Sanctions",
    description: "Offering expert training on global sanctions regulations, screening processes, and compliance strategies to help businesses manage and mitigate sanctions-related risks effectively.",
  },
  {
    icon: Building2,
    title: "Regulatory Compliance",
    description: "Our expertise lies in developing comprehensive compliance programs, including compliance testing, internal controls, risk assessments, and audit strategies, to help organizations navigate regulatory challenges and adhere to global GRC standards.",
  },
  {
    icon: Scale,
    title: "FATCA & CRS",
    description: "Providing detailed guidance on compliance with the Foreign Account Tax Compliance Act (FATCA) and Common Reporting Standard (CRS) requirements, including implementation strategies, reporting obligations, and best practices to avoid penalties.",
  },
  {
    icon: Briefcase,
    title: "Corporate Taxation",
    description: "Providing in-depth knowledge on corporate tax regulations, compliance strategies, and best practices for efficient tax management.",
  },
  {
    icon: FileText,
    title: "Value Added Tax (VAT)",
    description: "Comprehensive training on VAT implementation, compliance, and reporting across various jurisdictions.",
  },
  {
    icon: Building2,
    title: "Corporate Governance",
    description: "Enhancing corporate structures through training on effective governance, board responsibilities, and regulatory compliance.",
  },
  {
    icon: Users,
    title: "Labor Laws",
    description: "Offering insights into labor compliance, employee rights, and regulatory obligations for businesses.",
  },
  {
    icon: ShoppingCart,
    title: "Consumer Protection Standards",
    description: "Ensuring alignment with consumer rights, transparency, and ethical practices to maintain compliance and build customer trust.",
  },
]

export function AboutExpertise() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Our Expertise
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-3xl mx-auto text-center">
          At Edu Dubai, we believe that training should be tailored, practical, and relevant to specific business needs and we offer in-depth training and consulting services on:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertiseAreas.map((area, index) => {
          const Icon = area.icon
          return (
            <Card
              key={index}
              className="border-2 border-neutral-border hover:border-brand-gold transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-brand-gold/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-text leading-relaxed text-sm text-justify">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

