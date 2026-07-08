import { Col, Grid } from '@ui'
import React, { FC, useRef, useState } from 'react'
import { MeritSection } from '../MeritSection/MeritSection'
import { TextContent } from './TextContent/TextContent'
import { TitleContent } from './TitleContent/TitleContent'
import { Projects } from '@components/home/Projects'
import { SectionNow } from './SectionNow/SectionNow'
import { css, styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'
import { TagLine } from '../DevelopAccompaniment/TagLine'
import { Section } from '@components/home/Section'
import { ScrollAnchor } from '../ScrollAnchor'
import { RecommendedProjects } from '@components/projects'
import { AboutPageContent } from '@utils/api/about'

export const About: FC<{
  projects: any
  content?: AboutPageContent
}> = ({ projects, content }) => {
  const anchorRef = useRef(null)
  const { t } = useTranslation('about')

  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // const recommendedProjects = projects.data.slice(0, 3)

  const prevSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickPrev()
  }

  const nextSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickNext()
  }

  return (
    <>
      <BackgroundImg>
        <TitleContent
          anchorRef={anchorRef}
          motto={content?.motto}
          heading={content?.heading}
        />
      </BackgroundImg>
      <Grid className={undefined} >
        <Col className={undefined}  md={{ span: 10, start: 2 }} xs={{ span: 10, start: 2 }}>
          <ScrollAnchor
            ref={anchorRef}
            css={{
              top: -90,
              '@md': { top: -68 },
              '@lg': { top: -134 }
            }}
          />
          <TextContent>
            <p>{content?.history || t('history')}</p>
            <p>{content?.specialists || t('specialists')}</p>
          </TextContent>
        </Col>
      </Grid>
      <SectionNow
        title={content?.today?.title}
        description={content?.today?.description}
      />
      <Section
        title={t('common:projects.title')}
        buttonTitle={t('common:projects.more_button')}
        buttonLink="/projects"
        className={projectsSection()}
      >
          <RecommendedProjects
            projects={projects}
            setRef={(r) => (sliderRef.current = r)}
            beforeChange={(n) => setCurrentSlide(n)}
            onRight={nextSlide}
            onLeft={prevSlide}
            // featured={projects}
            // categories={categories}
          />
      </Section>
      <MeritSection
        title={content?.merit?.title}
        description={content?.merit?.description}
        list={content?.merit?.list}
      />
      <TagLine text={content?.achievementsText} />
    </>
  )
}

const projectsSection = css({
  mt: 30
})

const BackgroundImg = styled('div', {
  maxHeight: '714px',
  height: '100vh',
  background:
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/about/kan-about.png) no-repeat',
  backgroundSize: 'cover',

  '@md': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '458px',
    height: '100vh',
    background:
      'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(/about/kan-about-md.png) no-repeat',
    backgroundSize: 'cover'
  },

  '@lg': {
    maxHeight: '682px',
    width: '100%',
    background:
      'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.3)), url(/about/kan-about-lg.png) no-repeat',
    backgroundSize: 'cover'
  }
})
