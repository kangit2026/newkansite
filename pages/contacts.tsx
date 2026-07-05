import React from 'react'
import { Contact } from '../src/components/home/Contact'
import { styled } from 'stitches.config'
import Map from '../src/components/common/Map'
import { useTheme } from 'next-themes'

const Contacts = () => {
  const { resolvedTheme } = useTheme()
  const coords = {
    lat: 50.421947831581264,
    lng: 30.553262857781412
  }

  return (
    <div>
      <Contact
        component={
          <MapWrapper>
            {/* <Map {...coords} zoom={16} theme={resolvedTheme} /> */}
          </MapWrapper>
        }
      />
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

export default Contacts
