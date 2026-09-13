import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { NewsGrid } from "@/components/sections/news-grid"
import { Container } from "@/components/container"
import { getNewsArticle, getNewsArticles, formatNewsDate } from "@/lib/news"

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

/** Pre-render every article at build time. */
export function generateStaticParams() {
  return getNewsArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsArticle(slug)
  if (!article) return { title: "Article Not Found" }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      images: article.image ? [article.image] : undefined,
    },
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    image: article.image ? `https://edudubai.org${article.image}` : undefined,
    publisher: { "@type": "Organization", name: "EduDubai" },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-surface-sunken pt-[calc(var(--header-h)+2rem)]">
        <Container>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-navy-700"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-slow ease-out-expo group-hover:-translate-x-1"
            />
            Back to newsroom
          </Link>
          <p className="mt-4 text-xs text-content-subtle">
            <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
            {article.location ? ` · ${article.location}` : null}
          </p>
        </Container>
      </div>

      {/*
        The article body currently lives as a component. When a second story is
        added, give each one its own body component and switch on the slug here.
      */}
      <NewsGrid />
    </>
  )
}
