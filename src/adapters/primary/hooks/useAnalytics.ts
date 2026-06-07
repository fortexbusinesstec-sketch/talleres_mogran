'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { GTMAdapter } from '@/adapters/secondary/analytics/GTMAdapter'
import { AnalyticsService } from '@/domain/services/AnalyticsService'

let analyticsInstance: AnalyticsService | null = null

function getAnalytics(): AnalyticsService {
  if (!analyticsInstance && typeof window !== 'undefined') {
    const adapter = new GTMAdapter()
    analyticsInstance = new AnalyticsService(adapter)
  }
  return analyticsInstance!
}

export function useAnalytics() {
  const pathname = usePathname()
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      const analytics = getAnalytics()
      analytics.trackPageView(pathname, document.title)
      previousPath.current = pathname
    }
  }, [pathname])

  return { analytics: getAnalytics() }
}
