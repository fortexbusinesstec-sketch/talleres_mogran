export interface SEOData {
  title: string
  description: string
  canonical: string
  robots: string
  openGraph: OpenGraph
  twitterCard: TwitterCard
  jsonLd: Record<string, unknown>[]
}

export interface OpenGraph {
  title: string
  description: string
  image: string
  url: string
  type: 'website' | 'article' | 'product'
}

export interface TwitterCard {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  title: string
  description: string
  image: string
}
