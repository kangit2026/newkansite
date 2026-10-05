import { get } from '.'

export type SiteSettings = {
  phone: string | null
  email: string | null
  telegramChatLink: string | null
  social: {
    instagram: string | null
    youtube: string | null
    facebook: string | null
    pinterest: string | null
    telegram: string | null
  }
  copyrightText: string | null
  copyrightYear: number | null
  home: {
    metaTitle: string | null
    metaDescription: string | null
    ogImage: string | null
    video: string | null
    motto: string | null
    awardsTitle: string | null
    awards: { value: number | null; description: string | null }[]
  }
  news: {
    metaTitle: string | null
    metaDescription: string | null
  }
  projects: {
    metaTitle: string | null
    metaDescription: string | null
  }
  services: {
    metaTitle: string | null
    metaDescription: string | null
  }
  commercialAd: {
    title: string | null
    link: string | null
  }
  projectAd: {
    title: string | null
    link: string | null
  }
}

export const defaultSettings: SiteSettings = {
  phone: null,
  email: null,
  telegramChatLink: null,
  social: {
    instagram: null,
    youtube: null,
    facebook: null,
    pinterest: null,
    telegram: null
  },
  copyrightText: null,
  copyrightYear: null,
  home: {
    metaTitle: null,
    metaDescription: null,
    ogImage: null,
    video: null,
    motto: null,
    awardsTitle: null,
    awards: []
  },
  news: {
    metaTitle: null,
    metaDescription: null
  },
  projects: {
    metaTitle: null,
    metaDescription: null
  },
  services: {
    metaTitle: null,
    metaDescription: null
  },
  commercialAd: {
    title: null,
    link: null
  },
  projectAd: {
    title: null,
    link: null
  }
}

const mapFromBackendSettings = (data): SiteSettings => {
  try {
    return {
      phone: data.phone || null,
      email: data.email || null,
      telegramChatLink: data.telegram_chat_link || null,
      social: {
        instagram: data.social?.instagram || null,
        youtube: data.social?.youtube || null,
        facebook: data.social?.facebook || null,
        pinterest: data.social?.pinterest || null,
        telegram: data.social?.telegram || null
      },
      copyrightText: data.copyright_text || null,
      copyrightYear: data.copyright_year || null,
      home: {
        metaTitle: data.home?.meta_title || null,
        metaDescription: data.home?.meta_description || null,
        ogImage: data.home?.og_image || null,
        video: data.home?.video || null,
        motto: data.home?.motto || null,
        awardsTitle: data.home?.awards_title || null,
        awards: (data.home?.awards || []).map((a) => ({
          value: a?.value ?? null,
          description: a?.description || null
        }))
      },
      news: {
        metaTitle: data.news?.meta_title || null,
        metaDescription: data.news?.meta_description || null
      },
      projects: {
        metaTitle: data.projects?.meta_title || null,
        metaDescription: data.projects?.meta_description || null
      },
      services: {
        metaTitle: data.services?.meta_title || null,
        metaDescription: data.services?.meta_description || null
      },
      commercialAd: {
        title: data.commercial_ad?.title || null,
        link: data.commercial_ad?.link || null
      },
      projectAd: {
        title: data.project_ad?.title || null,
        link: data.project_ad?.link || null
      }
    }
  } catch (e) {
    console.error(e)
    return defaultSettings
  }
}

export const getSettings = ({ ctx = {} } = {}): Promise<SiteSettings> => {
  return get({ url: '/settings', ctx })
    .then(({ data }) => mapFromBackendSettings(data?.data || {}))
    .catch(() => defaultSettings)
}
