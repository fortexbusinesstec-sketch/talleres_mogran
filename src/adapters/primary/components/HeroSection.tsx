'use client'

import Link from 'next/link'
import { useIntersectionObserver } from '@/adapters/primary/hooks/useIntersectionObserver'

export function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent dark:from-amber-900/10" />

      <div className={`relative z-10 mx-auto max-w-4xl text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          +20 años de experiencia
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-zinc-50">
          Precisión Industrial{' '}
          <span className="text-amber-600 dark:text-amber-400">Hecha Realidad</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Mecanizado CNC, soldadura especializada y fabricación de piezas con los más altos estándares de calidad.
          Transformamos tus proyectos en soluciones precisas.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-amber-600 px-8 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
          >
            Solicitar Presupuesto
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 bg-white px-8 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-black"
          >
            Ver Servicios
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-black" />
    </section>
  )
}
