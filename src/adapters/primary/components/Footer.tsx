import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Taller Mogran
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Mecanizado de precisión, soldadura y fabricación industrial con más de 20 años de experiencia.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Enlaces
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Contacto
            </h3>
            <address className="space-y-1 text-sm not-italic text-zinc-600 dark:text-zinc-400">
              <p>info@tallermogran.com</p>
              <p>+34 XXX XXX XXX</p>
              <p>Polígono Industrial, Nave 7</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Taller Mogran. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
