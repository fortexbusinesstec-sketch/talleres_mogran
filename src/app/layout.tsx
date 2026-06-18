import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import { SchemaOrg } from '@/components/seo/SchemaOrg';
import { CourseAudience, FAQItem, Professor } from '@/types';
import './globals.css';

const fredoka = Fredoka({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

// Fredoka One is deprecated/merged into Fredoka (weight 700) in Google Fonts.
// We reuse the same Fredoka instance with weight 700 as the heading variable.
const fredokaHeading = Fredoka({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://talleresmogran.com'),
  title: {
    template: '%s | Talleres Mogran',
    default: 'Talleres de Oratoria para Personas Tímidas | Mogran',
  },
  description:
    'Cursos de oratoria en Lima para niños, adolescentes y adultos que sienten miedo al hablar en público. Método práctico, paso a paso, sin presión.',
  keywords: [
    'oratoria para tímidos',
    'miedo escénico',
    'taller de oratoria Lima',
    'comunicación efectiva',
    'superar timidez niños',
    'hablar en público ansiedad',
    'cursos oratoria adultos',
  ],
  authors: [{ name: 'Moisés Granados Zuloeta' }],
  creator: 'Moisés Granados Zuloeta',
  publisher: 'Talleres Mogran',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: 'Talleres Mogran',
    title: 'Talleres de Oratoria para Personas Tímidas | Mogran',
    description:
      'Encontrá tu voz a tu propio ritmo. Cursos presenciales y virtuales en Lima.',
    images: [
      {
        url: '/images/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Talleres Mogran - Oratoria para personas tímidas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@profesormoises',
    creator: '@profesormoises',
    title: 'Talleres de Oratoria para Personas Tímidas | Mogran',
    description:
      'Encontrá tu voz a tu propio ritmo. Cursos presenciales y virtuales en Lima.',
    images: ['/images/og/home.jpg'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-PE': '/',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const audiences: CourseAudience[] = [
  {
    id: 'ninos',
    label: 'Niños',
    edad: '7 a 12 años',
    descripcion:
      'Juegos teatrales, expresión corporal y lectura en voz alta para que puedan presentar un trabajo escolar sin temblar.',
    badge: 'Presencial y Virtual',
  },
  {
    id: 'adolescentes',
    label: 'Adolescentes',
    edad: '13 a 16 años',
    descripcion:
      'Dinámicas de grupo, lectura crítica y presentaciones cortas que preparan para exámenes orales.',
    badge: 'Presencial y Virtual',
  },
  {
    id: 'jovenes',
    label: 'Jóvenes',
    edad: '17 a 20+ años',
    descripcion:
      'Oratoria aplicada a contextos académicos y profesionales: defensas de tesis, exposiciones, entrevistas.',
    badge: 'Presencial y Virtual',
  },
  {
    id: 'adultos',
    label: 'Adultos',
    edad: '25 a 69 años',
    descripcion:
      'Técnicas para reuniones de trabajo, presentaciones ejecutivas y conversaciones difíciles.',
    badge: 'Presencial y Virtual',
  },
];

const faqs: FAQItem[] = [
  {
    question: '¿Dónde se dictan las clases presenciales?',
    answer:
      'En nuestra única sede de Lince, Av. Juan Pardo de Zela Cdra 2 (altura cuadras 18 y 19 de Av. Arequipa). Las visitas son previa coordinación.',
  },
  {
    question: '¿A quiénes está dirigido el curso?',
    answer:
      'A niños de 7 a 12 años, adolescentes de 13 a 16, jóvenes de 17 a 24, y adultos de 25 a 69 años. Cada grupo tiene dinámicas adaptadas a su edad.',
  },
  {
    question: '¿Cuántos alumnos son por clase?',
    answer:
      'Grupos reducidos de 8 a 12 personas. En virtual, mantenemos el mismo límite para que cada alumno pueda participar.',
  },
  {
    question: '¿Cuánto dura el curso?',
    answer:
      'Los cursos virtuales son de 8 horas mensuales (2 sesiones de 1 hora por semana). Los presenciales varían: 8 horas mensuales para niños y adolescentes, y 12 horas mensuales para adultos (3 horas por semana).',
  },
  {
    question: '¿Cómo puedo pagar?',
    answer:
      'Aceptamos transferencia bancaria (BBVA Continental y BCP), Yape y Plin. Los datos completos de las cuentas se proporcionan al momento de la inscripción.',
  },
];

const professor: Professor = {
  nombre: 'Moisés Granados Zuloeta',
  bio: 'Comunicador, locutor y formador con 25 años de experiencia ayudando a personas tímidas a encontrar su voz.',
  foto: 'https://talleresmogran.com/images/profesor-moises.jpg',
  tiktok: 'https://www.tiktok.com/@profesormoises',
  experiencia: '25 años',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${fredokaHeading.variable} h-full antialiased`}>
      <head>
        <SchemaOrg
          courses={audiences}
          faqs={faqs}
          professor={professor}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-mogran-neutral">
        {children}
      </body>
    </html>
  );
}
