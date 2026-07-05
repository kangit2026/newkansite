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

  return 'en'
}

export const setLocale = (ctx) => {
  const cookiesLocale = ctx.req?.cookies
  const headersLocale = ctx.req?.headers['accept-language']

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
