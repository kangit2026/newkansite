import React, { FC, HTMLAttributes, useState } from 'react'
import { styled } from 'stitches.config'
import { useClickOutside } from '@utils/hooks/use-click-outside'

export type SelectBoxItem = { label: string; id: any }

export type SelectBoxProps = HTMLAttributes<HTMLDivElement> & {
  items: SelectBoxItem[]
  selectedItems: any[]
  multiple?: boolean
  placeholder: string
  setItems: (items: any[]) => void
  css: any
  canBeEmpty?: boolean
  type?: 'small' | 'default'
}

export const SelectBox: FC<SelectBoxProps> = ({
  items = [],
  selectedItems = [],
  multiple = false,
  placeholder,
  setItems,
  canBeEmpty = true,
  type = 'default',
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(false)

  const innerRef = useClickOutside((_) => {
    setIsOpened(false)
  })

  const toggleItem = (id: string) => {
    if (multiple) {
      if (selectedItems.includes(id)) {
        const nextValue = selectedItems.filter((i) => i != id)

        if (canBeEmpty) {
          setItems(nextValue)
        } else {
          if (nextValue) {
            setItems(nextValue)
          }
        }
      } else {
        setItems([...selectedItems, id])
      }
    } else {
      if (selectedItems.includes(id)) {
        if (canBeEmpty) {
          setItems([])
        }
      } else {
        setItems([id])
      }
    }
  }

  const isSelectionEmpty = !selectedItems.length

  return (
    <StyledSelectBox {...props} type={type} ref={innerRef}>
      <Label onClick={() => setIsOpened(!isOpened)}>
        {isSelectionEmpty
          ? placeholder
          : items.find(({ id }) => selectedItems.includes(id)).label}

        <Link as="div" className="smallDown" opened={isOpened} />
      </Label>

      <ItemsList position={isOpened ? 'opened' : 'closed'}>
        {items.map(({ id, label }) => (
          <Item
            selected={selectedItems.includes(id)}
            key={id}
            onClick={() => {
              if (!multiple) {
                setIsOpened(false)
              }
              toggleItem(id)
            }}
          >
            <span>{label}</span>
          </Item>
        ))}
      </ItemsList>
    </StyledSelectBox>
  )
}

const Link = styled('a', {
  variants: {
    role: {
      inactive: {
        opacity: '0.5'
      }
    },
    opened: {
      true: {
        transform: 'rotate(312deg) skew(10deg, 10deg) !important'
      }
    }
  },
  width: 14,
  height: 14,
  transition: 'transform 200ms',
  transform: 'rotate(45deg) skew(10deg, 10deg)',
  flexShrink: '0',
  margin: 'auto 26px auto 0',
  borderTop: '2px solid $accent',
  borderRight: '2px solid $accent',

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
    position: 'absolute',
    top: 22,
    right: 0,
    transform: 'rotate(135deg) skew(10deg, 10deg);'
  }
})

const StyledSelectBox = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  br: 40,
  lineHeight: '52px',
  position: 'relative',
  zIndex: 1,
  color: '$accent',

  variants: {
    type: {
      small: {
        height: 48,
        background: '$nav',

        [`& ${Link}`]: {
          '&.smallDown': {
            top: 19,
            margin: 'auto 24px auto 0px'
          }
        },

        '@md': {
          height: 52,
          lineHeight: '54px',

          [`& ${Link}`]: {
            '&.smallDown': {
              top: 23,
              margin: 'auto 26px auto 0px'
            }
          }
        }
      },
      default: {
        height: 52,
        background: '$background'
      }
    }
  }
})

const Label = styled('div', {
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  justifyContent: 'space-between',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  pl: 24,
  pr: 54,
  br: 40
})

const ItemsList = styled('div', {
  maxHeight: 400,
  overflow: 'hidden auto',
  position: 'absolute',
  top: 'calc(100% + 22px)',
  zIndex: '$selectBox',
  background: '$background',
  boxShadow:
    'rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px',
  width: '100%',
  transition: 'transform 300ms, opacity 200ms',
  br: 10,
  left: 0,

  '@lg': {
    right: 'unset'
  },

  variants: {
    position: {
      opened: {
        transform: 'translateY(0px)',
        opacity: 1,
        zIndex: 0
      },
      closed: {
        transform: 'translateY(-30px)',
        opacity: 0,
        visibility: 'hidden',
        zIndex: -100
      }
    }
  }
})

const Item = styled('div', {
  cursor: 'pointer',
  position: 'relative',
  lineHeight: '20px',
  py: 9,
  margin: 'auto',
  display: 'flex',
  width: '100%',
  px: 20,
  transition: 'background 100ms',

  '&:hover': {
    background: '$ads'
  },

  variants: {
    selected: {
      true: {
        '&:before': {
          content: '',
          position: 'absolute',
          right: '10px',
          bottom: '50%',
          width: '6px',
          height: '6px',
          background: '$link',
          $$shadowColor: '$colors$background',
          boxShadow: '0 0 6px 6px $$shadowColor',
          transform:
            'rotate(45deg) skew(10deg, 10deg) translateY(50%)',
          display: 'inline-flex',
          margin: 'auto 8px'
        }
      }
    }
  }
})
