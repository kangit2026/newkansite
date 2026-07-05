import React, { FC } from 'react'
import { styled } from 'stitches.config'
import useTranslation from 'next-translate/useTranslation'

const links = [
  {
    title: 'home',
    url: '/'
  },
  {
    title: 'projects',
    url: '/projects'
  },
  {
    title: 'news',
    url: '/news'
  },
  {
    title: 'career',
    url: '/career'
  },
  {
    title: 'about',
    url: '/about'
  },
  {
    title: 'services',
    url: '/services'
  },
  {
    title: 'contacts',
    url: '/contacts'
  },
  {
    title: 'partnership',
    url: '/market'
  }
]

export const ListContent: FC = () => {
  const { t } = useTranslation('common')

  return (
    <Content>
      <Ul>
        {links.map(({ title, url }) => (
          <Li key={title}>
            <Link href={url}>{t(`footer.links.${title}`)}</Link>
          </Li>
        ))}
      </Ul>
    </Content>
  )
}

const Content = styled('div', {
  display: 'none',
  flexDirection: 'column',

  '@lg': {
    display: 'flex'
  }
})

const Ul = styled('ul', {
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  p: 0,
  mt: 91,
  mr: -38
})

const Li = styled('li', {
  fontSize: '16px',
  lineHeight: '20px',
  color: '$accent',
  width: 113,
  margin: '0 38px 24px 0',

  a: {
    transition: '150ms color ease',

    '&:hover': {
      color: '$accentHover'
    }
  }
})

const Link = styled('a')
