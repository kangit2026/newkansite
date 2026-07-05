import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

export const TextContent: FC = () => {
  const { t } = useTranslation('develop')

  return (
    <Container>
      <p className={textContainer()}>
        <span className={spanText()}>KAN Development</span>{' '}
        {t('about')}
      </p>
    </Container>
  )
}

const Container = styled('div', {
  paddingTop: '9px',
  paddingLeft: '31px',
  paddingRight: '22px'
})

const textContainer = css({
  fontWeight: 350,
  fontSize: '16px',
  lineHeight: '1.62em',
  color: '$accent',

  '@md': {
    fontWeight: 350,
    fontSize: '20px',
    lineHeight: '1.55em',
    paddingRight: '43px',
    paddingTop: '10px',
    paddingLeft: '33px',
    textAlign: 'justify'
  },

  '@lg': {
    letterSpacing: '-0.02em',
    fontSize: '24px',
    lineHeight: '1.25em',
    paddingRight: '40px',
    paddingTop: '24px',
    paddingLeft: '40px',
    textAlign: 'start'
  },

  '@xl': {
    letterSpacing: '-0.02em',
    fontSize: '24px',
    lineHeight: '1.25em',
    paddingRight: '93px',
    paddingTop: '24px',
    paddingLeft: '87px',
    textAlign: 'start'
  }
})

const spanText = css({
  fontWeight: 600,

  '@md': {
    fontWeight: 700
  },

  '@lg': {
    fontWeight: 400,
    letterSpacing: '-0.02em'
  }
})
