const nextTranslate = require('next-translate-plugin')
const gridConfig = require('./config/grid')
const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const deviceSizes = Object.values(gridConfig.breakPoints).filter(
  (w) => w != 0
)

const breakPoints = Object.keys(gridConfig.breakPoints)
  .filter((key) => gridConfig.breakPoints[key] != 0)
  .slice(1)

const imageLoaders = {
  loader: 'file-loader',
  options: {
    name: '[hash].[ext]',
    publicPath: '/_next/static/files',
    outputPath: 'static/files'
  }
}

const enableSpriteLoader = false

const spriteLoader = {
  loader: 'svg-sprite-loader',
  options: {
    extract: true,
    publicPath: '/_next/static/images',
    outputPath: 'static/images',
    spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`
  }
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes,
    disableStaticImages: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'kan.bananza.agency' },
      { protocol: 'https', hostname: 'kandevelopment.com' },
      { protocol: 'https', hostname: 'www.kandevelopment.com' },
      { protocol: 'https', hostname: 'newkansite.pp.ua' },
      { protocol: 'https', hostname: 'www.newkansite.pp.ua' },
      { protocol: 'https', hostname: 'adminkansite.pp.ua' }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|webp)$/,
      oneOf: [
        {
          resourceQuery: /srcset/,
          use: [
            {
              loader: path.resolve(
                './src/loaders/adaptive-srcset-loader.js'
              ),
              options: {
                breakPoints
              }
            },
            imageLoaders
          ]
        },
        {
          resourceQuery: /inline/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024 * 1024,
                publicPath: '/_next/static/files',
                outputPath: 'static/files'
              }
            }
          ]
        },
        {
          use: [imageLoaders]
        }
      ]
    })

    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /srcset/,
          use: [
            {
              loader: path.resolve(
                './src/loaders/adaptive-srcset-loader.js'
              ),
              options: {
                breakPoints
              }
            },
            imageLoaders
          ]
        },
        {
          resourceQuery: /svgr/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: {
                    removeViewBox: false
                  }
                }
              }
            }
          ]
        },
        {
          use: [imageLoaders]
        }
      ]
    })

    if (enableSpriteLoader) {
      config.plugins.push(new SpriteLoaderPlugin())
    }

    return config
  },
  env: {
    HERE_API_KEY: 'kasmyaVj8xCJ2n8VsVjGidGgPTTUuCv4VGBIx2kNKqE'
  },
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemap' },
      { source: '/llms.txt', destination: '/api/llms' }
    ]
  }
}

module.exports = nextTranslate(nextConfig)
