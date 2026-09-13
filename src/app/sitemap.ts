import { MetadataRoute } from 'next'

import { getAllCoursesNew } from '@/server/actions/courses'
import { getNewsArticles } from '@/lib/news'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://edudubai.org'
  const baseUrl = siteUrl.replace(/\/$/, '')

  // 1. Fetch all dynamic courses
  const courses = await getAllCoursesNew()
  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 2. News articles
  const newsRoutes = getNewsArticles().map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // 3. Define static routes
  const staticRoutes = [
    '',
    '/courses',
    '/corporate-training',
    '/about',
    '/contact',
    '/become-a-trainer',
    '/news',
    '/events',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...staticRoutes, ...courseRoutes, ...newsRoutes]
}

