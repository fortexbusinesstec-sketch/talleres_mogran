import type { AnalyticsPort } from '@/domain/ports/AnalyticsPort'
import type { AnalyticsEvent } from '@/domain/entities/AnalyticsEvent'

export class AnalyticsService {
  constructor(private readonly port: AnalyticsPort) {}

  trackPageView(path: string, title: string): void {
    this.port.trackPageView(path, title)
  }

  trackFormSubmission(formName: string): void {
    const event: AnalyticsEvent = {
      name: 'form_submission',
      category: 'conversion',
      label: formName,
      timestamp: new Date(),
      metadata: { formName },
    }
    this.port.trackEvent(event)
  }

  trackNavigation(from: string, to: string): void {
    const event: AnalyticsEvent = {
      name: 'navigation',
      category: 'navigation',
      label: `${from} → ${to}`,
      timestamp: new Date(),
      metadata: { from, to },
    }
    this.port.trackEvent(event)
  }

  trackError(errorLabel: string, errorData?: Record<string, string | number | boolean>): void {
    const event: AnalyticsEvent = {
      name: 'error',
      category: 'error',
      label: errorLabel,
      timestamp: new Date(),
      metadata: errorData,
    }
    this.port.trackEvent(event)
  }

  trackEngagement(action: string, label?: string): void {
    const event: AnalyticsEvent = {
      name: action,
      category: 'engagement',
      label,
      timestamp: new Date(),
    }
    this.port.trackEvent(event)
  }
}
