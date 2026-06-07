import type { SEOData } from '@/domain/entities/SEOData'

export interface SEODataPort {
  getSEOData(path: string): Promise<SEOData>
  getDefaultSEOData(): SEOData
}
