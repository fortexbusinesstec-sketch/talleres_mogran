import type { Lead } from '@/domain/entities/Lead'
import type { FormSubmissionPort, FormResult } from '@/domain/ports/FormSubmissionPort'
import { FormValidationService } from '@/domain/services/FormValidationService'
import type { AnalyticsService } from '@/domain/services/AnalyticsService'

export class LeadService {
  constructor(
    private readonly formSubmissionPort: FormSubmissionPort,
    private readonly analyticsService: AnalyticsService,
    private readonly validationService: FormValidationService = new FormValidationService()
  ) {}

  async submitLead(data: Partial<Lead>): Promise<FormResult> {
    const errors = this.validationService.validateLead(data)
    if (errors.length > 0) {
      const errorMessages = errors.map(e => e.message).join(', ')
      this.analyticsService.trackError('form_validation', {
        errors: errorMessages,
      })
      return { success: false, error: errorMessages }
    }

    const lead: Lead = {
      ...data as Lead,
      createdAt: new Date(),
      source: data.source || 'landing_page',
    }

    try {
      const result = await this.formSubmissionPort.submitLead(lead)
      if (result.success) {
        this.analyticsService.trackFormSubmission(data.source || 'landing_page')
      }
      return result
    } catch (error) {
      this.analyticsService.trackError('form_submission', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      return { success: false, error: 'Failed to submit lead. Please try again.' }
    }
  }
}
