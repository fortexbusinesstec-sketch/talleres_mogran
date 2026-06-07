import type { AnalyticsEvent } from '@/domain/entities/AnalyticsEvent'

export interface AnalyticsPort {
  trackEvent(event: AnalyticsEvent): void
  trackPageView(path: string, title: string): void
  trackConversion(label: string, value?: number): void
}
