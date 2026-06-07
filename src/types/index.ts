export interface ScheduleItem {
  publico: string;
  dias: string;
  horaInicio: string;
  horaFin: string;
  modalidad: 'virtual' | 'presencial';
  cuposDisponibles: number;
}

export interface Testimonial {
  id: string;
  nombre: string;
  edad: string;
  curso: string;
  texto: string;
  fotoUrl?: string;
}

export interface Promotion {
  id: string;
  titulo: string;
  subtitulo: string;
  imagenUrl: string;
  ctaTexto: string;
  ctaLink: string;
  activa: boolean;
  fechaExpiracion: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PaymentMethod {
  tipo: string;
  detalles: string[];
}

export interface CourseAudience {
  id: 'ninos' | 'adolescentes' | 'jovenes' | 'adultos';
  label: string;
  edad: string;
  descripcion: string;
  badge: string;
}

export interface Professor {
  nombre: string;
  bio: string;
  foto: string;
  tiktok: string;
  experiencia: string;
}

export interface VideoEmbedProps {
  src: string;
  alt: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  transcript?: string;
}