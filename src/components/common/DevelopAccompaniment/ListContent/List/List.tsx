import React, { FC } from 'react'
import { styled } from 'stitches.config'

export type ListProps = {
  listItem: Array<string>
}

export const List: FC<ListProps> = ({ listItem }) => {
  return (
    <>
      <Ul>
        {listItem.map((item) => (
          <Li key={item}>{item}</Li>
        ))}
      </Ul>
    </>
  )
}

const Ul = styled('ul', {
  padding: 0,
  margin: 0,
  marginTop: '13px',
  paddingLeft: '68px',

  '@md': {
    marginTop: '9px',
    paddingLeft: '129px'
  },

  '@lg': {
    marginTop: '10px',
    paddingLeft: '181px'
  }
})

const Li = styled('li', {
  fontWeight: 400,
  listStyle: 'none',
  color: '$accent',
  marginBottom: '6px',

  '&:before': {
    content: '- '
  },

  '@md': {
    fontWeight: 300,
    fontSize: '20px',
    lineHeight: '1.3em',
    marginBottom: '5px'
  },
  '@lg': {
    marginBottom: '3px',
    lineHeight: '1.33em'
  }
})
