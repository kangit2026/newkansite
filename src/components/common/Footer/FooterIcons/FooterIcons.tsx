import React, { FC } from 'react'
import { styled } from 'stitches.config'
import { SocialButton } from '@components/common/SocialButton'
import { socialLinks } from '@utils/constants/social'

export const FooterIcons: FC = () => {
  // Первые 4 соцсети (Instagram, YouTube, Facebook, Pinterest)
  const firstRow = socialLinks.slice(0, 4)
  // Telegram отдельно
  const telegram = socialLinks.find(item => item.id === 'telegram')

  return (
    <Content>
      <FirstRow>
        {firstRow.map(({ id, title, icon, link }) => {
        return (
          <SocialButton
            key={id}
            title={title}
            icon={icon}
            link={link}
          />
        )
      })}
      </FirstRow>
      {telegram && (
        <TelegramRow>
          <SocialButton
            key={telegram.id}
            title={telegram.title}
            icon={telegram.icon}
            link={telegram.link}
          />
        </TelegramRow>
      )}
    </Content>
  )
}

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  mt: 12,

  '@md': {
    mt: 5
  },

  '@lg': {
    mt: -95,
    width: 300,
    gap: 20,
  },

  '@xl': {
    width: 580,
    mt: -142,
  }
})

const FirstRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  flexWrap: 'wrap',
  gap: 20,

  '@xl': {
    flexWrap: 'nowrap',
  }
})

const TelegramRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  mt: 20,

  '@lg': {
    mt: 0,
  }
})
