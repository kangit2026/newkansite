import Image from 'next/image'
import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const PlatformsList: FC = () => {
  const { t } = useTranslation('platform')
  const { t:tcommon } = useTranslation('common')
  const platforms_rent: any[] =
    t('platforms_rent', null, {
      returnObjects: true,
      fallback: ''
    }) || []

  return (
    <Platforms>
      {platforms_rent.map(
        ({ header, img, description, logo, textArr, phone }) => (
          <Platform key={header}>
            <ContentWrapper>
              <Image
                src={img}
                alt=""
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </ContentWrapper>
            <div className={container()}>
              <Header>
                <div>
                  <HeaderText>{header}</HeaderText>
                  <Link>{description}</Link>
                </div>

                <LogoWrapper>
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width}
                    height={logo.height}
                    priority={true}
                  />
                </LogoWrapper>
              </Header>
              <Body>
                <TextContainer>
                  {textArr.map((item) => (
                    <div className={text()} key={item}>
                      {item}
                    </div>
                  ))}
                </TextContainer>
                <Footer>
                  <TextHeader>{tcommon('title.sales_rent')}:</TextHeader>
                  {phone ? (
                    <TextPhone as="a" href={toTelHref(String(phone))}>
                      {phone}
                    </TextPhone>
                  ) : null}
                </Footer>
              </Body>
            </div>
          </Platform>
        )
      )}
    </Platforms>
  )
}

const Platforms = styled('div', {
  mt: 47,
  mb: 24,

  '@md': {
    mt: 48
  },

  '@lg': {
    mt: -71,
    mb: 50,
    position: 'relative',
    zIndex: 1
  }
})

const Platform = styled('div', {
  height: 695,
  width: 359,
  position: 'relative',

  '&:not(:last-child)': {
    mb: 24,

    '@md': {
      mb: 40
    },

    '@lg': {
      mb: 60
    }
  },

  '@md': {
    width: 640
  },

  '@lg': {
    width: 550,
    height: 720,
    ml: 28,
    mb: 0,
    zIndex: -1
  }
})

const ContentWrapper = styled('div', {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: -1,

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    background:
      'linear-gradient(239.6deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.08) 120.04%)'
  },

  '@lg': {
    '&:before': {
      content: '',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1,
      background:
        'linear-gradient(239.6deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.08) 120.04%)'
    }
  }
})

const container = css({
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column'
})

const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
})

const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})

const LogoWrapper = styled('div', {
  display: 'none',
  '@md': {
    display: 'flex',
    mt: 40,
    mr: 58
  },
  '@lg': {
    mt: 60,
    mr: 57
  }
})

const HeaderText = styled('div', {
  fontWeight: 300,
  fontSize: '32px',
  lineHeight: '40px',
  mt: 56,
  ml: 29,

  '@md': {
    fontSize: '40px',
    lineHeight: '50px',
    mt: 57,
    ml: 49
  },

  '@lg': {
    fontWeight: 400,
    fontSize: '32px',
    lineHeight: '0.75em',
    mt: 67,
    ml: 56
  }
})

const Link = styled('div', {
  textDecoration: 'none',
  fontSize: '12px',
  lineHeight: '2em',
  mt: 8,
  ml: 30,

  '@md': {
    mt: 11,
    ml: 51
  },

  '@lg': {
    mt: 16,
    ml: 58
  }
})

const TextContainer = styled('div', {
  fontSize: '15px',
  width: '308px',
  height: '382px',
  lineHeight: '1.47em',
  mt: 25,
  ml: 30,
  pr: 2,

  // '&:nth-child(1)': {},
  '@md': {
    width: '544px',
    fontSize: '16px',
    lineHeight: '1.5em',
    mt: 45,
    ml: 49
  },
  '@lg': {
    fontSize: '16px',
    lineHeight: '1.6em',
    width: '438px',
    height: '336px',
    mt: 41,
    ml: 58
  }
})
const Footer = styled('div', {
  ml: 30,
  mt: 31,
  '@md': {
    ml: 49,
    mt: -42
  },
  '@lg': {
    ml: 58,
    mt: 85
  }
})

const TextHeader = styled('p', {
  fontSize: '15px',
  lineHeight: '19px',
  mb: 8,
  '@md': {
    fontSize: '16px',
    mt: 13
  },
  '@lg': {
    lineHeight: '20px'
  }
})

const TextPhone = styled('h4', {
  display: 'block',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '30px',
  color: 'inherit',
  textDecoration: 'none'
})

const text = css({
  mt: 9,
  '@md': {
    mb: -2
  },
  '@lg': {
    mt: 15
  }
})
