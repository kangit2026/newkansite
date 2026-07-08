import React from 'react'
import { About } from '@components/common/About/index'
import { getFeaturedProjects } from '@utils/api/projects'
import { getAboutPage } from '@utils/api/about'

export default function about({ projects, content }) {
  return (
    <div>
      <About projects={projects} content={content} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const [projects, content] = await Promise.all([
    getFeaturedProjects(ctx),
    getAboutPage(ctx)
  ])

  return {
    props: {
      projects,
      content,
      seo: {
        title: content?.metaTitle || null,
        description: content?.metaDescription || null,
        ogImage: content?.ogImage || null
      }
    }
  }
}
