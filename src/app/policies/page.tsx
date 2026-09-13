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
      description: "How we collect, use and protect your personal data.",
      href: "/policies/privacy",
      icon: Shield,
    },
    {
      title: "Terms of Service",
      description: "The rules for using our services.",
      href: "/policies/terms",
      icon: FileText,
    },
    {
      title: "Refund Policy",
      description: "Our cancellation and refund procedures.",
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

      <Section tone="sunken" size="sm" innerClassName="max-w-4xl">
      {/* Card titles render as h3; without this the outline jumped h1 -> h3. */}
      <h2 className="sr-only">Our policies</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {policies.map((policy) => (
          <Link key={policy.href} href={policy.href} className="group block h-full">
            <Card className="h-full rounded-sm border-line bg-surface-raised shadow-sm transition-colors duration-slow ease-out-expo group-hover:border-crimson-600">
              <CardHeader className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-crimson-50">
                  <policy.icon aria-hidden="true" className="h-6 w-6 text-crimson-ink" />
                </div>
                <CardTitle className="text-xl font-semibold text-content-strong">
                  {policy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-6 text-[17px] leading-relaxed text-content-muted">
                  {policy.description}
                </CardDescription>
                <div className="flex items-center text-[15px] font-semibold text-crimson-ink">
                  Read policy <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
