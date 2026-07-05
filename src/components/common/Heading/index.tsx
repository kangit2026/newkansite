import React, { FC, HTMLAttributes } from 'react'
import cx from 'classnames'
import { css } from 'stitches.config'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading: FC<HeadingProps> = ({
  type,
  children,
  className,
  ...props
}) => {
  const TagName = type

  return (
    <TagName {...props} className={cx(heading(), className)}>
      {children}
    </TagName>
  )
}

const heading = css({
  'h1&': {
    fontSize: 40,
    fontWeight: 300,

    '@lg': {
      fontSize: 62
    }
  },

  'h2&': {
    fontSize: 24,
    fontWeight: 350,

    '@md': {
      fontSize: 26
    },

    '@lg': {
      fontSize: 32
    }
  },

  'h3&': {
    fontSize: 20,
    fontWeight: 300
  }
})
