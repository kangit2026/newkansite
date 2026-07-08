import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { styled } from 'stitches.config'

export const TagLine: FC<{ text?: string | null }> = ({ text }) => {
  const { t } = useTranslation('common')

  return (
    <Container>
      <Text>
        {text || t('achievements')}
      </Text>
    </Container>
  )
}

const Container = styled('div', {
  display: 'none',
  width: '1160px',
  height: '263px',
  border: '1px solid $border',
  borderRadius: '8px',
  marginTop: '72px',
  marginLeft: 'calc(50vw - 580px)',
  marginRight: 'calc(50vw - 580px)',

  '@lg': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Text = styled('h2', {
  width: '928px',
  fontStyle: 'italic',
  fontSize: '32px',
  lineHeight: '1.75em',
  textAlign: 'center',
  color: '$accent',
  pb: 19
})
