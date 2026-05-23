import type { MetadataRoute } from 'next'

const BASE_URL = 'https://seoer.vercel.app'
const SPOKE_DATE = new Date('2026-05-23')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/masseter`,              lastModified: new Date(),   changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/masseter/guide`,         lastModified: SPOKE_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/cost`,          lastModified: SPOKE_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/units`,         lastModified: SPOKE_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/before-after`,  lastModified: SPOKE_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/recovery`,      lastModified: SPOKE_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/masseter/bruxism`,       lastModified: SPOKE_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`,                  lastModified: SPOKE_DATE, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/privacy`,                lastModified: SPOKE_DATE, changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
