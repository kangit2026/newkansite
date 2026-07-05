import Link from 'next/link'
import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { styled, css } from 'stitches.config'
import cx from 'classnames'
import { gridConfig } from '@utils/constants'

type ImageStyleProperties = CSSProperties & {
  '--x': string
  '--y': string
}

export const ListServices: FC<{
  services: {
    text: string
    icon: any
    image: string
    link: string
  }[]
}> = ({ services }) => {
  const [coords, setCoords] = useState([0, 0])
  const handleMouseMove = ({ clientX, clientY }) => {
    if (
      window.matchMedia(`(min-width: ${gridConfig.breakPoints.lg}px)`)
        .matches
    ) {
      setCoords([clientX, clientY])
    }
  }

  useEffect(() => {
    const toggleEffect = () => {
      if (
        window.matchMedia(
          `(min-width: ${gridConfig.breakPoints.lg}px)`
        ).matches
      ) {
        document.removeEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousemove', handleMouseMove)
      } else {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', toggleEffect)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', toggleEffect)
    }
  }, [])

  return (
    <ContainerWrapper>
      {services.map(({ text, icon: Icon, image, link }, index) => (
        <Link key={`${text}.${link}`} href={link} passHref={true}>
          <div className={contentBlock()}>
            <div className={linkImg()}>
              <ImageContent
                src={image}
                alt=" "
                style={
                  {
                    '--x': `${coords[0]}px`,
                    '--y': `${coords[1]}px`
                  } as ImageStyleProperties
                }
              />
            </div>
            <TextContent special={index == 2}>{text}</TextContent>
            <div
              className={
                index === services.length - 1
                  ? lastItemWrapper()
                  : imgWrapper()
              }
            >
              <Icon.default
                className={cx(
                  index === services.length - 1 && lastItem(),
                  icon()
                )}
              />
            </div>
          </div>
        </Link>
      ))}
    </ContainerWrapper>
  )
}
const ContainerWrapper = styled('div', {
  marginTop: '67px',

  '@md': {
    marginTop: '46px'
  },
  '@lg': {
    marginTop: '57px'
  }
})

const icon = css({
  color: '$accent',
  opacity: 0.4,
  transition: 'opacity 150ms ease',
  width: '16px',
  height: '16px',

  '@md': {
    width: '20px',
    height: '20px'
  },
  '@lg': {
    width: '30px',
    height: '30px'
  }
})

const TextContent = styled('h4', {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '2.25em',
  color: '$accent',
  letterSpacing: '0.004em;',
  pb: '6px',
  transition: 'opacity 150ms ease',

  variants: {
    special: {
      true: {
        lineHeight: '1.5em',

        '@md': {
          lineHeight: '3.4em'
        },
        '@lg': {
          lineHeight: '3em'
        }
      }
    }
  },

  '@md': {
    fontSize: '20px',
    lineHeight: '3.4em',
    height: '64px',
    opacity: 0.4,
    pb: 0
  },

  '@lg': {
    fontSize: '24px',
    lineHeight: '3em',
    height: '80px'
  }
})

const contentBlock = css({
  position: 'relative',
  display: 'flex',
  mb: 33,
  cursor: 'pointer',

  '&:hover': {
    svg: {
      opacity: 1
    },
    [`& ${TextContent}`]: {
      opacity: 1
    }
  },

  '&:before': {
    content: '',
    display: 'block',
    width: '100%',
    height: 1,
    background: '$nav',
    position: 'absolute',
    bottom: 0,
    zIndex: -2
  },

  '@md': {
    mb: 23
  },

  '@lg': {
    cursor: 'none',
    marginBottom: '55px',

    '&:hover': {
      img: {
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)'
      }
    }
  }
})

const imgWrapper = css({
  display: 'flex',
  position: 'absolute',
  right: '-5px',
  top: '50%',
  transform: 'translateY(-50%)',

  '@lg': {
    right: '-7px',
    top: '45%'
  }
})

const lastItemWrapper = css({
  display: 'flex',
  position: 'absolute',
  right: '0px',
  top: '50%',
  transform: 'translateY(-50%)',

  '@lg': {
    top: '43%'
  }
})

const linkImg = css({
  display: 'none',

  '@md': {
    display: 'flex',
    position: 'absolute',
    top: '-35px',
    left: '349px'
  },
  '@lg': {
    top: '-118px',
    left: '580px'
  }
})

const ImageContent = styled('img', {
  width: '228px',
  height: '122px',
  position: 'fixed',
  left: 'var(--x)',
  top: 'var(--y)',
  transform: 'translate(-50%, -30%) scale(1)',
  opacity: 0,
  transition: 'transform 350ms ease, opacity 350ms ease-out',
  zIndex: -1,

  '@lg': {
    width: '464px',
    height: '248px'
  }
})

const lastItem = css({
  width: '10px !important',
  height: '10px !important',

  '@md': {
    width: '17px !important',
    height: '17px !important'
  },

  '@lg': {
    width: '22px !important',
    height: '22px !important'
  }
})
