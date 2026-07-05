import React, {
  FC,
  useRef,
  useState,
  useEffect,
  CSSProperties
} from 'react'
import {
  AdaptiveImage,
  SrcSet
} from '@components/common/AdaptiveImage'
import { css } from 'stitches.config'

export type HoveredComponentProps = {
  sources: { element: SrcSet; effect: SrcSet }
  className: string
  misc?: any
}

const maskRadius = 100

type EffectStyleProperties = CSSProperties & {
  '--cx': string
  '--cy': string
  '--x': string
  '--y': string
  '--rad': string
}

export const HoveredComponent: FC<HoveredComponentProps> = ({
  sources,
  className,
  misc
}) => {
  const backgroundRef = useRef(null)
  const [coords, setCoords] = useState([null, null])

  const handleMouseMove = (event) => {
    if (!backgroundRef.current) return
    const wrapper = backgroundRef.current.getBoundingClientRect()

    setCoords([event.clientX - wrapper.x, event.clientY - wrapper.y])
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () =>
      document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const isVisible = coords[0] !== null && coords[1] !== null

  const style = isVisible
    ? ({
        // add mask center point for Safari polyfill
        '--cx': `${coords[0]}px`,
        '--cy': `${coords[1]}px`,
        '--x': `${coords[0] - maskRadius}px`,
        '--y': `${coords[1] - maskRadius}px`,
        '--rad': `${maskRadius}px`
      } as EffectStyleProperties)
    : {}

  return (
    <div className={className}>
      <AdaptiveImage
        srcSet={sources.element}
        themed={true}
        ref={backgroundRef}
        className={element()}
      />

      <AdaptiveImage
        className={effect()}
        srcSet={sources.effect}
        themed={true}
        style={style}
      />
      {misc}
    </div>
  )
}

const element = css({
  position: 'relative',
  display: 'flex',
  width: '100%'
})

const effect = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  '--cx': '-500px',
  '--cy': '-500px',
  '--x': '-500px',
  '--y': '-500px',
  '--rad': 0,
  // Safari hack
  WebkitMaskImage:
    'radial-gradient(var(--rad) var(--rad) at var(--cx) var(--cy), #FFFFFF 21.34%, rgba(255, 255, 255, 0) 100%)',
  mask: 'url(/home/grid-mask.svg)',
  maskRepeat: 'no-repeat',
  maskPosition: 'var(--x) var(--y)',
  opacity: '1'
})
