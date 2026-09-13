"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { trackPageView } from "@/lib/analytics"
import { ArrowRight, Shield, FileText, RefreshCw } from "lucide-react"
import { PolicyHero } from "@/components/sections/policy-hero"
import { Section } from "@/components/section"

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
    <>
      <PolicyHero
        title="Policies"
        lastUpdated="Our terms of service, privacy practices and refund procedures."
      />

      <Section tone="sunken" size="md" innerClassName="max-w-4xl">
      {/* Card titles render as h3; without this the outline jumped h1 -> h3. */}
      <h2 className="sr-only">Our policies</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {policies.map((policy) => (
          <Link key={policy.href} href={policy.href} className="group block h-full">
            <Card className="h-full border-2 border-transparent hover:border-gold-400/30 hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300 bg-white group-hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-navy-900/5 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                  <policy.icon className="h-6 w-6 text-navy-700 group-hover:text-navy-900" />
                </div>
                <CardTitle className="text-xl font-bold text-navy-700 group-hover:text-gold-ink transition-colors">
                  {policy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-content-muted mb-6">
                  {policy.description}
                </CardDescription>
                <div className="flex items-center text-sm font-bold text-navy-700 group-hover:text-gold-ink transition-colors">
                  Read Policy <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </Section>
    </>
  )
}
