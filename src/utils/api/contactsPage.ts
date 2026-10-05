import { get } from '.'

export type ContactsPageContent = {
  heading: string | null
  nameLabel: string | null
  phoneLabel: string | null
  emailLabel: string | null
  messageLabel: string | null
  sendLabel: string | null
  successMessage: string | null
  errorMessage: string | null
  sendAgainLabel: string | null
  map: {
    enabled: boolean
    lat: number | null
    lng: number | null
    zoom: number
  }
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
}

export const defaultContactsPage: ContactsPageContent = {
  heading: null,
  nameLabel: null,
  phoneLabel: null,
  emailLabel: null,
  messageLabel: null,
  sendLabel: null,
  successMessage: null,
  errorMessage: null,
  sendAgainLabel: null,
  map: {
    enabled: false,
    lat: null,
    lng: null,
    zoom: 16
  },
  metaTitle: null,
  metaDescription: null,
  ogImage: null
}

const mapFromBackend = (data): ContactsPageContent => {
  try {
    return {
      heading: data.heading || null,
      nameLabel: data.nameLabel || null,
      phoneLabel: data.phoneLabel || null,
      emailLabel: data.emailLabel || null,
      messageLabel: data.messageLabel || null,
      sendLabel: data.sendLabel || null,
      successMessage: data.successMessage || null,
      errorMessage: data.errorMessage || null,
      sendAgainLabel: data.sendAgainLabel || null,
      map: {
        enabled: !!data.map?.enabled,
        lat: data.map?.lat ?? null,
        lng: data.map?.lng ?? null,
        zoom: data.map?.zoom ?? 16
      },
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      ogImage: data.ogImage || null
    }
  } catch (e) {
    console.error(e)
    return defaultContactsPage
  }
}

export const getContactsPage = (ctx = {}): Promise<ContactsPageContent> => {
  return get({ url: '/contacts', ctx })
    .then(({ data }) => mapFromBackend(data?.data || {}))
    .catch(() => defaultContactsPage)
}
