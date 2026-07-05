import React, { FC, HTMLAttributes, ReactFragment } from 'react'
import { Col, Grid } from '@ui'
import { Heading } from '@components/common/Heading'
import { NavButton } from '@components/common/NavButton'
import { css, styled } from 'stitches.config'
import cx from 'classnames'

export type SectionProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  buttonTitle?: string
  titleClassName?: string
  buttonLink?: string
  button?: ReactFragment
  className?: any
  isTitleSticky?: boolean
}

export const Section: FC<SectionProps> = ({
  title,
  buttonTitle,
  buttonLink,
  button,
  children,
  titleClassName,
  className,
  isTitleSticky,
  ...props
}) => {
  const getHeaderButton = () => {
    if (button) return button
    if (buttonTitle)
      return (
        <NavButton
          type="a"
          href={buttonLink}
          className={moreButton()}
        >
          {buttonTitle}
        </NavButton>
      )

    return null
  }

  const headerButton = getHeaderButton()

  return (
    <div className={`${cx(className)}`} {...props}>
      <div className={`${isTitleSticky && stickyTitle()}`}>
        <Grid className={undefined} >
          <Col className={undefined} 
            xs={{ span: 10, start: 2 }}
            md={{ span: 10, start: 2 }}
            lg={{ span: 10, start: 2 }}
          >
            <Head>
              <Line />
              <HeadContent noButton={!headerButton} id="head">
                <Title type={'h2'} className={titleClassName}>
                  {title}
                </Title>
                {headerButton}
              </HeadContent>
            </Head>
          </Col>
        </Grid>
      </div>
      {children}
    </div>
  )
}

const backgroundStyles = {
  '&:before': {
    content: '',
    position: 'absolute',
    background: '$background',
    height: '100%',
    left: -16,
    right: -16,
    zIndex: -1
  }
}

export const Title = styled(Heading, {
  position: 'relative'
})

const stickyTitle = css({
  '@lg': {
    position: 'sticky',
    top: 200,
    bottom: '100vh',
    pb: 350,
    mt: -350
  }
})

const moreButton = css({
  fontSize: '$xs',
  p: '10px 28px 9px',

  '@md': {
    ml: 23,
    px: 25
  },

  '@lg': {
    ml: 25,
    height: 40,
    p: '6px 25px 5px 23px'
  }
})

export const Head = styled('div', {
  position: 'relative'
})

export const HeadContent = styled('div', {
  display: 'inline-flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  color: '$accent',

  variants: {
    noButton: {
      false: {
        ...backgroundStyles
      },
      true: {
        [`& ${Title}`]: {
          ...backgroundStyles
        }
      }
    }
  },

  '@md': {
    width: 'auto',

    '&:before': {
      left: -25,
      right: -22
    }
  }
})

const Line = styled('div', {
  height: '1px',
  position: 'absolute',
  backgroundColor: '$border',
  width: 'calc(100vw - 1px)',
  left: '50%',
  margin: '0 0 0 -50vw',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: '-2'
})
