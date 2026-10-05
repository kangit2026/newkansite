import flattenDeep from 'lodash-es/flattenDeep'

export const font = {
  families: {
    base: 'Stratos',
    fallback:
      '-apple-system, BlinkMacSystemFont, ' +
      'Segoe UI, Roboto, Oxygen, Ubuntu, ' +
      'Cantarell, Fira Sans, Droid Sans, ' +
      'Helvetica Neue, sans-serif'
  },
  sizes: {
    extraSmall: '12px',
    small: '14px',
    medium: '16px',
    large: '32px',
    xs: {
      h1: '40px',
      h2: '24px',
      h3: '20px'
    },
    md: {
      h1: '40px',
      h2: '26px',
      h3: '20px'
    },
    lg: {
      h1: '62px',
      h2: '32px',
      h3: '20px'
    }
  },
  formats: ['woff', 'woff2'],
  weights: {
    extralight: 200,
    light: 300,
    semilight: 350,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  }
}

type FontSettings = {
  name: string
  styles: { name: string; weights: string[] }[]
}

export const fontsConfig: FontSettings[] = [
  {
    name: 'Stratos',
    styles: [
      {
        name: 'normal',
        weights: [
          'extralight',
          'light',
          'semilight',
          'regular',
          'medium',
          'semibold'
        ]
      },
      {
        name: 'italic',
        weights: ['semilight']
      }
    ]
  }
]

export const getFontPath = ({ name, weight, style, format }) => {
  return `/fonts/${name}/${weight}${
    style == 'italic' ? '-italic' : ''
  }.${format}`
}

export const preloadFonts = flattenDeep(
  fontsConfig.map(({ name, styles }) =>
    styles.map(({ name: style, weights: fontWeights }) =>
      fontWeights.map((weight) => {
        const filePath = getFontPath({
          name,
          weight,
          style,
          format: 'woff2'
        })

        return filePath
      })
    )
  )
)

const generateFontFaces = (config: FontSettings[]) => {
  return flattenDeep(
    config.map(({ name, styles }) =>
      styles.map(({ name: style, weights: fontWeights }) =>
        fontWeights.map((weight) => {
          return font.formats.map((format) => {
            const filePath = getFontPath({
              name,
              weight,
              style,
              format
            })

            return {
              fontFamily: name,
              src: font.formats
                .map(
                  (format) => `url('${filePath}') format('${format}')`
                )
                .join(', '),
              fontDisplay: 'swap' as const,
              fontWeight: `${font.weights[weight]}`,
              fontStyle: style
            }
          })
        })
      )
    )
  )
}

export const fontsStyles = {
  '@font-face': generateFontFaces(fontsConfig)
}
