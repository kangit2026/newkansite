import { Col, Grid } from '@ui'
import { ArrowLink } from '@components/common/ArrowLink'
import { NewsInfo } from '@utils/api/news'
import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import { ContentNews } from '../Content/ContentNews'

export const HeaderNewsItem: FC<{ details: NewsInfo }> = ({
  details = {}
}) => {
  const {
    id,
    title,
    date,
    description,
    tags,
    image,
    imageAlt,
    externalLink,
    prevSlug,
    nextSlug
  }:any = details

  const prevHref = prevSlug ? `/news/${prevSlug}` : undefined
  const nextHref = nextSlug ? `/news/${nextSlug}` : undefined

  return (
    <Wrapper>
      <Grid className={undefined} >
        <Col className={undefined}  xs={{ span: 12, start: 2 }}>
          <Component>
            <NewsHeader>{tags[0]}</NewsHeader>
            <Circle />

            <DateText>{date}</DateText>
          </Component>
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }} md={{ span: 8, start: 3 }}>
          {prevHref && (
            <ArrowLink
              href={prevHref}
              className={`${arrowLeft({
                tablet: true
              })} d-none d-md-flex`}
            />
          )}
          <TextHeader>{title}</TextHeader>
          {nextHref && (
            <ArrowLink
              href={nextHref}
              className={`${arrowRight({
                tablet: true
              })} d-none d-md-flex`}
            />
          )}
        </Col>
        <Col   xs={{ span: 1, start: 10 }} className="d-md-none">
          {prevHref && <ArrowLink href={prevHref} className={arrowLeft()} />}
        </Col>
        <Col   xs={{ span: 1, start: 11 }} className="d-md-none">
          {nextHref && <ArrowLink href={nextHref} className={arrowRight()} />}
        </Col>
        <ContentNews
          title={title}
          description={description}
          image={image}
          imageAlt={imageAlt}
          link={externalLink}
        />
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  color: '$accent'
})

const Component = styled('div', {
  display: 'flex',
  alignItems: 'center',
  pt: 180,
  ml: 2,
  '@md': {
    justifyContent: 'center',
    pt: 156,
    ml: -48
  },
  '@lg': {
    pt: 214,
    ml: -100
  }
})
const NewsHeader = styled('div', {
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px'
})
const Circle = styled('div', {
  width: 4,
  height: 4,
  background: '#B6C2E0',
  borderRadius: '50%',
  mr: 14,
  ml: 14
})

const DateText = styled('div', {
  fontSize: '16px',
  lineHeight: '20px'
})

const TextHeader = styled('h3', {
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '1.12em',
  mt: 34,
  ml: 2,

  '@md': {
    fontSize: '42px',
    lineHeight: '53px',
    mt: 24,
    ml: 11
  },

  '@lg': {
    fontSize: '48px',
    lineHeight: '1.11em',
    letterSpacing: '-2.8px',
    textAlign: 'center',
    mt: 16,
  },

  '@xl': {
    width: '712px',
    fontSize: '56px',
    lineHeight: '1.11em',
    letterSpacing: '-2.8px',
    textAlign: 'center',
    mt: 16,
    ml: 107
  }
})

const arrowLeft = css({
  display: 'block',
  width: '11px !important',
  height: '13px !important',
  margin: '61px 0 0 10px  !important',
  transform: 'rotate(220deg) skew(10deg, 10deg) !important',
  borderColor: '$accent',

  '@md': {
    width: '16px !important',
    height: '16px !important',
    position: 'absolute',
    top: '50%',
    left: -63,
    m: '4px 0 0 0!important'
  },

  '@lg': {
    width: '19px !important',
    height: '20px !important',
    left: -116
  }
})

const arrowRight = css({
  display: 'block',
  width: '11px !important',
  height: '13px !important',
  margin: '61px 0 0 30px  !important',
  borderColor: '$accent',

  '@md': {
    width: '16px !important',
    height: '16px !important',
    position: 'absolute',
    top: '50%',
    right: -63,
    m: '4px 0 0 0!important'
  },
  '@lg': {
    width: '19px !important',
    height: '20px !important',
    right: -116
  }
})
