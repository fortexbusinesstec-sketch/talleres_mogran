import { FAQItem, CourseAudience, Professor, Testimonial } from '@/types';

const baseUrl = 'https://talleresmogran.com';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Talleres Mogran',
  description: 'Cursos y talleres de oratoria para personas tímidas en Lima',
  url: baseUrl,
  telephone: '+51-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Juan Pardo de Zela Cdra 2',
    addressLocality: 'Lince',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-12.087',
    longitude: '-77.037',
  },
  founder: {
    '@type': 'Person',
    name: 'Moisés Granados Zuloeta',
    sameAs: ['https://www.tiktok.com/@profesormoises'],
  },
  priceRange: '$$',
  openingHours: ['Sa 09:00-17:00', 'Su 09:00-17:00'],
  image: `${baseUrl}/images/og/home.jpg`,
  sameAs: [
    'https://www.tiktok.com/@profesormoises',
    'https://www.facebook.com/talleresmogran',
    'https://www.instagram.com/talleresmogran',
  ],
};

export function generateCourseSchema(course: CourseAudience) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Oratoria para ${course.label}`,
    description: course.descripcion,
    provider: {
      '@type': 'Organization',
      name: 'Talleres Mogran',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Juan Pardo de Zela Cdra 2',
        addressLocality: 'Lince',
        addressRegion: 'Lima',
        addressCountry: 'PE',
      },
    },
    audience: {
      '@type': 'Audience',
      audienceType: course.label.toLowerCase(),
    },
    courseMode: ['online', 'offline'],
    inLanguage: 'es-PE',
  };
}

export function generatePersonSchema(professor: Professor) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: professor.nombre,
    description: professor.bio,
    image: professor.foto,
    sameAs: [professor.tiktok],
    jobTitle: 'Comunicador, Locutor y Formador',
    worksFor: {
      '@type': 'Organization',
      name: 'Talleres Mogran',
    },
    alumniOf: '25 años de experiencia',
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : '',
      },
    })),
  };
}

export function generateTestimonialSchema(testimonial: Testimonial) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: testimonial.texto,
    author: {
      '@type': 'Person',
      name: testimonial.nombre,
    },
    itemReviewed: {
      '@type': 'Course',
      name: `Oratoria - ${testimonial.curso}`,
      provider: {
        '@type': 'Organization',
        name: 'Talleres Mogran',
      },
    },
  };
}
