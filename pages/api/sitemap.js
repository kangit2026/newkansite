const LOCALES = ['uk', 'en']
const DEFAULT_LOCALE = 'uk'

const STATIC_PATHS = [
  '/',
  '/about',
  '/projects',
  '/services',
  '/inside_community',
  '/market',
  '/career',
  '/news',
  '/contacts',
  '/develop',
  '/general',
  '/platform',
  '/rent',
  '/rentcommercial',
  '/areas'
]

function headerValue(value) {
  if (!value) return ''
  const raw = Array.isArray(value) ? value[0] : value
  return raw.split(',')[0].trim()
}

function originFrom(req) {
  const proto = headerValue(req.headers['x-forwarded-proto']) || 'https'
  const host = headerValue(
    req.headers['x-forwarded-host'] || req.headers.host
  ).replace(/^www\./i, '')

  if (!host) return 'https://kandevelopment.com'
  return `${proto}://${host}`
}

function localizedPath(path, locale) {
  if (locale === DEFAULT_LOCALE) return path
  if (path === '/') return `/${locale}`
  return `/${locale}${path}`
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function slugs(apiUrl, path) {
  const response = await fetch(`${apiUrl}${path}?count=1000`)
  if (!response.ok) return []
  const json = await response.json()
  return (json.data || [])
    .map((item) => ({
      slug: item.slug,
      lastmod: item.date ? String(item.date).slice(0, 10) : null
    }))
    .filter((item) => item.slug)
}

function urlEntry(origin, path, lastmod) {
  const links = LOCALES.map((locale) => {
    const href = `${origin}${localizedPath(path, locale)}`
    return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}"/>`
  })
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
      `${origin}${localizedPath(path, DEFAULT_LOCALE)}`
    )}"/>`
  )

  return LOCALES.map((locale) => {
    const loc = `${origin}${localizedPath(path, locale)}`
    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
      ...links,
      '  </url>'
    ]
      .filter(Boolean)
      .join('\n')
  }).join('\n')
}

export default async function sitemap(req, res) {
  const origin = originFrom(req)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || `${origin}/api`
  const paths = STATIC_PATHS.map((path) => ({ path, lastmod: null }))

  try {
    const projects = await slugs(apiUrl, '/project')
    projects.forEach(({ slug }) => {
      paths.push({ path: `/project/${slug}`, lastmod: null })
    })
  } catch (error) {
    console.error(error)
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...paths.map(({ path, lastmod }) => urlEntry(origin, path, lastmod)),
    '</urlset>'
  ].join('\n')

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.status(200).send(xml)
}
