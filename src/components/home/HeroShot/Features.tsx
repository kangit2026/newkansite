import React, { FC, useRef } from 'react'
import { Col, Grid } from '@ui'
import Arrow from '@assets/home/arrow.svg?svgr'
import { numberWithSpaces } from '@utils/helpers'
import { css, styled } from 'stitches.config'
import { useTheme } from 'next-themes'
import { ScrollAnchor } from '@components/common/ScrollAnchor'
import { scrollToElement } from '@utils/helpers/animations'

const Award: FC<{
  amount: number | string | null
  description: string | null
}> = ({
  amount,
  description
}) => {
  const formattedAmount =
    parseInt(amount as string) == amount
      ? `${numberWithSpaces(amount)}+`
      : amount

  return (
    <StyledAward>
      <AwardAmount>{formattedAmount}</AwardAmount>
      <AwardDescription>{description}</AwardDescription>
    </StyledAward>
  )
}

export type FeaturesProps = {
  motto?: string | null
  awardsTitle?: string | null
  awards?: { value: number | null; description: string | null }[]
}

export const Features: FC<FeaturesProps> = ({
  motto,
  awardsTitle,
  awards
}) => {
  const { resolvedTheme } = useTheme()
  const anchorRef = useRef(null)

  const resolvedMotto = motto || ''
  const resolvedAwardsTitle = awardsTitle || ''
  const resolvedAwards = awards || []

  return (
    <Wrapper>
      <Grid className={undefined} >
        <Col
          xs={{ span: 10, start: 2 }}
          className="d-flex flex-column align-items-center align-items-md-start"
        >
          <Motto>{resolvedMotto}</Motto>
          <Arrow
            onClick={() => {
              scrollToElement(anchorRef.current)
            }}
            className={arrow()}
          />
        </Col>
      </Grid>
      <Awards>
        <Grid className={undefined} >
          <Col className={undefined}  xs={{ span: 10, start: 2 }}>
            <AwardsBackground
              theme={resolvedTheme as 'light' | 'dark'}
            />
            <ScrollAnchor
              ref={anchorRef}
              css={{
                '@lg': {
                  top: -200
                }
              }}
            />
            <AwardsTitle>{resolvedAwardsTitle}</AwardsTitle>
          </Col>
          <Col className={undefined}  xs={{ span: 10, start: 2 }}>
            <AwardsList>
              {resolvedAwards.map(({ value, description }, i) => (
                <Award
                  key={`${i}-${description}`}
                  amount={value}
                  description={description}
                />
              ))}
            </AwardsList>
          </Col>
        </Grid>
      </Awards>
    </Wrapper>
  )
}

const arrow = css({
  margin: '32px 0 23px',
  cursor: 'pointer',

  '@md': {
    margin: '39px 0 69px'
  },

  '@lg': {
    margin: '73px 0px 54px'
  }
})

const Wrapper = styled('div', {
  color: '$accent',
  marginTop: '17px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '@md': {
    marginTop: '-145px'
  },

  '@lg': {
    marginTop: '-132px'
  }
})

const Motto = styled('h1', {
  fontSize: '40px',
  fontWeight: '$semilight',
  lineHeight: '48px',
  width: '224px',
  textAlign: 'center',
  letterSpacing: '0.03em',

  '@md': {
    width: 'unset',
    textAlign: 'left',
    letterSpacing: '-0.01em',
    fontSize: '42px',
    fontWeight: 350
  },

  '@lg': {
    letterSpacing: 0,
    fontSize: '62px'
  }
})

const AwardsBackground = styled('div', {
  width: '100vw',
  height: '243px',
  position: 'absolute',
  left: '50%',
  top: '-137px',
  marginLeft: '-50vw',
  zIndex: '-1',

  variants: {
    theme: {
      light: {
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%)'
      },
      dark: {
        background:
          'linear-gradient(180deg, rgba(20, 20, 22, 0) 0%, #141416 100%)'
      }
    }
  }
})

const Awards = styled('div', {
  position: 'relative',
  width: '100%'
})

const AwardsList = styled('div', {
  marginTop: '35px',

  '@md': {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '76px'
  },

  '@lg': {
    marginTop: '57px'
  }
})

const AwardsTitle = styled('h2', {
  fontSize: '24px',
  fontWeight: '$semilight',
  textAlign: 'center',

  '@md': {
    textAlign: 'left',
    fontSize: '26px',
    fontWeight: 400
  },

  '@lg': {
    fontSize: '32px'
  }
})

const StyledAward = styled('div', {
  position: 'relative',

  '&:not(:last-child)': {
    mb: 23
  },

  '&:after': {
    // bottom line
    content: '',
    display: 'block',
    height: 1,
    width: 300,
    backgroundColor: '$border',
    mt: 32
  },

  '&:before': {
    backgroundColor: '$border'
  },

  '@md': {
    pb: 24,
    width: '50%',

    '&:not(:last-child)': {
      marginBottom: 'unset'
    },

    '&:nth-child(3), &:nth-child(4)': {
      pt: 26
    },

    '&:after': {
      margin: '0',
      position: 'absolute',
      bottom: '0',
      width: '50vw',
      right: '0'
    },

    '&:nth-child(2n)': {
      paddingLeft: '32px',

      '&:after': {
        right: 'unset',
        left: '0'
      }
    },

    '&:nth-child(3),&:nth-child(4)': {
      '&:after': {
        display: 'none'
      }
    },

    '&:nth-child(odd)': {
      '&:before': {
        content: '',
        display: 'block',
        width: '1px',
        height: '100%',
        position: 'absolute',
        right: '-1px',
        top: '0'
      }
    },

    '&:nth-child(3):before': {
      height: '150px'
    }
  },

  '@lg': {
    paddingBottom: '49px',

    '&:nth-child(2n)': {
      paddingLeft: '65px'
    },

    '&:nth-child(3), &:nth-child(4)': {
      paddingTop: '60px'
    },

    '&:nth-child(3):before': {
      height: '295px'
    }
  }
})

const AwardAmount = styled('div', {
  fontSize: '90px',
  fontWeight: 300,
  fontFeatureSettings: "'pnum' on, 'lnum' on!important",
  whiteSpace: 'nowrap',

  '@md': {
    fontSize: '80px'
  },

  '@lg': {
    fontSize: '100px',
    fontWeight: 200
  },

  '@xl': {
    fontSize: '144px',
    fontWeight: 200
  }
})

const AwardDescription = styled('div', {
  fontSize: '14px',
  fontWeight: 400,
  marginTop: '-1px',
  lineHeight: '1.71em',

  '@md': {
    fontWeight: 350,
    marginTop: '0px',
    maxWidth: '275px',
    lineHeight: '1.71em'
  },

  '@lg': {
    fontSize: '20px',
    fontWeight: 350,
    marginTop: '-9px',
    maxWidth: '520px',
    lineHeight: '1.6em'
  }
})
