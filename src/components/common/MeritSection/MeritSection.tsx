import React, { FC } from 'react'
import { Section } from '@components/home/Section'
import { MeritList } from './MeritList/MeritList'
import { css, styled } from 'stitches.config'
import { Grid, Col } from '@ui'
import useTranslation from 'next-translate/useTranslation'

export type ContainerProps = {
  container?: string
}

const merits = ['first', 'second', 'third', 'fourth']

export const MeritSection: FC<ContainerProps> = ({ container }) => {
  const { t } = useTranslation('about')

  return (
    <>
      <Section
        title={t('merit.title')}
        className={section()}
        buttonTitle={''}
        titleClassName={''}
      >
        <Grid className={undefined} >
          <Col className={undefined} 
            xs={{ span: 10, start: 2 }}
            md={{ span: 10, start: 2 }}
            lg={{ span: 10, start: 2 }}
          >
            <Container className={container}>
              <MeritText>{t('merit.description')}:</MeritText>
              <MeritList
                merits={merits.map((m) => t(`merit.list.${m}`))}
              />
            </Container>
          </Col>
        </Grid>
      </Section>
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  pt: 35,

  '@md': {
    pt: 33,
    pl: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  '@lg': {
    pt: 47,
    pl: 0
  }
})

const MeritText = styled('div', {
  fontWeight: 350,
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'justify',
  color: '$accent',

  '@md': {
    lineHeight: '32px',
    width: 257
  },

  '@lg': {
    lineHeight: '1.62em',
    width: 348
  }
})

const section = css({
  mt: 10,
  color: '$accent',

  '@md': {
    mt: 13
  }
})
