import type { MetadataRoute } from 'next'

// Update BASE_URL after registering your domain
const BASE_URL = 'https://yourdomain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/masseter`, lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.3 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.2 },
  ]
}
