import { MetadataAdapter } from '@/adapters/secondary/seo/MetadataAdapter'

const seo = new MetadataAdapter()

function sanitizeJsonLd(obj: Record<string, unknown>): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

export function OrganizationSchema() {
  const schema = seo.generateOrganizationSchema()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = seo.generateWebSiteSchema()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = seo.generateBreadcrumbSchema(items)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
    />
  )
}

export function ServiceSchema({ services }: {
  services: { name: string; description: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
    />
  )
}
