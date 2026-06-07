import type { SEODataPort } from '@/domain/ports/SEODataPort'
import type { SEOData } from '@/domain/entities/SEOData'

const SITE_URL = 'https://tallermogran.com'
const SITE_NAME = 'Taller Mogran'
const DEFAULT_DESCRIPTION = 'Taller especializado en mecanizado de precisión, soldadura y fabricación industrial. Calidad y experiencia para tu proyecto.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export class MetadataAdapter implements SEODataPort {
  private readonly seoConfig: Record<string, SEOData> = {
    '/': {
      title: `${SITE_NAME} | Mecanizado de Precisión y Soldadura Industrial`,
      description: DEFAULT_DESCRIPTION,
      canonical: SITE_URL,
      robots: 'index, follow',
      openGraph: {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        url: SITE_URL,
        type: 'website',
      },
      twitterCard: {
        card: 'summary_large_image',
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
      },
      jsonLd: [],
    },
    '/services': {
      title: `Servicios | ${SITE_NAME}`,
      description: 'Servicios de mecanizado CNC, soldadura especializada, fabricación de piezas y mantenimiento industrial.',
      canonical: `${SITE_URL}/services`,
      robots: 'index, follow',
      openGraph: {
        title: `Servicios - ${SITE_NAME}`,
        description: 'Servicios de mecanizado CNC, soldadura especializada, fabricación de piezas y mantenimiento industrial.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/services`,
        type: 'website',
      },
      twitterCard: {
        card: 'summary_large_image',
        title: `Servicios - ${SITE_NAME}`,
        description: 'Servicios de mecanizado CNC, soldadura especializada, fabricación de piezas y mantenimiento industrial.',
        image: DEFAULT_IMAGE,
      },
      jsonLd: [],
    },
    '/contact': {
      title: `Contacto | ${SITE_NAME}`,
      description: 'Contáctanos para solicitar un presupuesto o consultar nuestros servicios industriales.',
      canonical: `${SITE_URL}/contact`,
      robots: 'index, follow',
      openGraph: {
        title: `Contacto - ${SITE_NAME}`,
        description: 'Contáctanos para solicitar un presupuesto o consultar nuestros servicios industriales.',
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/contact`,
        type: 'website',
      },
      twitterCard: {
        card: 'summary_large_image',
        title: `Contacto - ${SITE_NAME}`,
        description: 'Contáctanos para solicitar un presupuesto o consultar nuestros servicios industriales.',
        image: DEFAULT_IMAGE,
      },
      jsonLd: [],
    },
  }

  async getSEOData(path: string): Promise<SEOData> {
    const data = this.seoConfig[path]
    if (data) return { ...data, jsonLd: [...data.jsonLd] }
    return this.getDefaultSEOData()
  }

  getDefaultSEOData(): SEOData {
    return {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      canonical: SITE_URL,
      robots: 'index, follow',
      openGraph: {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        url: SITE_URL,
        type: 'website',
      },
      twitterCard: {
        card: 'summary_large_image',
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
      },
      jsonLd: [],
    }
  }

  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+34-XXX-XXX-XXX',
        contactType: 'customer service',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ES',
      },
    }
  }

  generateWebSiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }
  }

  generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }
  }
}
