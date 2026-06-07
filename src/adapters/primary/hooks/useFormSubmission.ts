'use client'

import { useState, useCallback } from 'react'
import type { Lead } from '@/domain/entities/Lead'
import { FormValidationService } from '@/domain/services/FormValidationService'
import type { ValidationError } from '@/domain/services/FormValidationService'
import { APIFormAdapter } from '@/adapters/secondary/forms/APIFormAdapter'
import { LeadService } from '@/domain/services/LeadService'
import { GTMAdapter } from '@/adapters/secondary/analytics/GTMAdapter'
import { AnalyticsService } from '@/domain/services/AnalyticsService'

interface FormState {
  isLoading: boolean
  errors: ValidationError[]
  success: boolean
  serverError: string | null
}

const initialFormState: FormState = {
  isLoading: false,
  errors: [],
  success: false,
  serverError: null,
}

function createLeadService(): LeadService {
  const adapter = new APIFormAdapter('/api/leads')
  const analytics = new AnalyticsService(new GTMAdapter())
  return new LeadService(adapter, analytics)
}

export function useFormSubmission() {
  const [state, setState] = useState<FormState>(initialFormState)

  const submitForm = useCallback(async (data: Partial<Lead>) => {
    setState(prev => ({ ...prev, isLoading: true, errors: [], serverError: null }))

    const validation = new FormValidationService()
    const errors = validation.validateLead(data)

    if (errors.length > 0) {
      setState(prev => ({ ...prev, isLoading: false, errors }))
      return
    }

    try {
      const leadService = createLeadService()
      const result = await leadService.submitLead(data)
      if (result.success) {
        setState({ isLoading: false, errors: [], success: true, serverError: null })
      } else {
        setState(prev => ({ ...prev, isLoading: false, serverError: result.error }))
      }
    } catch {
      setState(prev => ({
        ...prev,
        isLoading: false,
        serverError: 'An unexpected error occurred. Please try again.',
      }))
    }
  }, [])

  const resetForm = useCallback(() => {
    setState(initialFormState)
  }, [])

  return { ...state, submitForm, resetForm }
}
