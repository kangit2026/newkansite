import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import { List } from './List/List'
import useTranslation from 'next-translate/useTranslation'

export const ListContent: FC = () => {
  const { t } = useTranslation('develop')
  const managementKeys: string[] =
    t('experience.items', null, {
      returnObjects: true,
      fallback: ''
    }) || []
  const buildingKeys: string[] =
    t('building.items', null, {
      returnObjects: true,
      fallback: ''
    }) || []

  return (
    <Container>
      <div>
        <Header>{t('experience.title')}:</Header>
        <List listItem={managementKeys} />
      </div>
      <div>
        <Header className={headerText()}>
          {t('building.title')}:
        </Header>
        <div className={list()}>
          <List listItem={buildingKeys} />
        </div>
      </div>
    </Container>
  )
}

const Container = styled('div', {
  marginTop: '58px',
  marginLeft: '-37px',
  marginRight: '-9px',
  position: 'relative',
  color: '$accent',

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    left: 'calc(217px - 50vw)',
    top: -17,
    background:
      'linear-gradient(180deg, $nav 0%, rgba(244, 246, 251, 0) 100%)',
    zIndex: -1,
    width: '100vw',
    height: 'calc(100% + 315px)',

    '@md': {
      left: 'calc(449px - 50vw)',
      top: '-16px',
      height: 'calc(100% + 30px)'
    },

    '@lg': {
      position: 'absolute',
      width: '50vw',
      height: 'calc(100% + 690px)',
      left: 65,
      top: -400
    }
  },

  '@md': {
    width: '768px',
    marginRight: 0,
    marginLeft: '-65px',
    marginTop: '49px'
  },

  '@lg': {
    marginTop: '45px'
  }
})

const Header = styled('h4', {
  fontWeight: 400,
  paddingTop: '39px',
  paddingLeft: '68px',
  fontSize: '20px',
  lineHeight: '25px',

  '@md': {
    fontSize: '26px',
    lineHeight: '33px',
    paddingTop: '47px',
    paddingLeft: '129px',
    paddingRight: '8px'
  },

  '@lg': {
    fontSize: '24px',
    lineHeight: '30px',
    paddingTop: 0,
    paddingLeft: '181px',
    paddingRight: '71px',
    width:630
  },
  '@xl': {
    width:'unset',
    paddingLeft: '181px',
  },
})

const headerText = css({
  paddingTop: '34px !important',
  paddingLeft: '67px !important',
  '@md': {
    paddingTop: '19px !important',
    paddingLeft: '129px !important'
  },
  '@lg': {
    paddingTop: '19px !important',
    paddingLeft: '181px !important'
  }
})

const list = css({
  paddingTop: '2px',
  '@lg': {
    paddingTop: '0px'
  }
})
