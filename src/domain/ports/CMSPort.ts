import type { Service, Testimonial } from '@/domain/entities/Service'

export interface CMSPort {
  getServices(): Promise<Service[]>
  getTestimonials(): Promise<Testimonial[]>
  getPageContent(slug: string): Promise<Record<string, unknown>>
}
