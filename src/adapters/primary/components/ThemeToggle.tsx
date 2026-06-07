'use client'

import { useTheme } from '@/adapters/primary/hooks/useTheme'

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        className="h-5 w-5 fill-zinc-700 dark:fill-zinc-200"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {resolvedTheme === 'dark' ? (
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        )}
      </svg>
    </button>
  )
}
