import React, { FC, useRef } from 'react'
import Image from 'next/image'
import More from '@assets/home/more.svg?svgr'
import {
  AdaptiveImage,
  ThemingMode
} from '@components/common/AdaptiveImage'
import { css, styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'
import { Slider } from '@components/common/Slider'
import { ArrowLink } from '@components/common/ArrowLink'

export type PartnershipType = {
  text: string
  picture: string
  description: string
  link: string
}

export const Partnership: FC<{ list: any; css?: any }> = ({
  list,
  ...props
}) => {
  const { t } = useTranslation('home')
  const sliderRef = useRef(null)

  const prevSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickPrev()
  }

  const nextSlide = () => {
    if (!sliderRef.current) return

    sliderRef.current.slickNext()
  }

  return (
    <Card {...props}>
      <AdaptiveImage
        className={background()}
        srcSet={require('@assets/home/partnership/shadow.png?srcset&themed')}
        themed={true}
        themingMode={ThemingMode.File}
      />
      <Arrow dir="left" hidden={list.length <= 1} onClick={prevSlide}>
        <ArrowLink as="div" />
      </Arrow>
      <PartnerSlider
        setRef={(ref) => (sliderRef.current = ref)}
        progress={list.length > 1}
        infinite={true}
        autoplay={true}
        autoplaySpeed={4000}
      >
        {list.map(({ text, picture, link }) => (
          <div key={text}>
            <Content>
              <PartnershipImage>
                <img src={picture} alt={text} />
              </PartnershipImage>
              <div>
                <Title>{text}</Title>
                {/* <Description>{description}</Description> */}
                <Link href={link}>
                  {t('view_details')} <More />
                </Link>
              </div>
            </Content>
          </div>
        ))}
      </PartnerSlider>
      <Arrow
        dir="right"
        hidden={list.length <= 1}
        onClick={nextSlide}
      >
        <ArrowLink as="div" />
      </Arrow>
    </Card>
  )
}
const PartnerSlider = styled(Slider, {
  '@lg': {
    height: 291
  },

  '@xl': {
    height: 260
  }
})
const Card = styled('div', {
  color: '$accent',
  border: '1px solid $border',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',

  '@md': {
    textAlign: 'center'
  },

  '@lg': {
    textAlign: 'left'
  }
})

const Arrow = styled('div', {
  position: 'absolute',
  bottom: 15,
  cursor: 'pointer',
  p: 10,
  zIndex: 1,

  variants: {
    hidden: {
      true: {
        visibility: 'hidden'
      }
    },
    dir: {
      left: {
        [`& ${ArrowLink}`]: {
          transform: 'rotate(-135deg) skew(10deg, 10deg)'
        },
        right: 35,

        '@md': {
          left: 26,
          right: 'unset'
        },

        '@lg': {
          left: 36
        }
      },
      right: {
        right: 10,

        '@md': {
          right: 26
        },

        '@lg': {
          right: 36
        }
      }
    }
  },

  [`& ${ArrowLink}`]: {
    width: '15px!important',
    height: '15px!important',
    m: '0'
  },

  '@md': {
    top: '50%',
    m: '-10px 0 0 !important',
    bottom: 'unset',

    [`& ${ArrowLink}`]: {
      width: '20px!important',
      height: '20px!important'
    }
  }
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  p: '35px 30px 29px',

  '@md': {
    p: '19px 30px 29px'
  },

  '@lg': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    p: '19px 80px 45px 80px'
  },

  '@xl': {
    p: '19px 122px 45px 115px'
  }
})

const background = css({
  position: 'absolute',
  zIndex: -1,
  width: '300px',
  left: '0',
  top: '0'
})

const Title = styled('h3', {
  fontSize: 24,
  fontWeight: 350,
  lineHeight: '1.33em',
  mt: 59,

  '@md': {
    mt: 28
  },

  '@lg': {
    fontSize: 24,
    mr: 24

    
  },

  '@xl': {
    fontSize: 32,
    mr:0
  }
})

const Description = styled('div', {
  fontSize: 16,
  fontWeight: 350,
  color: '$partnershipDescription',
  mt: 18,
  lineHeight: '1.5em',

  '@md': {
    maxWidth: 448,
    mx: 'auto',
    mt: 20
  },

  '@lg': {
    mt: 14
  }
})

const Link = styled('a', {
  fontSize: 13,
  fontWeight: 350,
  display: 'inline-block',
  mt: 50,

  svg: {
    m: '0 0 -1px 4px'
  },

  '@md': {
    mt: 39
  },

  '@lg': {
    mt: 47
  }
})

export const PartnershipImage = styled('div', {
  display: 'flex',
  width: 'auto',
  height: 'auto',
  position: 'relative',
  mx: 'auto',
  flexShrink: 0,
  img: {
    width: '250px',
    height: 'auto',
    objectFit: 'contain'
  },
  '@lg': {
    width: '350px',

    order: 2,
    mx: 'unset'
  }
})
