import { Metadata } from 'next';

export const siteConfig = {
  name: 'Talleres Mogran',
  description: 'Cursos de oratoria en Lima para niños, adolescentes y adultos que sienten miedo al hablar en público. Método práctico, paso a paso, sin presión.',
  url: 'https://talleresmogran.com',
  ogImage: '/images/og/home.jpg',
  twitterHandle: '@profesormoises',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s | Talleres Mogran',
    default: 'Talleres de Oratoria para Personas Tímidas | Mogran',
  },
  description: siteConfig.description,
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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Talleres Mogran - Oratoria para personas tímidas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/',
  },
};

export function generatePageMetadata({
  title,
  description,
  image,
  path = '/',
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [{ url: siteConfig.ogImage }],
    },
    twitter: {
      title,
      description,
      images: image ? [image] : [siteConfig.ogImage],
    },
    alternates: {
      canonical: path,
    },
  };
}