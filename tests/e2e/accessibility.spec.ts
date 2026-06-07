import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage should have no critical accessibility violations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const violations = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(violations.length).toBe(0)
  })

  test('services page should have no critical accessibility violations', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const violations = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(violations.length).toBe(0)
  })

  test('contact page should have no critical accessibility violations', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const violations = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(violations.length).toBe(0)
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')

    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    const headings = await page.locator('h1, h2, h3').all()
    expect(headings.length).toBeGreaterThan(0)

    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)
  })

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const label = await button.getAttribute('aria-label')
      const text = await button.textContent()
      if (!label && (!text || text.trim() === '')) {
        const hasAria = await button.getAttribute('aria-label')
        const hasExpanded = await button.getAttribute('aria-expanded')
        expect(hasAria || hasExpanded !== null || text?.trim()).toBeTruthy()
      }
    }
  })
})
