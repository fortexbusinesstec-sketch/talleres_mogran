'use client'

import { useIntersectionObserver } from '@/adapters/primary/hooks/useIntersectionObserver'
import { useEffect, useState } from 'react'

interface StatItemProps {
  end: number
  suffix?: string
  label: string
  delay?: number
}

function AnimatedNumber({ end, suffix = '', label, delay = 0 }: StatItemProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const timeout = setTimeout(() => {
      const duration = 2000
      const steps = 30
      const increment = end / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [isVisible, end, delay])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold tracking-tight text-amber-600 dark:text-amber-400 sm:text-4xl">
        {count}{suffix}
      </div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <AnimatedNumber end={20} suffix="+" label="Años de Experiencia" />
          <AnimatedNumber end={500} suffix="+" label="Proyectos Realizados" delay={100} />
          <AnimatedNumber end={150} suffix="+" label="Clientes Satisfechos" delay={200} />
          <AnimatedNumber end={99} suffix="%" label="Precisión Garantizada" delay={300} />
        </div>
      </div>
    </section>
  )
}
