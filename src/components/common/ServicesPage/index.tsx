import { Col, Grid } from '@ui'
import { Section } from '@components/home/Section'
import React, { FC } from 'react'
import { css } from 'stitches.config'
import { ListServices } from './ListServices/ListServices'
import useTranslation from 'next-translate/useTranslation'
import { services } from '@utils/constants/services'

export const Services: FC = () => {
  const { t } = useTranslation('services')

  return (
    <Section
      title={t('heading')}
      buttonTitle={''}
      className={servicesSection()}
      titleClassName={title()}
    >
      <Grid className={undefined} >
        <Col className={undefined}  xs={{ span: 10, start: 2 }}>
          <ListServices
            services={services.map(({ text, icon, image, link }) => ({
              icon,
              image,
              link,
              text: t(text)
            }))}
          />
        </Col>
      </Grid>
    </Section>
  )
}

const title = css({
  '@lg': {
    fontSize: '40px !important'
  }
})

const servicesSection = css({
  paddingTop: '183px',

  '@md': {
    paddingTop: '150px'
  },
  '@lg': {
    paddingTop: '250px'
  }
})
