import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, GraduationCap, Award, Globe } from "lucide-react"

const partnerships = [
    {
        name: "Global Compliance Institute (GCI)",
        role: "Authorized Global Training Partner",
        description: "EduDubai is an authorized partner of GCI, providing official curriculum and exam bundles for the Certified Compliance Manager (CCM), AML Specialist (AMLS), and KYC Specialist certificates.",
        benefits: [
            "Official Study Materials",
            "Examination Vouchers Included",
            "Industry-Leading Certifications"
        ],
        icon: ShieldCheck,
        color: "text-brand-gold",
        bgColor: "bg-brand-gold/10"
    },
    {
        name: "HOCK International",
        role: "Strategic Educational Partner",
        description: "Our partnership with HOCK International brings world-class study materials and diagnostic tools to our students, ensuring the highest pass rates for specialized financial and auditing certifications.",
        benefits: [
            "AI-Powered Diagnostic Tools",
            "Comprehensive Practice Exams",
            "Executive Study Support"
        ],
        icon: GraduationCap,
        color: "text-blue-600",
        bgColor: "bg-blue-600/10"
    }
]

export function PartnershipsSection() {
    return (
        <section className="py-20 md:py-24 bg-white relative overflow-hidden">
            <Container className="relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4">
                        Global Partnerships & Accreditations
                    </h2>
                    <p className="text-lg text-neutral-text-muted max-w-2xl mx-auto">
                        Official curriculum and authorized examination bundles through world-leading certification bodies.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {partnerships.map((partner) => {
                        const Icon = partner.icon
                        return (
                            <Card key={partner.name} className="border border-neutral-border hover:border-brand-gold/50 transition-all duration-500 hover:shadow-xl bg-white group hover:-translate-y-1">
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-6 mb-6">
                                        <div className={`${partner.bgColor} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`h-7 w-7 ${partner.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-navy mb-1">{partner.name}</h3>
                                            <p className={`font-bold ${partner.color} text-[10px] uppercase tracking-widest`}>{partner.role}</p>
                                        </div>
                                    </div>

                                    <p className="text-neutral-text text-sm mb-8 leading-relaxed">
                                        {partner.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        {partner.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-neutral-text-muted">
                                                <div className="h-1 w-1 rounded-full bg-brand-gold" />
                                                <span className="text-[11px] font-bold uppercase tracking-tight">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}


