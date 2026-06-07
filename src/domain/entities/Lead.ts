export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  source: string
  createdAt?: Date
  consent: boolean
}
