import React from 'react'
import Head from 'next/head'
import { NewsItem } from '@components/common/NewsItem'
import { getNewsBySlug } from '@utils/api/news'
import isEmpty from 'lodash-es/isEmpty'
import { Error } from '@components/common/Error'
import useTranslation from 'next-translate/useTranslation'

export default function News({ details }) {
  const { t } = useTranslation('common')
  const  title  = details?.title

  if (isEmpty(details)) return <Error code={404} />

  return (
    <div>
      <Head>
        <title>{t('title.base', { title })}</title>
      </Head>
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
      details: details || {}
    }
  }
}
