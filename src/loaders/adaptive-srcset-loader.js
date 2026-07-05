const loaderUtils = require('loader-utils')

function splitRemainingRequest(remainingRequest) {
  const requests = remainingRequest.split('!')
  const query = requests.pop().split('?')
  const resource = query[0]
  const params = query[1]
    .split('&')
    .filter((param) => param != 'srcset')

  return [requests, resource, params]
}

function getRemainingRequest(loaders, resource) {
  return `-!${[...loaders, resource].join('!')}`
}

function getFileOptions(resource) {
  const split = resource.split('.')
  const ext = split.slice(-1)[0]
  const path = split.slice(0, -1).join('.')

  return [path, ext]
}

function getFileRequest(breakPoint, loaders, path, ext, theme = '') {
  const bpSuffix = breakPoint == 'default' ? '' : breakPoint == 'xl'?"-lg":`-${breakPoint}`
  const themeSuffix = theme == '' ? '' : `-${theme}`

  const remainingRequest = getRemainingRequest(
    loaders,
    `${path}${bpSuffix}${themeSuffix}.${ext}`
  )

  return `require(${JSON.stringify(remainingRequest)})`
}

function generateSources(breakPoints, loaders, resource, params) {
  const sources = {}

  const [path, ext] = getFileOptions(resource)

  const extendedBreakPoints = ['default', ...breakPoints]

  extendedBreakPoints.forEach((bp) => {
    if (params?.includes('themed')) {
      sources[bp] = {
        light: getFileRequest(bp, loaders, path, ext, ''),
        dark: getFileRequest(bp, loaders, path, ext, 'dark')
      }
    } else {
      sources[bp] = getFileRequest(bp, loaders, path, ext)
    }
  })

  return sources
}

function stringifySources(sources) {
  return `
    {
      ${Object.keys(sources)
        .map((source) => {
          const resource =
            typeof sources[source] == 'object'
              ? stringifySources(sources[source])
              : sources[source]
          return `"${source}": ${resource}`
        })
        .join(',\n')}
    }
  `
}

function adaptiveLoader(content) {
  return content
}

adaptiveLoader.pitch = function (remainingRequest) {
  const { breakPoints } = loaderUtils.getOptions(this)
  const [loaders, resource, params] =
    splitRemainingRequest(remainingRequest)
  const sources = generateSources(
    breakPoints,
    loaders,
    resource,
    params
  )

  return `
    module.exports = ${stringifySources(sources)};
  `
}

module.exports = adaptiveLoader
