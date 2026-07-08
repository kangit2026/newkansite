import React from 'react'
import Articles from '@components/home/Articles'
import {
  featuredNewsCount,
  getNewsPageItems,
  newsCount
} from '@utils/api/news'
import { getSettings } from '@utils/api/settings'

export default function NewsPage({ news, page }) {
  return (
    <div>
      <Articles news={news} page={page} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const rawPage = parseInt(String(ctx.query.page ?? ''), 10)
  const page = Number.isInteger(rawPage) && rawPage > 1 ? rawPage - 1 : 0

  const [news, settings] = await Promise.all([
    getNewsPageItems({ ctx, page }),
    getSettings({ ctx })
  ])
  const [{ total }, { total: featuredTotal }] = news
  const pagesCount = Math.max(
    Math.ceil(total / newsCount),
    Math.ceil(featuredTotal / featuredNewsCount)
  )

  if (page > 0 && page >= pagesCount) {
    return { notFound: true }
  }

  return {
    props: {
      news,
      page,
      seo: {
        title: settings?.news?.metaTitle || null,
        description: settings?.news?.metaDescription || null
      }
    }
  }
}
