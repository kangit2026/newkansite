import React, { FC } from 'react'
import { Col, Grid } from '@ui'
import { ManifestVideo } from './ManifestVideo'
import { Features } from './Features'
import HoveredComponent from '@components/common/HoveredComponent'
import { css, styled } from 'stitches.config'
export type HeroShotProps = {
  motto?: string | null
  awardsTitle?: string | null
  awards?: { value: number | null; description: string | null }[]
  videoUrl?: string | null
}

export const HeroShot: FC<HeroShotProps> = ({
  motto,
  awardsTitle,
  awards,
  videoUrl
}) => {
  return (
    <Wrapper>
      <Grid className={undefined} >
        <HoveredComponent
          className={background()}
          sources={{
            element: require('@assets/home/grid/default.svg?srcset'),
            effect: require('@assets/home/grid/hovered.svg?srcset')
          }}
        />
        <Col className={undefined}  xs={12} md={{ span: 4, start: 8 }}>
          <ManifestVideo src={videoUrl} />
          <Heading>
            KAN Development
            {motto ? (
              <span className="d-none d-md-inline"> / {motto}</span>
            ) : null}
          </Heading>
        </Col>
      </Grid>
      <Features
        motto={motto}
        awardsTitle={awardsTitle}
        awards={awards}
      />
    </Wrapper>
  )
}

const Wrapper = styled('div', {
  overflow: 'hidden'
})

const background = css({
  position: 'absolute',
  zIndex: '-1',
  mt: 7,
  userSelect: 'none',
  pointerEvents: 'none',
  width: '100%',
  ml:'calc(-1 * (50vw - 180px))',

  '@md': {
    mt: 0,
    ml:'0',
    width: 768
  },

  '@lg': {
    mt: 1,
    width: 1000
  },

  '@xl': {
    mt: 1,
    width: 1392
  }
})

const Heading = styled('h2', {
  fontSize: 16,
  color: '$accent',
  textAlign: 'center',
  mt: 49,

  '@md': {
    fontSize: 14,
    fontWeight: 350,
    mt: 25,
    ml: 3
  },

  '@lg': {
    fontSize: 16,
    mt: 59,
    ml: 0
  }
})
