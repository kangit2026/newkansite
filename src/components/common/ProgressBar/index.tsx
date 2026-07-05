import React, { CSSProperties, FC } from 'react'
import { styled } from 'stitches.config'

type SliderStyleProperties = CSSProperties & {
  '--progress-width': string
  '--progress-position': string
}

export const ProgressBar: FC<{
  width: number
  position: number
  transition: boolean
  css?: any
}> = ({ width, position, transition, ...props }) => {
  const styles = {
    '--progress-width': `${width}%`,
    '--progress-position': `${position * (100 / width - 1) * 100}%`
  }

  return (
    <StyledProgressBar {...props}>
      <ProgressIndicator
        transition={transition}
        style={{ ...styles } as SliderStyleProperties}
      />
    </StyledProgressBar>
  )
}

export const StyledProgressBar = styled('div', {
  height: '1px',
  background: '$border',
  position: 'relative'
})

const ProgressIndicator = styled('div', {
  background: '$link',
  position: 'absolute',
  height: '2px',
  bottom: '0px',
  width: 'var(--progress-width)',
  transform: 'translate3d(var(--progress-position), 0, 0)',

  variants: {
    transition: {
      true: {
        transition: 'transform 500ms ease'
      }
    }
  }
})
