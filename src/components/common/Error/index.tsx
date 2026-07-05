import React, { FC } from 'react'
import { Col, Grid } from '@ui'
import { css, styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'
import HoveredComponent from '../HoveredComponent'
// import { title } from 'process'

type ErrorProps = {
  code: number
}

export const Error: FC<ErrorProps> = ({ code }) => {
  const { t } = useTranslation('common')

  const getError = () => {
    if (code == 404) return t('error.not_found')

    return t('error.unhandled')
  }

  const error = getError()

  return (
    <>
      <HoveredComponent
        className={background()}
        sources={{
          element: require('@assets/home/grid/default.svg?srcset'),
          effect: require('@assets/home/grid/hovered.svg?srcset')
        }}
      />
      <Grid className={grid()}>
        <div className={container()}></div>
        <Col className={undefined}  xs={{ span: 11, start: 1 }} md={{ span: 5, start: 2 }}>
          <TitleComponent>
            <h1 className={title()}>404</h1>
          </TitleComponent>
        </Col>
        <Col className={undefined}  xs={{ span: 11, start: 1 }} md={{ span: 5, start: 1 }}>
          <div className={wrapper()}>
            <div style={{ zIndex: 10 }}>
              <h2 className={subtitle()}>
                Сторінка <br /> не знайдена
              </h2>
            </div>

            <div className={button()}>
              <div className={text()}>Повернутися назад</div>
            </div>
          </div>
        </Col>
      </Grid>
    </>
  )
}
const TitleComponent = styled('div', {
  position: 'absolute',
  zIndex: 10,
  top: '72px',
  left: '42px',
  '@md': {
    top: '76px',
    left: '57px'
  },
  '@lg': {
    top: '177px'
  }
})
const background = css({
  position: 'absolute',
  zIndex: '1',
  mt: 7,
  userSelect: 'none',
  pointerEvents: 'none',
  width: '100%',

  '@md': {
    mt: 0
  },

  '@lg': {
    mt: 1
  }
})
const grid = css({
  p: '100px 0 690px',
  color: '$accent',
  '@md': {
    p: '100px 0 264px'
  },
  '@lg': {
    p: '100px 0 627px'
  }
})
const container = css({
  width: '360px',
  height: '573px',
  borderRadius: '40px',
  backgroundColor: '$ads',
  mt: '74px',
  position: 'absolute',
  zIndex: '-1',
  '@md': {
    width: '768px',
    height: '238px',
    borderRadius: '233px',
    display: 'flex',
    p: '28px 121px',
    mt: '50px'
  },
  '@lg': {
    width: '1392px',
    height: '466px',
    mt: '167px',
    p: '9px 170px'
  }
})
const title = css({
  fontWeight: 300,
  fontSize: '176px',
  lineHeight: '222px',
  letterSpacing: '-0.04em',
  textAlign: 'center',
  pt: '63px',
  '@md': {
    fontSize: '144px',
    lineHeight: '181px',
    letterSpacing: '-0.06em',
    pt: '0'
  },
  '@lg': {
    fontSize: '360px',
    lineHeight: '454px',
    letterSpacing: '-0.07em',
    pt: '0'
  }
})
const wrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'absolute',
  top: '359px',
  left: '69px',
  '@md': {
    height: '100%',
    justifyContent: 'space-around',
    top: '151px',
    left: '331px'
  },
  '@lg': {
    top: '397px',
    left: '690px'
  }
})
const subtitle = css({
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '1.25em',
  letterSpacing: '-0.008em',
  textAlign: 'center',
  p: '58px 18px 0',
  '@md': {
    width: '300px',
    textAlign: 'start',
    lineHeight: '1.20em',
    p: '29px 52px 0'
  },
  '@lg': {
    width: '500px',
    fontSize: '40px',
    p: '18px 0 0 180px '
  }
})
const button = css({
  cursor: 'pointer',
  pt: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  '@md': {
    justifyContent: 'start',
    pt: '13px',
    pl: '51px'
  },
  '@lg': {
    pt: '141px',
    pl: '180px'
  }
})
const text = css({
  width: '166px',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '1.78em',
  textAlign: 'center',
  borderBottom: '1px $accent solid',
  '@md': {
    width: 'fit-content',
    fontSize: '15px'
  },
  '@lg': {
    fontSize: '24px'
  }
})
