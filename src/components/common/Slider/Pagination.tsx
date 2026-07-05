import { FC, HTMLAttributes } from 'react'
import { css, styled } from 'stitches.config'
import { NavBlock } from '../NavBlock'
import Arrow from '@assets/slider/arrow.svg?svgr'
import cx from 'classnames'

type SliderPaginationProps = HTMLAttributes<HTMLDivElement> & {
  current: number
  total: number
  infinite?: boolean
  onPrevSlide: () => void
  onNextSlide: () => void
  css?: any
}

const SliderArrow: FC<{ onClick: () => void; className: any }> = ({
  onClick,
  ...props
}) => (
  <ArrowWrapper onClick={onClick}>
    <Arrow {...props} />
  </ArrowWrapper>
)

export const SliderPagination: FC<SliderPaginationProps> = ({
  current,
  total,
  infinite = false,
  onPrevSlide,
  onNextSlide,
  ...props
}) => (
  <Pagination {...props}>
    <SliderArrow
      className={cx(
        'pagination-arrow',
        arrow({
          direction: 'left',
          disabled: !infinite && current == 0
        })
      )}
      onClick={() => onPrevSlide()}
    />
    {current + 1}/{total}
    <SliderArrow
      className={cx(
        'pagination-arrow',
        arrow({
          direction: 'right',
          disabled: !infinite && current == total - 1
        })
      )}
      onClick={() => onNextSlide()}
    />
  </Pagination>
)

const ArrowWrapper = styled('div', {
  cursor: 'pointer',
  p: 2
})

const arrow = css({
  height: 13,
  transition: 'opacity 325ms ease',
  mb: -1,

  variants: {
    direction: {
      left: { transform: 'rotate(-180deg)', mr: 9 },
      right: { ml: 9 }
    },
    disabled: {
      true: {
        opacity: 0.4
      }
    }
  }
})

const Pagination = styled(NavBlock, {
  height: 52,
  ml: 'auto',
  // mr: -100,
  fontSize: 15,
  fontWeight: 350,
  color: '$accent',
  display: 'flex',
  p: '10px 16px 9px',

  [`& ${Arrow}`]: {
    opacity: 0.2
  }
})
