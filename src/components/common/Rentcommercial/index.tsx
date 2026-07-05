import { Col, Grid } from '@ui'
import { Section } from '@components/home/Section'
import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import { PlatformsList } from './PlatformsList/PlatformsList'
import useTranslation from 'next-translate/useTranslation'

export const Rentcommercial: FC = () => {
  const { t } = useTranslation('platform')
  return (
    <>
      <Section
        title={t('heading_rent')}
        buttonTitle=""
        className={classPlatformTitle()}
        titleClassName={title()}
        isTitleSticky={false}
      >
        <Grid className={undefined} >
          <Col className={undefined} 
            xs={{ span: 12, start: 2 }}
            md={{ span: 12, start: 2 }}
            lg={{ span: 5, start: 2 }}
          >
            <TextWrapper>
              <Article>{t('collaboration_rent')}</Article>
              <Article className={paragraphClass()}>
                {t('efficiency_rent')}
              </Article>
              <ul>
                {Array(4).fill(0).map((_,i)=><li key={i}>{t(`dot_rent_${i}`)}</li>)}
                
              </ul>
              {/* <Article className={paragraphClass()}>
                {t('proposal')}
              </Article>
              <Article className={paragraphClass()}>
                {t('invest')}
              </Article> */}
            </TextWrapper>
          </Col>
          <Col className={undefined} 
            xs={{ span: 12, start: 1 }}
            md={{ span: 12, start: 2 }}
            lg={{ span: 6, start: 7 }}
          >
            <PlatformsList />
          </Col>
        </Grid>
      </Section>
    </>
  )
}

const classPlatformTitle = css({
  fontSize: '24px',
  lineHeight: '1.5em',
  pt: 180,
  ml: 1,

  '@md': {
    fontSize: '32px',
    lineHeight: '1.12em',
    pt: 157,
    ml: 2
  },

  '@lg': {
    pt: 238,
    marginBottom: '10.5em',
    fontSize: '32px',
    lineHeight: '1.12em'
  }
})

const title = css({
  '@lg': {
    width: '383px'
  }
})

const TextWrapper = styled('div', {
  color: '$accent',
  fontSize: '16px',
  lineHeight: '1.5em',
  pt: 17,

  '@md': {
    textAlign: 'justify',
    fontSize: '20px',
    lineHeight: '1.4em',
    mt: 2,
    ml: -2,
    pr: 54
  },

  '@lg': {
    position: 'sticky',
    top: 150,
    textAlign: 'start',
    lineHeight: '1.2em',
    ml: 0,
    pr: 102,
fontWeight: 350,
fontSize: 16,
// lineHeight: '100%',
letterSpacing: '0%'

  }
})

const Article = styled('p', {
  pr: 40,

  '@md': {
    letterSpacing: '-0.002em',
    pr: 10
  }
})

const paragraphClass = css({
  pt: 8,
  paddingRight: '30px !important',
  '@md': {
    textAlign: 'justify',
    mb: 0,
    paddingRight: '10px !important'
  },
  '@lg': {
    mt: 42,
    textAlign: 'start',
    paddingRight: '0 !important'
  }
})
