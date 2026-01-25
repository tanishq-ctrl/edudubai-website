import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DeliveryFormatBadge } from "@/components/delivery-format-badge"
import { CourseImage } from "@/components/course-image"
import { Building2, Users, Target } from "lucide-react"

// Partner Certifications (GCI and other certifications)
const partnerCertifications = [
  {
    id: "regulatory-compliance-specialist",
    title: "Regulatory Compliance Specialist (RCS)",
    description:
      "Advanced expertise in global regulatory compliance frameworks, risk-based monitoring, compliance testing, and managing regulatory examinations.",
    level: "INTERMEDIATE",
    duration: 20,
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"] as const,
    icon: Building2,
    badge: "RCS",
    imageUrl: "/images/certifications/regulatory-compliance-specialist.jpg",
  },
  {
    id: "know-your-customer-specialist",
    title: "Know Your Customer Specialist",
    description:
      "Practical and regulatory-aligned training on KYC, CDD, EDD, and digital identity systems for effective customer onboarding and ongoing monitoring.",
    level: "BEGINNER",
    duration: 24,
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"] as const,
    icon: Target,
    badge: "KYC",
    imageUrl: "/images/certifications/know-your-customer-specialist.jpg",
  },
  {
    id: "certified-compliance-manager",
    title: "Certified Compliance Manager (CCM)",
    description:
      "The most advanced global certification in Compliance and Anti-Money Laundering, covering governance, AML/CFT, sanctions, FATCA/CRS, investigations, and regulatory oversight.",
    level: "ADVANCED",
    duration: 60,
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"] as const,
    icon: Users,
    badge: "GCI CCM",
    imageUrl: "/images/certifications/certified-compliance-manager.jpg",
  },
]

export function PartnerCertificationsSection() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
          Partner Certifications
        </h2>
        <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
          Accredited certification pathways through our trusted partners
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnerCertifications.map((cert) => {
          const Icon = cert.icon

          return (
            <Card
              key={cert.id}
              className="overflow-hidden hover:shadow-lg transition-all border-2 border-neutral-border hover:border-brand-gold h-full flex flex-col group"
            >
              {/* Certification Image */}
              {cert.imageUrl && (
                <div className="relative w-full aspect-video bg-gradient-to-br from-brand-navy to-brand-navy-dark overflow-hidden">
                  <CourseImage
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-brand-navy/10 rounded-lg">
                    <Icon className="h-6 w-6 text-brand-navy" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary" className="text-xs">
                      GCI
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {cert.badge}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl mb-3">{cert.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {cert.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cert.deliveryModes.map((mode) => (
                    <DeliveryFormatBadge key={mode} format={mode} />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-text-muted">Duration</span>
                  <span className="font-medium">{cert.duration} hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-text-muted">Level</span>
                  <span className="font-medium">{cert.level}</span>
                </div>
                <div className="pt-4 border-t border-neutral-border">
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

