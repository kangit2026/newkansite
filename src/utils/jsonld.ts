import type { SiteSettings } from '@utils/api/settings'

const SITE_LOCALES = ['uk', 'en']
const SITE_DEFAULT_LOCALE = 'uk'

const OFFICE_ADDRESS: Record<string, string> = {
  uk: '01014, м. Київ, вул. Болсуновська, 13-15, IQ Бізнес-центр',
  en: '01014, Kyiv, 13-15 Bolsunovska Street, IQ Business Center'
}

const SOCIAL_FALLBACK = [
  'https://www.instagram.com/kan_development/',
  'https://www.youtube.com/channel/UCBTLhcj3DRJMzNGETkKCDHQ',
  'https://www.facebook.com/kandevelopment/',
  'https://www.pinterest.com/kandevelopment/',
  'https://t.me/KAN_Development'
]

type Crumb = { name: string; path?: string }

type BuildArgs = {
  origin: string
  locale: string
  pathname: string
  canonical: string
  settings?: SiteSettings | null
  details?: any
  t: (key: string, query?: any, options?: { fallback?: string }) => string
}

function localizedPath(path: string, locale: string) {
  const [pathname, query] = (path || '/').split('?')
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const localized =
    !SITE_LOCALES.includes(locale) || locale === SITE_DEFAULT_LOCALE
      ? normalized
      : normalized === '/'
        ? `/${locale}`
        : `/${locale}${normalized}`

  return query ? `${localized}?${query}` : localized
}

function absoluteUrl(origin: string, path: string, locale: string) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (!origin) return ''
  return `${origin}${localizedPath(path, locale)}`
}

function plainText(value?: string | null) {
  if (!value) return ''
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function telephone(value?: string | null) {
  if (!value) return undefined
  const digits = value.replace(/\D/g, '')
  if (digits.length < 7) return undefined
  return value.trim()
}

function compact(value: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => {
      if (item == null || item === '') return false
      if (Array.isArray(item) && item.length === 0) return false
      return true
    })
  )
}

function organizationNode(origin: string, locale: string, settings?: SiteSettings | null) {
  const social = [
    settings?.social?.instagram,
    settings?.social?.youtube,
    settings?.social?.facebook,
    settings?.social?.pinterest,
    settings?.social?.telegram
  ].filter(Boolean) as string[]

  return compact({
    '@type': ['Organization', 'RealEstateAgent'],
    '@id': `${origin}/#organization`,
    name: 'KAN Development',
    url: absoluteUrl(origin, '/', locale),
    logo: absoluteUrl(origin, '/logo.svg', locale),
    telephone: telephone(settings?.phone),
    email: settings?.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE_ADDRESS[locale] || OFFICE_ADDRESS.uk,
      addressCountry: 'UA'
    },
    sameAs: social.length ? social : SOCIAL_FALLBACK
  })
}

function isHousing(category?: string | null) {
  return /житл|housing|жилы|residential/i.test(category || '')
}

function developerNode(name: string | null | undefined, orgId: string) {
  const value = (name || '').trim()
  if (!value) return undefined
  if (/^kan( development)?$/i.test(value)) return { '@id': orgId }
  return { '@type': 'Organization', name: value }
}

function breadcrumbNode(origin: string, locale: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) =>
      compact({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.path ? absoluteUrl(origin, crumb.path, locale) : undefined
      })
    )
  }
}

function projectNode(args: BuildArgs, orgId: string) {
  const { details, origin, locale, canonical } = args
  const images = [
    details.image,
    ...(details.gallery || []).map((picture) => picture?.url)
  ].filter((url, index, list) => url && list.indexOf(url) === index)

  const website =
    typeof details.website === 'string' && /^https?:\/\//i.test(details.website)
      ? details.website
      : ''

  return compact({
    '@type': isHousing(details.category) ? 'ApartmentComplex' : 'Place',
    '@id': `${canonical}#place`,
    name: details.title,
    url: website || canonical,
    mainEntityOfPage: canonical,
    image: images,
    description: plainText(details.description),
    telephone: telephone(details.phone),
    address: details.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: details.address,
          addressCountry: 'UA'
        }
      : undefined,
    additionalProperty: details.fullArea
      ? {
          '@type': 'PropertyValue',
          name: locale === 'en' ? 'Total area' : 'Загальна площа',
          value: String(details.fullArea)
        }
      : undefined,
    developer: developerNode(details.developer, orgId),
    provider: { '@id': orgId }
  })
}

function projectCrumbs(args: BuildArgs): Crumb[] {
  const { details, locale, t } = args
  const crumbs: Crumb[] = [
    { name: t('menu.home'), path: '/' },
    { name: t('menu.projects'), path: '/projects' }
  ]

  if (isHousing(details.category)) {
    crumbs.push({
      name: t('projects:type.housing', null, {
        fallback: locale === 'en' ? 'Housing projects' : 'Житлові проєкти'
      }),
      path: '/projects?type=housing'
    })
  } else if (details.category) {
    crumbs.push({ name: String(details.category).trim() })
  }

  crumbs.push({ name: details.title, path: details.link })
  return crumbs
}

function newsNode(args: BuildArgs, orgId: string) {
  const { details, canonical, locale } = args
  const body = plainText(details.description)

  return compact({
    '@type': 'NewsArticle',
    '@id': `${canonical}#article`,
    headline: details.title,
    datePublished: details.publishedAt || undefined,
    image: details.image ? [details.image] : undefined,
    description: details.metaDescription || body.slice(0, 300),
    articleBody: body,
    inLanguage: locale,
    mainEntityOfPage: canonical,
    author: { '@id': orgId },
    publisher: { '@id': orgId }
  })
}

export function buildJsonLd(args: BuildArgs) {
  if (!args.origin) return null

  const orgId = `${args.origin}/#organization`
  const graph: Record<string, any>[] = [
    organizationNode(args.origin, args.locale, args.settings)
  ]
  const details = args.details

  if (args.pathname === '/project/[slug]' && details?.title) {
    graph.push(projectNode(args, orgId))
    graph.push(breadcrumbNode(args.origin, args.locale, projectCrumbs(args)))
  }

  if (args.pathname === '/news/[slug]' && details?.title) {
    graph.push(newsNode(args, orgId))
    graph.push(
      breadcrumbNode(args.origin, args.locale, [
        { name: args.t('menu.home'), path: '/' },
        { name: args.t('menu.news'), path: '/news' },
        { name: details.title, path: details.link }
      ])
    )
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  }
}

export function jsonLdScript(data: Record<string, any> | null) {
  if (!data) return ''
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
