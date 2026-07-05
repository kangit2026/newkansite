import React, { FC, HTMLAttributes } from 'react'
import { css, styled } from 'stitches.config'
import cx from 'classnames'

export type NewsCardProps = HTMLAttributes<HTMLAnchorElement> & {
  image: string
  title: string
  date: string
  link: string
  tags: string[]
  order?: 'odd' | 'even'
}

const defaultProps = {
  order: 'odd' as const
}

export const NewsCard: FC<NewsCardProps> = ({
  image,
  title,
  date,
  link,
  tags,
  order,
  className,
  ...props
}) => {
  return (
    <Card
      href={link}
      className={cx(className, 'news-card')}
      {...props}
      order={order}
    >
      <Picture>
        <img className={newsImage()} src={image} alt={title} />
      </Picture>
      <Date>{date}</Date>
      <Title>{title}</Title>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </Card>
  )
}

NewsCard.toString = () => '.news-card'
NewsCard.defaultProps = defaultProps

const Card = styled('a', {
  p: '39px 30px 40px',
  display: 'block',
  color: '$accent',
  transition: '150ms background ease',

  '&:hover': {
    backgroundColor: '$ads'
  },

  variants: {
    order: {
      even: {
        backgroundColor: 'transparent'
      },
      odd: {}
    }
  },

  '@md': {
    p: '24px 24px 40px'
  },

  '@lg': {
    p: '32px 28px 37px 32px'
  }
})

const Picture = styled('div', {
  width: 300,
  height: 219,
  display: 'flex',
  maxWidth: '100%',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
    height: '100%'
  },

  '@md': {
    width: 296,
    height: 216
  },

  '@lg': {
    width: 348,
    height: 254
  }
})

const newsImage = css({
  mx: 'auto'
})

const Date = styled('div', {
  fontSize: 16,
  fontWeight: 350,
  mt: 24,
  color: '$newsDate',

  '@md': {
    mt: 40
  },

  '@lg': {
    mt: 44
  }
})

const Title = styled('h3', {
  fontSize: 20,
  fontWeight: 400,
  lineHeight: '1.5em',
  mt: 23,

  '@md': {
    lineHeight: '1.6em',
    fontWeight: 400,
    mt: 15
  },

  '@lg': {
    lineHeight: '1.33em',
    fontSize: 24,
    fontWeight: 400,
    mt: 27
  }
})

const Tags = styled('div', {
  display: 'flex',
  alignItems: 'center',
  mt: 49,

  '@md': {
    mt: 56
  },

  '@lg': {
    mt: 49
  }
})

const Tag = styled('div', {
  fontSize: 16,
  fontWeight: 500,
  textTransform: 'uppercase',

  '&:not(:last-child):after': {
    content: '',
    display: 'inline-block',
    backgroundColor: '$newsTagSplitter',
    m: '0 14px 4px 15px',
    width: '4px',
    height: '4px',
    borderRadius: '4px'
  }
})
