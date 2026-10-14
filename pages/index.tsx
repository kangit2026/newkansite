import React, { useEffect, useRef, useState } from 'react'
import { Col, Grid } from '@ui'
import { HeroShot } from '@components/home/HeroShot'
import { RecommendedProjects } from '@components/projects'
import { Advertisement } from '@components/home/Advertisement'
import { News } from '@components/home/News'
import useTranslation from 'next-translate/useTranslation'
import {
  Partnership,
  PartnershipImage,
  PartnershipType
} from '@components/home/Partnership'
import { css } from 'stitches.config'
import { Section } from '@components/home/Section'
import { getNews } from '@utils/api/news'
import {
  getFeaturedProjects,
  getProjectsCategories
} from '@utils/api/projects'
import { getPartnership } from '@utils/api/project'
import { getSettings, SiteSettings } from '@utils/api/settings'

const parsePartnerships = async () => {
  const data = await getPartnership()
  return data
}

export default function Home({
  news,
  projects,
  home,
  commercialAd
}: {
  news: any
  projects: any
  home?: SiteSettings['home']
  commercialAd?: SiteSettings['commercialAd']
}) {
  const [partnerships, setPartnerships] = useState([])

  useEffect(() => {
    parsePartnerships().then((data) => {
      setPartnerships(data)
    })
  }, [])

  const { t } = useTranslation('home')
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
  // const partnerships: PartnershipType[] =
  //   t('partnerships', null, {
  //     returnObjects: true,
  //     fallback: ''
  //   }) || []

  return (
    <div>
      <HeroShot
        motto={home?.motto}
        awardsTitle={home?.awardsTitle}
        awards={home?.awards}
        videoUrl={home?.video}
      />
      {projects.length > 0 && (
        <Section
          title={t('common:projects.title')}
          buttonTitle={t('common:projects.more_button')}
          buttonLink="/projects"
          className={projectsSection()}
        >
          {/* <Projects projects={projects} />
           */}
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
      )}
      <Advertisement
        title={commercialAd?.title || ''}
        className={advertisementCommercial()}
        link={commercialAd?.link || '/platform'}
        variant="dashed"
      />
      {news.length > 0 && (
        <News news={news} className={newsSection()} />
      )}
      {partnerships.length && (
        <Grid className={partnership()}>
          <Col className={undefined}  xs={{ span: 10, start: 2 }}>
            <Partnership
              list={partnerships}
              css={{
                [`& ${PartnershipImage}`]: {
                  width: 240,
                  height: 'auto',

                  '@md': {
                    width: 326,
                    height: 165
                    // right: -35
                  },

                  '@lg': {
                    width: 334,
                    height: 168,
                    right: 'unset',
                    mt: 19
                  }
                }
              }}
            />
          </Col>
        </Grid>
      )}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const [news, projects, settings] = await Promise.all([
    getNews({ ctx }),
    getFeaturedProjects(ctx),
    getSettings({ ctx })
  ])

  return {
    props: {
      news: news?.data,
      projects,
      home: settings?.home || null,
      commercialAd: settings?.commercialAd || null,
      seo: {
        title: settings?.home?.metaTitle || null,
        description: settings?.home?.metaDescription || null,
        ogImage: settings?.home?.ogImage || null
      }
    }
  }
}

const advertisementCommercial = css({
  mt: 56,

  '@md': {
    mt: 72
  },

  '@lg': {
    mt: 16
  }
})

const projectsSection = css({
  mt: 46,

  '@md': {
    mt: 20
  },

  '@lg': {
    mt: 57
  }
})

const newsSection = css({
  mt: 52,

  '@md': {
    mt: 64
  },

  '@lg': {
    mt: 63
  }
})

const partnership = css({
  mt: 39,

  '@md': {
    mt: 64
  },

  '@lg': {
    mt: 80
  }
})
