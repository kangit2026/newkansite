import { get } from '.'
import {
  mapFromBackendProject,
  mapFromFeaturedBackendProject
} from './project'
import queryString from 'query-string'

export type FeaturedProject = {
  image: string
  title: string
  link: string
  phone: string
  features: { title: string; value: string }[]
}

export type ProjectCategory = {
  id: number
  name: string
}

export const projectsCount = 8

export const getProjectsCategories = (ctx) => {
  return get({
    url: `/category`,
    ctx
  }).then(({ data }) => data.data || [])
}

export const featuredProjectsCount = 4

export const getFeaturedProjects = (ctx = {}) => {
  const url = queryString.stringifyUrl({
    url: `/project`,
    query: { featured: true, count: featuredProjectsCount }
  })

  return get({
    url,
    ctx
  })
    .then(({ data }) => {
      return (data.data || [])
        .map(mapFromFeaturedBackendProject)
        .filter((i) => i != null)
    })
    .catch((_) => [])
}

export const getProjects = ({
  count = 3,
  start = 0,
  categoryId = null,
  ctx = {}
}) => {
  const url = queryString.stringifyUrl({
    url: `/project`,
    query: {
      start,
      count,
      ...(categoryId ? { categoryId } : null)
    }
  })

  return get({
    url,
    ctx
  })
    .then(({ data }) => {
      return {
        data: (data.data || [])
          .map(mapFromBackendProject)
          .filter((i) => i != null),
        total: data.meta?.total || 0
      }
    })
    .catch((_) => ({
      data: [],
      total: 0
    }))
}
