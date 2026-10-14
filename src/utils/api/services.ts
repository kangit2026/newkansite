import { get } from '.'

export type ServiceItem = {
  id: number
  title: string
  link: string
  external: boolean
  image: string | null
  imageAlt?: string | null
}

const mapFromBackendService = (data): ServiceItem | null => {
  try {
    return {
      id: data.id,
      title: data.title,
      link: data.link,
      external: !!data.external,
      image: data.image || null,
      imageAlt: data.imageAlt || null
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getServices = (ctx = {}): Promise<ServiceItem[]> => {
  return get({ url: '/services', ctx })
    .then(({ data }) =>
      (data?.data || [])
        .map(mapFromBackendService)
        .filter((i) => i != null)
    )
    .catch(() => [])
}
