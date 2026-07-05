import { FC, HTMLAttributes } from 'react'
import { styled } from 'stitches.config'
import cx from 'classnames'

export type ArrowLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  href?: string
  target?: string
  disabled?: boolean
  as?: string
}

export const ArrowLink: FC<ArrowLinkProps> = ({
  className,
  ...props
}) => {
  return (
    <StyledArrowLink
      className={cx('arrow-link', className)}
      {...props}
    />
  )
}

ArrowLink.toString = () => '.arrow-link'

const StyledArrowLink = styled('a', {
  width: 14,
  height: 14,
  transition: 'transform 200ms',
  transform: 'rotate(45deg) skew(10deg, 10deg)',
  flexShrink: '0',
  margin: 'auto 22px auto 0',
  borderTop: '2px solid $splitter',
  borderRight: '2px solid $splitter',
  cursor: 'pointer',

  '&.smallLeft, &.smallRight, &.smallDown': {
    transform: 'rotate(-135deg) skew(10deg, 10deg)',
    width: 8,
    height: 8
  },

  '&.smallRight': {
    transform: 'rotate(45deg) skew(10deg, 10deg)',
    margin: 'auto 0px auto 22px'
  },

  '&.smallDown': {
    transform: 'rotate(135deg) skew(10deg, 10deg);'
  },

  variants: {
    disabled: {
      true: {
        opacity: '0.5',
        cursor: 'default'
      }
    }
  }
})
