import React from 'react'
import { Services } from '@components/common/ServicesPage'
import { getServices } from '@utils/api/services'
import { getSettings } from '@utils/api/settings'

export default function services({ services }) {
  return (
    <div>
      <Services services={services} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const [services, settings] = await Promise.all([
    getServices(ctx),
    getSettings({ ctx })
  ])

  return {
    props: {
      services,
      seo: {
        title: settings?.services?.metaTitle || null,
        description: settings?.services?.metaDescription || null
      }
    }
  }
}
