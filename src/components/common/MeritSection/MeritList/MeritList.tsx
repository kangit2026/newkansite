import React, { FC } from 'react'
import Image from 'next/legacy/image'
import { styled } from 'stitches.config'

export const MeritList: FC<{ merits: string[] }> = ({ merits }) => {
  return (
    <Container>
      {merits.map((merit) => (
        <Item key={merit}>
          <Icon>
            <Image
              src="/about/award.svg"
              alt="Awards"
              layout="fill"
            />
          </Icon>
          <Text>{merit}</Text>
        </Item>
      ))}
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  mt: 48,
  mb: -48,
  justifyContent: 'space-between',

  '@md': {
    display: 'flex',
    width: 319,
    mt: 0,
    mb: -36,
    flexShrink: '0',
    ml: -2,
    justifyContent: 'space-between'
  },

  '@lg': {
    width: 300,
    mt: 6,
    mb: 0,
    flexWrap:'wrap'
  },

  '@xl': {
    width: 695,
    mt: 6,
    mb: 0
  }
})

const Icon = styled('div', {
  width: 32,
  height: 46,
  position: 'relative',
  flexShrink: '0'
})

const Item = styled('div', {
  width: 120,
  mb: 48,

  '@md': {
    width: 127,
    mb: 36
  },

  '@lg': {
    mb: 0,
    width: 116
  }
})

const Text = styled('h4', {
  fontWeight: 350,
  fontSize: '20px',
  lineHeight: '32px',
  color: '$accent',
  mt: 31,

  '@md': {
    mt: 16
  },

  '@lg': {
    mt: 30
  }
})
