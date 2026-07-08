import React, { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { styled, css } from 'stitches.config'
import { Col, Grid } from '@ui'
import { Article } from './Article'
import { featuredNewsCount, newsCount, NewsInfo } from '@utils/api/news'
import { Section } from '../Section'
import useTranslation from 'next-translate/useTranslation'
import { Pagination } from '@components/common/Pagination'
import { ScrollAnchor } from '@components/common/ScrollAnchor'
import { scrollToElement } from '@utils/helpers/animations'
import cx from 'classnames'

type ArticlesProps = {
  news: { data: NewsInfo[]; total: number }[]
  page?: number
}

const getPageHref = (page: number) =>
  page > 0 ? `/news?page=${page + 1}` : '/news'

const Articles: FC<ArticlesProps> = ({
  news = [
    { data: [], total: 0 },
    { data: [], total: 0 }
  ],
  page: currentPage = 0
}) => {
  const { t } = useTranslation('news')
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const anchorRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url.split('?')[0] === router.pathname) setIsNavigating(true)
    }
    const handleDone = () => setIsNavigating(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleDone)
    router.events.on('routeChangeError', handleDone)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleDone)
      router.events.off('routeChangeError', handleDone)
    }
  }, [router])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    scrollToElement(anchorRef.current)
  }, [currentPage])

  const [
    { data: newsItems = [], total = 0 },
    { data: featuredNews = [], total: featuredTotal = 0 }
  ] = news
  const pagesCount = Math.max(
    Math.ceil(total / newsCount),
    Math.ceil(featuredTotal / featuredNewsCount)
  )

  return (
    <Section
      title={t('heading')}
      buttonTitle=""
      className={projectsSection()}
    >
      <div className={articles()}>
        <Wrapper>
          <ScrollAnchor ref={anchorRef} />
          <Grid className={undefined} >
            <Col className={undefined}  xs={12} lg={{ span: 5, start: 2 }}>
              <div className={newsList()}>
                {newsItems.map(
                  ({
                    id,
                    slug,
                    description,
                    date,
                    tags,
                    title,
                    link,
                    image,
                    bigPicture,
                    nextSlug,
                    prevSlug
                  }) => (
                    <Article
                      key={id}
                      id={id}
                      slug={slug}
                      description={description}
                      date={date}
                      tags={tags}
                      title={title}
                      link={link}
                      image={image}
                      bigPicture={bigPicture}
                      nextSlug={nextSlug}
                      prevSlug={prevSlug}
                    />
                  )
                )}
              </div>
            </Col>
            <Col className={undefined}  xs={12} lg={{ span: 5, start: 7 }}>
              <div className={cx(newsList(), important())}>
                <div>
                  {featuredNews.map(
                    ({
                      id,
                      slug,
                      description,
                      date,
                      tags,
                      title,
                      link,
                      image,
                      bigPicture,
                      nextSlug,
                      prevSlug
                    }) => (
                      <Article
                        key={id}
                        id={id}
                        slug={slug}
                        description={description}
                        date={date}
                        tags={tags}
                        title={title}
                        link={link}
                        image={image}
                        bigPicture={bigPicture}
                        nextSlug={nextSlug}
                        prevSlug={prevSlug}
                      />
                    )
                  )}
                </div>
              </div>
            </Col>
            <Col className={undefined}  xs={12}>
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                isLoading={isNavigating}
                getHref={getPageHref}
              />
            </Col>
          </Grid>
        </Wrapper>
      </div>
    </Section>
  )
}

const projectsSection = css({
  marginTop: 228
})

const articles = css({
  marginTop: 64
})

const Wrapper = styled('div', {
  color: '$accent',
  position: 'relative'
})

const newsList = css({
  display: 'flex',
  flexDirection: 'column',

  '.item': {
    marginBottom: '56px',

    '.illustration': {
      display: 'flex',
      width: '100%',
      background: '$background'
    },

    '&--tags-item,&--title,&--date,&--link ': {
      fontSize: '13px',
      lineHeight: '16px'
    },

    '.date': {
      fontWeight: 'normal'
    },

    '.tags': {
      display: 'flex',
      '.taagsitem': {
        fontWeight: 600,
        textAlign: 'right',
        textTransform: 'uppercase'
      }
    },

    '.dot': {
      width: '4px',
      height: '4px',
      background: '#c4c4c4',
      transform: 'rotate(45deg) skew(10deg, 10deg)',
      display: 'inline-flex',
      margin: 'auto 8px'
    },

    '.link': {
      marginTop: '16px',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '20px',
      color: '$link'
    },

    '.title': {
      marginTop: '24px',
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px'
    },

    '.stats': {
      marginTop: '16px'
    },
    '@lg': {
      marginBottom: '30px',
      display: 'flex',

      '.illustration': {
        width: '196px',
        height: '117px',
        marginTop:30
      },

      '.tags-item, .title:, .date:,.link': {
        fontSize: '16px',
        lineHeight: '20px'
      },

      '.title': {
        fontSize: '21px',
        lineHeight: '26px',
        marginTop: '24px'
      },

      '.stats': {
        margin: '16px 0 0 24px'
      },

      '.link': {
        fontSize: '14px',
        marginTop: 'auto',
        marginBottom: '16px'
      },

      '.dot': {
        margin: 'auto 14px',
        borderRadius: '50%',
        transform: 'none'
      }
    },

    '@xl': {
      marginBottom: '30px',
      display: 'flex',

      '.illustration': {
        width: '296px',
        height: '217px'
      },

      '.tags-item, .title:, .date:,.link': {
        fontSize: '16px',
        lineHeight: '20px'
      },

      '.title': {
        fontSize: '21px',
        lineHeight: '26px',
        marginTop: '24px'
      },

      '.stats': {
        margin: '16px 0 0 24px'
      },

      '.link': {
        fontSize: '14px',
        marginTop: 'auto',
        marginBottom: '16px'
      },

      '.dot': {
        margin: 'auto 14px',
        borderRadius: '50%',
        transform: 'none'
      }
    }
  }
})

const important = css({
  position: 'relative',

  '@lg': {
    ml: 56,

    '.item': {
      flexDirection: 'column',
      marginBottom: '61px',

      '.illustration': {
        width: '100% !important',
        height: 'auto !important',
        marginTop:0
      },

      '.title': {
        fontSize: '26px',
        lineHeight: '32px',
        marginTop: '27px'
      },

      '.stats': {
        margin: '33px 0 0 0'
      },

      '.link': {
        marginTop: '24px',
        marginBottom: 0
      }
    }
  }
})

export default Articles
