export interface HeroContent {
  title: {
    firstLine: string
    highlightedLine: string
  }
  description: string
  ctaLabel: string
  status: {
    orderNumber: string
    etaPrefix: string
    etaValue: string
    etaSuffix: string
  }
}
