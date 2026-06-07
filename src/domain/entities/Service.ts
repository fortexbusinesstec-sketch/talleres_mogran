export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  order: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}
