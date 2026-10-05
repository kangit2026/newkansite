import React from 'react'
import { Contact } from '../src/components/home/Contact'
import { styled } from 'stitches.config'
import Map from '../src/components/common/Map'
import { useTheme } from 'next-themes'
import { getContactsPage, ContactsPageContent } from '@utils/api/contactsPage'

type Props = {
  content: ContactsPageContent
}

const Contacts = ({ content }: Props) => {
  const { resolvedTheme } = useTheme()

  const mapEnabled =
    content?.map?.enabled &&
    content.map.lat != null &&
    content.map.lng != null

  const mapComponent = mapEnabled ? (
    <MapWrapper>
      <Map
        lat={content.map.lat}
        lng={content.map.lng}
        zoom={content.map.zoom}
        theme={resolvedTheme}
      />
    </MapWrapper>
  ) : (
    <MapWrapper />
  )

  return (
    <div>
      <Contact component={mapComponent} content={content} />
    </div>
  )
}

const MapWrapper = styled('div', {
  '@lg': {
    position: 'relative',
    display: 'flex',
    order: '2',
    width: '50%',

    div: {
      height: 'unset'
    }
  }
})

export async function getServerSideProps(ctx) {
  const content = await getContactsPage(ctx)

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

export default Contacts
