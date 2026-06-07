import type { Lead } from '@/domain/entities/Lead'
import { Email } from '@/domain/value-objects/Email'
import { Phone } from '@/domain/value-objects/Phone'

export interface ValidationError {
  field: string
  message: string
}

export class FormValidationService {
  validateLead(data: Partial<Lead>): ValidationError[] {
    const errors: ValidationError[] = []

    if (!data.name || data.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters' })
    }

    if (!data.email) {
      errors.push({ field: 'email', message: 'Email is required' })
    } else if (!Email.isValid(data.email)) {
      errors.push({ field: 'email', message: 'Invalid email format' })
    }

    if (data.phone && !Phone.isValid(data.phone)) {
      errors.push({ field: 'phone', message: 'Invalid phone format' })
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.push({ field: 'message', message: 'Message must be at least 10 characters' })
    }

    if (!data.consent) {
      errors.push({ field: 'consent', message: 'You must accept the privacy policy' })
    }

    return errors
  }

  isValid(data: Partial<Lead>): boolean {
    return this.validateLead(data).length === 0
  }
}
