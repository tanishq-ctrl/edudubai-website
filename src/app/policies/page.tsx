"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { trackPageView } from "@/lib/analytics"
import { ArrowRight, Shield, FileText, RefreshCw } from "lucide-react"

export default function PoliciesPage() {
  useEffect(() => {
    trackPageView("/policies", "Policies")
  }, [])

  const policies = [
    {
      title: "Privacy Policy",
      description: "Learn how we collect, use, and protect your personal data.",
      href: "/policies/privacy",
      icon: Shield,
    },
    {
      title: "Terms of Service",
      description: "Read the rules and regulations for using our services.",
      href: "/policies/terms",
      icon: FileText,
    },
    {
      title: "Refund Policy",
      description: "Understand our cancellation and refund procedures.",
      href: "/policies/refund",
      icon: RefreshCw,
    },
  ]

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-24 max-w-4xl min-h-[80vh]">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-brand-navy tracking-tight">Policies</h1>
        <p className="text-lg md:text-xl text-neutral-text-muted max-w-2xl mx-auto">
          Transparency is key. Find detailed information about our terms, privacy practices, and refund policies below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {policies.map((policy) => (
          <Link key={policy.href} href={policy.href} className="group block h-full">
            <Card className="h-full border-2 border-transparent hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 bg-white group-hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                  <policy.icon className="h-6 w-6 text-brand-navy group-hover:text-brand-navy-dark" />
                </div>
                <CardTitle className="text-xl font-bold text-brand-navy group-hover:text-brand-gold-dark transition-colors">
                  {policy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-neutral-text-muted mb-6">
                  {policy.description}
                </CardDescription>
                <div className="flex items-center text-sm font-bold text-brand-navy group-hover:text-brand-gold-dark transition-colors">
                  Read Policy <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
