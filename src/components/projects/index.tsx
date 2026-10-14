import React, { FC, useRef, useState } from 'react'
import { css, styled } from 'stitches.config'
import {
  HeadContent as SectionHeadContent,
  Section
} from '@components/home/Section'
import { ProjectsList } from './ProjectsList'
import { ProjectCard } from '@components/common/ProjectCard'
import { Slider } from '@components/common/Slider'
import { StyledProgressBar } from '@components/common/ProgressBar'
import { Project } from '@utils/api/project'
import { SliderPagination } from '@components/common/Slider/Pagination'
import useTranslation from 'next-translate/useTranslation'
import { ProjectCategory } from '@utils/api/projects'
import { gridConfig } from '@utils/constants'

export const RecommendedProjects: FC<{
  projects: Project[]
  setRef: (r: any) => void
  beforeChange: (n: number) => void
  onLeft: any
  onRight: any
}> = ({
  projects = [],
  beforeChange,
  setRef,
  onLeft = () => {},
  onRight = () => {}
}) => {
  const projectsList = projects.map(
    ({ id, title, image, phone, phoneLabel, features, link }) => (
      <ProjectCard
        key={title}
        slideable={true}
        onLeft={onLeft}
        onRight={onRight}
        image={image}
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
      infinite={false}
      className={slider()}
      variableWidth={true}
      setRef={setRef}
      beforeChange={(_, nextSlide) => beforeChange(nextSlide)}
    >
      {projectsList}
    </Slider>
    <DWrapper>
    <DesktopSlider>
    {projectsList}
    </DesktopSlider>
    </DWrapper>

    </>
  )
}

export const Projects: FC<{
  projects: { data: Project[]; total: number }
  categories: ProjectCategory[]
  featured: Project[]
  page?: number
  categoryId?: number | null
}> = ({ projects, featured, categories, page, categoryId }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)
  const { t } = useTranslation('projects')

  const recommendedProjects = projects.data.slice(0, 3)

  const totalSlides = recommendedProjects.length

  const prevSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickPrev()
  }

  const nextSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickNext()
  }

  const sliderPagination = (
    <SliderPagination
      css={{
        display: 'none',
        mt: -10,
        '@md': {
          display: 'flex'
        }
      }}
      current={currentSlide}
      total={totalSlides}
      onPrevSlide={prevSlide}
      onNextSlide={nextSlide}
    />
  )

  return (
    <Wrapper>
      {recommendedProjects.length > 0 && (
        <ProjectsSection
          title={t('section')}
          // button={sliderPagination}
        >
          <RecommendedProjects
            projects={featured}
            setRef={(r) => (sliderRef.current = r)}
            beforeChange={(n) => setCurrentSlide(n)}
            onRight={nextSlide}
            onLeft={prevSlide}
          />
        </ProjectsSection>
      )}
      <ProjectsList
        projects={projects}
        categories={categories}
        page={page}
        categoryId={categoryId}
        className={list()}
      />
    </Wrapper>
  )
}
const lgOffset = (7 * (gridConfig.containerWidths.lg as number)) / 12

const DWrapper = styled('div',{
  width:'100%',
  overflow:'visible'
})

const DesktopSlider = styled('div',{
  overflowX:'scroll',
  display:'none',
  gap:64,
  marginTop: 40,
  paddingBottom:40,
  scrollbarWidth: 'thin',
  scrollbarColor: "#120f82 black",

  "> div:first-of-type":{
    ml: `calc(50vw - ${lgOffset}px)`,
  },
  
  "@lg":{
    display:'flex',
  }
})

const ProjectsSection = styled(Section, {
  '#head': {
    '&:before': {
      background: 'none !important'
    },
    h2: {
      background: '$background',
      padding: '0 20px',
      marginLeft: '-20px'
    },
    div: {
      marginTop: 0,
      '&:before': {
        content: '',
        position: 'absolute',
        width: 20,
        height: 20,
        right: 100,
        background: '$background'
      },
      '&:after': {
        content: '',
        position: 'absolute',
        width: 20,
        height: 20,
        right: -20,
        background: '$background'
      }
    }
  }
})
const Wrapper = styled('div', {
  color: '$accent',
  pt: 210,

  [`& ${SectionHeadContent}`]: {
    display: 'flex',
    width: '100%'
  }
})

const list = css({
  mt: 32,

  '@md': {
    mt: 56
  },

  '@lg': {
    mt: 63
  }
})

const sliderCard = css({
  mr: 6,
  ml: 8,

  '@md': {
    ml: 0,
    mr: 0
  }
})

const slider = css({
  mt: 40,

  '.slick-list': {
    px: 'calc(50vw - 188px)'
  },

  [`& ${StyledProgressBar}`]: {
    width: 360,
    mx: 'auto'
  },

  '@md': {
    [`& ${StyledProgressBar}`]: {
      width: 640
    },

    '.slick-slide:not(:last-child)': {
      mr: 26
    },

    '.slick-track': {
      '&:before, &:after': {
        display: 'none'
      }
    },

    '.slick-list': {
      px: 'calc(50vw - 319px)'
    }
  },

  '@lg': {
    display:'none',
    [`& ${StyledProgressBar}`]: {
      width: 1160
    },

    '.slick-slide:not(:last-child)': {
      mr: 60
    },

    '.slick-list': {
      px: 'calc(50vw - 580px)'
    }
  }
})
