import { get } from '.'

export type MarketPageContent = {
  heroImage: string | null
  phone: string | null
  badge: string | null
  title: string | null
  sellText: string | null
  question: string | null
  answer: string | null
  contactLabel: string | null
  prosTitle: string | null
  prosItems: string[]
  trustText: string | null
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
}

export const defaultMarketPage: MarketPageContent = {
  heroImage: null,
  phone: null,
  badge: null,
  title: null,
  sellText: null,
  question: null,
  answer: null,
  contactLabel: null,
  prosTitle: null,
  prosItems: [],
  trustText: null,
  metaTitle: null,
  metaDescription: null,
  ogImage: null
}

const mapFromBackend = (data): MarketPageContent => {
  try {
    return {
      heroImage: data.heroImage || null,
      phone: data.phone || null,
      badge: data.badge || null,
      title: data.title || null,
      sellText: data.sellText || null,
      question: data.question || null,
      answer: data.answer || null,
      contactLabel: data.contactLabel || null,
      prosTitle: data.prosTitle || null,
      prosItems: data.prosItems || [],
      trustText: data.trustText || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      ogImage: data.ogImage || null
    }
  } catch (e) {
    console.error(e)
    return defaultMarketPage
  }
}

export const getMarketPage = (ctx = {}): Promise<MarketPageContent> => {
  return get({ url: '/market', ctx })
    .then(({ data }) => mapFromBackend(data?.data || {}))
    .catch(() => defaultMarketPage)
}
