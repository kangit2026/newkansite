import React, {
  FC,
  Component,
  createRef,
  useState,
  useEffect,
  RefObject
} from 'react'
import { css, styled } from 'stitches.config'
import cx from 'classnames'

declare global {
  interface Window {
    H: any
  }
}

type MapProps = {
  lat: number
  lng: number
  zoom: number
  className?: any
  visible?: boolean
  theme?: string
  enabled?: boolean
  setEnabled?: any
}

// using wrapper to re-render map component if theme is changed
// since we cannot do this by the restrictions of HERE maps API
const Map: FC<MapProps> = ({ theme, ...props }) => {
  const [render, setRender] = useState(false)
  const [enabled, setEnabled] = useState(true)
  useEffect(() => {
    setRender(false)
    setTimeout(() => {
      setRender(true)
    })
  }, [theme])

  if (!render) return null

  return (
    <MapElement
      theme={theme}
      {...props}
      enabled={enabled}
      setEnabled={setEnabled}
    />
  )
}

export default Map

class MapElement extends Component<
  MapProps,
  { map: any; apiKey: string; isZoomDisabled: boolean }
> {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      apiKey: process.env.HERE_API_KEY,
      isZoomDisabled: false
    }

    this.updateDimensions = this.updateDimensions.bind(this)
    this.enableZoom = this.enableZoom.bind(this)
  }

  behavior = null
  mapRef = createRef()

  initMap() {
    const H = window.H
    const platform = new H.service.Platform({
      apikey: this.state.apiKey
    })

    const { lat = 50, lng = 5, zoom = 2 } = this.props
    const defaultLayers = platform.createDefaultLayers()

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat, lng },
        zoom,
        pixelRatio: (window.devicePixelRatio || 1) * 2
      }
    )

    const tiles = platform.getMapTileService({ type: 'base' })
    const layer = tiles.createTileLayer(
      'maptile',
      this.props.theme === 'dark'
        ? 'normal.night.grey'
        : 'reduced.day',
      512,
      'png8',
      {
        ppi: '320',
        style: 'default',
        lg: 'ua'
      }
    )

    map.setBaseLayer(layer)

    const markerIcon = new H.map.Icon(
      require('/public/iq-pin.png').default,
      { size: { w: 64, h: 80 } }
    )

    const additionalMarkerIcon = new H.map.Icon(
      require('/public/logo.svg').default,
      { size: { w: 30, h: 45 } }
    )

    const markers = [
      [50.42981328723586, 30.52136556280398],
      [50.416076936587324, 30.531376859316232],
      [50.44167637007993, 30.551011797942397],
      [50.5089974950618, 30.45009129370895],
      [50.437693880617765, 30.6220783458246],
      [50.41071293865656, 30.38894059609003],
      [50.47214226277853, 30.40486372889748],
      [50.46535108497896, 30.465718459317745],
      [50.439368008176146, 30.49678499609077],
      [50.4411908042323, 30.52128523841902],
      [50.43540945147198, 30.544589797942113],
      [50.41301714453519, 30.52517683973759],
      [50.44180484015868, 30.521262828629688],
      [50.44214280162124, 30.523483067254872]
    ]

    markers.map((v) => {
      const [lat, lng] = v
      const marker = new H.map.Marker(
        {
          lat,
          lng
        },
        {
          icon: additionalMarkerIcon
        }
      )

      map.addObject(marker)
    })

    const marker = new H.map.Marker(
      {
        lat,
        lng
      },
      {
        icon: markerIcon
      }
    )

    map.addObject(marker)

    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(map)
    )

    behavior.disable(H.mapevents.Behavior.WHEELZOOM)
    behavior.disable(H.mapevents.Behavior.PANNING)
    this.behavior = behavior

    this.setState({ map })
    this.behavior.enable(H.mapevents.Behavior.WHEELZOOM)
    this.behavior.enable(H.mapevents.Behavior.PANNING)
    window.addEventListener('resize', this.updateDimensions)
  }

  componentDidMount() {
    this.initMap()
  }

  componentWillUnmount() {
    if (this.state.map && this.state.map.dispose)
      this.state.map.dispose()

    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    if (this.state.map && this.state.map.getViewPort)
      this.state.map.getViewPort().resize()
  }

  enableZoom() {
    if (!this.state.isZoomDisabled) return
    const H = window.H

    this.setState({ isZoomDisabled: false })
    if (this.behavior) {
      this.behavior.enable(H.mapevents.Behavior.WHEELZOOM)
      this.behavior.enable(H.mapevents.Behavior.PANNING)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.visible != this.props.visible &&
      this.props.visible
    ) {
      this.updateDimensions()
    }
  }
  render() {
    return (
      <div
        onClick={() => {
          this.props.setEnabled(false)
        }}
        className={cx(
          mapElement({ enabled: this.props.enabled }),
          this.props.className
        )}
        ref={this.mapRef as RefObject<HTMLDivElement>}
      />
    )
  }
}

const mapElement = css({
  position: 'relative',
  width: '100%',
  backgroundColor: '$background',
  height: 370,

  '@md': {
    height: 500
  },

  div: {
    width: '100%'
  },

  '&:before': {
    content: '',
    display: 'block',
    background: '$background',
    opacity: 0.5,
    position: 'absolute',
    inset: '0',
    zIndex: 10,
    cursor: 'pointer'
  },

  variants: {
    enabled: {
      false: {
        '&:before': {
          display: 'none'
        }
      }
    }
  }
})
