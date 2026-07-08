import React from 'react'
import { NewsItem } from '@components/common/NewsItem'
import { getNewsBySlug } from '@utils/api/news'
import isEmpty from 'lodash-es/isEmpty'
import { Error } from '@components/common/Error'

export default function News({ details }) {
  if (isEmpty(details)) return <Error code={404} />

  return (
    <div>
      <NewsItem details={details} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const slug = ctx.query.slug as string

  const { details, redirectToSlug } = await getNewsBySlug({ slug, ctx })

  if (redirectToSlug) {
    return {
      redirect: {
        destination: `/news/${redirectToSlug}`,
        permanent: true
      }
    }
  }

  return {
    props: {
      details: details || {},
      seo: {
        title:
          details?.metaTitle ||
          (details?.title ? `KAN | ${details.title}` : null),
        description: details?.metaDescription || null,
        ogImage: details?.image || null
      }
    }
  }
}
