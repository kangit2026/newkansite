import { get } from '.'
import getValue from 'lodash-es/get'
import isEmpty from 'lodash-es/isEmpty'
export type BreadCrumb = { title: string; link?: string }

export type Project = {
  id: number
  slug: string
  image: string
  title: string
  link: string
  features: { title: string; value: string }[]
  phone: string
  phoneLabel?: string | null
  fullArea: number
  video?: string
  projectOffice: string
  generalContractor: string
  developer: string
  address: string
  website: string
  description: string
  logo: string
  logoAlt?: string | null
  imageAlt?: string | null
  breadcrumbs: BreadCrumb[]
  infrastructure: string[]
  category: string
  gallery: { url: string; alt?: string | null }[]
  metaTitle?: string
  metaDescription?: string
}

export const mapFromFeaturedBackendProject = ({
  id,
  slug,
  name,
  phone,
  phoneLabel,
  mainPicture,
  mainPictureAlt
}) => {
  try {
    return {
      id,
      phone,
      phoneLabel: phoneLabel || null,
      title: name,
      image: mainPicture,
      imageAlt: mainPictureAlt || null,
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
  logoAlt,
  video,
  name,
  phone,
  phoneLabel,
  mainPicture,
  mainPictureAlt,
  metaTitle,
  metaDescription
}) => {
  try {
    const categoryName = getValue(category, 'name', null)
    return {
      id:id||null,
      slug:slug||null,
      phone:phone||null,
      phoneLabel: phoneLabel || null,
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
      logoAlt: logoAlt || null,
      infrastructure: infrastructureItems?.map((i) =>
        getValue(i, 'name', null)
      ),
      gallery: pictures?.map(({ url, alt }) => ({
        url,
        alt: alt || null
      })),
      image: mainPicture||null,
      imageAlt: mainPictureAlt || null,
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

export const getPartnership = async (ctx = {}) => {
  return get({
    url: '/Partnership',
    ctx
  })
    .then(({ data }) => data?.value || [])
    .catch(() => [])
}
