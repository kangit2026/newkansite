import { Col, Grid } from '@ui'
import { Section } from '@components/home/Section'
import React, { FC } from 'react'
import { css } from 'stitches.config'
import { ListServices } from './ListServices/ListServices'
import useTranslation from 'next-translate/useTranslation'
import { ServiceItem } from '@utils/api/services'

export const Services: FC<{ services: ServiceItem[] }> = ({
  services
}) => {
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
            services={services.map(({ id, title, image, link, external }) => ({
              id,
              image,
              link,
              external,
              text: title
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
