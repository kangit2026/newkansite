import { get } from '.'

export type AboutPageContent = {
  motto: string | null
  heading: string | null
  history: string | null
  specialists: string | null
  today: {
    title: string | null
    description: string | null
  }
  merit: {
    title: string | null
    description: string | null
    list: string[]
  }
  achievementsText: string | null
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
}

export const defaultAboutPage: AboutPageContent = {
  motto: null,
  heading: null,
  history: null,
  specialists: null,
  today: {
    title: null,
    description: null
  },
  merit: {
    title: null,
    description: null,
    list: []
  },
  achievementsText: null,
  metaTitle: null,
  metaDescription: null,
  ogImage: null
}

const mapFromBackendAboutPage = (data): AboutPageContent => {
  try {
    return {
      motto: data.motto || null,
      heading: data.heading || null,
      history: data.history || null,
      specialists: data.specialists || null,
      today: {
        title: data.today?.title || null,
        description: data.today?.description || null
      },
      merit: {
        title: data.merit?.title || null,
        description: data.merit?.description || null,
        list: data.merit?.list || []
      },
      achievementsText: data.achievementsText || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      ogImage: data.ogImage || null
    }
  } catch (e) {
    console.error(e)
    return defaultAboutPage
  }
}

export const getAboutPage = (ctx = {}): Promise<AboutPageContent> => {
  return get({ url: '/about', ctx })
    .then(({ data }) => mapFromBackendAboutPage(data?.data || {}))
    .catch(() => defaultAboutPage)
}
