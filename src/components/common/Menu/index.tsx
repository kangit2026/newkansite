import React, { CSSProperties, FC, useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { css, styled } from 'stitches.config'
import { Col, Grid } from '@ui'
import { ThemeSwitcher } from '@components/common/ThemeSwitcher'
import Phone from '@assets/menu/phone.svg?svgr'
import { useRef } from 'react'
import { socialLinks } from '@utils/constants/social'
import { SocialButton } from '../SocialButton'
import { themeSwitchingTime } from '@utils/constants/animations'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import { getElementOffset } from '@utils/helpers'
import { Diamond } from '../Diamond'
import { useRouter } from 'next/router'

export type MenuProps = {
  isOpened: boolean
}

type LinksStyleProperties = CSSProperties & {
  '--progress': string
}

const links = [
  { url: '/', title: 'home' },
  { url: '/about', title: 'about' },
  { url: '/projects', title: 'projects' },
  { url: '/services', title: 'services' },
  { url: '/inside_community', title: 'inside_community' },
  { url: '/market', title: 'market' },
  { url: '/career', title: 'career' },
  { url: '/news', title: 'news' },
  { url: '/contacts', title: 'contacts' }
]

const langs = [
  {
    title: 'Укр',
    locale: 'uk'
  },
  {
    title: 'Eng',
    locale: 'en'
  }
]

export const Menu: FC<MenuProps> = ({ isOpened = false }) => {
  const linksRef = useRef(null)
  const linksListRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [coord, setCoord] = useState(0)
  const { t } = useTranslation('common')
  const router = useRouter()

  const isActiveRoute = (route) => {
    return route == router.pathname
  }

  const changeLanguage = (locale) => {
    setLanguage(locale).then((_) => {
      location.reload()
    })
  }

  const updateProgress = (x: number) => {
    if (!linksRef.current || !linksListRef.current) return

    const linksOffset = getElementOffset(linksRef.current).x
    const linksWidth = linksRef.current.clientWidth
    const listWidth = linksListRef.current.clientWidth

    let nextProgress = 0

    if (x < linksOffset) {
      nextProgress = 0
    } else if (x > linksOffset + linksWidth) {
      nextProgress = 1
    } else {
      nextProgress = (x - linksOffset) / linksWidth
    }

    nextProgress = Math.round((listWidth - linksWidth) * nextProgress)

    setProgress(nextProgress)
  }

  useEffect(() => {
    if (isOpened) updateProgress(coord)
  }, [coord, isOpened])

  useEffect(() => {
    const handleMouseMove = ({ clientX: x }) => {
      setCoord(x)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isOpened])

  return (
    <StyledMenu opened={isOpened}>
      <Content>
        <Grid className={grid()}>
          <Col className={undefined}  xs={{ span: 10, start: 2 }}>
            <LinksWrapper>
              <LinksContainer ref={linksRef}>
                <LinksList
                  ref={linksListRef}
                  style={
                    {
                      '--progress': `${-progress}px`
                    } as LinksStyleProperties
                  }
                >
                  {links.map(({ url, title }) => (
                    <LinkItem key={url} active={isActiveRoute(url)}>
                      {isActiveRoute(url) && <LinkIndicator />}
                      <Link href={url} passHref={true}>
                        <LinkElem>{t(`menu.${title}`)}</LinkElem>
                      </Link>
                    </LinkItem>
                  ))}
                </LinksList>
              </LinksContainer>
            </LinksWrapper>
          </Col>
          <Col  xs={{ span: 10, start: 2 }} className={footer()}>
            <AdditionalItems>
              <LanguageSwitcher className="order-3">
                {langs.map(({ title, locale }, i) => (
                  <Fragment key={title}>
                    <LangButton onClick={() => changeLanguage(locale)}>
                      {title}
                    </LangButton>
                    {i < langs.length - 1 && <LangsSplitter />}
                  </Fragment>
                ))}
              </LanguageSwitcher>
              <ThemeSwitcher className="order-2" />
              <PhoneNumber className="order-1">
                <PhoneIcon>
                  <Phone />
                </PhoneIcon>
                +38 (044) 247 57 48
              </PhoneNumber>
            </AdditionalItems>
            <SocialButtons>
              {socialLinks.map(({ id, title, icon, link }) => {
                return (
                  <SocialButton
                    key={id}
                    title={title}
                    icon={icon}
                    link={link}
                  />
                )
              })}
            </SocialButtons>
          </Col>
        </Grid>
      </Content>
    </StyledMenu>
  )
}

const LinkIndicator = styled(Diamond, {
  position: 'absolute',
  width: 15,
  height: 15,
  top: '50%',
  mt: -7,
  ml: 0,
  left: 'calc(-50vw + 142px)',

  '@md': {
    width: 24,
    height: 24,
    mt: -12,
    ml: 0,
    left: 'calc(309px - 50vw)'
  },

  '@lg': {
    width: 18,
    height: 18,
    top: 0,
    left: '50%',
    ml: -9,
    mt: -21
  }
})

const AdditionalItems = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '@lg': {
    alignSelf: 'flex-end'
  }
})

const grid = css({
  height: '100%',
  gridTemplateRows: 'repeat(2, 1fr)'
})

const StyledMenu = styled('div', {
  position: 'fixed',
  background: '$background',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: '$menu',
  overflowY: 'auto',
  transition: `200ms opacity ease,  200ms transform ease, ${themeSwitchingTime} background-color ease`,

  '& > *': {
    transition: `${themeSwitchingTime} background-color ease, ${themeSwitchingTime} color ease`
  },

  variants: {
    opened: {
      true: {
        opacity: 1,
        transform: 'none',
        visibility: 'visible'
      },
      false: {
        opacity: 0,
        transform: 'scale(1.03)',
        visibility: 'hidden',
        transition:
          '200ms opacity ease,  200ms transform ease, 0ms visibility linear 200ms'
      }
    }
  }
})

const Content = styled('div', {
  pt: 164,
  height: '100vh',

  '@md': {
    pt: 173
  },

  '@lg': {
    pt: 353,
    pb: 50
  }
})

const LinksWrapper = styled('div', {
  '@lg': {
    mb: 80,
    mx: 'calc(-50vw + 574px)',
    px: 'calc(50vw - 574px)',
    pt: 50,
    mt: 'calc(50vh - 430px)',
    overflow: 'hidden',
    maxWidth: '100vw',

    '@media (max-height: 600px)': {
      mt: -140
    }
  }
})

const LinksContainer = styled('div', {
  '@lg': {
    display: 'flex'
  }
})

const LinksList = styled('ul', {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  pl: 1,
  transform: 'none',

  '@md': {
    pl: 0
  },

  '@lg': {
    display: 'flex',
    transform: 'translate3d(var(--progress), 0, 0)',
    p: '20px 0',
    m: '-20px 0 0'
  }
})

const LinkElem = styled('a', {
  transition: '150ms opacity ease',

  '&:hover': {
    opacity: 0.65
  }
})

const LinkItem = styled('li', {
  fontSize: 30,
  fontWeight: 300,
  color: '$accent',
  position: 'relative',
  transition: '125ms opacity ease, 125ms transform ease',

  variants: {
    active: {
      true: {
        cursor: 'default',
        pointerEvents: 'none',

        [`& ${LinkElem}`]: {
          opacity: 1
        }
      }
    }
  },

  '&:not(:last-child)': {
    mb: 24
  },

  '@md': {
    fontSize: 56,
    fontWeight: 300
  },

  '@lg': {
    whiteSpace: 'nowrap',
    fontSize: 72,

    [`& ${LinkElem}`]: {
      opacity: 0.6
    },

    '&:hover': {
      transform: 'scale(1.15)',
      [`& ${LinkElem}`]: {
        opacity: 1
      }
    },

    '&:not(:last-child)': {
      mb: 0,
      mr: 96
    }
  }
})

const PhoneNumber = styled('div', {
  color: '$accent',
  fontSize: 16,
  fontWeight: 350,
  letterSpacing: '-0.01em',
  display: 'flex',
  alignItems: 'center',

  '@md': {
    fontSize: 24,
    mr: 17
  },

  '@lg': {
    fontSize: 20,
    pt: 3,
    mr: 114
  }
})

const SocialButtons = styled('div', {
  display: 'flex',
  mt: 32,
  justifyContent: 'space-between',
  mb: 20,

  '@md': {
    mt: 54
  },

  '@xl': {
    mt: 0,
    mb: 0,
    alignSelf: 'flex-end',

    [`& ${SocialButton}`]: {
      '&:not(:last-child)': {
        mr: 8
      }
    }
  }
})

const PhoneIcon = styled('div', {
  color: '$accent',
  width: 52,
  height: 52,
  borderRadius: 40,
  backgroundColor: '$navBlock',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  mr: 32,

  '@md': {
    display: 'flex'
  },

  '@lg': {
    mr: 25
  }
})

const footer = css({
  mt: 40,

  '@md': {
    mt: 88
  },

  '@xl': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 142,
    pb: 40
  }
})

const LanguageSwitcher = styled('div', {
  fontSize: 16,
  fontWeight: 350,
  display: 'flex',
  alignItems: 'center',
  color: '$accent',

  '@md': {
    fontSize: 24
  },

  '@lg': {
    fontSize: 20,
    display: 'none'
  }
})

const LangButton = styled('div', {
  cursor: 'pointer',
  transition: '150ms opacity ease',

  '&:hover': {
    opacity: 0.65
  }
})

const LangsSplitter = styled('div', {
  width: '1px',
  height: '12px',
  backgroundColor: '$splitter',
  margin: '0 9px -1px',

  '@md': {
    height: '16px',
    margin: '0 10px -3px 11px'
  }
})
