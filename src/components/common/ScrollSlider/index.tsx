import React, {
  useEffect,
  FC,
  HTMLAttributes,
  useRef,
  useState
} from 'react'
import { styled } from 'stitches.config'
import { ProgressBar } from '@components/common/ProgressBar'
import { useSize } from '@utils/hooks/use-size'

export type ScrollSliderProps = HTMLAttributes<HTMLDivElement> & {
  progress?: boolean
  css?: any
}

export const ScrollSlider: FC<ScrollSliderProps> = ({
  children,
  progress = true,
  css,
  ...props
}) => {
  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)
  const [progressPos, setProgressPos] = useState(0)
  const [translate, setTranslate] = useState(0)
  const wrapperRef = useRef(null)
  const contentWrapperRef = useRef(null)
  const contentRef = useRef(null)
  const contentWrapperSize = useSize(contentWrapperRef)
  const contentSize = useSize(contentRef)

  const updateTranslate = () => {
    if (!wrapperRef.current) return
    if (!contentSize || !wrapperHeight) return

    let topOffset = -wrapperRef.current.getBoundingClientRect().top

    if (topOffset < 0) topOffset = 0

    const maxHeight = wrapperHeight - window.innerHeight

    topOffset = Math.min(topOffset, maxHeight)

    const nextPos = topOffset / maxHeight

    setTranslate(-topOffset)
    setProgressPos(nextPos)
  }

  useEffect(() => {
    if (!contentWrapperSize || !contentSize) return

    setWrapperHeight(
      Math.ceil(
        contentSize.width -
          contentWrapperSize.width +
          window.innerHeight
      )
    )

    setProgressWidth(
      (contentWrapperSize.width / contentSize.width) * 100
    )

    updateTranslate()
  }, [contentWrapperSize, contentSize])

  useEffect(() => {
    const handleScroll = () => {
      updateTranslate()
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [wrapperHeight, contentSize])

  return (
    <StyledScrollSlider
      css={{ ...css, height: wrapperHeight }}
      ref={wrapperRef}
      {...props}
    >
      <ContentWrapper ref={contentWrapperRef}>
        <SecondWrapper>
          <Content
            style={{ transform: `translate3d(${translate}px, 0, 0)` }}
            ref={contentRef}
          >
            {children}
          </Content>
        </SecondWrapper>

        {progress && (
          <ProgressBar
            width={progressWidth}
            position={progressPos}
            transition={false}
            css={{ mt: 40, '@lg': { mt: 59 } }}
          />
        )}
      </ContentWrapper>
    </StyledScrollSlider>
  )
}

const StyledScrollSlider = styled('div', {
  display: 'flex'
})

export const ContentWrapper = styled('div', {
  position: 'sticky',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  top: 0,
  height: '100vh'
})

const Content = styled('div', {
  display: 'flex',

  '& > *': {
    flexShrink: '0'
  }
})

const SecondWrapper = styled('div', { display: 'flex' })
