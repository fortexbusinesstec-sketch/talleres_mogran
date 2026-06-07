'use client'

import type { ReactNode } from 'react'
import { useIntersectionObserver } from '@/adapters/primary/hooks/useIntersectionObserver'

interface HexGridProps {
  children: ReactNode
  className?: string
}

interface HexCellProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function HexCell({ children, delay = 0, className = '' }: HexCellProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`hex-cell ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}ms` } as React.CSSProperties}
    >
      <div className="hex-inner">
        {children}
      </div>
    </div>
  )
}

export function HexGrid({ children, className = '' }: HexGridProps) {
  return (
    <div className={`hex-grid ${className}`}>
      {children}
    </div>
  )
}
