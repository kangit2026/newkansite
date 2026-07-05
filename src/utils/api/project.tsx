import { get } from '.'
import getValue from 'lodash-es/get'
import axios from 'axios'
export type BreadCrumb = { title: string; link?: string }

export type Project = {
  id: number
  image: string
  title: string
  link: string
  features: { title: string; value: string }[]
  phone: string
  fullArea: number
  video?: string
  projectOffice: string
  generalContractor: string
  developer: string
  address: string
  website: string
  description: string
  logo: string
  breadcrumbs: BreadCrumb[]
  infrastructure: string[]
  category: string
  gallery: string[]
}

export const mapFromFeaturedBackendProject = ({
  id,
  name,
  phone,
  mainPicture
}) => {
  try {
    return {
      id,
      phone,
      title: name,
      image: mainPicture,
      link: `/project/${id}`
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const mapFromBackendProject = ({
  id,
  category,
  pictures = [],
  infrastructureItems = [],
  website,
  address,
  developer,
  generalContractor,
  projectOffice,
  fullArea,
  text,
  logoUrl,
  video,
  name,
  phone,
  mainPicture
}) => {
  try {
    const categoryName = getValue(category, 'name', null)
    return {
      id:id||null,
      phone:phone||null,
      fullArea:fullArea||null,
      video:video||null,
      projectOffice:projectOffice||null,
      generalContractor:generalContractor||null,
      developer:developer||null,
      address:address||null,
      website:website||null,
      category: categoryName,
      link: `/project/${id}`,
      description: text,
      logo: logoUrl||null,
      infrastructure: infrastructureItems?.map((i) =>
        getValue(i, 'name', null)
      ),
      gallery: pictures?.map(({ url }) => url),
      image: mainPicture||null,
      title: name||'',
      breadcrumbs: [
        { title: 'common:menu.projects', link: '/projects' },
        ...(categoryName
          ? [
              {
                title: 'projects:type.housing',
                link: '/projects?type=housing'
              }
            ]
          : [])
      ]
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getProject = ({ id, ctx = {} }) => {
  return get({
    url: `/project/${id}`,
    ctx
  }).then(({ data }) =>
    data?.value ? mapFromBackendProject(data.value) || {} : {}
  )
}

export const getPartnership = async () => {
  const data = await axios({
    method: 'get',
    url: '/Partnership'
  }).then((resp) => {
    return resp.data.value
  })
  return data
}
