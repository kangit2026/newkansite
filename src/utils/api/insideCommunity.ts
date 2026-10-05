import { get } from '.'

export type InsideCommunityBlock = {
  id: number
  type: 'principle' | 'stat' | 'highlight' | 'ribbon' | 'final'
  layout: string | null
  number: number | null
  sortOrder: number
  title: string | null
  description: string | null
  statValue: string | null
  statLabel: string | null
  highlightSmall: string | null
  highlightBig: string | null
  highlightMedium: string | null
  ctaText: string | null
  image: string | null
}

export type InsideCommunityContent = {
  hero: {
    video: string
    imageUk: string | null
    imageEn: string | null
    title: string | null
    subtitle: string | null
    paragraphs: string[]
  }
  complexLogos: string[]
  philosophy: {
    title: string | null
    subtitle: string | null
  }
  blocks: InsideCommunityBlock[]
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
}

export const defaultInsideCommunityContent: InsideCommunityContent = {
  hero: {
    video: '/inside_community/kan_inside.mp4',
    imageUk: null,
    imageEn: null,
    title: null,
    subtitle: null,
    paragraphs: []
  },
  complexLogos: [],
  philosophy: {
    title: null,
    subtitle: null
  },
  blocks: [],
  metaTitle: null,
  metaDescription: null,
  ogImage: null
}

const mapBlock = (block): InsideCommunityBlock => ({
  id: block.id,
  type: block.type,
  layout: block.layout || null,
  number: block.number ?? null,
  sortOrder: block.sortOrder ?? 0,
  title: block.title || null,
  description: block.description || null,
  statValue: block.statValue || null,
  statLabel: block.statLabel || null,
  highlightSmall: block.highlightSmall || null,
  highlightBig: block.highlightBig || null,
  highlightMedium: block.highlightMedium || null,
  ctaText: block.ctaText || null,
  image: block.image || null
})

const mapFromBackend = (data): InsideCommunityContent => {
  try {
    return {
      hero: {
        video: data.hero?.video || defaultInsideCommunityContent.hero.video,
        imageUk: data.hero?.imageUk || null,
        imageEn: data.hero?.imageEn || null,
        title: data.hero?.title || null,
        subtitle: data.hero?.subtitle || null,
        paragraphs: data.hero?.paragraphs || []
      },
      complexLogos: data.complexLogos || [],
      philosophy: {
        title: data.philosophy?.title || null,
        subtitle: data.philosophy?.subtitle || null
      },
      blocks: (data.blocks || []).map(mapBlock),
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      ogImage: data.ogImage || null
    }
  } catch (e) {
    console.error(e)
    return defaultInsideCommunityContent
  }
}

export const getInsideCommunityPage = (
  ctx = {}
): Promise<InsideCommunityContent> => {
  return get({ url: '/inside-community', ctx })
    .then(({ data }) => mapFromBackend(data?.data || {}))
    .catch(() => defaultInsideCommunityContent)
}
