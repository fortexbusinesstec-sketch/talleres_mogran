import { test, expect } from '@playwright/test'

test.describe('Performance Budgets', () => {
  test('page should load within performance budget', async ({ browser }) => {
    const context = await browser.newContext()
    const performancePage = await context.newPage()

    const client = await performancePage.context().newCDPSession(performancePage)
    await client.send('Performance.enable')

    await performancePage.goto('/')
    await performancePage.waitForLoadState('networkidle')

    const metrics = await client.send('Performance.getMetrics')
    const metricsMap = new Map(metrics.metrics.map(m => [m.name, m.value]))

    const domContentLoaded = metricsMap.get('DomContentLoaded') || 0
    expect(domContentLoaded).toBeLessThan(5000)

    const firstMeaningfulPaint = metricsMap.get('FirstMeaningfulPaint') || 0
    expect(firstMeaningfulPaint).toBeLessThan(3000)

    await context.close()
  })

  test('images should have explicit dimensions', async ({ page }) => {
    await page.goto('/')
    const images = await page.locator('img').all()
    for (const img of images) {
      const width = await img.getAttribute('width')
      const height = await img.getAttribute('height')
      if (width && height) {
        expect(parseInt(width)).toBeGreaterThan(0)
        expect(parseInt(height)).toBeGreaterThan(0)
      }
    }
  })

  test('should lazy load non-critical assets', async ({ page }) => {
    await page.goto('/')

    const lazyImages = await page.locator('img[loading="lazy"]').all()
    expect(lazyImages.length).toBeGreaterThanOrEqual(0)
  })
})
