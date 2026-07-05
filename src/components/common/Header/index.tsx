import { Col, Grid } from '@ui'
import React, { FC, Fragment } from 'react'
import Image from 'next/image'
import { NavButton } from '@components/common/NavButton'
import { NavBlock } from '@components/common/NavBlock'
import { css, styled } from 'stitches.config'
import { themeSwitchingTime } from '@utils/constants/animations'
import Link from 'next/link'
import cx from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'

export type HeaderProps = {
  onToggleMenu: () => void
  isMenuOpened: boolean
  isVisible: boolean
}

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

export const Header: FC<HeaderProps> = ({
  onToggleMenu,
  isMenuOpened,
  isVisible
}) => {
  const { t, lang } = useTranslation('common')

  const changeLanguage = (locale) => {
    setLanguage(locale).then((_) => {
      location.reload()
    })
  }

  const filteredLangs = langs

  return (
    <StyledHeader visible={isVisible}>
      <Grid className={cx('align-items-center', grid())}>
        <Col 
          xs={{ span: 3, start: 2 }}
          md={{ span: 2, start: 6 }}
          className="d-flex justify-content-md-center order-md-2"
        >
          <Link href="/">
            <a className={logoLink()}>
              <Image
                priority={true}
                src="/logo.svg"
                alt="KAN"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </Col>
        <Col 
          xs={{ span: 5, start: 7 }}
          md={{ span: 2, start: 2 }}
          className="d-flex justify-content-flex-end justify-content-md-start order-md-1"
        >
          <BurgerButton onClick={() => onToggleMenu()}>
            <BurgerIcon opened={isMenuOpened} />
            {t('menu.button')}
          </BurgerButton>
        </Col>

        <Col 
          md={{ span: 2, start: 10 }}
          className="d-none d-md-flex justify-content-flex-end order-3"
        >
          <LangsBlock>
            {filteredLangs.map(({ title, locale }, i) => (
              <Fragment key={title}>
                <LangButton onClick={() => changeLanguage(locale)}>
                  {title}
                </LangButton>
                {i < filteredLangs.length - 1 && <LangsSplitter />}
              </Fragment>
            ))}
          </LangsBlock>
        </Col>
      </Grid>
    </StyledHeader>
  )
}

const LangButton = styled('div', {
  cursor: 'pointer',
  transition: '150ms color ease',

  '&:hover': {
    color: '$accentHover'
  }
})

const logoLink = css({
  width: '61px',
  height: '85px',
  position: 'relative',

  '@md': {
    width: '57px',
    height: '80px'
  },

  '@lg': {
    width: '67px',
    height: '91px'
  }
})

const StyledHeader = styled('div', {
  position: 'fixed',
  top: 48,
  width: '100%',
  zIndex: '$header',
  height: 0,
  transition: '200ms opacity ease, 0ms visibility linear 200ms',
  opacity: 0,
  visibility: 'hidden',

  variants: {
    visible: {
      true: {
        opacity: 1,
        visibility: 'visible',
        transition: '200ms opacity ease'
      }
    }
  },

  '& > *': {
    transition: `${themeSwitchingTime} background-color ease, ${themeSwitchingTime} color ease`
  },

  '@md': {
    top: 28
  },

  '@lg': {
    top: 89
  }
})

const grid = css({
  height: 0
})

const LangsBlock = styled(NavBlock, {
  fontSize: '$md',
  display: 'flex',
  alignItems: 'center',

  '@md': {
    fontSize: '$sm'
  },

  '@lg': {
    fontSize: '$md',
    height: '52px',
    padding: '26px 21px 26px 21px'
  }
})

const LangsSplitter = styled('div', {
  width: '1px',
  height: '12px',
  backgroundColor: '$splitter',
  margin: '0 9px -1px',

  '@lg': {
    margin: '0 10px -3px 11px',
    height: '16px'
  }
})

const BurgerButton = styled(NavButton, {
  display: 'flex',
  alignItems: 'center',
  // temporarily use !important to overwrite styles
  fontSize: '$md!important',
  padding: '14px 24px 13px 24px!important',

  '@md': {
    fontSize: '$sm!important',
    padding: '11px 20px 13px 16px!important'
  },

  '@lg': {
    fontSize: '$md!important',
    padding: '12px 24px 13px 23px!important'
  }
})

const BurgerIcon: FC<{ opened: boolean }> = ({ opened }) => {
  return (
    <BurgerIconWrap opened={opened}>
      <BurgerIconLine />
      <BurgerIconLine />
    </BurgerIconWrap>
  )
}

const BurgerIconLine = styled('div', {
  backgroundColor: '$burger',
  width: '12px',
  height: '2px',
  transition: `150ms transform ease, ${themeSwitchingTime} background-color ease`,

  '&:first-child': {
    mb: '8px'
  },

  '@md': {
    width: '10px',

    '&:first-child': {
      mb: '4px'
    }
  },

  '@lg': {
    width: '12px',

    '&:first-child': {
      mb: '6px'
    }
  }
})

const BurgerIconWrap = styled('div', {
  display: 'inline-block',
  m: '-1px 16px 0 0',

  '@md': {
    m: '0 12px 1px 0'
  },

  '@lg': {
    m: '0 14px 1px 0'
  },

  variants: {
    opened: {
      true: {
        [`& ${BurgerIconLine}`]: {
          '&:first-child': {
            transform: 'translateY(5px) rotate(45deg)'
          },

          '&:last-child': {
            transform: 'translateY(-5px) rotate(-45deg)'
          }
        },

        '@md': {
          [`& ${BurgerIconLine}`]: {
            '&:first-child': {
              transform: 'translateY(3px) rotate(45deg)'
            },

            '&:last-child': {
              transform: 'translateY(-3px) rotate(-45deg)'
            }
          }
        },

        '@lg': {
          [`& ${BurgerIconLine}`]: {
            '&:first-child': {
              transform: 'translateY(4px) rotate(45deg)'
            },

            '&:last-child': {
              transform: 'translateY(-4px) rotate(-45deg)'
            }
          }
        }
      }
    }
  }
})
