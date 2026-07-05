import { styled } from 'stitches.config'
import React, {
  FC,
  HTMLAttributes,
  useState,
  useRef,
  useEffect,
  CSSProperties
} from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { BreadCrumb } from '@utils/api/project'
import { useSize } from '@utils/hooks/use-size'

export type BreadcrumbsProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  breadcrumbs?: BreadCrumb[]
  className?: any
}

type ListStyleProperties = CSSProperties & {
  '--offset': string
}

export const BreadCrumbs: FC<BreadcrumbsProps> = ({
  breadcrumbs = [],
  title = '',
  ...props
}) => {
  const [offsetX, setOffsetX] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation('common')
  const containerRef = useRef(null)
  const listRef = useRef(null)
  const listSize = useSize(listRef)

  const handleMouseMove = ({ pageX }) => {
    if (!containerRef.current) return

    const { x } = containerRef.current.getBoundingClientRect()

    const progress = (pageX - x) / containerRef.current.clientWidth
    setOffsetX(Math.round(maxOffset * progress))
  }

  useEffect(() => {
    const diff =
      listRef.current.clientWidth - containerRef.current.clientWidth
    const nextMaxOffset = diff <= 0 ? 0 : diff

    setMaxOffset(nextMaxOffset)
    setOffsetX(nextMaxOffset)
  }, [listSize])

  const list: BreadCrumb[] = [
    { title: t('menu.home'), link: '/' },
    ...breadcrumbs,
    { title }
  ]

  return (
    <Container
      {...props}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <List
        ref={listRef}
        style={{ '--offset': `${-offsetX}px` } as ListStyleProperties}
      >
        {list.map(({ title, link }) => (
          <Item
            key={`${link}:${title}`}
            hovered={isHovered}
            clickable={!link}
          >
            <span
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {link ? <Link href={link}>{title}</Link> : title}
            </span>
          </Item>
        ))}
      </List>
    </Container>
  )
}

const Container = styled('div', {
  color: '$accent',
  background: '$background',
  br: 40,
  display: 'none',
  overflowX: 'hidden',
  width: 464,
  height: 52,

  '@lg': {
    display: 'flex'
  }
})

const List = styled('ul', {
  listStyleType: 'none',
  padding: 0,
  p: '18px 38px',
  m: 0,
  display: 'flex',
  flexShrink: 0,

  '@lg': {
    transform: 'translate3d(var(--offset), 0, 0)'
  }
})

const Item = styled('li', {
  fontSize: 13,
  fontWeight: 500,

  span: {
    cursor: 'default',
    display: 'inline-block',
    transition: 'opacity 175ms ease, transform 80ms ease-out'
  },

  variants: {
    hovered: {
      true: {
        span: {
          opacity: 0.6,

          '&:hover': {
            opacity: 1,
            transform: 'scale(1.05)'
          }
        }
      }
    },
    clickable: {
      true: {
        span: {
          '&:hover': {
            transform: 'scale(1)!important'
          }
        }
      }
    }
  },

  '&:not(:last-child):after': {
    content: '',
    display: 'inline-block',
    width: 8,
    height: 8,
    borderWidth: '0 2px 2px 0',
    borderStyle: 'solid',
    borderColor: 'rgba(76, 76, 76, 0.32)',
    transform: 'scaleX(0.8) rotate(-45deg)',
    ml: 11,
    mr: 16
  }
})
