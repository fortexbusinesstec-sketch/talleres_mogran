import type { Metadata } from 'next'
import { AudienceSection } from '@/components/sections/AudienceSection'
import { MethodSection } from '@/components/sections/MethodSection'

export const metadata: Metadata = {
  title: 'Cursos y Talleres',
  description: 'Talleres de oratoria en Lima para niños, adolescentes, jóvenes y adultos. Modalidad presencial y virtual. Grupos reducidos.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Cursos y Talleres de Oratoria - Talleres Mogran',
    description: 'Talleres de oratoria en Lima para todas las edades. Presencial y virtual.',
  },
}

export default function ServicesPage() {
  return (
    <div className="pt-8">
      <div className="container-section text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-mogran-dark-text mb-4">
          Cursos y Talleres de Oratoria
        </h1>
        <p className="text-lg text-mogran-dark-text-secondary max-w-2xl mx-auto">
          Programas diseñados para cada etapa de la vida. Presencial en Lince o virtual en vivo.
        </p>
      </div>
      <AudienceSection />
      <MethodSection />
    </div>
  )
}
