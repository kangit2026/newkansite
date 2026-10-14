import { Col, Grid } from '@ui'
import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react'
import { css, styled } from 'stitches.config'
import Arrow from '@assets/home/arrow.svg?svgr'
import PlayIcon from '@assets/home/play.svg?svgr'
import cx from 'classnames'
import { Project as ProjectType } from '@utils/api/project'
import { BreadCrumbs } from '@components/common/Breadcrumbs'
import AnimateHeight from 'react-animate-height'
import { gridConfig } from '@utils/constants'
import { mapToYoutubeUrl } from '@utils/helpers'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { ScrollAnchor } from '@components/common/ScrollAnchor'

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export type ProjectContentProps = HTMLAttributes<HTMLDivElement> & {
  details: ProjectType
}

const getFeatures = (t, {
  developer,
  generalContractor,
  projectOffice,
  fullArea,
  phone
}) => {
  
  return [
    {
      id: 'developers',
      title: t('developers'),
      value: developer
    },
    {
      id: 'generalContractor',
      title: t('generalContractor'),
      value: generalContractor
    },
    {
      id: 'projectOffice',
      title: t('projectOffice'),
      value: projectOffice
    },
    {
      id: 'fullArea',
      title: t('fullArea'),
      value: `${fullArea} га`
    },
    {
      id: 'phone',
      title: t('phone'),
      value: phone
    }
  ]
}

const ProjectLink = ({ link, title, ...props }) => {
  return (
    <WebsiteLink
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {title}
    </WebsiteLink>
  )
}

const Player = ({ video }) => {
  const [isPaused, setIsPaused] = useState(true)
  const videoRef = useRef(null)

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    if (!videoRef.current) return

    if (isPaused != videoRef.current.paused) {
      toggleVideo()
    }
  }, [isPaused])

  const { t } = useTranslation('project')

  if (video?.includes('youtu.be') || video?.includes('youtube.com')) {
    const youtubeUrl = mapToYoutubeUrl(video)
    return (
      <iframe
        width="100%"
        height="700"
        src={youtubeUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    )
  }

  return (
    <VideoPlayer playing={!isPaused} onClick={toggleVideo}>
      <Video
        onPause={() => {
          setIsPaused(videoRef.current.paused)
        }}
        onPlay={() => {
          setIsPaused(false)
        }}
        ref={videoRef}
        playsInline={true}
      >
        <source src={`${video}#t=0.001`} type="video/mp4" />
      </Video>
      <VideoButton>
        <PlayIcon className={videoButtonIcon()} /> {t('video')}
      </VideoButton>
    </VideoPlayer>
  )
}

export const ProjectContent = forwardRef<
  HTMLDivElement,
  ProjectContentProps
>(({ details, ...props }, ref) => {

    const title = details?.title
    const category = details?.category
    const address = details?.address
    const website = details?.website
    const logo = details?.logo
    const logoAlt = details?.logoAlt
    const breadcrumbs = details?.breadcrumbs
    const infrastructure = details?.infrastructure
    const description = details?.description
    const video = details?.video

  const { t } = useTranslation('project')
  const features = getFeatures(t, details)

  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false)

  const toggleFeatures = () => {
    if (
      window.matchMedia(`(min-width: ${gridConfig.breakPoints.lg}px)`)
        .matches
    ) {
      return
    }

    setIsFeaturesExpanded((v) => !v)
  }

  return (
    <StyledContent>
      <Grid className={undefined}  {...props}>
        <Col 
          xs={{ span: 10, start: 2 }}
          md={{ span: 4, start: 8 }}
          lg={{ span: 5, start: 7 }}
          className={cx('order-md-2')}
        >
          <ScrollAnchor ref={ref} css={{ '@lg': { top: -134 } }} />
          <Info>
            <TitleRow>
              <Title>{title}</Title>
              <ProjectLink
                title={t('webpage')}
                link={website}
                className={cx(
                  'd-none',
                  'd-lg-block',
                  'title-link',
                  titleLink()
                )}
              />
            </TitleRow>
            <Type>{category}</Type>
            <Features>
              {address && (
                <Location>
                  <Value>{address}</Value>
                </Location>
              )}
              {features.map(
                ({ id, title, value }) =>
                  value && (
                    <Field key={id}>
                      {title}:{' '}
                      {id === 'phone' ? (
                        <PhoneLink href={toTelHref(String(value))}>
                          {value}
                        </PhoneLink>
                      ) : (
                        <Value>{value}</Value>
                      )}
                    </Field>
                  )
              )}
              <Link href="/contacts" passHref>
                <RequestLink>{t('request')}</RequestLink>
              </Link>

              <Infrastructure>
                <InfrastructureTitle onClick={() => toggleFeatures()}>
                  {t('infrastructure')} <Arrow className={arrow()} />
                </InfrastructureTitle>
                <AnimateHeight
                  duration={500}
                  height={isFeaturesExpanded ? 'auto' : 0}
                  className={cx(featuresWrapper())}
                >
                  <InfrastructureFeatures>
                    {infrastructure.map((item) => (
                      <InfrastructureFeature key={item}>
                        {item}
                      </InfrastructureFeature>
                    ))}
                  </InfrastructureFeatures>
                </AnimateHeight>
                <ProjectLink
                  title={t('webpage')}
                  link={website}
                  className="d-lg-none"
                />
              </Infrastructure>
            </Features>
          </Info>
        </Col>
        <Col 
          xs={{ span: 10, start: 2 }}
          md={{ span: 4, start: 2 }}
          className={cx('order-md-1')}
        >
          <Description>
            <BreadCrumbs
              breadcrumbs={breadcrumbs.map(({ title, link }) => ({
                link,
                title: t(title)
              }))}
              title={title}
              className={breadcrumbsSection()}
            />
            <Text>{description}</Text>
            <DescriptionFooter>
              <Arrow className={descriptionArrow()} />
              {logo && (
                <ProjectLogo>
                  <ProjectLogoImage
                    src={logo}
                    alt={logoAlt || title}
                    loading="lazy"
                    decoding="async"
                  />
                </ProjectLogo>
                // <img src={logo} alt={title} className={logoImage()} />
              )}
            </DescriptionFooter>
          </Description>
        </Col>
      </Grid>
      <Player video={video} />
    </StyledContent>
  )
})

ProjectContent.displayName = 'ProjectContent'

const StyledContent = styled('div', {
  background: '$background',
  position: 'relative',
  zIndex: 1
})

const TitleRow = styled('div', {
  '@lg': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& .title-link': {
      margin: 0,
      width: 180
    }
  }
})

const Title = styled('h2', {
  fontSize: 40,
  fontWeight: 350,

  '@lg': {
    fontSize: 32
  }
})

const titleLink = css({
  flexShrink: 0,
  alignSelf: 'flex-start'
})

const Type = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
  fontWeight: 500,
  mt: 42,

  '&:after': {
    content: '',
    height: 1,
    flexGrow: 1,
    backgroundColor: '$nav',
    ml: 23,
    mt: -1
  },

  '@lg': {
    mt: 44
  }
})

const Info = styled('div', {
  '@md': {
    pt: 59
  },

  '@lg': {
    pt: 80,
    pl: 64,
    pb: 33,
    mr:-64
  },
  '@xl': {
    pt: 80,
    pl: 64,
    pb: 33,
    mr:0
  }
})

const Features = styled('div', {
  lineHeight: '1.75em',
  mt: 24,
  fontSize: 16,
  fontWeight: 300,

  '@lg': {
    mt: 28
  }
})

const Value = styled('span', {
  fontWeight: 400
})

const PhoneLink = styled('a', {
  fontWeight: 400,
  color: 'inherit',
  textDecoration: 'underline',
  textUnderlineOffset: '3px'
})

const RequestLink = styled('a', {
  display: 'block',
  width: 300,
  height: 48,
  backgroundColor: '$nav',
  color: '$accent',
  br: 60,
  lineHeight: '48px',
  textAlign: 'center',
  mt: 28,
  fontSize: 15,
  fontWeight: 400,
  textDecoration: 'none',

  '@md': {
    width: 256
  }
})

const Location = styled('div', {
  mb: 7,

  '@lg': {
    mb: 0
  }
})

const Field = styled('div', {})

const Infrastructure = styled('div', {
  mt: 43,
  letterSpacing: '0.005em',
  fontWeight: 400,

  '@md': {
    lineHeight: '1.5em',
    mt: 34
  },

  '@lg': {
    mt: 73
  }
})

const InfrastructureTitle = styled('div', {
  cursor: 'pointer',

  '@md': {
    display: 'flex'
  },

  '@lg': {
    cursor: 'unset'
  }
})

const featuresWrapper = css({
  '@lg': {
    // replace AnimateHeight styles for lg to prevent animation
    height: 'auto!important',
    overflow: 'visible!important',

    '& > div': {
      display: 'flex!important'
    }
  }
})

const InfrastructureFeatures = styled('ul', {
  padding: 0,
  lineHeight: '1.62em',
  fontSize: 16,
  fontWeight: 350,
  mt: 46,
  ml: 21,
  mb: 0,
  display: 'flex',
  flexDirection: 'column',
  listStyleType: 'none',
  flexGrow: 1,

  '@lg': {
    mr: -12,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

const InfrastructureFeature = styled('li', {
  flexBasis: '50%',

  '&:before': {
    content: '',
    display: 'inline-block',
    width: 4,
    height: 4,
    br: '100%',
    background: '$accent',
    m: '0 10px 3px -11px'
  },

  '@lg': {
    '&:nth-child(odd)': {
      pr: 7
    }
  }
})

const arrow = css({
  width: 16,
  height: 7,
  ml: 11,

  '@md': {
    m: '11px 25px 0 7px'
  }
})

const WebsiteLink = styled('a', {
  display: 'block',
  width: 300,
  height: 48,
  backgroundColor: '$nav',
  color: '$accent',
  br: 60,
  lineHeight: '48px',
  textAlign: 'center',
  mt: 48,
  fontSize: 15,
  fontWeight: 400,

  '@md': {
    width: 256,
    mt: 66
  }
})

const breadcrumbsSection = css({
  mt: 12,
  mb: 92
})

const Description = styled('div', {
  backgroundColor: '$description',
  color: '$accent',
  fontSize: 16,
  fontWeight: 350,
  height: '100%',
  mt: 48,
  mx: `calc(150px - 50vw)`,
  px: `calc(50vw - 150px)`,
  pt: 48,
  pb: 49,

  '@md': {
    ml: 'calc(-50vw + 320px)',
    mr: -64,
    pl: 'calc(50vw - 320px)',
    pr: 64,
    mt: 0,
    pt: 64,
    pb: 52
  },

  '@lg': {
    mr: -116,
    pr: 80,

  },

  '@xl': {
    mr: -116,
    pr: 116,

  }
})

const Text = styled('div', {
  lineHeight: '1.56em',
  whiteSpace: 'pre-wrap',

  '@md': {
    lineHeight: '1.5em'
  },

  '@lg': {
    lineHeight: '1.75em'
  }
})

const DescriptionFooter = styled('div', {
  mt: 66,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@md': {
    mt: 58,
    justifyContent: 'center'
  },

  '@lg': {
    mt: 51,
    justifyContent: 'end'
  }
})

const descriptionArrow = css({
  mt: -6,

  '@md': {
    display: 'none'
  }
})

const ProjectLogo = styled('div', {
  ml: 'auto',
  br: 10,
  backgroundColor: '#ffffff',
  p: 10,
  maxWidth: 200,
  height: 'fit-content'
  // maxHeight: 200
})

const ProjectLogoImage = styled('img', {
  maxWidth: '100%',
  maxHeight: '100%'
})

const Video = styled('video', {
  width: '100%'
})

const VideoButton = styled('button', {
  width: 224,
  height: 52,
  border: 'none',
  background: '$background',
  color: '$accent',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  br: 60,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  fontWeight: 350,
  pr: 7,
  transition: '75ms ease'
})

const embeddedPlayer = css({})

const VideoPlayer = styled('div', {
  width: '100vw',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',

  variants: {
    playing: {
      true: {
        [`& ${VideoButton}`]: {
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.9)'
        }
      }
    }
  }
})

const videoButtonIcon = css({
  mr: 20,
  width: 11,
  height: 10
})
