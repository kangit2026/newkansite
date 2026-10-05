import React from 'react'
import { InsideCommunity } from '@components/inside_community'
import { getInsideCommunityPage } from '@utils/api/insideCommunity'

export default function InsideCommunityPage({ content }) {
  return <InsideCommunity content={content} />
}

export async function getServerSideProps(ctx) {
  const content = await getInsideCommunityPage(ctx)

  return {
    props: {
      content,
      seo: {
        title: content?.metaTitle || null,
        description: content?.metaDescription || null,
        ogImage: content?.ogImage || null
      }
    }
  }
}
