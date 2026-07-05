import { createStitches } from '@stitches/react'
import * as utils from '@utils/helpers/stitches'
const gridConfig = require('./config/grid')

const mediaBreakpoints = {}
const breakPointsKeys = Object.keys(gridConfig.breakPoints)
breakPointsKeys.forEach((key, index) => {
  const width = gridConfig.breakPoints[key]

  if (width) {
    mediaBreakpoints[key] = `(min-width: ${width}px)`
    if (index < breakPointsKeys.length - 1) {
      const nextWidth =
        gridConfig.breakPoints[breakPointsKeys[index + 1]]
      mediaBreakpoints[
        `${key}-only`
      ] = `(min-width: ${width}px) and (max-width: ${
        nextWidth - 0.02
      }px)`
    }
  }
})

const lightColors = {
  kan: '#120f82',
  link: '#120f82',
  background: '#FFFFFF',
  rent: '#F6F8FC',
  accent: '#212049',
  descriptionNew: '#71718B',
  accentHover: '#7B7C96',
  social: '#212049',
  nav: '#E4E7F1',
  navHover: '#EDF0F8',
  navActive: '#E4E7F1',
  splitter: '#BCC0CF',
  burger: '#18214D',
  border: 'rgba(0, 0, 0, 0.08)',
  projectCard: '#FFFFFF',
  partnershipDescription: '#71718B',
  ads: '#EDF0F8',
  adsTransparent: '#EDF0F800',
  newsDate: '#838FAC',
  newsTagSplitter: '#B6C2E0',
  navBlock: '#EDF0F8',
  description: '#F3F5FB',
  projectsHeader: '#838690',
  pagination: '#DADEE9',
  contrast: '#000000',
  disabled: '#C2C2C2',
  error: '#ff3939'
}

const darkColors = {
  kan: '#120f82',
  link: '#FFFFFF',
  background: '#141416',
  rent: '#18181b',
  accent: '#FFFFFF',
  accentHover: '#9B9B9D',
  descriptionNew: '#979DAB',
  social: '#41444D',
  nav: '#1D1D21',
  navHover: '#27272C',
  navActive: '#1D1D21',
  splitter: '#BCC0CF',
  burger: '#FFFFFF',
  border: 'rgba(255, 255, 255, 0.08)',
  projectCard: '#FFFFFF',
  partnershipDescription: '#B2B6C1',
  ads: '#0C0C0C',
  adsTransparent: '#0C0C0C00',
  newsDate: '#838FAC',
  newsTagSplitter: '#B6C2E0',
  link: '#FFFFFF',
  navBlock: '#1D1D21',
  description: '#1D1D21',
  projectsHeader: '#838690',
  pagination: '#0C0C0C',
  contrast: '#FFFFFF',
  disabled: '#838690',
  error: '#ff3939'
}

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme
} = createStitches({
  theme: {
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px'
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px'
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '32px'
    },
    fontWeights: {
      extralight: 200,
      light: 300,
      semilight: 350,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    zIndices: {
      selectBox: 101,
      header: 100,
      menu: 99,
      career: 50
    }
  },
  utils,
  media: {
    ...mediaBreakpoints
  }
})

export const lightTheme = createTheme({
  colors: {
    ...lightColors
  }
})

export const darkTheme = createTheme({
  colors: {
    ...darkColors
  }
})
