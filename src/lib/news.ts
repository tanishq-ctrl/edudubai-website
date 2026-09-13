/**
 * Newsroom index.
 *
 * /news previously rendered a single hard-coded press release with no list,
 * no dates and nowhere to go — a dead end. Article metadata lives here so the
 * index, the article pages and the sitemap all read from one place, and
 * publishing the next story means adding an entry rather than editing JSX.
 *
 * `body` is the component that renders the full article, kept in `src/app`
 * alongside the route that uses it.
 */
export type NewsArticle = {
  slug: string
  title: string
  /** ISO date — formatted for display at render time, never stored pre-formatted. */
  date: string
  location?: string
  category: string
  excerpt: string
  image?: string
  imageAlt?: string
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "trans-world-compliance-partnership",
    title: "Trans World Compliance and Edu-Dubai Announce Strategic Partnership",
    date: "2026-04-07",
    location: "Washington, D.C. & Dubai",
    category: "Press Release",
    excerpt:
      "A strategic partnership combining EduDubai's certification training with Trans World Compliance's regulatory reporting technology, delivering end-to-end tax compliance capability across the Middle East.",
    image: "/images/twc-edudubai-partnership.png",
    imageAlt: "Trans World Compliance and Edu-Dubai connected compliance partnership",
  },
]

/** Newest first. */
export function getNewsArticles(): NewsArticle[] {
  return [...newsArticles].sort((a, b) => b.date.localeCompare(a.date))
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug)
}

export function formatNewsDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
