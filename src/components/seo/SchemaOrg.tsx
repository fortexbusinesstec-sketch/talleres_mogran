import { FAQItem, CourseAudience, Professor } from '@/types';

interface SchemaOrgProps {
  courses?: CourseAudience[];
  faqs?: FAQItem[];
  professor?: Professor;
}

export function SchemaOrg({ courses = [], faqs = [], professor }: SchemaOrgProps) {
  const baseUrl = 'https://talleresmogran.com';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Talleres Mogran',
    description: 'Cursos y talleres de oratoria para personas tímidas en Lima',
    url: baseUrl,
    telephone: '+51943695799',
    image: `${baseUrl}/images/og/home.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Juan Pardo de Zela Cdra 2',
      addressLocality: 'Lince',
      addressRegion: 'Lima',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-12.0780',
      longitude: '-77.0380',
    },
    founder: {
      '@type': 'Person',
      name: 'Moisés Granados Zuloeta',
      sameAs: ['https://www.tiktok.com/@profesormoises'],
    },
    sameAs: [
      'https://www.tiktok.com/@oratoriamogran',
      'https://www.facebook.com/talleresmogran',
      'https://www.instagram.com/talleresmogran',
    ],
    priceRange: '$$',
    openingHours: ['Mo 09:00-20:00', 'Tu 09:00-20:00', 'We 09:00-20:00', 'Th 09:00-20:00', 'Fr 09:00-20:00', 'Sa 09:00-17:00'],
  };

  const courseSchemas = courses.map((course) => ({
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
  }));

  const personSchema = professor
    ? {
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
      }
    : null;

  const faqSchema = faqs.length > 0
    ? {
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
      }
    : null;

  const schemas = [
    localBusinessSchema,
    ...courseSchemas,
    personSchema,
    faqSchema,
  ].filter(Boolean);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }}
    />
  );
}
