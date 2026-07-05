import { keyframes } from '@stitches/react'
import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import { styled } from 'stitches.config'

export type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
  width?: number
  css?: any
}

type SpinnerStyleProperties = CSSProperties & {
  '--size': string
  '--width': string
  '--innerSize': string
}

export const Spinner: FC<SpinnerProps> = ({
  size = 18,
  width = 2,
  ...props
}) => (
  <StyledSpinner
    {...props}
    style={
      {
        '--size': `${size}px`,
        '--width': `${width}px`,
        '--innerSize': `${size - width * 2}px`
      } as SpinnerStyleProperties
    }
  />
)

const rotation = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
})

const StyledSpinner = styled('div', {
  display: 'inline-block',
  width: 'var(--size)',
  height: 'var(--size)',

  '&:after': {
    content: '',
    display: 'block',
    width: 'var(--innerSize)',
    height: 'var(--innerSize)',
    borderRadius: '50%',
    border: 'var(--width) solid $accent',
    borderColor: 'transparent transparent $link transparent',
    animation: `${rotation} .9s infinite ease`
  }
})
