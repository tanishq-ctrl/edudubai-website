"use client"

import Image from "next/image"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function PartnershipsSection() {
    return (
        <section className="py-12 md:py-14 bg-neutral-bg-subtle/50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <Container className="relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
                        Authorized Alliances
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-black text-brand-navy mb-6">
                        Global Strategic Partnerships
                    </h3>
                    <p className="text-neutral-text-muted text-lg leading-relaxed">
                        EduDubai is the exclusive authorized training partner for leading international certification bodies, ensuring you receive the official curriculum and highest standard of preparation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* GCI Card */}
                    <Card className="border-0 shadow-lg bg-white overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                        <CardContent className="p-0 flex-grow flex flex-col">
                            <div className="p-8 md:p-10 flex flex-col h-full flex-grow">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="relative h-16 w-48 transition-all duration-300">
                                        <Image
                                            src="/images/partners/gci-australia.png"
                                            alt="GCI Global Compliance Institute"
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                    <div className="h-10 w-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                                    </div>
                                </div>

                                <h4 className="text-2xl font-bold text-brand-navy mb-4">
                                    Global Compliance Institute (GCI)
                                </h4>

                                <p className="text-neutral-text-muted mb-8 leading-relaxed flex-grow">
                                    As the authorized MENA partner for GCI, we deliver their complete suite of specialized compliance certifications. GCI is renowned for its practical, operational approach to AML, Sanctions, and KYC education, moving beyond theory to job-ready vigilance.
                                </p>

                                <div className="space-y-3 mb-8">
                                    {["Authorized Training Center", "Official Exam Preparation", "Certified Instructors"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm font-medium text-brand-navy/80">
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <Link href="/courses?body=GCI" className="w-full">
                                    <Button className="w-full bg-brand-navy hover:bg-brand-navy-light text-white group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                                        Explore GCI Courses
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* HOCK Card */}
                    <Card className="border-0 shadow-lg bg-white overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                        <CardContent className="p-0 flex-grow flex flex-col">
                            <div className="p-8 md:p-10 flex flex-col h-full flex-grow">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="relative h-16 w-48 transition-all duration-300">
                                        <Image
                                            src="/images/partners/hock-international.png"
                                            alt="HOCK International"
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                    <div className="h-10 w-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                                    </div>
                                </div>

                                <h4 className="text-2xl font-bold text-brand-navy mb-4">
                                    HOCK International
                                </h4>

                                <p className="text-neutral-text-muted mb-8 leading-relaxed flex-grow">
                                    We partner with HOCK International to deliver the world&apos;s most effective CMA (Certified Management Accountant) preparation. By combining HOCK&apos;s comprehensive textbooks, videos, and exam software with our expert classroom instruction, we ensure high pass rates.
                                </p>

                                <div className="space-y-3 mb-8">
                                    {["CMA Exam Specialists", "Comprehensive Study Suite", "PassMap™ Technology"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm font-medium text-brand-navy/80">
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full bg-brand-navy hover:bg-brand-navy-light text-white group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                                    View CMA Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </section>
    )
}
