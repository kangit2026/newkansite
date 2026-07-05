import { formatDate } from '@utils/helpers'
import axios from 'axios'
import queryString from 'query-string'

export type BackendVacancy = {
  id: number
  title: string
  date: string
  url: string
}

export type Vacancy = {
  id: number
  title: string
  date: string
  link: string
}

const mapToVacancies = (vacancies: BackendVacancy[]): Vacancy[] => {
  return vacancies?.map(({ id, title, date, url }) => ({
    id,
    title,
    date: formatDate(date),
    link: url
  }))||[]
}



export const vacanciesCount = 20

export const getVacanciesCategories = () => {
  const apiUrl=  process.env.NEXT_PUBLIC_API_URL

  return axios({
    method: 'get',
    url: `${apiUrl}/career/categories`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((resp) => {
      return (resp.data || []).map(({ id, ua }) => ({ id, label: ua }))
    })
    .catch(() => [])
}

export const getVacancies = ({ page = 0, category = '' }) => {
  const apiUrl=  process.env.NEXT_PUBLIC_API_URL

  const url = queryString.stringifyUrl({
    url: `${apiUrl}/career/vacancies`,
    query: {
      page: page,
      category
    }
  })

  return axios({
    method: 'get',
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((resp) => ({
      data: mapToVacancies(resp.data?.value),
      total: resp.data?.total || 0
    }))
    .catch(() => ({
      data: [],
      total: 0
    }))
}
