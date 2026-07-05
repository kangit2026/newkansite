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
  }).then(({ data }) => data.value || [])
}

export const getFeaturedProjects = ({ ctx = {} }) => {
  const url = queryString.stringifyUrl({
    url: `/project/featured`
  })

  return get({
    url,
    ctx
  })
    .then(({ data }) => {
      return data.value
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
        data: data.value.value
          .map(mapFromBackendProject)
          .filter((i) => i != null),
        total: data.value.total
      }
    })
    .catch((_) => ({
      data: [],
      total: 0
    }))
}
