import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const baseUrl = siteUrl.replace(/\/$/, '')
  
  // Static routes
  const routes = [
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
  
  return routes
}

