import React from 'react'
import { About } from '@components/common/About/index'
import { getFeaturedProjects } from '@utils/api/projects'

export default function about({ projects }) {
  return (
    <div>
      <About projects={projects} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const projects = await getFeaturedProjects({ ctx })

  return {
    props: { projects }
  }
}
