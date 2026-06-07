import type { CMSPort } from '@/domain/ports/CMSPort'
import type { Service, Testimonial } from '@/domain/entities/Service'

const services: Service[] = [
  {
    id: 'cnc-machining',
    title: 'Mecanizado CNC',
    description: 'Mecanizado de alta precisión con tornos y fresadoras CNC de última generación.',
    icon: 'settings',
    features: [
      'Torneado CNC hasta 500mm diámetro',
      'Fresado CNC 3 y 5 ejes',
      'Tolerancias ±0.01mm',
      'Materiales: acero, aluminio, titanio, plásticos técnicos',
    ],
    order: 1,
  },
  {
    id: 'welding',
    title: 'Soldadura Especializada',
    description: 'Soldadura TIG, MIG/MAG y electrodo para todo tipo de proyectos.',
    icon: 'bolt',
    features: [
      'Soldadura TIG aluminio y acero inoxidable',
      'Soldadura MIG/MAG estructural',
      'Soldadura por puntos',
      'Certificación de soldadores',
    ],
    order: 2,
  },
  {
    id: 'industrial-maintenance',
    title: 'Mantenimiento Industrial',
    description: 'Servicios de mantenimiento preventivo y correctivo para maquinaria industrial.',
    icon: 'build',
    features: [
      'Mantenimiento preventivo programado',
      'Reparación de emergencia 24/7',
      'Diagnóstico y optimización',
      'Repuestos originales',
    ],
    order: 3,
  },
  {
    id: 'fabrication',
    title: 'Fabricación de Piezas',
    description: 'Fabricación de piezas personalizadas bajo plano o muestra.',
    icon: 'precision_manufacturing',
    features: [
      'Fabricación bajo plano',
      'Prototipado rápido',
      'Series pequeñas y medianas',
      'Control de calidad dimensional',
    ],
    order: 4,
  },
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Martínez',
    role: 'Director de Operaciones',
    company: 'Industrias del Metal SL',
    content: 'La precisión y calidad del mecanizado CNC de Taller Mogran superó nuestras expectativas. Entregas puntuales y excelente comunicación.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Ana García',
    role: 'Ingeniera de Proyectos',
    company: 'Maquinaria Avanzada SA',
    content: 'Llevamos 3 años trabajando con ellos para nuestras piezas críticas. La consistencia en la calidad es excepcional.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Miguel Rodríguez',
    role: 'CEO',
    company: 'Talleres del Norte',
    content: 'Resolvieron una avería urgente en menos de 24 horas. Su servicio de mantenimiento es inmejorable.',
    rating: 4,
  },
]

export class MockCMSAdapter implements CMSPort {
  async getServices(): Promise<Service[]> {
    return services.sort((a, b) => a.order - b.order)
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials
  }

  async getPageContent(slug: string): Promise<Record<string, unknown>> {
    const content: Record<string, Record<string, unknown>> = {
      home: { hero: { title: 'Precisión Industrial', subtitle: 'Mecanizado y soldadura de alta calidad' } },
      services: { title: 'Nuestros Servicios', services },
      contact: { title: 'Contacto', email: 'info@tallermogran.com', phone: '+34 XXX XXX XXX' },
    }
    return content[slug] || {}
  }
}
