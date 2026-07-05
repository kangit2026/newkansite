import { styled } from 'stitches.config'
import React, { FC, HTMLAttributes } from 'react'
import AnimateHeight from 'react-animate-height'

type ErrorMessageProps = HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean
  text: string
  css: any
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  isVisible = false,
  text,
  ...props
}) => {
  return (
    <AnimateHeight duration={150} height={isVisible ? 'auto' : 0}>
      <ErrorText {...props}>{text}</ErrorText>
    </AnimateHeight>
  )
}

const ErrorText = styled('div', {
  color: '$error',
  fontSize: '13px'
})
