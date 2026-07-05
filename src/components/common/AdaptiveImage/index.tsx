import { gridConfig } from '@utils/constants'
import { detect } from 'detect-browser'
import { useTheme } from 'next-themes'
import React, { forwardRef, HTMLAttributes } from 'react'
import { useMemo } from 'react'

const browser = detect()

type LoaderExport = {
  default: string
}

export type SrcSet = {
  default: LoaderExport
  [breakPoint: string]: LoaderExport
}

// Sprite means using svg sprite for different themes
// File means using multiple files
export enum ThemingMode {
  Sprite,
  File
}

export type AdaptiveImageProps = HTMLAttributes<HTMLImageElement> & {
  srcSet: SrcSet
  alt?: string
  themed?: boolean
  themingMode?: ThemingMode
}

const defaultProps = {
  themed: false,
  alt: ''
}

const breakPoints = Object.keys(gridConfig.breakPoints)
  .filter((key) => gridConfig.breakPoints[key] != 0)
  .slice(1)

export const mediaQueryBreakPointUp = (breakPoint) => {
  return `(min-width: ${gridConfig.breakPoints[breakPoint]}px)`
}

export const mediaQueryBreakPointDown = (breakPoint) => {
  return `(max-width: ${gridConfig.breakPoints[breakPoint] - 0.02}px)`
}

export const mediaQueryBreakPointOnly = (breakPoint) => {
  const breakPoints = Object.keys(gridConfig.breakPoints)
  const currentBpIndex = breakPoints.indexOf(breakPoint)

  if (currentBpIndex == breakPoints.length - 1) {
    return mediaQueryBreakPointUp(breakPoint)
  } else if (currentBpIndex != -1) {
    const nextBreakPoint = breakPoints[currentBpIndex + 1]

    return `${mediaQueryBreakPointUp(
      breakPoint
    )} and ${mediaQueryBreakPointDown(nextBreakPoint)}`
  }

  return ''
}

export const AdaptiveImage = forwardRef<
  HTMLPictureElement,
  AdaptiveImageProps
>(
  (
    {
      srcSet,
      themed,
      themingMode,
      alt,
      ...props
    }: AdaptiveImageProps,
    ref
  ) => {
    const { resolvedTheme } = useTheme()

    const formattedSources = useMemo(() => {
      const sources = {}
      const srcKeys = ['default', ...breakPoints]

      srcKeys.forEach((bp) => {
        // const src = bp=='xl'?srcSet.lg: srcSet[bp]

        const src = srcSet[bp]

        if (!themed) {
          sources[bp] = src?.default
          return
        }

        const fileSrc =
          themingMode == ThemingMode.File
            ? src[resolvedTheme].default
            : src.default

        const additionalInfo =
          browser.name == 'safari' ? `?${Math.random()}` : ''

        sources[bp] = `${fileSrc}${additionalInfo}#${resolvedTheme}`
      })

      return sources
    }, [srcSet, resolvedTheme, themed, themingMode])

    return (
      <picture ref={ref}>
        {breakPoints.map((bp) => (
          <source
            key={bp}
            srcSet={formattedSources[bp]}
            media={mediaQueryBreakPointOnly(bp)}
          />
        ))}
        <img src={formattedSources['default']} alt={alt} {...props} />
      </picture>
    )
  }
)

// to prevent typescript error
AdaptiveImage.displayName = 'AdaptiveImage'

AdaptiveImage.defaultProps = defaultProps
