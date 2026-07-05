import React from 'react'
import Head from 'next/head'
import { NewsItem } from '@components/common/NewsItem'
import { getNewsById } from '@utils/api/news'
import isEmpty from 'lodash-es/isEmpty'
import { Error } from '@components/common/Error'
import useTranslation from 'next-translate/useTranslation'

export default function News({ details }) {
  const { t } = useTranslation('common')
  const  title  = details?.title

  if (isEmpty(details)) return <Error code={404} />
  console.log('hoc det', details)
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
  const id = ctx.query.id

  const details = await getNewsById({ id, ctx })

  return {
    props: {
      details
    }
  }
}
