import { MetadataRoute } from 'next'

import { getAllCoursesNew } from '@/server/actions/courses'

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

  // 2. Define static routes
  const staticRoutes = [
    '',
    '/courses',
    '/certifications',
    '/corporate-training',
    '/about',
    '/contact',
    '/become-a-trainer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...staticRoutes, ...courseRoutes]
}

