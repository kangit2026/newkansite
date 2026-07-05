import React, { FC, ReactElement } from 'react'
import { styled } from 'stitches.config'
import { Diamond } from '@components/common/Diamond'
import { useTheme } from 'next-themes'
import Link from 'next/link'

type AdvertisementVariant = 'solid' | 'dashed'

export type AdvertisementProps = {
  title: string | ReactElement
  className?: any
  variant?: AdvertisementVariant
  link?: string
}

const defaultProps = {
  variant: 'solid' as AdvertisementVariant
}

export const Advertisement: FC<AdvertisementProps> = ({
  title,
  variant,
  link = '',
  ...props
}) => {
  const { resolvedTheme } = useTheme()

  return (
    <Link href={link} passHref={true}>
      <StyledAdvertisement
        {...props}
        data-mode={resolvedTheme}
        data-variant={variant}
      >
        <DiamondWrapper className="d-none d-lg-inline-block">
          <Diamond />
        </DiamondWrapper>
        <Title>{title}</Title>
      </StyledAdvertisement>
    </Link>
  )
}

Advertisement.defaultProps = defaultProps

const DiamondWrapper = styled('div', {
  opacity: 0,
  transform: 'translateY(10px)',
  transition: '150ms opacity ease, 150ms transform ease'
})

const StyledAdvertisement = styled('a', {
  p: '81px 10px 79px',
  textAlign: 'center',
  color: '$accent',
  display: 'block',
  backgroundColor: '$ads',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '120%',
  backgroundPosition: 'left 78px center',

  '&:hover': {
    [`& ${DiamondWrapper}`]: {
      opacity: 1,
      transform: 'none'
    }
  },

  '@md': {
    p: '78px 10px 75px',
    backgroundSize: '75.5%',
    backgroundPosition: '-71% 0%'
  },

  '@lg': {
    p: '64px 10px 115px',
    backgroundSize: '45.7%',
    backgroundPosition: '-86.4% 67%'
  },

  '&[data-variant="solid"]': {
    '&[data-mode="light"]': {
      backgroundImage: 'url(/home/advertisement.svg#solid-light)'
    },
    '&[data-mode="dark"]': {
      backgroundImage: 'url(/home/advertisement.svg#solid-dark)'
    }
  },

  '&[data-variant="dashed"]': {
    '&[data-mode="light"]': {
      backgroundImage: 'url(/home/advertisement.svg#dashed-light)'
    },
    '&[data-mode="dark"]': {
      backgroundImage: 'url(/home/advertisement.svg#dashed-dark)'
    }
  },

  [`${Diamond}`]: {
    mb: 24
  }
})

const Title = styled('div', {
  fontSize: 32,
  fontWeight: 300,
  letterSpacing: '-0.008em',
  lineHeight: '1.25em',
  maxWidth: 318,
  mx: 'auto',

  '@md': {
    fontSize: 48,
    fontWeight: 300,
    maxWidth: 512,
    lineHeight: '1.33em'
  },

  '@lg': {
    fontSize: 56,
    maxWidth: 696,
    lineHeight: '1.14em'
  }
})
