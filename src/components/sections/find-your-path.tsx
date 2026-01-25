import Link from "next/link"
import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, UserCheck, Shield, FileText } from "lucide-react"

const paths = [
    {
        title: "Compliance Leadership",
        role: "Targeted for MLROs & Compliance Heads",
        description: "Master global governance and design high-level compliance frameworks for regulated entities.",
        icon: UserCheck,
        recommended: "Certified Compliance Manager (CCM)",
        href: "/courses/certified-compliance-manager",
        color: "from-brand-navy to-brand-navy/80",
        iconColor: "text-brand-gold"
    },
    {
        title: "Financial Crime Specialist",
        role: "Targeted for Analysts & Officers",
        description: "Deep dive into AML techniques, KYC/CDD protocols, and financial investigation strategies.",
        icon: Shield,
        recommended: "CAMS Prep / AML Specialist (AMLS)",
        href: "/courses/certified-anti-money-laundering-specialist",
        color: "from-blue-700 to-blue-900",
        iconColor: "text-blue-100"
    },
    {
        title: "Trade & Sanctions Operations",
        role: "Targeted for Trade Finance & Ship Operations",
        description: "Learn to spot trade-based money laundering and navigate complex global sanctions regimes.",
        icon: Briefcase,
        recommended: "CGSS / TBML Mastery",
        href: "/courses/certified-global-sanctions-specialist",
        color: "from-emerald-700 to-emerald-900",
        iconColor: "text-emerald-100"
    },
    {
        title: "Regulatory Reporting",
        role: "Targeted for Tax & Operations Teams",
        description: "Ensure your organization meets strict FATCA, CRS, and local regulatory reporting standards.",
        icon: FileText,
        recommended: "FATCA & CRS Specialist",
        href: "/courses/fatca-crs-specialist",
        color: "from-amber-600 to-amber-800",
        iconColor: "text-amber-100"
    }
]

export function FindYourPath() {
    return (
        <section className="py-20 md:py-24 bg-brand-navy relative overflow-hidden">
            {/* Elegant dark background patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.05),transparent)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/5 to-transparent pointer-events-none" />

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Find Your Professional Path
                        </h2>
                        <p className="text-white/70 text-lg">
                            Choose the certification path that aligns with your current role or career aspirations.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paths.map((path) => {
                        const Icon = path.icon
                        return (
                            <Card key={path.title} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] group flex flex-col h-full">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2.5 rounded-lg bg-white/10 group-hover:bg-brand-gold/20 transition-colors">
                                            <Icon className="h-6 w-6 text-brand-gold" />
                                        </div>
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-brand-gold/80 border border-brand-gold/20 px-2 py-0.5 rounded">
                                            Role Path
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl text-white group-hover:text-brand-gold transition-colors">{path.title}</CardTitle>
                                    <CardDescription className="text-white/50 text-xs font-medium uppercase tracking-tight">
                                        {path.role}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-between pt-0">
                                    <div className="space-y-4">
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {path.description}
                                        </p>
                                        <div className="pt-4 border-t border-white/10">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold/80 block mb-1">Recommended:</span>
                                            <span className="text-sm font-bold text-white block leading-snug">{path.recommended}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={path.href}
                                        className="mt-6 inline-flex items-center text-xs font-bold text-white group-hover:text-brand-gold transition-colors"
                                    >
                                        Explore Path
                                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

