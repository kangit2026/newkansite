import '@ui/styles.css'

import '@styles/slider.scss'

import '@styles/main.scss'

import { ThemeProvider, useTheme } from 'next-themes'
import { ThemeProvider as LegacyThemeProvider } from '@ui'
import {
  css,
  darkTheme,
  globalCss,
  lightTheme
} from 'stitches.config'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { themeConfig } from '@utils/constants'
import { Header } from '@components/common/Header'
import { Menu } from '@components/common/Menu'
import { Footer } from '@components/common/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import NextApp from 'next/app'
import { font, fontsStyles } from '@styles/fonts'
import { getCountryBasedTheme } from '@utils/api/location'
import { usePersistLocale } from '@utils/hooks/use-persist-locale'
import useTranslation from 'next-translate/useTranslation'
import { setLanguageHeader } from '@utils/api'
import { getSettings, defaultSettings } from '@utils/api/settings'
import { buildJsonLd, jsonLdScript } from '@utils/jsonld'
import { QueryClient, QueryClientProvider } from 'react-query'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const SITE_LOCALES = ['uk', 'en']
const SITE_DEFAULT_LOCALE = 'uk'

function headerValue(value?: string | string[]) {
  if (!value) return ''
  const raw = Array.isArray(value) ? value[0] : value
  return raw.split(',')[0].trim()
}

function resolveSiteOrigin(req?: {
  headers: { [key: string]: string | string[] | undefined }
}) {
  if (!req) {
    if (typeof window === 'undefined') return ''
    const url = new URL(window.location.href)
    url.hostname = url.hostname.replace(/^www\./i, '')
    return url.origin
  }

  const proto = headerValue(req.headers['x-forwarded-proto']) || 'https'
  const host = headerValue(
    req.headers['x-forwarded-host'] || req.headers.host
  ).replace(/^www\./i, '')

  if (!host) return ''
  return `${proto}://${host}`
}

function pathWithoutQuery(asPath: string) {
  const clean = (asPath || '/').split('?')[0].split('#')[0] || '/'
  return clean.startsWith('/') ? clean : `/${clean}`
}

function localizedPath(path: string, locale: string) {
  const normalized = path || '/'
  if (!SITE_LOCALES.includes(locale) || locale === SITE_DEFAULT_LOCALE) {
    return normalized
  }
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

const ThemeAutoSwitcher = ({ children }) => {
  const { setTheme } = useTheme()

  useEffect(() => {
    ;(async () => {
      const cachedTheme = localStorage.getItem('theme')

      let preferredTheme = null
      if (!cachedTheme) {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          preferredTheme = 'dark'
        } else {
          const countryBasedTheme = await getCountryBasedTheme()
          preferredTheme = countryBasedTheme
        }
      } else {
        preferredTheme = cachedTheme
      }

      setTheme(preferredTheme == 'dark' ? 'dark' : 'light')
    })()

    const handleThemeChange = (e) => {
      const nextTheme = e.matches ? 'dark' : 'light'
      setTheme(nextTheme)
    }

    const colorSchemeMedia = window.matchMedia(
      '(prefers-color-scheme: dark)'
    )

    if (colorSchemeMedia.addEventListener) {
      colorSchemeMedia.addEventListener('change', handleThemeChange)
    }

    return () => {
      if (colorSchemeMedia.addEventListener) {
        colorSchemeMedia.removeEventListener(
          'change',
          handleThemeChange
        )
      }
    }
  }, [])

  // Раніше тут був гейт `{render && children}`, де render ставав true лише
  // після client-side useEffect — тобто на сервері (і для будь-якого
  // безJS-клієнта: AI-краулери, curl тощо) весь вміст сайту не рендерився
  // ВЗАГАЛІ. next-themes вже сам вставляє inline-скрипт у <head>, який
  // виставляє клас теми ДО гідратації React — тому цей гейт був зайвим.
  return <>{children}</>
}

const globalStyles = globalCss({
  'html,body': {
    p: '0',
    m: '0',
    fontFamily: `${font.families.base}, ${font.families.fallback}`
  },

  '.slick-slide': {
    pointerEvents: 'unset!important'
  },

  body: {
    background: '$background',
    minWidth: 375,
  },

  'h1,h2,h3,h4,h5,h6': {
    p: 0,
    m: 0
  },

  a: {
    color: 'inherit',
    textDecoration: 'none'
  },

  '*': {
    boxSizing: 'border-box'
  },

  'input,button,textarea': {
    outline: 'none',
    fontFamily: 'inherit'
  },

  ...fontsStyles
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App({ Component, pageProps, settings, siteOrigin }) {
  globalStyles()
  const { asPath, pathname } = useRouter()
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const { t } = useTranslation('common')
  const locale = usePersistLocale()

  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const footerRef = useRef(null)

  const listenScrollEvent = () => {
    if (window.scrollY >= footerRef.current.offsetTop) {
      return setIsHeaderVisible(false)
    } else if (window.scrollY < footerRef.current.offsetTop) {
      return setIsHeaderVisible(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)

    return () =>
      window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  useEffect(() => {
    setLanguageHeader(locale)
  }, [locale])

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [isMenuOpened])

  useEffect(() => {
    setIsMenuOpened(false)
  }, [asPath])

  const defaultTitle = useMemo(() => {
    const routeKey = pathname.split('/')[1] || ''
    const routeTitle = t(`title.${routeKey}`, null, { fallback: '' })

    if (routeTitle == '') return t('title.default')

    return t('title.base', { title: routeTitle })
  }, [t, pathname])

  // Next.js не дедуплікує <title>/<meta> між кількома <Head> на дереві —
  // у документі лишається лише ПЕРШИЙ <title> (тобто цей, з _app), а власні
  // <title> на окремих сторінках мовчки ігноруються. Тому єдине джерело
  // правди для title/description/og — тут, а сторінки передають свій SEO
  // через pageProps.seo, а не через власний <Head><title>.
  const seo = pageProps?.seo || {}
  const title = seo.title || defaultTitle
  const pagePath = pathWithoutQuery(asPath)
  const origin = siteOrigin || ''
  const canonical = origin
    ? `${origin}${localizedPath(pagePath, locale || SITE_DEFAULT_LOCALE)}`
    : ''
  const ukUrl = origin
    ? `${origin}${localizedPath(pagePath, 'uk')}`
    : ''
  const enUrl = origin
    ? `${origin}${localizedPath(pagePath, 'en')}`
    : ''
  const structuredData = canonical
    ? jsonLdScript(
        buildJsonLd({
          origin,
          locale: locale || SITE_DEFAULT_LOCALE,
          pathname,
          canonical,
          settings,
          details: pageProps?.details,
          t
        })
      )
    : ''

  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        {canonical && (
          <link rel="canonical" href={canonical} key="canonical" />
        )}
        {ukUrl && (
          <link
            rel="alternate"
            hrefLang="uk"
            href={ukUrl}
            key="hreflang-uk"
          />
        )}
        {enUrl && (
          <link
            rel="alternate"
            hrefLang="en"
            href={enUrl}
            key="hreflang-en"
          />
        )}
        {ukUrl && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={ukUrl}
            key="hreflang-x-default"
          />
        )}
        {seo.description && (
          <meta name="description" content={seo.description} />
        )}
        {title && <meta property="og:title" content={title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        {seo.noindex && (
          <meta name="robots" content="noindex, follow" />
        )}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredData }}
          />
        )}
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          value={{
            light: lightTheme,
            dark: darkTheme
          }}
          enableSystem={false}
        >
          <LegacyThemeProvider theme={themeConfig}>
            <ThemeAutoSwitcher>
              <Header
                onToggleMenu={() => setIsMenuOpened((s) => !s)}
                isMenuOpened={isMenuOpened}
                isVisible={isHeaderVisible}
              />
              <Menu isOpened={isMenuOpened} />
              <Component {...pageProps} />
              <div ref={footerRef}>
                <Footer settings={settings} className={footer()} />
              </div>
            </ThemeAutoSwitcher>
          </LegacyThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

const footer = css({
  mt: 30,

  '@md': {
    mt: 73
  },

  '@lg': {
    mt: 45
  }
})

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext)

  const settings = await getSettings({ ctx: appContext.ctx }).catch(
    () => defaultSettings
  )

  return {
    ...appProps,
    settings,
    siteOrigin: resolveSiteOrigin(appContext.ctx.req)
  }
}

export default App
