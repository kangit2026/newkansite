import React, { FC } from 'react'
import { styled } from 'stitches.config'

export const TextContent: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <ParagraphText>{children}</ParagraphText>
}

const ParagraphText = styled('div', {
  mt: 48,
  mr: 28,
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'justify',
  color: '$accent',

  '@md': {
    mt: 64,
    mr: 61
  },

  '& p:not(:last-child)': {
    mb: '1.6em'
  },
  '@lg': {
    mt: 80,
    mr: 0
  }
})
