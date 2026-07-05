import { Col, Grid } from '@ui'
import React, { FC, HTMLAttributes } from 'react'
import { HeaderFooter } from './HeaderFooter/HeaderFooter'
import { FooterIcons } from './FooterIcons/FooterIcons'
import { RenewalContent } from './RenewalContent/RenewalContent'
import { ListContent } from './ListContent/ListContent'
import { css, styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'
import { Advertisement } from '@components/home/Advertisement'
import { useRouter } from 'next/router'
import TelegramIcon from '@assets/social/telegram.svg?svgr'
import { SiteSettings, defaultSettings } from '@utils/api/settings'

export type FooterProps = HTMLAttributes<HTMLDivElement> & {
  settings?: SiteSettings
}

export const Footer: FC<FooterProps> = ({ settings, ...props }) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const s = settings || defaultSettings

  return (
    <>
      {router.pathname == '/areas' ? (
        <Advertisement
          title={t('commercial_advertisement')}
          className={advertisementProject()}
          link="/platform"
          variant="solid"
        />
      ) : (
        <Advertisement
          title={t('project_advertisement')}
          className={advertisementProject()}
          link="/areas"
          variant="solid"
        />
      )}
      <Grid className={props?.className||undefined} {...props}>
        <Col className={undefined}  xs={{ span: 10, start: 2 }}>
          <TextChatbot>
            Чат-бот для швидкого звʼязку: <ChatbotButton onClick={() => s.telegramChatLink && window.open(s.telegramChatLink, '_blank')}>
              <IconWrapper>
                <TelegramIcon />
              </IconWrapper>
            </ChatbotButton>
          </TextChatbot>
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }}>
          <TextEmail>{s.email}</TextEmail>
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 5, start: 2 }}>
          <HeaderFooter phone={s.phone} />
          <ListContent />
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 4, start: 8 }}>
          <RenewalContent />
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 2 }}>
          <FooterIcons social={s.social} />
        </Col>
        <Col className={undefined}  xs={{ span: 10, start: 2 }} lg={{ span: 4 }}>
          <TextContent>
            {s.copyrightYear} &nbsp;{s.copyrightText}
          </TextContent>
        </Col>
      </Grid>
    </>
  )
}

const advertisementProject = css({
  mt: 48,

  '@md': {
    mt: 80
  },

  '@lg': {
    mt: 101
  }
})

const TextChatbot = styled('h3', {
  color: '$accent',
  fontWeight: 400,
  fontSize: 22,
  lineHeight: '28px',
  mt: 16,
  pb: 19,
  borderBottom: '1px solid $border',

  '@md': {
    fontSize: 48,
    fontWeight: 300,
    mt: 24,
    pb: 46
  },

  '@lg': {
    fontSize: 66,
    fontWeight: 300,
    lineHeight: '111px',
    letterSpacing: '-0.01em',
    fontFeatureSettings: "'pnum' on, 'lnum' on, 'liga' on",
    borderBottom: 'none'
  },

  '@xl': {
    fontSize: 66,
  }
})

const ChatbotButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  color: '$accent',
  background: '$nav',
  border: 'none',
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '20px',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  letterSpacing: 'inherit',
  transition: '150ms background-color ease, 150ms transform ease',
  verticalAlign: 'middle',
  marginLeft: 8,

  '&:hover': {
    backgroundColor: '$navHover'
  },

  '&:active': {
    backgroundColor: '$navActive',
    transform: 'scale(.96)'
  },

  '@md': {
    padding: '10px 20px',
    borderRadius: '25px',
    gap: 10
  },

  '@lg': {
    padding: '12px 24px',
    borderRadius: '30px',
    gap: 12
  }
})

const IconWrapper = styled('div', {
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$social',
  flexShrink: 0,

  '@md': {
    width: '24px',
    height: '24px'
  },

  '@lg': {
    width: '28px',
    height: '28px'
  }
})

const TextEmail = styled('h3', {
  fontWeight: 350,
  fontSize: 18,
  lineHeight: '23px',
  letterSpacing: '-0.01em',
  color: '$accent',
  mt: 16,
  pb: 19,
  borderBottom: '1px solid $border',

  '@md': {
    fontSize: 32,
    fontWeight: 350,
    mt: 24,
    pb: 46
  },

  '@lg': {
    fontSize: 42,
    fontWeight: 350,
    letterSpacing: '-0.02em',
    lineHeight: '53px',
    borderBottom: 'none',
    mt: 4
  }
})

const TextContent = styled('h4', {
  fontWeight: '400',
  mt: 25,
  mb: 16,
  color: '#9b9db2',
  fontSize: '12px',
  lineHeight: '40px',
  textAlign: 'center',
  letterSpacing: '-0.01em',

  '@md': {
    fontSize: 13,
    fontWeight: 400,
    mt: 43,
    mb: 24,
    ml: -1,
    letterSpacing: 'normal'
  },

  '@lg': {
    letterSpacing: 'normal',
    textAlign: 'left',
    mt: 26,
    mb: 60,
  },

  '@xl': {
    letterSpacing: 'normal',
    textAlign: 'left',
    mt: -14,
    mb: 60
  }
})
