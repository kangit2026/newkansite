import React, { FC } from 'react'
import { Section } from '@components/home/Section'
import { css, styled } from 'stitches.config'
import { Col, Grid } from '@ui'
import useTranslation from 'next-translate/useTranslation'

export const SectionNow: FC<{
  title?: string | null
  description?: string | null
}> = ({ title, description }) => {
  const { t } = useTranslation('about')

  return (
    <>
      <Section
        title={title || t('today.title')}
        buttonTitle={''}
        className={textSection()}
      >
        <Grid className={undefined} >
          <Col className={undefined}
            xs={{ span: 10, start: 2 }}
            md={{ span: 10, start: 2 }}
            lg={{ span: 10, start: 2 }}
          >
            <TextSection>
              <p>{description || t('today.description')}</p>
            </TextSection>
          </Col>
        </Grid>
      </Section>
    </>
  )
}

const TextSection = styled('div', {
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'justify',
  color: '$accent',
  letterSpacing: '-0.002em',
  marginTop: '0px',

  '@md': {
    marginTop: '24px',
    marginRight: '65px',
    marginLeft: '1px',
    letterSpacing: '-0.03em'
  },
  '@lg': {
    marginTop: '47px',
    marginRight: '0px',
    marginLeft: '0px',
    letterSpacing: 0
  }
})

const textSection = css({
  pt: 36,
  color: '$accent',

  '@md': {
    pt: 45
  },
  '@lg': {
    fontSize: '30px',
    lineHeight: '36px',
    pt: 64,
    letterSpacing: '-0.03em'
  }
})
