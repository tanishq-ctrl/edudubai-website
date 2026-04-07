import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Linkedin, BookOpen, CalendarDays, Building2 } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  category: string
  categoryIcon: JSX.Element
  date: string
  title: string
  summary: string
  source: string
  sourceType: "article" | "linkedin"
  href: string
  featured?: boolean
  quote?: {
    text: string
    author: string
    role: string
  }
  highlights?: string[]
}

const newsItems: NewsItem[] = [
  {
    id: "twc-partnership",
    category: "Partnership",
    categoryIcon: <Building2 className="h-3.5 w-3.5" />,
    date: "April 2, 2026",
    title: "Trans World Compliance and Edu-Dubai Announce Strategic Partnership",
    summary:
      "Trans World Compliance (TWC) and Edu-Dubai have formed a strategic partnership to deliver integrated compliance solutions across the Middle East — combining Edu-Dubai's training and certification expertise with TWC's automated regulatory reporting technology to address the full compliance lifecycle for financial institutions.",
    source: "Trans World Compliance Blog",
    sourceType: "article",
    href: "https://blog.transworldcompliance.com/en/trans-world-compliance-and-edu-dubai-announce-strategic-partnership",
    featured: true,
    quote: {
      text: "Partnering with TWC gives our network of trained professionals a trusted path to putting that knowledge into practice.",
      author: "Sonali Prabhu",
      role: "CEO & Founder, Edu-Dubai",
    },
    highlights: [
      "Targets FATCA, CRS, and CARF compliance in the Middle East",
      "Unites certification training with regulatory reporting platforms",
      "Both organisations hold ISO/IEC 27001 and EU GDPR certifications",
    ],
  },
  {
    id: "twc-linkedin",
    category: "Announcement",
    categoryIcon: <Linkedin className="h-3.5 w-3.5" />,
    date: "November 2024",
    title: "Strategic Alliance Announced on LinkedIn",
    summary:
      "Trans World Compliance shared the news of their strategic alliance with Edu-Dubai on LinkedIn, highlighting how the partnership bridges the gap between compliance education and real-world regulatory reporting technology across the Middle East region.",
    source: "LinkedIn · Trans World Compliance",
    sourceType: "linkedin",
    href: "https://www.linkedin.com/posts/trans-world-compliance_compliance-regtech-middleeast-activity-7445402264246087681-ztcG/",
    highlights: [
      "#compliance · #regtech · #middleeast",
      "Shared across Trans World Compliance's global professional network",
    ],
  },
]

function SourceBadge({ type, label }: { type: "article" | "linkedin"; label: string }) {
  if (type === "linkedin") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A66C2]">
        <Linkedin className="h-3.5 w-3.5 fill-[#0A66C2] text-[#0A66C2]" />
        {label}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-text-muted">
      <BookOpen className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}

export function NewsGrid() {
  const featured = newsItems.find((n) => n.featured)
  const secondary = newsItems.filter((n) => !n.featured)

  return (
    <section className="py-16 md:py-20 bg-neutral-bg relative overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-navy/4 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/4 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-3">
            Latest Updates
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-brand-navy leading-tight">
              News &amp; Press Releases
            </h2>
            <p className="text-neutral-text-muted max-w-md text-sm leading-relaxed sm:text-right">
              Follow our journey as we expand globally and forge partnerships that advance compliance education.
            </p>
          </div>
          <div className="mt-6 h-px bg-gradient-to-r from-brand-gold/60 via-brand-navy/20 to-transparent" />
        </div>

        {/* News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:items-start">

          {/* Featured Article — spans 2 cols */}
          {featured && (
            <Link
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-2 group block"
            >
              <article className="h-full bg-white rounded-2xl border border-neutral-border/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                {/* Card top accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-gold" />

                <div className="p-8 md:p-10 flex flex-col">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge className="bg-brand-navy/8 text-brand-navy border-0 font-semibold text-xs px-3 py-1 inline-flex items-center gap-1.5">
                      {featured.categoryIcon}
                      {featured.category}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-text-muted">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {featured.date}
                    </span>
                    <SourceBadge type={featured.sourceType} label={featured.source} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black text-brand-navy leading-tight mb-4 group-hover:text-brand-gold transition-colors duration-200">
                    {featured.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-neutral-text-muted leading-relaxed mb-6">
                    {featured.summary}
                  </p>

                  {/* Highlights */}
                  {featured.highlights && (
                    <ul className="space-y-2 mb-8">
                      {featured.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-brand-navy/80 font-medium">
                          <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Quote */}
                  {featured.quote && (
                    <blockquote className="border-l-4 border-brand-gold pl-5 py-1 mb-8 bg-brand-gold/5 rounded-r-lg pr-4">
                      <p className="text-sm md:text-base italic text-neutral-text leading-relaxed mb-2">
                        &ldquo;{featured.quote.text}&rdquo;
                      </p>
                      <footer className="text-xs font-semibold text-brand-navy">
                        — {featured.quote.author},{" "}
                        <span className="font-normal text-neutral-text-muted">{featured.quote.role}</span>
                      </footer>
                    </blockquote>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors duration-200 mt-auto">
                    Read Full Article
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Secondary cards — stack in the 3rd col */}
          <div className="flex flex-col gap-6 md:gap-8">
            {secondary.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block flex-1"
              >
                <article className="h-full bg-white rounded-2xl border border-neutral-border/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className={`h-1.5 w-full ${item.sourceType === "linkedin" ? "bg-[#0A66C2]" : "bg-brand-gold"}`} />

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <Badge className="bg-brand-navy/8 text-brand-navy border-0 font-semibold text-xs px-3 py-1 inline-flex items-center gap-1.5">
                        {item.categoryIcon}
                        {item.category}
                      </Badge>
                      <span className="inline-flex items-center gap-1.5 text-xs text-neutral-text-muted">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-brand-navy leading-snug mb-3 group-hover:text-brand-gold transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-neutral-text-muted text-sm leading-relaxed mb-5 flex-grow">
                      {item.summary}
                    </p>

                    {/* Highlights */}
                    {item.highlights && (
                      <ul className="space-y-2 mb-6">
                        {item.highlights.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-brand-navy/70 font-medium">
                            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Source + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-border/50">
                      <SourceBadge type={item.sourceType} label={item.source} />
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy group-hover:text-brand-gold transition-colors duration-200">
                        View Post
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* "Stay Connected" CTA card */}
            <div className="bg-gradient-to-br from-brand-navy to-brand-navy-light rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="h-9 w-9 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <Linkedin className="h-5 w-5 text-brand-gold" />
                </div>
                <h4 className="font-black text-base mb-2">Follow Us on LinkedIn</h4>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  Get real-time updates on partnerships, new courses, and compliance insights.
                </p>
                <Link
                  href="https://www.linkedin.com/company/edudubai-india-mena/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
                >
                  Follow Edu-Dubai
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
