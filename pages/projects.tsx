import React from 'react'
import { Projects } from '@components/projects'
import {
  getProjects,
  getProjectsCategories,
  projectsCount,
  getFeaturedProjects
} from '@utils/api/projects'

export default function ProjectPage({
  projects,
  featured,
  categories
}) {
  return (
    <div>
      <Projects
        projects={projects}
        featured={featured}
        categories={categories}
      />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const [projects, featured, categories] = await Promise.all([
    getProjects({
      count: projectsCount,
      ctx
    }),
    getFeaturedProjects(ctx),
    getProjectsCategories(ctx)
  ])

  return {
    props: { projects, categories, featured }
  }
}
