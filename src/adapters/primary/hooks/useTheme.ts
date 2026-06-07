'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

function subscribeToTheme(callback: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)
  const systemTheme = useSyncExternalStore(subscribeToTheme, getSystemTheme, () => 'light' as const)
  function getResolvedTheme(): 'light' | 'dark' {
    if (theme === 'system') return systemTheme
    if (theme === 'light' || theme === 'dark') return theme
    return 'light'
  }
  const resolvedTheme = getResolvedTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return { theme, resolvedTheme, setTheme, toggleTheme }
}
