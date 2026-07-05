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
    motto: string | null
    awardsTitle: string | null
    awards: { value: number | null; description: string | null }[]
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
    motto: null,
    awardsTitle: null,
    awards: []
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
        motto: data.home?.motto || null,
        awardsTitle: data.home?.awards_title || null,
        awards: (data.home?.awards || []).map((a) => ({
          value: a?.value ?? null,
          description: a?.description || null
        }))
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
