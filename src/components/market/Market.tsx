import React, { FC } from 'react'
import { Col, Grid } from '@ui'
import { css, styled } from 'stitches.config'
import { AdaptiveImage } from '@components/common/AdaptiveImage'
import type { MarketPageContent } from '@utils/api/market'

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

type Props = {
  content?: MarketPageContent
}

const Market: FC<Props> = ({ content }) => {
  const pros = (content?.prosItems || []).filter(Boolean)
  const badge = content?.badge || ''
  const title = content?.title || ''
  const sellText = content?.sellText || ''
  const question = content?.question || ''
  const answer = content?.answer || ''
  const contactLabel = content?.contactLabel || ''
  const prosTitle = content?.prosTitle || ''
  const trustText = content?.trustText || ''
  const phone = content?.phone || ''

  return (
    <Wrapper>
      <Background>
        {content?.heroImage ? (
          <img src={content.heroImage} alt={content.heroImageAlt || content.title || ''} className={bgImage()} />
        ) : (
          <AdaptiveImage
            className={bgImage()}
            srcSet={require('@assets/market/bg.png?srcset')}
            themed={false}
          />
        )}
        <Overlay />
        <Grid className={undefined}>
          <Col className={undefined} xs={{ span: 10, start: 2 }}>
            <Service>
              <span>{badge}</span>
            </Service>
            <Title>{title}</Title>
          </Col>
        </Grid>
      </Background>
      <Grid className={undefined}>
        <Col
          className={undefined}
          xs={{ span: 10, start: 2 }}
          md={{ span: 3, start: 2 }}
          lg={{ span: 5, start: 2 }}
        >
          <Text>{sellText}</Text>
        </Col>
        <Col
          className={undefined}
          xs={12}
          md={{ span: 6, start: 6 }}
          lg={{ span: 5, start: 7 }}
        >
          <Contact>
            <span>
              {question}
              <br /> {answer}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 7.23258L0.732502 9.00008L9.11625 17.3838L17.5 9.00008L15.7325 7.23258L10.3663 12.5988L10.3663 0.616333L7.86625 0.616333L7.86625 12.5988L2.5 7.23258Z"
                fill="white"
              />
            </svg>
            {contactLabel ? (
              <span style={{ marginTop: 0 }}>{contactLabel}:</span>
            ) : null}
            {phone ? (
              <Number as="a" href={toTelHref(phone)}>
                {phone}
              </Number>
            ) : (
              <Number />
            )}
          </Contact>
        </Col>
        {pros.length > 0 && (
          <>
            <Col
              className={undefined}
              xs={{ span: 10, start: 2 }}
              md={{ span: 7, start: 2 }}
              lg={{ span: 5, start: 2 }}
            >
              {prosTitle ? (
                <SemiTitle className={worth()}>{prosTitle}:</SemiTitle>
              ) : null}
            </Col>
            <Col
              className={undefined}
              xs={{ span: 10, start: 2 }}
              md={{ span: 7, start: 2 }}
            >
              <Pros>
                {pros.map((item, index) => (
                  <ProsItem key={`${item}-${index}`}>
                    - {item}
                    {index == pros.length - 1 ? '.' : ';'}
                  </ProsItem>
                ))}
              </Pros>
            </Col>
          </>
        )}
        <Col className={undefined} xs={{ span: 10, start: 2 }}>
          <SemiTitle>{trustText}</SemiTitle>
        </Col>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  color: '$accent'
})

const Number = styled('div', {
  textDecoration: 'none',
  fontSize: '32px',
  alignItems: 'center',
  textAlign: 'center',
  letterSpacing: '-0.01em',
  color: '#FFFFFF',
  width: '100%',
  display: 'block',
  height: '64px',
  lineHeight: '64px',
  fontWeight: '300',
  '@lg': {
    fontSize: '52px',
    lineHeight: '64px',
    marginTop: '24px'
  }
})

const Contact = styled('div', {
  height: '304px',
  color: '#fff',
  background: 'linear-gradient(180deg, #35AC56 37.26%, #278742 100%)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  span: {
    fontSize: '16px',
    lineHeight: '24px',
    marginTop: 48,
    textAlign: 'center',
    width: '100%'
  },
  svg: {
    margin: '30px auto'
  },
  '@md': {
    marginTop: -48,
    height: '297px'
  },

  '@lg': {
    span: {
      marginTop: 64,
      fontSize: '24px',
      lineHeight: '36px'
    },
    svg: {
      margin: '36px auto'
    },
    position: 'relative',
    left: '58px',
    height: 424
  }
})

const Text = styled('div', {
  margin: '40px auto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '24px',
  display: 'flex',
  flexDirection: 'column',

  '@md': {
    marginTop: 64
  }
})

const SemiTitle = styled(Text, {
  fontSize: '24px',
  lineHeight: '32px',
  '@lg': {
    fontSize: '29px'
  }
})

const worth = css({
  margin: '56px 0 24px 0 !important',

  '@lg': {
    marginTop: '-200px !important'
  }
})

const Pros = styled(Text, {
  margin: '0 !important',

  '@lg': {
    marginTop: '-100px !important'
  }
})

const ProsItem = styled('span', {
  '&:not(:last-child)': {
    mb: 10
  }
})

const Service = styled('div', {
  display: 'flex',
  position: 'absolute',
  width: '180px',
  height: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '200px',
  background: '#35AC56',
  borderRadius: '20px',
  textTransform: 'uppercase',

  '@md': {
    left: 'unset',
    transform: 'unset',
    bottom: 240
  },

  '@lg': {
    bottom: 328,
    fontSize: '16px',
    lineHeight: '20px'
  },

  span: {
    height: 'fit-content',
    margin: 'auto',
    color: '#fff'
  }
})

const Title = styled('span', {
  position: 'absolute',
  fontWeight: '300',
  fontSize: '48px',
  lineHeight: '56px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  color: '#FFFFFF',
  bottom: 72,

  '@md': {
    width: 100,
    bottom: 96,
    fontSize: '56px',
    lineHeight: '64px',
    textAlign: 'left'
  },

  '@lg': {
    fontSize: '96px',
    lineHeight: '112px'
  }
})

const Overlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(180deg, rgba(0, 0, 0, 0) 59.72%, #000000 100%)',
  '@md': {
    background:
      'linear-gradient(223.5deg, rgba(0, 0, 0, 0) 54.89%, #000000 91.92%)'
  },
  '@lg': {
    background:
      'linear-gradient(238.85deg, rgba(0, 0, 0, 0) 39.7%, #000000 94.07%)'
  }
})

const Background = styled('div', {
  position: 'relative',
  width: '100%',
  height: 'auto'
})

const bgImage = css({
  display: 'flex',
  width: '100%',
  height: '100%'
})

export default Market
