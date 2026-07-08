import Image from 'next/image'
import React, { FC } from 'react'
import { styled } from 'stitches.config'

export type HeaderFooterProps = {
  phone?: string | null
}

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const HeaderFooter: FC<HeaderFooterProps> = ({ phone }) => {
  return (
    <Content>
      {phone ? (
        <TextTel as="a" href={toTelHref(phone)}>
          {phone}
        </TextTel>
      ) : (
        <TextTel>{phone}</TextTel>
      )}
    </Content>
  )
}

const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 18,

  '@md': {
    mt: 33
  },

  '@lg': {
    borderBottom: '1px solid $border',
    mt: 34,
    pb: 30
  }
})

const TextTel = styled('h3', {
  fontWeight: 350,
  fontSize: 18,
  lineHeight: '23px',
  letterSpacing: '-0.01em',
  color: '$accent',
  mt: 1,

  '@md': {
    fontSize: 32,
    fontWeight: 350,
    mt: 3
  },

  '@lg': {
    fontSize: 42,
    fontWeight: 350,
    letterSpacing: '-0.02em',
    lineHeight: '53px',
    mt: 4
  }
})

const ContentImg = styled('div', {
  position: 'relative',
  width: 90,
  height: 25,

  '@md': {
    width: 128,
    height: 36
  },

  '@lg': {
    width: 126,
    height: 36
  }
})
