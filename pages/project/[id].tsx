import React from 'react'
import Head from 'next/head'
import { Project } from '@components/project'
import { Error } from '@components/common/Error'
import { getProject } from '@utils/api/project'
import { Section } from '@components/home/Section'
import { Projects } from '@components/home/Projects'
import { css } from 'stitches.config'
import isEmpty from 'lodash-es/isEmpty'
import { getFeaturedProjects } from '@utils/api/projects'
import useTranslation from 'next-translate/useTranslation'

export default function ProjectPage({ details, projects }) {
  const { t } = useTranslation('common')
  const  title  = details?.title

  if (isEmpty(details)) return <Error code={404} />

  return (
    <div>
      <Head>
        <title>{t('title.base', { title })}</title>
      </Head>
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
  const id = ctx.query.id
  const [details, projects] = await Promise.all([
    getProject({ id, ctx }),
    getFeaturedProjects({ ctx })
  ])

  return {
    props: { details, projects }
  }
}

const projectsSection = css({
  mt: 65
})
