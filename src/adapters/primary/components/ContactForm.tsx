'use client'

import { useFormSubmission } from '@/adapters/primary/hooks/useFormSubmission'
import { useIntersectionObserver } from '@/adapters/primary/hooks/useIntersectionObserver'
import type { FormEvent } from 'react'

const services = [
  'Mecanizado CNC',
  'Soldadura',
  'Mantenimiento Industrial',
  'Fabricación de Piezas',
  'Otro',
]

export function ContactForm() {
  const { isLoading, errors, success, serverError, submitForm, resetForm } = useFormSubmission()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  const getFieldError = (field: string) => errors.find(e => e.field === field)?.message

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    await submitForm({
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      service: data.get('service') as string,
      message: data.get('message') as string,
      consent: data.get('consent') === 'on',
      source: 'contact_form',
    })
  }

  if (success) {
    return (
      <section ref={ref} className="py-24" aria-labelledby="contact-title">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl border border-green-200 bg-green-50 p-12 text-center dark:border-green-800 dark:bg-green-900/20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <svg className="mx-auto mb-4 h-12 w-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Mensaje Enviado</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Gracias por contactarnos. Te responderemos a la brevedad.</p>
            <button onClick={resetForm} className="mt-6 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-24" aria-labelledby="contact-title">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Contacto
          </span>
          <h2 id="contact-title" className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Solicita tu Presupuesto
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Cuéntanos tu proyecto y te enviaremos un presupuesto personalizado sin compromiso.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          noValidate
        >
          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400" role="alert">
              {serverError}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nombre completo *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-invalid={!!getFieldError('name')}
              aria-describedby={getFieldError('name') ? 'name-error' : undefined}
              className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                getFieldError('name')
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700'
                  : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-700'
              } bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2`}
              placeholder="Juan Pérez"
            />
            {getFieldError('name') && (
              <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{getFieldError('name')}</p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-invalid={!!getFieldError('email')}
                aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  getFieldError('email')
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700'
                    : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-700'
                } bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2`}
                placeholder="juan@ejemplo.com"
              />
              {getFieldError('email') && (
                <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{getFieldError('email')}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                aria-invalid={!!getFieldError('phone')}
                aria-describedby={getFieldError('phone') ? 'phone-error' : undefined}
                className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  getFieldError('phone')
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700'
                    : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-700'
                } bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2`}
                placeholder="+34 600 000 000"
              />
              {getFieldError('phone') && (
                <p id="phone-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{getFieldError('phone')}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Servicio de interés
            </label>
            <select
              id="service"
              name="service"
              className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-amber-400"
            >
              <option value="">Selecciona un servicio</option>
              {services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              aria-invalid={!!getFieldError('message')}
              aria-describedby={getFieldError('message') ? 'message-error' : undefined}
              className={`mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                getFieldError('message')
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700'
                  : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-700'
              } bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2`}
              placeholder="Describe tu proyecto o consulta..."
            />
            {getFieldError('message') && (
              <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{getFieldError('message')}</p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 dark:border-zinc-700"
            />
            <label htmlFor="consent" className="text-sm text-zinc-600 dark:text-zinc-400">
              He leído y acepto la{' '}
              <a href="/privacy" className="text-amber-600 underline hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                política de privacidad
              </a>
              {' '}*
            </label>
          </div>
          {getFieldError('consent') && (
            <p className="text-xs text-red-600 dark:text-red-400">{getFieldError('consent')}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-black"
          >
            {isLoading ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              'Enviar Mensaje'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
