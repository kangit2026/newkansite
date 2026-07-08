import { format, parseISO } from 'date-fns'
import { get } from '.'
import isEmpty from 'lodash-es/isEmpty'
import queryString from 'query-string'

export type NewsInfo = {
  id: number
  slug: string
  image: string
  date: string
  link: string
  externalLink?: string
  title: string
  description: string
  tags: string[]
  bigPicture: boolean
  nextSlug: string | null
  prevSlug: string | null
  metaTitle?: string
  metaDescription?: string
}

export enum NewsType {
  None = 1,
  Default = 2,
  BigPicture = 3
}

export const newsCount = 5
export const featuredNewsCount = 2

export const getNewsPageItems = ({
  count = newsCount,
  featuredCount = featuredNewsCount,
  page = 0,
  ctx = {}
}) => {
  const start = page * count
  const featuredStart = page * featuredCount

  return Promise.all([
    getNews({ count, start, newsType: NewsType.Default, ctx }),
    getNews({
      count: featuredCount,
      start: featuredStart,
      newsType: NewsType.BigPicture,
      ctx
    })
  ])
}

export const getNews = ({
  count = 3,
  start = 0,
  newsType = NewsType.None,
  ctx = {}
}) => {
  const url = queryString.stringifyUrl({
    url: `/news`,
    query: {
      count,
      start,
      ...(newsType != NewsType.None
        ? { onlyBigPicture: newsType == NewsType.BigPicture }
        : null)
    }
  })

  return get({
    url,
    ctx
  })
    .then(({ data }) => {
      return {
        data: (data?.data || [])
          .map(mapFromBackendNews)
          .filter((i) => i != null),
        total: data?.meta?.total || 0
      }
    })
    .catch((_) => ({
      data: [],
      total: 0
    }))
}

export type NewsBySlugResult = {
  details?: Partial<NewsInfo>
  redirectToSlug?: string
}

export const getNewsBySlug = ({
  slug,
  ctx = {}
}): Promise<NewsBySlugResult> => {
  return get({
    url: `/news/${slug}`,
    ctx
  })
    .then(({ data }) => {
      if (data?.redirect?.slug) {
        return { redirectToSlug: data.redirect.slug }
      }

      const details = data?.data || {}

      if (isEmpty(details)) return { details: {} }
      return { details: mapFromBackendNews(details) || {} }
    })
    .catch((_) => ({ details: {} }))
}

export const mapFromBackendNews = ({
  id,
  slug,
  date,
  picture,
  tags,
  text,
  title,
  external_link,
  big_picture,
  next_slug = null,
  prev_slug = null,
  metaTitle = null,
  metaDescription = null
}) => {
  try {
    let formattedDate = ''
    try {
      const parsed = parseISO(date)
      formattedDate = format(parsed, 'dd.MM.yyyy')
    } catch (e) {}

    return {
      id,
      slug,
      date: formattedDate,
      title,
      link: `/news/${slug}`,
      externalLink: external_link || '',
      tags: tags || [],
      description: text,
      image: picture,
      bigPicture: big_picture,
      nextSlug: next_slug,
      prevSlug: prev_slug,
      metaTitle,
      metaDescription
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
