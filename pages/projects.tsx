import React from 'react'
import { Projects } from '@components/projects'
import {
  getProjects,
  getProjectsCategories,
  projectsCount,
  getFeaturedProjects
} from '@utils/api/projects'
import { getSettings } from '@utils/api/settings'

export default function ProjectPage({
  projects,
  featured,
  categories,
  page,
  categoryId
}) {
  return (
    <div>
      <Projects
        projects={projects}
        featured={featured}
        categories={categories}
        page={page}
        categoryId={categoryId}
      />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const rawPage = parseInt(String(ctx.query.page ?? ''), 10)
  const page = Number.isInteger(rawPage) && rawPage > 1 ? rawPage - 1 : 0

  const rawCategoryId = parseInt(String(ctx.query.category ?? ''), 10)
  const requestedCategoryId = Number.isInteger(rawCategoryId)
    ? rawCategoryId
    : null

  const categories = await getProjectsCategories(ctx)

  // ігноруємо неіснуючий category= у URL (набраний вручну/битий лінк) —
  // інакше SelectBox падає, намагаючись підсвітити невідомий id.
  const categoryId = categories.some(
    ({ id }) => id === requestedCategoryId
  )
    ? requestedCategoryId
    : null

  const [projects, featured, settings] = await Promise.all([
    getProjects({
      count: projectsCount,
      start: page * projectsCount,
      categoryId,
      ctx
    }),
    getFeaturedProjects(ctx),
    getSettings({ ctx })
  ])

  const pagesCount = Math.ceil(projects.total / projectsCount)

  if (page > 0 && page >= pagesCount) {
    return { notFound: true }
  }

  return {
    props: {
      projects,
      categories,
      featured,
      page,
      categoryId,
      seo: {
        title: settings?.projects?.metaTitle || null,
        description: settings?.projects?.metaDescription || null
      }
    }
  }
}
