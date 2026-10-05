import { get } from '.'

export type CareerPageContent = {
  heading: string | null
  cityLabel: string | null
  allCategoriesLabel: string | null
  introText: string | null
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
}

export const defaultCareerPage: CareerPageContent = {
  heading: null,
  cityLabel: null,
  allCategoriesLabel: null,
  introText: null,
  metaTitle: null,
  metaDescription: null,
  ogImage: null
}

const mapFromBackend = (data): CareerPageContent => {
  try {
    return {
      heading: data.heading || null,
      cityLabel: data.cityLabel || null,
      allCategoriesLabel: data.allCategoriesLabel || null,
      introText: data.introText || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      ogImage: data.ogImage || null
    }
  } catch (e) {
    console.error(e)
    return defaultCareerPage
  }
}

export const getCareerPage = (ctx = {}): Promise<CareerPageContent> => {
  return get({ url: '/career', ctx })
    .then(({ data }) => mapFromBackend(data?.data || {}))
    .catch(() => defaultCareerPage)
}
