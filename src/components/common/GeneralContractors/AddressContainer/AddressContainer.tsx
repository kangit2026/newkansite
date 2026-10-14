import { Col, Grid } from '@ui'
import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

const phone = '044 495 85 16'
const phoneHref = 'tel:+380444958516'
const email = 'office@kanbud.com.ua'

export const AddressContainer: FC = ({}) => {
  const { t } = useTranslation('general')

  return (
    <Wrapper>
      <Grid className={undefined} >
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 3, start: 9 }}>
          <AddressWrapper>
            <Contact as="a" href={phoneHref} className={emailContent()}>
              {phone}
            </Contact>
            <Contact className={emailContent()}>{email}</Contact>
          </AddressWrapper>
        </Col>
      </Grid>
      <Grid className={undefined} >
        <Col className={undefined} 
          xs={{ span: 10, start: 2 }}
          md={{ span: 12, start: 2 }}
          lg={{ span: 6, start: 2 }}
        >
          <AddressWrapper>
            <Contact className={addressContent()}>
              {t('address')}
            </Contact>
          </AddressWrapper>
        </Col>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  color: '$accent'
})

const AddressWrapper = styled('div', {
  mt: 32,
  '@md': {
    mt: 25,
    ml: -1
  },
  '@lg': {
    position: 'relative',
    bottom: '-25px'
  }
})
const Contact = styled('h4', {
  display: 'block',
  color: 'inherit',
  textDecoration: 'none',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '1.5em',

  '@md': {
    fontWeight: 300
  },

  '@lg': {
    fontSize: '32px',
    lineHeight: '1.31em'
  }
})

const emailContent = css({
  pt: 0,
  pl: 1,
  pb: 0,
  '@md': {
    pt: 0,
    pl: 0,
    pb: 0
  }
})

const addressContent = css({
  pr: 65,
  ml: -1,
  '@md': {
    pt: 6,
    letterSpacing: '0.004em'
  },
  '@lg': {
    position: 'absolute',
    bottom: '25px',
    pr: 79
  }
})
