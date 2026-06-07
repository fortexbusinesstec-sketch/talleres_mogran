import type { Metadata } from 'next'
import { IconBrandWhatsapp, IconMapPin, IconPhone, IconMail } from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Comunicate con Talleres Mogran. Estamos en Lince, Lima. Escríbenos por WhatsApp o llámanos para coordinar tu visita.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contacto - Talleres Mogran',
    description: 'Comunicate con nosotros. WhatsApp, teléfono y dirección en Lince.',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-8">
      <section className="container-section py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-mogran-dark-text text-center mb-12">
          Contacto
        </h1>

        <div className="max-w-2xl mx-auto grid gap-6">
          <a
            href="https://wa.me/51943695799?text=Hola%20Mogran%2C%20me%20interesa%20el%20taller%20de%20oratoria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-mogran-dark-surface border border-mogran-dark-border rounded-2xl p-6 hover:border-mogran-accent/30 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-mogran-accent/20 flex items-center justify-center flex-shrink-0">
              <IconBrandWhatsapp size={24} className="text-mogran-accent" />
            </div>
            <div>
              <p className="font-semibold text-mogran-dark-text">WhatsApp</p>
              <p className="text-sm text-mogran-dark-text-secondary">+51 943 695 799</p>
            </div>
          </a>

          <div className="flex items-center gap-4 bg-mogran-dark-surface border border-mogran-dark-border rounded-2xl p-6">
            <div className="w-12 h-12 rounded-full bg-mogran-accent/20 flex items-center justify-center flex-shrink-0">
              <IconMapPin size={24} className="text-mogran-accent" />
            </div>
            <div>
              <p className="font-semibold text-mogran-dark-text">Dirección</p>
              <p className="text-sm text-mogran-dark-text-secondary">
                Av. Juan Pardo de Zela Cdra 2, Lince, Lima
              </p>
              <p className="text-xs text-mogran-dark-text-muted">Visitas previa coordinación</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
