import React from 'react'
import Articles from '@components/home/Articles'
import { getNewsPageItems } from '@utils/api/news'

export default function NewsPage({ news }) {
  return (
    <div>
      <Articles news={news} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const news = await getNewsPageItems({ ctx })

  return {
    props: {
      news
    }
  }
}
