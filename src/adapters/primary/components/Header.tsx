'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/adapters/primary/components/ThemeToggle'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/contact', label: 'Contacto' },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
          aria-label="Taller Mogran - Inicio"
        >
          Taller<span className="text-amber-600 dark:text-amber-400">Mogran</span>
        </Link>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="h-6 w-6 fill-zinc-700 dark:fill-zinc-200" viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col border-b border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-black lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent`}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 lg:mt-0">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
