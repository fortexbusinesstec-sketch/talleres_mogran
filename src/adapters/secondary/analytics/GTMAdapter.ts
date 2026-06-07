import type { AnalyticsPort } from '@/domain/ports/AnalyticsPort'
import type { AnalyticsEvent } from '@/domain/entities/AnalyticsEvent'

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export class GTMAdapter implements AnalyticsPort {
  private dataLayer: unknown[]

  constructor() {
    this.dataLayer = typeof window !== 'undefined' ? window.dataLayer || [] : []
    if (typeof window !== 'undefined') {
      window.dataLayer = this.dataLayer
    }
  }

  trackEvent(event: AnalyticsEvent): void {
    this.push({
      event: event.name,
      eventCategory: event.category,
      eventLabel: event.label,
      eventValue: event.value,
      ...event.metadata,
      timestamp: event.timestamp.toISOString(),
    })
  }

  trackPageView(path: string, title: string): void {
    this.push({
      event: 'page_view',
      page: { path, title },
      timestamp: new Date().toISOString(),
    })
  }

  trackConversion(label: string, value?: number): void {
    this.push({
      event: 'conversion',
      eventCategory: 'conversion',
      eventLabel: label,
      eventValue: value,
      timestamp: new Date().toISOString(),
    })
  }

  private push(data: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      this.dataLayer.push(data)
    }
  }
}
