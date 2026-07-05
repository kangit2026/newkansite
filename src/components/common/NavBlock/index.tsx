import React, { FC, HTMLAttributes } from 'react'
import { styled } from 'stitches.config'

export type NavBlockProps = HTMLAttributes<HTMLElement> & {
  type?: string
  href?: string
  css?: any
}

export const NavBlock: FC<NavBlockProps> = ({
  children,
  type,
  ...props
}) => {
  return (
    <StyledNavBlock {...props} as={type as any}>
      {children}
    </StyledNavBlock>
  )
}

const StyledNavBlock = styled('div', {
  backgroundColor: '$nav',
  color: '$accent',
  borderRadius: '50px',
  border: 'none',
  padding: '14px 24px',
  fontSize: '$md',
  fontWeight: '$regular',
  display: 'inline-flex',
  alignItems: 'center',

  '@md': {
    padding: '10px 16px 12px'
  },

  '@lg': {
    padding: '17px 26px'
  }
})
