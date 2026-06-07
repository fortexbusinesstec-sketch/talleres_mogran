import { test, expect } from '@playwright/test'

test.describe('SEO Validation', () => {
  test('should have correct meta tags on homepage', async ({ page }) => {
    await page.goto('/')

    const title = await page.title()
    expect(title).toContain('Taller Mogran')

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(10)

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBeTruthy()

    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    expect(robots).toContain('index')
  })

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/')

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toBeTruthy()

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(ogDescription).toBeTruthy()

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    expect(ogUrl).toBeTruthy()

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content')
    expect(ogType).toBeTruthy()
  })

  test('should have Twitter Card tags', async ({ page }) => {
    await page.goto('/')

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content')
    expect(twitterCard).toBeTruthy()

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content')
    expect(twitterTitle).toBeTruthy()
  })

  test('should have JSON-LD structured data', async ({ page }) => {
    await page.goto('/')

    const scripts = await page.locator('script[type="application/ld+json"]').all()
    expect(scripts.length).toBeGreaterThanOrEqual(2)

    const firstScript = await scripts[0].textContent()
    const parsed = JSON.parse(firstScript!)
    expect(parsed['@context']).toBe('https://schema.org')
  })

  test('should have valid sitemap and robots.txt', async ({ request }) => {
    const sitemapResponse = await request.get('/sitemap.xml')
    expect(sitemapResponse.status()).toBe(200)
    const sitemapText = await sitemapResponse.text()
    expect(sitemapText).toContain('urlset')
    expect(sitemapText).toContain('tallermogran.com')

    const robotsResponse = await request.get('/robots.txt')
    expect(robotsResponse.status()).toBe(200)
    const robotsText = await robotsResponse.text()
    expect(robotsText).toContain('Sitemap')
  })

  test('should have correct meta tags on services page', async ({ page }) => {
    await page.goto('/services')

    const title = await page.title()
    expect(title).toContain('Servicios')

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toContain('/services')
  })

  test('should have correct meta tags on contact page', async ({ page }) => {
    await page.goto('/contact')

    const title = await page.title()
    expect(title).toContain('Contacto')

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toContain('/contact')
  })
})
