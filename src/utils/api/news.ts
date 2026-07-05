import { format, parseISO } from 'date-fns'
import { get } from '.'
import getValue from 'lodash-es/get'
import isEmpty from 'lodash-es/isEmpty'
import queryString from 'query-string'

export type NewsInfo = {
  id: number
  image: string
  date: string
  link: string
  externalLink?: string
  title: string
  description: string
  tags: string[]
  bigPicture: boolean
  nextId: number
  prevId: number
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
        data: (data?.value.value || [])
          .map(mapFromBackendNews)
          .filter((i) => i != null),
        total: data?.value.total || 0
      }
    })
    .catch((_) => ({
      data: [],
      total: 0
    }))
}

export const getNewsById = ({ id, ctx = {} }) => {
  // console.log('getting...')
  return get({
    url: `/news/${id}`,
    ctx
  }).then(({ data }) => {
    console.log('GET', data)
    const details = data?.value || {}

    if (isEmpty(details)) return {}
    return mapFromBackendNews(data?.value || {})
  })
}

export const mapFromBackendNews = ({
  id,
  date,
  pictureUrl,
  tags,
  text,
  title,
  link,
  bigPicture,
  nextId = null,
  prevId = null
}) => {
  try {
    let formattedDate = ''
    try {
      const parsed = parseISO(date)
      formattedDate = format(parsed, 'dd.MM.yyyy')
    } catch (e) {}

    return {
      id,
      date: formattedDate,
      title,
      link: `/news/${id}`,
      externalLink: link || '',
      tags: (tags || []).map((v) => getValue(v, 'name', null)),
      description: text,
      image: pictureUrl,
      bigPicture,
      nextId,
      prevId
    }
  } catch (e) {
    console.error(e)
    return null
  }
}
