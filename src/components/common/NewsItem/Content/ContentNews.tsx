import { Col } from '@ui'
import React, { FC } from 'react'
import { styled, css } from 'stitches.config'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { formatLink } from '@utils/helpers'
import { RichTextContent } from '@components/common/RichTextContent'

export const ContentNews: FC<{
  title: string
  image: string
  imageAlt?: string | null
  description: string
  link?: string
}> = ({ title, image, imageAlt, description, link }) => {
  return (
    <>
      <Col className={stickImage()}  xs={{ span: 12, start: 2 }} lg={{ span: 6, start: 2 }}>
        <ContentImg>
          <img src={image} alt={imageAlt || title} width="100%" height="100%" />
        </ContentImg>
      </Col>
      <Col className={undefined}  xs={{ span: 12, start: 2 }} lg={{ span: 5, start: 7 }}>
        <div className={container()}>
          <ContentText>
            <Paragraph>
              <RichTextContent html={description} />
            </Paragraph>
            {link && (
              <Link href={link} passHref={true}>
                <LinkContainer
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/newsItem/link.svg"
                    alt=""
                    width={14}
                    height={14}
                  />

                  <LinkText>{formatLink(link)}</LinkText>
                </LinkContainer>
              </Link>
            )}
          </ContentText>
        </div>
      </Col>
    </>
  )
}

const stickImage = css({
  '@lg': {
    position: 'sticky !important',
    top: 100
  },

})

const container = css({
  // overflow: 'scroll',
  // height: 'fit-content',
  '@lg': {
    position: 'relative',
    left: 57,
    marginTop: -314,
  },

  '@xl': {
    left: 57,
    marginTop: -462
  }
  
})
const ContentImg = styled('div', {
  width: '375px',
  height: '274px',
  ml: -38,
  mt: 52,
  '@md': {
    width: '638px',
    height: '465px',
    ml: 2,
    mt: 40
  },
  '@lg': {
    width: '434px',
    height: '316px',
    ml: 1,
    mt: 88
  },
  '@xl': {
    width: '579px',
    height: '422px',
    ml: 1,
    mt: 88
  },
  div: {
    width: '100%',
    height: '100%'
  }
})

const ContentText = styled('div', {
  color: '$link',
  '@lg': {
    overflow: 'scroll',

    height: 'fit-content'
  },

})

const Paragraph = styled('div', {
  fontSize: '16px',
  lineHeight: '1.64em',
  pr: 31,
  mt: 40,
  ml: 2,
  '@md': {
    letterSpacing: '-0.3px',
    ml: 0,
    pr: 82
  },
  '@lg': {
    ml: -1,
    pr: 16,
  mt: 0,

  },
  '@xl': {
  mt: 40,
    ml: -1,
    pr: 16
  }
})
const TextHeader = styled('h3', {
  fontSize: '20px',
  lineHeight: '1.5em',
  letterSpacing: '-0.55px',
  mt: 65,
  ml: 1,
  '@md': {
    mt: 32,
    ml: 0
  },
  '@lg': {
    mt: 58,
    ml: -1
  }
})

const text = css({
  marginTop: '9px !important',
  '@md': {
    marginTop: '8px !important'
  },
  '@lg': {
    marginTop: '8px !important'
  }
})

const LinkContainer = styled('a', {
  width: '300px',
  height: '48px',
  background: '#EDF0F8',
  br: 45,
  overflow: 'hidden',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  mt: 40,

  '@md': {
    width: 'unset',
    padding: '0 24px',
    mt: 70
  },

  '@lg': {
    mt: 80
  },

  '@xl': {
    mt: 122
  }
})

const LinkText = styled('span', {
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  textTransform: 'uppercase',
  color: '#18214D',
  ml: 8,

  '@md': {
    ml: 7
  },

  '@lg': {
    ml: 6
  }
})
