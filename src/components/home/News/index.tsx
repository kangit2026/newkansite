import { NewsCard } from '@components/common/NewsCard'
import React, { FC, HTMLAttributes } from 'react'
import { NewsInfo } from '@utils/api/news'
import { Section } from '../Section'
import { Col, Grid } from '@ui'
import { styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

type News = {}

type NewsProps = HTMLAttributes<HTMLDivElement> & {
  news: News[]
}

export const News: FC<NewsProps> = ({ news, ...props }) => {
  const { t } = useTranslation('common')

  return (
    <Section
      title={t('news.title')}
      buttonTitle={t('news.more_button')}
      buttonLink="/news"
      {...props}
    >
      <Grid className={undefined} >
        <Col className={undefined}  xs={12} md={{ span: 10, start: 2 }}>
          <NewsList>
            {news.map(
              (
                { id, title, date, image, imageAlt, link, tags }: NewsInfo,
                i
              ) => (
                <NewsCard
                  key={`${id}${date}${title}`}
                  title={title}
                  date={date}
                  image={image}
                  imageAlt={imageAlt}
                  link={link}
                  tags={tags}
                  order={i % 2 ? 'even' : 'odd'}
                />
              )
            )}
          </NewsList>
        </Col>
      </Grid>
    </Section>
  )
}

const NewsList = styled('div', {
  mt: 28,

  '@md': {
    mt: 32,
    mx: -24,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    background: '$background'
  },

  '@md-only': {
    [`& ${NewsCard}`]: {
      '&:nth-child(3)': {
        display: 'none'
      }
    }
  },

  '@lg-only': {
    [`& ${NewsCard}`]: {
      '&:nth-child(3)': {
        display: 'none'
      }
    }
  },

  '@xl': {
    mt: 46,
    mx: -32,
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
})
