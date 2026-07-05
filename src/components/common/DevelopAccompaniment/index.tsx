import { Col, Grid } from '@ui'
import { Section } from '@components/home/Section'
import React, { FC, useRef, useEffect } from 'react'
import { styled, css } from 'stitches.config'
import { MeritSection } from '../MeritSection/MeritSection'
import { AwardsIcons } from './AwardsIcons'
import { ListContent } from './ListContent/ListContent'
import { TagLine } from './TagLine'
import { TextContent } from './TextContent/TextContent'
import useTranslation from 'next-translate/useTranslation'

export const DevelopAccompaniment: FC = () => {
  const videoWrapperRef = useRef(null)
  const videoRef = useRef(null)
  const { t } = useTranslation('develop')

  // useEffect(() => {
  //   // window.addEventListener('scroll', () => {
  //   //   console.log('scrolling')
  //   //   if (
  //   //     videoWrapperRef.current &&
  //   //     videoRef.current &&
  //   //     videoRef.current.duration
  //   //   ) {
  //   //     console.log('trying to startt the video...')
  //   //     videoRef.current.play()
  //   //   }
  //   // })
  //   // return () => {
  //   //   videoRef.current.pause()
  //   // }
  //   // window.addEventListener('scroll', () => {
  //   //   const top = () => {
  //   //     if (
  //   //       videoWrapperRef.current &&
  //   //       videoRef.current &&
  //   //       videoRef.current.duration
  //   //     ) {
  //   //       // videoRef.current.play()
  //   //       const fps = 30
  //   //       const ratio = 10
  //   //       const topPos =
  //   //         videoWrapperRef.current.getBoundingClientRect().top
  //   //       const videoHeight = videoRef.current.clientHeight

  //   //       const framesCount = Math.floor(
  //   //         fps * videoRef.current.duration * ratio
  //   //       )

  //   //       let progress =
  //   //         (window.innerHeight - topPos - videoHeight) %
  //   //         (framesCount * 2)

  //   //       if (progress >= framesCount) {
  //   //         progress = framesCount * 2 - progress
  //   //       }

  //   //       const nextTime = progress / (ratio * fps)

  //   //       videoRef.current.currentTime = nextTime
  //   //     }

  //   //     return requestAnimationFrame(top)
  //   //   }

  //   //   const requestId = top()

  //   //   // const requestId = top()

  //   //   // return () => cancelAnimationFrame(requestId)
  //   // })
  //   return () => {
  //     videoRef.current.pause()
  //   }
  //   // const top = () => {
  //   //   if (
  //   //     videoWrapperRef.current &&
  //   //     videoRef.current &&
  //   //     videoRef.current.duration
  //   //   ) {
  //   //     videoRef.current.play()
  //   //     // const fps = 24
  //   //     // const ratio = 40
  //   //     // const topPos =
  //   //     //   videoWrapperRef.current.getBoundingClientRect().top
  //   //     // const videoHeight = videoRef.current.clientHeight

  //   //     // const framesCount = Math.floor(
  //   //     //   fps * videoRef.current.duration * ratio
  //   //     // )

  //   //     // let progress =
  //   //     //   (window.innerHeight - topPos - videoHeight) %
  //   //     //   (framesCount * 2)

  //   //     // if (progress >= framesCount) {
  //   //     //   progress = framesCount * 2 - progress
  //   //     // }

  //   //     // const nextTime = progress / fps / ratio

  //   //     // videoRef.current.currentTime = nextTime
  //   //   }

  //   //   return requestAnimationFrame(top)
  //   // }

  //   // const requestId = top()

  //   // return () => cancelAnimationFrame(requestId)
  // }, [])

  return (
    <>
      <Section
        title={t('heading')}
        buttonTitle=""
        className={servicesDevelop()}
        titleClassName={title()}
      >
        <Grid className={undefined} >
          <Col className={undefined}  xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <TextContent />
          </Col>
          <Col className={undefined}  xs={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <ListContent />
          </Col>
        </Grid>
        {/* <VideoWrapper ref={videoWrapperRef}>
          <Video ref={videoRef}>
            <source
              src="/develop/kan-finesse.mp4#t=0.001"
              type="video/mp4"
            />
          </Video>
        </VideoWrapper> */}
      </Section>
      <ContainerSection>
        <MeritSection container={container()} />
        <AwardsIcons />
        <TagLine />
      </ContainerSection>
    </>
  )
}

const servicesDevelop = css({
  paddingTop: '183px',
  '@md': {
    paddingTop: '156px'
  },
  '@lg': {
    paddingTop: '263px'
  }
})

const ContainerSection = styled('div', {
  paddingTop: '37px'
})

const VideoWrapper = styled('div', {})
const Video = styled('video', {
  width: '375px',
  marginTop: '53px',
  marginBottom: '-8px',
  '@md': {
    width: '641px',
    borderRadius: '1%',
    marginTop: '69px',
    marginLeft: '63px',
    marginBottom: '16px'
  },
  '@lg': {
    width: '1161px',
    marginTop: '73px',
    marginLeft: '139px',
    marginBottom: '100px'
  }
})

const container = css({
  paddingTop: '59px !important',
  '@md': {
    paddingTop: '33px !important',
    paddingLeft: '1px !important'
  },
  '@lg': {
    paddingTop: '46px !important',
    paddingLeft: '0 !important'
  }
})
const title = css({
  fontSize: '24px',
  lineHeight: '36px',
  marginTop: '-3px',

  '@md': {
    width: '446px',
    fontWeight: '350',
    lineHeight: '33px',
    fontSize: '26px',
    paddingTop: '3px',
    paddingLeft: '2px'
  },

  '@lg': {
    width: '500px',
    fontWeight: '400',
    lineHeight: '40px',
    fontSize: '32px',
    paddingTop: '2px',
    paddingLeft: '1px'
  },
  '@xl': {
    width: '564px',

  }
})
