import type { FormSubmissionPort, FormResult } from '@/domain/ports/FormSubmissionPort'
import type { Lead } from '@/domain/entities/Lead'

export class APIFormAdapter implements FormSubmissionPort {
  constructor(private readonly endpoint: string) {}

  async submitLead(lead: Lead): Promise<FormResult> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
          success: false,
          error: errorData.message || `Server error: ${response.status}`,
        }
      }

      const data = await response.json()
      return { success: true, id: data.id || crypto.randomUUID() }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }
}
