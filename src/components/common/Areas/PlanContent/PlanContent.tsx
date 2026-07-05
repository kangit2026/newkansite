import React, { FC } from 'react'
import { css, styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

export const PlanContent: FC = () => {
  const { t } = useTranslation('areas')

  const documents: string[] =
    t('documents.docs', null, {
      returnObjects: true,
      fallback: ''
    }) || []

  return (
    <Wrapper>
      <Content>
        <Heading>{t('documents.title')}:</Heading>
        <ol className={list()}>
          {documents.map((item) => (
            <li key={item} className={listItem()}>
              {item}.
            </li>
          ))}
        </ol>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  position: 'relative',
  color: '$accent',

  '&:before': {
    content: '',
    display: 'flex',
    background:
      'linear-gradient(180deg, $ads 0%, $adsTransparent 100%)',
    width: '100vw',
    height: '100%',
    top: 0,
    left: 'calc(150px - 50vw)',
    position: 'absolute',
    zIndex: -1,

    '@md': {
      left: 'calc(320px - 50vw)'
    },

    '@lg': {
      width: '50vw',
      left: -84
    },

    '@xl': {
      left: -116
    }
  }
})

const Content = styled('div', {
  width: 300,
  mt: 68,
  mx: 'auto',

  '@md': {
    width: 640
  },

  '@lg': {
    width: 524,
    ml: 0,
    mt: 0
  }
})

const Heading = styled('h3', {
  paddingTop: '55px',
  fontSize: '20px',
  fontWeight: 400,

  '@md': {
    paddingTop: '58px',
    fontSize: '24px'
  },

  '@lg': {
    paddingTop: '81px'
  }
})

const list = css({
  padding: 0,
  ml: 22,
  mt: 24,

  '@md': {
    ml: 21,
    mt: 24,
    width: 610
  },

  '@lg': {
    mt: 48,
    width: 'unset'
  }
})

const listItem = css({
  fontSize: '16px',
  fontWeight: 350,
  lineHeight: '20px',
  marginTop: '21px',
  marginLeft: '1px',
  marginBottom: '-1px',

  '@lg': {
    marginTop: '21px',
    marginRight: '68px'
  }
})
