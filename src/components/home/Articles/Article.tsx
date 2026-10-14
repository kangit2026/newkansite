import React, { FC, HTMLAttributes } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { NewsInfo } from '@utils/api/news'

type ArticleProps = NewsInfo

export const Article: FC<ArticleProps> = ({
  date,
  tags,
  title,
  link,
  image,
  imageAlt
}) => {
  const { t } = useTranslation('news')

  return (
              <Link href={link} passHref={true}>
    <div className={`item`} style={{cursor:'pointer'}}>
      <img src={image} alt={imageAlt || title} className={'illustration'} loading="lazy" decoding="async" />
      <div className={`d-flex flex-column stats`}>
        <div className="d-flex justify-content-between">
          <div className={'date'}>{date}</div>
          <div className={'newsItemTags'}>
            <div className={'newsItemTagsItem'}>{tags[0]}</div>
          </div>
        </div>
        <div className={'title'}>{title}</div>

          <a className="link">
            {t('open')} {'>'}
          </a>
      </div>
    </div>
        </Link>
  )
}
