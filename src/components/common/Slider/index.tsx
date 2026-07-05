import React, { Children, FC, useState } from 'react'
import {
  default as SlickSlider,
  Settings as SliderSettings
} from 'react-slick'
import { ProgressBar } from '@components/common/ProgressBar'
import { styled } from 'stitches.config'

export type SliderProps = SliderSettings & {
  progress?: boolean
  setRef?: (r: any) => void
  beforeChange?: (p: number, n: number) => void
}

const defaultProps = {
  progress: true
}

export const Slider: FC<SliderProps> = ({
  progress,
  children,
  className,
  setRef,
  beforeChange,
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: false,
    arrows: false
  }

  return (
    <Wrapper className={className}>
      <SlickSlider
        {...props}
        {...settings}
        beforeChange={(prevIndex, nextIndex) => {
          setCurrentSlide(nextIndex)

          if (beforeChange) {
            beforeChange(prevIndex, nextIndex)
          }
        }}
        ref={setRef ? setRef : null}
      >
        {children}
      </SlickSlider>

      {progress && (
        <ProgressBar
          width={100 / Children.count(children)}
          position={currentSlide / (Children.count(children) - 1)}
          transition={true}
          css={{ mt: 40 }}
        />
      )}
    </Wrapper>
  )
}

Slider.defaultProps = defaultProps

const Wrapper = styled('div', {
  position: 'relative',
  maxWidth: '100vw'
  // '@lg': {
  //   // maxHeight: '300px'
  // }
})
