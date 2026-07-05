import React, { FC } from 'react'
import { NavBlock, NavBlockProps } from '@components/common/NavBlock'
import { styled } from 'stitches.config'

export const NavButton: FC<NavBlockProps> = ({
  children,
  ...props
}) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

const StyledButton = styled(NavBlock, {
  cursor: 'pointer',
  fontSize: '$sm',
  height: '48px',
  padding: '15px 28px 13px',
  transition: '150ms background-color ease, 150ms transform ease',

  '&:hover': {
    backgroundColor: '$navHover'
  },

  '&:active': {
    backgroundColor: '$navActive',
    transform: 'scale(.96)'
  },

  '@md': {
    height: '40px'
  },

  '@lg': {
    height: '52px'
  }
})
