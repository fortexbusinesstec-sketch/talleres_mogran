import type { ReactNode } from 'react'
import { MockCMSAdapter } from '@/adapters/secondary/cms/MockCMSAdapter'
import { HexGrid, HexCell } from '@/adapters/primary/components/HexGrid'

const cms = new MockCMSAdapter()

const iconMap: Record<string, ReactNode> = {
  settings: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  bolt: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  build: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M11.42 15.17l-5.3 5.3a2.12 2.12 0 01-3-3l5.3-5.3m-2.83-6.36a2.12 2.12 0 013-3L14.7 8.7m-1.89 3.26a6 6 0 017.29-1.29l-2.87 2.88 1.07 1.08 2.88-2.88a6 6 0 01-1.29 7.29m-3.96-3.96l-5.3 5.3" />
    </svg>
  ),
  precision_manufacturing: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
}

export async function ServicesSection() {
  const services = await cms.getServices()

  return (
    <section className="py-24" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Qué Hacemos
          </span>
          <h2 id="services-title" className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Ofrecemos soluciones integrales de mecanizado y fabricación industrial con la más alta precisión.
          </p>
        </div>

        <HexGrid className="mx-auto max-w-5xl">
          {services.map((service, index) => (
            <HexCell key={service.id} delay={index * 100}>
              <article className="flex h-full flex-col items-center text-center p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  {iconMap[service.icon] || iconMap.settings}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <ul className="mt-auto space-y-1.5 text-left">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                      <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </HexCell>
          ))}
        </HexGrid>
      </div>
    </section>
  )
}
