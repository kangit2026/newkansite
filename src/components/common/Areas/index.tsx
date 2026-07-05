import { Col, Grid } from '@ui'
import React, { FC } from 'react'
import { css, styled } from 'stitches.config'
import { OfferContent } from './OfferContent/OfferContent'
import { PlanContent } from './PlanContent/PlanContent'
import useTranslation from 'next-translate/useTranslation'
import { useTheme } from 'next-themes'
import { ThemeValue } from '@utils/constants'

export const Areas: FC = () => {
  const { t } = useTranslation('areas')
  const { resolvedTheme } = useTheme()

  return (
    <Wrapper>
      <ContentAreasImg>
        <ImageAreas theme={resolvedTheme as ThemeValue} />
      </ContentAreasImg>
      <ContentText>
        <TextContent>{t('heading')}</TextContent>
      </ContentText>
      <Grid className={undefined} >
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 5, start: 2 }}>
          <ContentItems>
            <OfferContent />
          </ContentItems>
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 5, start: 8 }}>
          <PlanContent />
        </Col>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  overflowX: 'hidden'
})

const ContentAreasImg = styled('div', {
  height: 91,
  mt: 197,
  display: 'flex',
  alignItems: 'flex-end',

  '@md': {
    height: 155,
    mt: 198
  },

  '@lg': {
    height: 170,
    mt: 268
  }
})

const ImageAreas = styled('div', {
  width: 375,
  height: 90,
  mx: 'auto',
  backgroundPosition: 'center top',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',

  variants: {
    theme: {
      light: {
        backgroundImage: 'url("/areas/areas-header.svg")'
      },
      dark: {
        backgroundImage: 'url("/areas/areas-header-dark.svg")'
      }
    }
  },

  '@md': {
    width: 640,
    height: 154
  },
  '@lg': {
    width: 698,
    height: 170
  }
})

const ContentText = styled('div', {
  backgroundColor: '#120F82',
  p: '23px 60px 25px 61px',

  '@md': {
    p: '34px 38px 33px 48px'
  },

  '@lg': {
    p: '43px 48px 41px'
  }
})

const TextContent = styled('h2', {
  fontStyle: 'normal',
  fontWeight: 300,
  color: '#FFFFFF',
  fontSize: '26px',
  lineHeight: '40px',
  textAlign: 'center',
  maxWidth: 300,
  mx: 'auto',

  '@md': {
    fontSize: '40px',
    fontWeight: 350,
    maxWidth: 658
  }
})

const ContentItems = styled('div', {
  '@lg': {
    display: 'flex'
  }
})
