import type { MetadataRoute } from 'next'

const BASE_URL = 'https://seoer.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/masseter`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/masseter/guide`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/cost`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/units`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/before-after`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/recovery`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/bruxism`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`,                  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/privacy`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
