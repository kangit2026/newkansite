import React, { FC } from 'react'
import { styled } from 'stitches.config'

export const List: FC<{ items: string[] }> = ({ items }) => {
  return (
    <Ul>
      {items.map((item) => (
        <Li key={item}>{item}</Li>
      ))}
    </Ul>
  )
}

const Ul = styled('ul', {
  padding: '0px 42px 0px 47px',
  margin: '27px 0px 0px',
  listStyleType: 'none',

  '@md': {
    margin: '28px 0px 0px',
    padding: '0px 0px 0px 73px'
  },

  '@lg': {
    padding: '4px 0px 0px 0'
  }
})

const Li = styled('li', {
  fontWeight: 300,
  color: '#FFFFFF',
  fontSize: '20px',
  lineHeight: '1.4em',
  letterSpacing: '0.006em',
  '@md': {
    mb: 0
  },
  '@lg': {
    mb: 0
  },

  '&:before': {
    content: '- ',
    ml: '-0.55em'
  }
})
