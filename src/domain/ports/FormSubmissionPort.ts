import type { Lead } from '@/domain/entities/Lead'

export type FormResult = { success: true; id: string } | { success: false; error: string }

export interface FormSubmissionPort {
  submitLead(lead: Lead): Promise<FormResult>
}
