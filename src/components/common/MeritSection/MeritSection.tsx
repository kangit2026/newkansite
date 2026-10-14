import React, { FC } from 'react'
import { Section } from '@components/home/Section'
import { MeritList } from './MeritList/MeritList'
import { css, styled } from 'stitches.config'
import { Grid, Col } from '@ui'
export type ContainerProps = {
  container?: string
  title?: string | null
  description?: string | null
  list?: string[]
}

export const MeritSection: FC<ContainerProps> = ({
  container,
  title,
  description,
  list
}) => {
  const resolvedList = (list || []).filter(Boolean)

  return (
    <>
      <Section
        title={title || ''}
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
              {description ? <MeritText>{description}:</MeritText> : null}
              <MeritList merits={resolvedList} />
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
