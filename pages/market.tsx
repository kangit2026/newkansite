import Market from '../src/components/market'
import { getMarketPage } from '@utils/api/market'

export default function MarketPage({ content }) {
  return <Market content={content} />
}

export async function getServerSideProps(ctx) {
  const content = await getMarketPage(ctx)

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
