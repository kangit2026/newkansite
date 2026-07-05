import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

export const TextContent: FC = ({}) => {
  const { t } = useTranslation('general')

  return (
    <Container>
      <p className={textContainer()}>
        <span className={spanText()}>KANBUD</span> {t('description')}
      </p>
    </Container>
  )
}

const Container = styled('div', {
  pt: 25,

  '@md': {
    pt: 17
  }
})

const textContainer = css({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '1.64em',
  color: '$accent',
  marginRight: '7px',

  '@md': {
    lineHeight: '1.5em',
    pt: 10,
    textAlign: 'justify'
  },

  '@lg': {
    fontWeight: 350,
    letterSpacing: '0.001em',
    fontSize: '20px',
    lineHeight: '1.6em',
    pt: 29,
    textAlign: 'start'
  }
})

const spanText = css({
  fontWeight: 600,

  '@md': {
    fontWeight: 700
  },

  '@lg': {
    fontWeight: 600,
    letterSpacing: '-0.03em'
  }
})
