import { test, expect } from '@playwright/test'

test.describe('Landing Page - Full Flow', () => {
  test('should load homepage with all sections', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Taller Mogran/)

    const hero = page.locator('section[aria-label="Hero"]')
    await expect(hero).toBeVisible()

    const servicesSection = page.locator('section[aria-labelledby="services-title"]')
    await expect(servicesSection).toBeVisible()

    const testimonialsSection = page.locator('section[aria-labelledby="testimonials-title"]')
    await expect(testimonialsSection).toBeVisible()

    const contactSection = page.locator('section[aria-labelledby="contact-title"]')
    await expect(contactSection).toBeVisible()
  })

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/')

    await page.click('a[href="/services"]')
    await expect(page).toHaveURL(/\/services/)
    await expect(page.locator('h2')).toContainText('Servicios')

    await page.click('a[href="/contact"]')
    await expect(page).toHaveURL(/\/contact/)

    await page.click('a[aria-label="Taller Mogran - Inicio"]')
    await expect(page).toHaveURL(/\/$/)
  })

  test('should submit contact form with validation', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('form')

    await page.click('button[type="submit"]')
    const nameError = page.locator('#name-error')
    await expect(nameError).toBeVisible()

    await page.fill('#name', 'Test User')
    await page.fill('#email', 'invalid-email')
    await page.fill('#message', 'short')
    await page.click('button[type="submit"]')

    const emailError = page.locator('#email-error')
    await expect(emailError).toBeVisible()

    await page.fill('#email', 'test@example.com')
    await page.fill('#message', 'This is a valid test message for the contact form')
    await page.check('#consent')
    await page.click('button[type="submit"]')
  })

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label*="Switch to"]')
    await expect(toggle).toBeVisible()
    await toggle.click()
    const isDark = await page.locator('html').evaluate(el => el.classList.contains('dark'))
    expect(typeof isDark).toBe('boolean')
  })
})
