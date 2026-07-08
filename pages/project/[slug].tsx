import React from 'react'
import { Project } from '@components/project'
import { Error } from '@components/common/Error'
import { getProject } from '@utils/api/project'
import { Section } from '@components/home/Section'
import { Projects } from '@components/home/Projects'
import { css } from 'stitches.config'
import isEmpty from 'lodash-es/isEmpty'
import { getFeaturedProjects } from '@utils/api/projects'

export default function ProjectPage({ details, projects }) {
  if (isEmpty(details)) return <Error code={404} />

  return (
    <div>
      <Project details={details} />
      {projects.length > 0 && (
        <Section
          title="Проєкти"
          buttonTitle="Дивитися усі проєкти"
          buttonLink="/projects"
          className={projectsSection()}
        >
          <Projects projects={projects} />
        </Section>
      )}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const slug = ctx.query.slug as string

  const { details, redirectToSlug } = await getProject({ slug, ctx })

  if (redirectToSlug) {
    return {
      redirect: {
        destination: `/project/${redirectToSlug}`,
        permanent: true
      }
    }
  }

  const projects = await getFeaturedProjects(ctx)

  return {
    props: {
      details: details || {},
      projects,
      seo: {
        title:
          details?.metaTitle ||
          (details?.title ? `KAN | ${details.title}` : null),
        description: details?.metaDescription || null,
        ogImage: details?.image || null
      }
    }
  }
}

const projectsSection = css({
  mt: 65
})
