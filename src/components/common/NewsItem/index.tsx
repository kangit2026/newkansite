import { NewsInfo } from '@utils/api/news'
import React, { FC } from 'react'
import { HeaderNewsItem } from './HeaderNewsItem/HeaderNewsItem'

export const NewsItem: FC<{ details: NewsInfo }> = ({ details }) => {
  return (
    <>
      <HeaderNewsItem details={details} />
    </>
  )
}
