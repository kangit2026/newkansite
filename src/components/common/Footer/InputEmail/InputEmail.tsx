import React, { FC, HTMLAttributes } from 'react'
import { styled } from 'stitches.config'

export const InputEmail: FC<
  {
    placeholder: string
    value: string
    onChange: (_: string) => void
    name?: string
    disabled?: boolean
    success?: boolean
  } & HTMLAttributes<HTMLInputElement>
> = ({ success, ...props }) => {
  return (
    <TextContentEmail success={success}>
      <InputRenewalEmail {...props} type="text" />
    </TextContentEmail>
  )
}

const TextContentEmail = styled('label', {
  display: 'flex',
  justifyContent: 'center',
  cursor: 'text',
  background: '$background',
  height: 72,
  flexGrow: 1,
  transition: '150ms opacity ease-in, 150ms height ease-in',
  overflow: 'hidden',

  '@md': {
    height: 84
  },

  '@lg': {
    justifyContent: 'start'
  },

  variants: {
    success: {
      true: {
        opacity: 0,
        height: 0
      }
    }
  }
})

const InputRenewalEmail = styled('input', {
  border: 'none',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '40px',
  textAlign: 'center',
  p: '0 10px 0',
  background: 'transparent',
  width: '100%',
  color: '$accent',
  height: 72,

  '&:disabled': {
    opacity: '0.6'
  },

  '&:placeholder': {
    color: '$accent',
    opacity: 1,
    letterSpacing: '0.01em'
  },

  '@md': {
    fontSize: 15,
    height: 84
  },

  '@lg': {
    paddingTop: '1px',
    letterSpacing: '0.013em'
  }
})
