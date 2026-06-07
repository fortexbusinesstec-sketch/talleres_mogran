export type EventCategory = 'engagement' | 'conversion' | 'navigation' | 'form' | 'error'

export interface AnalyticsEvent {
  name: string
  category: EventCategory
  label?: string
  value?: number
  metadata?: Record<string, string | number | boolean>
  timestamp: Date
}
