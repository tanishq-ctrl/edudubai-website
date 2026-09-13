import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"

import { NewsHero } from "@/components/sections/news-hero"
import { Section } from "@/components/section"
import { Stagger } from "@/components/motion"
import { getNewsArticles, formatNewsDate } from "@/lib/news"

export const metadata: Metadata = {
  title: "News & Press",
  description:
    "Latest news, press releases and announcements from EduDubai, including strategic partnerships and milestones in global compliance education.",
  keywords: [
    "EduDubai News",
    "Compliance Training Partnership",
    "Trans World Compliance",
    "AML Training Announcement",
    "EduDubai Press Release",
  ],
  alternates: { canonical: "/news" },
}

/**
 * Newsroom index.
 *
 * Replaces a page that rendered one press release inline with no list and no
 * dates. Each story is now a dated, linkable entry.
 */
export default function NewsPage() {
  const articles = getNewsArticles()

  return (
    <>
      <NewsHero />

      <Section tone="sunken" size="sm">
        <h2 className="sr-only">Latest stories</h2>

        {articles.length === 0 ? (
          <p className="py-16 text-center text-[17px] text-content-muted">
            No announcements at this time.
          </p>
        ) : (
          <Stagger className="mx-auto grid max-w-5xl gap-6" step={90} variant="up">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface-raised shadow-sm transition-colors duration-slow ease-out-expo hover:border-crimson-600"
              >
                {a.image ? (
                  /*
                    The artwork is a wide banner (~2.6:1). A side-by-side layout
                    forced it into a near-square box where object-cover threw
                    most of the image away, so it is full width at close to its
                    native ratio instead.
                  */
                  <div className="relative aspect-[21/9] w-full overflow-hidden bg-ink-950">
                    <Image
                      src={a.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 64rem"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div className="flex flex-col p-7 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-crimson-600/30 bg-crimson-50 px-3 py-1 text-2xs font-semibold uppercase tracking-[0.18em] text-crimson-ink">
                      {a.category}
                    </span>
                    <time
                      dateTime={a.date}
                      className="inline-flex items-center gap-1.5 text-xs text-content-muted"
                    >
                      <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                      {formatNewsDate(a.date)}
                    </time>
                  </div>

                  <h3 className="mt-4 text-xl leading-snug">
                    <Link href={`/news/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[17px] leading-relaxed text-content-muted">
                    {a.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    {a.location ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-content-subtle">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                        {a.location}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-content-muted transition-colors duration-slow ease-out-expo group-hover:border-crimson-600 group-hover:bg-crimson-600 group-hover:text-content-on-dark"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        )}
      </Section>
    </>
  )
}
