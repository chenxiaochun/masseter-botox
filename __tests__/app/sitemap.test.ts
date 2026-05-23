import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('includes /masseter/guide', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/guide'))).toBe(true)
  })

  it('includes /masseter/cost', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/cost'))).toBe(true)
  })

  it('includes /masseter/units', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/units'))).toBe(true)
  })

  it('includes /masseter/before-after', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/before-after'))).toBe(true)
  })

  it('includes /masseter/recovery', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/recovery'))).toBe(true)
  })

  it('includes /masseter/bruxism', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/masseter/bruxism'))).toBe(true)
  })

  it('does not use yourdomain.com placeholder', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls.some((u) => u.includes('yourdomain.com'))).toBe(false)
  })
})
