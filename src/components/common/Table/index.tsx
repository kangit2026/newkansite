import React, { FC, HTMLAttributes } from 'react'
import { css, styled } from 'stitches.config'
import { ArrowLink } from '../ArrowLink'

type RowOptions = {
  style?: 'default' | 'title' | 'description'
  optional?: boolean
}

type Item = {
  [key: string]: string | number
  link?: string
  id?: string | number
}

export type TableProps = HTMLAttributes<HTMLDivElement> & {
  loading: boolean
  items: Item[]
  external?: boolean
  options?: { [row: string]: RowOptions }
}

export const Table: FC<TableProps> = ({
  loading,
  items,
  options = {},
  external,
  ...props
}) => {
  return (
    <StyledTable loading={loading} {...props}>
      {items.map((item: Item) => {
        const { id, link } = item
        const keys = Object.keys(item).filter(
          (k) => k != 'id' && k != 'link'
        )

        const itemProps = link
          ? {
              as: 'a',
              href: link,
              target: external ? '_blank' : null
            }
          : {}

        return (
          <Item key={id} {...itemProps}>
            {keys.map((key, index) => (
              <Value
                key={`${id} ${key}`}
                style={
                  options[key]
                    ? options[key].style || 'default'
                    : 'default'
                }
                main={index == 0}
                optional={
                  options[key] ? !!options[key].optional : false
                }
              >
                {item[key]}
              </Value>
            ))}
            <ArrowLink className={arrow()} as="div" />
          </Item>
        )
      })}
    </StyledTable>
  )
}

const arrow = css({
  width: 9,
  height: 9,

  '@lg': {
    width: 14,
    height: 14
  }
})

const StyledTable = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  color: '$accent',

  variants: {
    loading: {
      true: {
        opacity: '0.3'
      }
    }
  }
})

const Item = styled('div', {
  display: 'flex',
  height: 88,
  borderTop: '1px solid $nav',
  justifyContent: 'space-between'
})

const Value = styled('div', {
  margin: 'auto 20px auto 20px',

  '@md': {
    margin: 'auto 20px auto 30px'
  },

  variants: {
    main: {
      true: {
        width: '400px'
      }
    },
    style: {
      default: {
        fontSize: 16
      },
      title: {
        fontSize: 18,
        width: '400px',

        '@md': {
          fontSize: 20
        },

        '@lg': {
          width: '650px'
        }
      },
      description: {
        width: 550,
        fontSize: 14,
        fontWeight: 300
      }
    },
    optional: {
      true: {
        display: 'none',

        '@md': {
          display: 'block'
        }
      }
    }
  }
})
