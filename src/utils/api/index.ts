import axios from 'axios'
import { locales } from '../../../i18n'
import { parse } from 'accept-language-parser'
import uniq from 'lodash-es/uniq'
import isEmpty from 'lodash-es/isEmpty'

export const setLanguageHeader = (locale) => {
  axios.defaults.headers.common['Accept-Language'] =
    mapToBackendLocale(locale)
}

export const mapToBackendLocale = (locale) => {
  if (locale == 'uk') return 'ua'

  if (locales?.includes(locale)) return locale

  // Дефолтна локаль сайту — uk (див. i18n.js defaultLocale). Якщо мову не
  // вдалось визначити з cookie/Accept-Language (немає збігу з uk/en —
  // типово для перших відвідувань, пошукових ботів без мовних заголовків
  // тощо), бекенд має віддавати той самий контент, що й дефолтна сторінка,
  // а не англійську мовчки.
  return 'ua'
}

export const setLocale = (ctx) => {
  // Next.js вже сам коректно визначає локаль для кожного SSR-запиту
  // (з префіксу /en/..., з cookie NEXT_LOCALE або з Accept-Language —
  // залежно від налаштувань i18n) і кладе результат у ctx.locale. Довіряємо
  // саме йому, а не парсимо cookie/заголовки вручну ще раз — інакше
  // результати можуть розійтись (напр. прямий захід на /en/... без cookie
  // раніше все одно повертав дані бекенду українською).
  if (ctx?.locale) {
    setLanguageHeader(ctx.locale)
    return
  }

  // Під час білда Next.js викликає App.getInitialProps і для сторінок без
  // getServerSideProps (статична генерація) — тоді ctx.req ще не існує.
  if (!ctx?.req) return

  const cookiesLocale = ctx.req?.cookies || {}
  const headersLocale = ctx.req?.headers?.['accept-language'] || ''

  let locale = ''
  if (
    cookiesLocale['NEXT_LOCALE'] &&
    locales?.includes(cookiesLocale['NEXT_LOCALE'])
  ) {
    locale = cookiesLocale['NEXT_LOCALE']
  } else {
    locale = uniq(parse(headersLocale).map(({ code }) => code)).find(
      (lang: string) => locales?.includes(lang)
    ) as string
  }

  setLanguageHeader(locale)
}

export const get = ({ url, ctx }) => {
  if (!isEmpty(ctx)) {
    setLocale(ctx)
  }

  return axios({
    url,
    method: 'get'
  })
}
