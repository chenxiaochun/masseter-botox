import type { MetadataRoute } from 'next'

// Update BASE_URL after registering your domain
const BASE_URL = 'https://yourdomain.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
