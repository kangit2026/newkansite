import { Col, Grid } from '@ui'
import { Section, Title } from '@components/home/Section'
import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import { AddressContainer } from './AddressContainer/AddressContainer'
import { List } from './List/List'
import { TextContent } from './TextContent/TextContent'
import { VideoContent } from './VideoContent/VideoContent'
import useTranslation from 'next-translate/useTranslation'

export const GeneralContractors: FC = () => {
  const { t } = useTranslation('general')
  const activities: string[] =
    t('activity.items', null, {
      returnObjects: true,
      fallback: ''
    }) || []

  return (
    <Wrapper>
      <Section
        title={t('heading')}
        buttonTitle=""
        className={classContainer()}
      >
        <Grid className={undefined} >
          <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 10, start: 2 }} xl={{ span: 10, start: 2 }}>
          <TextContent />
          </Col>
          {/* <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 5, start: 8 }}>
            <VideoWrapper className={headingVideo()}>
              <ImageLogo src="/general/kan-logo-yellow.svg" />
              <VideoContent
                className={videoWrapperFirst()}
                video="/general/kan-video.mp4#t=0.001"
              />
            </VideoWrapper>
          </Col> */}
        </Grid>
      </Section>
      <Section
        title="kanbud.com.ua"
        buttonTitle=""
        className={classContent()}
      >
        <Grid className={undefined} >
          <Col className={undefined} 
            xs={{ span: 12, start: 2 }}
            md={{ span: 12, start: 2 }}
            lg={{ span: 12, start: 2 }}
            xl={{ span: 12, start: 2 }}
          >
            <p className={textContent()}>{t('experience')}</p>
            <Container>
                <p >
                  {t('activity.title')}:
                </p>
                <List items={activities} />
              </Container>
          </Col>
        </Grid>






        <Grid className={undefined} >
          <Col className={undefined} 
            xs={{ span: 12, start: 2 }}
            md={{ span: 12, start: 2 }}
            lg={{ span: 12, start: 2 }}
            xl={{ span: 12, start: 2 }}
          >
            <TextWrapper>
              <p className={textContentSecond()}>{t('management')}</p>
              <p className={textLicense()}>{t('license')}</p>
            </TextWrapper>
            <Line />
          </Col>
        </Grid>
        <AddressContainer />
      </Section>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  color: '$accent',
  overflow: 'hidden'
})

const classContainer = css({
  pt: 180,

  [`& ${Title}`]: {
    lineHeight: '1.5em'
  },
  '@md': {
    pt: 160
  },
  '@lg': {
    pt: 280
  }
})

const ImageLogo = styled('img', {
  position: 'absolute',
  right: 60,
  top: 43,
  width: '60px',
  height: '85px',
  zIndex: 1,
  '@md': {
    width: '128px',
    height: '181px',
    right: 128,
    top: 89
  }
})

const VideoWrapper = styled('div', {
  '@md': { top: 0, right: 0, left: 0, bottom: 0 },
})

const headingVideo = css({
  mt: 16,

  '@md': {
    mt: 40,
    width: 640
  },

  '@lg': {
    width: '50vw',
    maxWidth: 720
  }
})

const videoWrapper = css({
  width: '100vw',
  left: 'calc(149px - 50vw) !important',
  position: 'relative',
  mt: 59,

  '@md': {
    height: 'fit-content',
    left: 'calc(383px - 50vw) !important',
    mt: 64
  },
  '@lg': {
    height: 'fit-content',
    left: 'calc(500px - 50vw) !important',
    mt: 64
  },


  '@xl': {
    left: 'calc(695px - 50vw) !important',
    mt: 85
  }
})

const videoWrapperFirst = css({
  width: 300,
  position: 'relative',

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    background:
      'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 79.91%)',
    top: 0,
    right: 0,
    left: 0,
    bottom: 4
  },

  '@md': {
    width: 640,

    '&:before': {
      content: '',
      display: 'block',
      position: 'absolute',
      background:
        'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 79.91%)',
      top: 0,
      right: 0,
      left: 0,
      bottom: 4
    }
  },

  '@lg': {
    width: '100%'
  }
})
const videoWrapperSecond = css({
  height: '784px',

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    background:
      'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },

  '@md': {
    height: '572px',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    right: 0,
    bottom: 0,
    '&:before': {
      content: '',
      display: 'block',
      background:
        'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
      transform: 'matrix(-1, 0, 0, 1, 0, 0)',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      mt: 0,
      ml: 0,
      mb: 0
    }
  },
  '@lg': {
    '&:before': {
      content: '',
      background:
        'linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)',
      transform: 'matrix(1, 0, 0, 1, 0, 0)'
    }
  }
})

const classContent = css({
  pt: 45,
  pl: 2,
  [`& ${Title}`]: {
    lineHeight: '1.5em'
  },
  '@md': {
    position: 'relative',
    pt: 58
  },
  '@lg': {
    position: 'relative',
    pt: 90
  }
})

const textContent = css({
  fontSize: '16px',
  lineHeight: '1.5em',
  textAlign: 'justify',
  padding: '8px 30px 0px 0px',

  '@md': {
    padding: '22px 64px 0px 0px'
  },

  '@lg': {
    fontWeight: 350,
    fontSize: '20px',
    lineHeight: '1.6em',
    // letterSpacing: '-0.06em',
    ml: -1,
    padding: '24px 117px 0px 0px'
  }
})

const textContentSecond = css({
  fontWeight: 350,
  fontSize: '16px',
  lineHeight: '1.6em',
  textAlign: 'justify',
  pt: 49,
  pr: 31,

  '@md': {
    pt: 0,
    pr: 65
  },

  '@lg': {
    ml: 1,
    pt: 24,
    pr: 118,
    fontSize: '20px',
    lineHeight: '1.49em',
    letterSpacing: '0.01em'
  }
})

const Container = styled('div', {

  zIndex: 1,
  padding:"8px 30px 0px 0px",
'p':{
  position:"relative",

},
textAlign:'justify',
  'li':{
    color:'$accent !important',
    fontSize: '16px !important',
  },
  'ul':{
padding:'0',
textAlign:'left',

  },

  '@md': {
    letterSpacing: '0.004em',
    mt: 9,
  padding:"22px 64px 0px 0px",

    // width: 640,
  },

  '@lg': {
    // width: 580,
    marginLeft: '0',
padding:'24px 117px 0px 0px',
    fontWeight: 400,
    lineHeight: '32px',
    fontSize: '20px !important',

    'li':{
      fontSize: '20px !important',
    },
  }
})


const textLicense = css({
  fontSize: '16px',
  lineHeight: '1.62em',
  color: '#9B9DB2',
  pt: 61,
  pr: 54,
  '@md': {
    pt: 53,
    pr: 77,
    ml: -1
  },
  '@lg': {
    fontWeight: 400,
    fontSize: '15px',
    letterSpacing: '0.02em',
    pt: 50,
    pr: 511
  }
})

const TextWrapper = styled('div', {
  '@md': {
    // mt: 652,
    ml: -1,
    pb: 22
  }
})

const Line = styled('div', {
  width: '300px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  pt: 27,
  mb: 8,

  '@md': {
    width: '640px',
    pt: 42
  },

  '@lg': {
    width: '1161px',
    pt: 69
  }
})
