import React, { FC, RefObject } from 'react'
import Arrow from '@assets/home/arrow.svg?svgr'
import { css } from 'stitches.config'
import { styled } from 'stitches.config'
import { Col, Grid } from '@ui'
import useTranslation from 'next-translate/useTranslation'
import { scrollToElement } from '@utils/helpers/animations'

export const TitleContent: FC<{
  anchorRef: RefObject<HTMLDivElement>
}> = ({ anchorRef }) => {
  const { t } = useTranslation('about')

  return (
    <Grid className={grid()}>
      <Col
        xs={12}
        className="d-md-flex flex-md-column justify-content-md-center align-items-md-center"
      >
        <HeaderText>{t('motto')}</HeaderText>
        <TitleText>{t('about')}</TitleText>
        <Arrow
          className={arrowDow()}
          onClick={() => scrollToElement(anchorRef.current)}
        />
      </Col>
    </Grid>
  )
}

const grid = css({
  height: '100%'
})

const HeaderText = styled('h2', {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '48px',
  lineHeight: '60px',
  color: '#ffffff',
  paddingTop: '172px',
  paddingLeft: '38px',

  '@md': {
    p: 0,
    mt: '29%',
    fontSize: '48px',
    fontWeight: 350
  },

  '@lg': {
    pl: 0,
    mt: 308,
    lineHeight: '68px',
    fontSize: '62px',
    fontWeight: 300
  }
})

const TitleText = styled('h3', {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '36px',
  color: '#fff',
  paddingTop: '283px',
  paddingLeft: '37px',

  '@md': {
    marginTop: 'auto',
    paddingTop: '30px',
    paddingLeft: '0px',
    textAlign: 'center',

    '@lg': {
      paddingBottom: '7px',
      fontSize: '30px',
      lineHeight: '36px'
    }
  }
})

const arrowDow = css({
  color: '#fff',
  marginTop: '22px',
  marginLeft: '38px',
  cursor: 'pointer',

  '@md': {
    marginLeft: 0,
    marginBottom: '37px'
  },
  '@lg': {
    marginLeft: 0,
    marginBottom: '55px'
  }
})
