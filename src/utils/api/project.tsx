import { get } from '.'
import getValue from 'lodash-es/get'
import isEmpty from 'lodash-es/isEmpty'
import axios from 'axios'
export type BreadCrumb = { title: string; link?: string }

export type Project = {
  id: number
  slug: string
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
  metaTitle?: string
  metaDescription?: string
}

export const mapFromFeaturedBackendProject = ({
  id,
  slug,
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
      link: `/project/${slug}`
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const mapFromBackendProject = ({
  id,
  slug,
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
  mainPicture,
  metaTitle,
  metaDescription
}) => {
  try {
    const categoryName = getValue(category, 'name', null)
    return {
      id:id||null,
      slug:slug||null,
      phone:phone||null,
      fullArea:fullArea||null,
      video:video||null,
      projectOffice:projectOffice||null,
      generalContractor:generalContractor||null,
      developer:developer||null,
      address:address||null,
      website:website||null,
      category: categoryName,
      link: `/project/${slug}`,
      description: text,
      metaTitle: metaTitle||null,
      metaDescription: metaDescription||null,
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

export type ProjectBySlugResult = {
  details?: Partial<Project>
  redirectToSlug?: string
}

export const getProject = ({
  slug,
  ctx = {}
}): Promise<ProjectBySlugResult> => {
  return get({
    url: `/project/${slug}`,
    ctx
  })
    .then(({ data }) => {
      if (data?.redirect?.slug) {
        return { redirectToSlug: data.redirect.slug }
      }

      if (isEmpty(data?.data)) return { details: {} }

      return { details: mapFromBackendProject(data.data) || {} }
    })
    .catch((_) => ({ details: {} }))
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
