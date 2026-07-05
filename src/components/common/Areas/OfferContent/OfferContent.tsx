import React, { FC } from 'react'
import { css, styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

const email = 'landplot@kandevelopment.com'

export const OfferContent: FC = () => {
  const { t } = useTranslation('areas')
  return (
    <Container>
      <TextContent className={headerOne()}>
        {t('description')}
      </TextContent>
      <TextContent className={headerTwo()}>
        {t('location')}
      </TextContent>
      <p className={textParagraph()}>{t('offers')}</p>
      <TextContent className={textEmail()}>{email}</TextContent>
    </Container>
  )
}

const Container = styled('div', {
  color: '$accent',

  '@lg': {
    width: 720
  }
})

const TextContent = styled('div', {
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '25px',

  '@md': {
    fontSize: '24px',
    lineHeight: '30px'
  },
  '@lg': {
    fontSize: '32px',
    lineHeight: '40px'
  }
})
const headerOne = css({
  paddingTop: '55px',
  paddingLeft: '2px',

  '@md': {
    paddingTop: '63px',
    paddingLeft: 0,
    paddingRight: '20px',
    marginLeft: -'1px'
  },
  '@lg': {
    paddingTop: '81px',
    paddingRight: '1px'
  }
})

const headerTwo = css({
  paddingTop: '24px',
  paddingLeft: '2px',

  '@md': {
    paddingTop: '32px',
    paddingLeft: 0
  },
  '@lg': {
    paddingTop: '40px',
    marginRight: '94px'
  }
})
const textParagraph = css({
  paddingTop: '57px',
  paddingRight: '30px',
  paddingLeft: '2px',

  '@md': {
    paddingTop: '41px',
    paddingLeft: 0,
    marginBottom: 0
  },
  '@lg': {
    fontSize: '24px',
    paddingTop: '70px',
    paddingRight: '67px',
    marginBottom: '27px'
  }
})

const textEmail = css({
  paddingTop: '8px',
  paddingLeft: '3px',

  '@md': {
    paddingTop: 0,
    paddingLeft: 0,
    marginTop: '12px'
  }
})
