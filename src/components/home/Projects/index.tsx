import React, { FC, HTMLAttributes } from 'react'
import { Slider } from '@components/common/Slider'
import { ProjectCard } from '@components/common/ProjectCard'
import { Project } from '@utils/api/project'
import { css, styled } from 'stitches.config'
import {
  ContentWrapper,
  ScrollSlider
} from '@components/common/ScrollSlider'
import { gridConfig } from '@utils/constants'

export type ProjectsProps = HTMLAttributes<HTMLDivElement> & {
  projects: Project[]
}

export const Projects: FC<ProjectsProps> = ({ projects = [] }) => {
  const projectsList = projects.map(
    ({ id, title, image, imageAlt, phone, phoneLabel, features, link }) => (
      <ProjectCard
        key={id}
        slideable={false}
        onLeft={() => {}}
        onRight={() => {}}
        image={image}
        imageAlt={imageAlt}
        title={title}
        phone={phone}
        phoneLabel={phoneLabel}
        features={features}
        link={link}
        className={sliderCard()}
        projectId={id}
      />
    )
  )

  return (
    <>
      <Slider
        className={slider()}
        variableWidth={true}
        infinite={true}
      >
        {projectsList}
      </Slider>
      <ScrollSlider className={scrollSlider()}>
        <ProjectsWrapper>{projectsList}</ProjectsWrapper>
      </ScrollSlider>
    </>
  )
}

const sliderCard = css({
  mr: 6,
  ml: 8,

  '@md': {
    ml: 0,
    mr: 0,

    '&:not(:last-child)': {
      mr: 26
    }
  }
})

const slider = css({
  mt: 24,

  '@md': {
    display: 'none'
  }
})

// padding should be equal to (window width - container width / 2 - one column width)
// next line is a simplified form of (cw / 2 - cw / 12)
const mdOffset = (5 * (gridConfig.containerWidths.md as number)) / 12
const lgOffset = (5 * (gridConfig.containerWidths.lg as number)) / 12

const scrollSlider = css({
  display: 'none!important',
  mt: 31,

  '@md': {
    display: 'flex!important'
  },

  '@lg': {
    mt: 39
  },

  [`& ${ContentWrapper}`]: {
    '@md': {
      top: 67,
      height: 'calc(100vh - 67px)',
      px: `calc(50vw - ${mdOffset}px)`
    },

    '@lg': {
      top: 134,
      height: 'calc(100vh - 134px)',
      px: `calc(50vw - ${lgOffset}px)`
    }
  }
})

const ProjectsWrapper = styled('div', {
  display: 'flex',
  height: 650,

  '@md': {
    height: 'calc(100vh - 150px)',
    maxHeight: 650,
    minHeight: 300
  },

  '@lg': {
    height: 'calc(100vh - 230px)',
    maxHeight: 540,
    minHeight: 300
  }
})
