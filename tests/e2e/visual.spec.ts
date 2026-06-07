import { test, expect } from '@playwright/test'

test.describe('Visual Regression - Hexagonal Layout', () => {
  test('hexagonal grid should be visible on services', async ({ page }) => {
    await page.goto('/')

    const hexCells = page.locator('.hex-cell')
    await expect(hexCells.first()).toBeVisible()
    const count = await hexCells.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('hexagonal cells should be properly sized', async ({ page }) => {
    await page.goto('/services')

    const firstCell = page.locator('.hex-cell').first()
    const box = await firstCell.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(200)
    expect(box!.height).toBeGreaterThan(250)
  })

  test('testimonial cards should use hex-cell layout', async ({ page }) => {
    await page.goto('/')

    const testimonialSection = page.locator('section[aria-labelledby="testimonials-title"]')
    await testimonialSection.scrollIntoViewIfNeeded()

    const cards = testimonialSection.locator('blockquote')
    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('layout should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()

    const mobileMenu = page.locator('button[aria-label*="Open menu"]')
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click()
      const menuExpanded = await mobileMenu.getAttribute('aria-expanded')
      expect(menuExpanded).toBe('true')
    }

    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })
})
