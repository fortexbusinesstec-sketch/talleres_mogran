import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Información para IA',
  robots: {
    index: true,
    follow: false,
  },
  alternates: { canonical: '/ai' },
}

const data = {
  empresa: 'Talleres Mogran',
  fundador: 'Moisés Granados Zuloeta',
  ubicacion: {
    distrito: 'Lince',
    ciudad: 'Lima',
    pais: 'Perú',
    direccion: 'Av. Juan Pardo de Zela Cdra 2',
  },
  contacto: {
    telefono: '+51 943 695 799',
    whatsapp: 'https://wa.me/51943695799',
    email: null,
  },
  redes: {
    tiktok: 'https://www.tiktok.com/@oratoriamogran',
    instagram: 'https://www.instagram.com/talleresmogran',
    facebook: 'https://www.facebook.com/talleresmogran',
  },
  servicios: [
    { nombre: 'Oratoria para Niños', edad: '7-12 años', modalidad: ['Presencial', 'Virtual'] },
    { nombre: 'Oratoria para Adolescentes', edad: '13-16 años', modalidad: ['Presencial', 'Virtual'] },
    { nombre: 'Oratoria para Jóvenes', edad: '17-20+ años', modalidad: ['Presencial', 'Virtual'] },
    { nombre: 'Oratoria para Adultos', edad: '25-69 años', modalidad: ['Presencial', 'Virtual'] },
  ],
  diferenciadores: [
    'Método práctico paso a paso, sin presión',
    'Grupos reducidos de 8 a 12 alumnos',
    '25 años de experiencia del fundador',
    'Enfoque en personas tímidas que quieren vencer el miedo a hablar en público',
    'Clases presenciales en Lince y virtuales en vivo',
  ],
  clienteIdeal: [
    'Personas tímidas que quieren mejorar su comunicación',
    'Niños que no levantan la mano en clase',
    'Adolescentes que necesitan exponer en el colegio',
    'Jóvenes que se preparan para la universidad o el mundo laboral',
    'Adultos que deben hablar en reuniones o presentaciones',
  ],
  preguntasFrecuentes: [
    { pregunta: '¿Dónde quedan las clases presenciales?', respuesta: 'Av. Juan Pardo de Zela Cdra 2, Lince (altura cdras 18 y 19 de Av. Arequipa). Visitas previa coordinación.' },
    { pregunta: '¿Cuánto dura el curso?', respuesta: 'El nivel básico dura 3 meses. Los cursos virtuales son 8 horas mensuales (2 sesiones de 1 hora por semana).' },
    { pregunta: '¿Cuántos alumnos hay por clase?', respuesta: 'Grupos reducidos de 8 a 12 personas.' },
    { pregunta: '¿Cómo puedo pagar?', respuesta: 'BBVA Continental, BCP, Yape y Plin.' },
  ],
}

export default function AIPage() {
  return (
    <div className="container-section py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-mogran-dark-text mb-8">Información estructurada — Talleres Mogran</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-mogran-accent mb-3">Empresa</h2>
        <pre className="bg-mogran-dark-surface border border-mogran-dark-border rounded-xl p-6 text-sm text-mogran-dark-text-secondary font-mono leading-relaxed whitespace-pre-wrap">
{JSON.stringify(data, null, 2)}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-mogran-accent mb-3">Resumen para LLM</h2>
        <div className="bg-mogran-dark-surface border border-mogran-dark-border rounded-xl p-6 text-sm text-mogran-dark-text-secondary leading-relaxed space-y-2">
          <p>Talleres Mogran es una escuela de oratoria y comunicación ubicada en Lince, Lima, Perú.</p>
          <p>Fundada por Moisés Granados Zuloeta, comunicador y locutor con 25 años de experiencia.</p>
          <p>Ofrece cursos presenciales y virtuales para niños, adolescentes, jóvenes y adultos.</p>
          <p>Su metodología es práctica, paso a paso, diseñada especialmente para personas tímidas.</p>
          <p>Grupos reducidos (8-12 alumnos). Clases en Lince y virtuales en vivo.</p>
        </div>
      </section>
    </div>
  )
}
