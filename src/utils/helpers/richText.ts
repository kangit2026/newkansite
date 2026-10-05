/** Розкодує &lt;p&gt;… якщо HTML зберегли як entities */
export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&#x27;/gi, "'")
}

export function normalizeRichTextHtml(value?: string | null): string {
  if (value == null) {
    return ''
  }

  let html = String(value).trim()
  if (html === '') {
    return ''
  }

  if (/&lt;|&gt;|&amp;(?:lt|gt|quot|#)/i.test(html) && !/<[a-z]/i.test(html)) {
    html = decodeHtmlEntities(html)
  }

  return html
}

export function isRichTextHtml(value: string): boolean {
  return /<(?:p|br|strong|em|b|i|u|ul|ol|li|h[1-6]|a|blockquote|div|span)\b/i.test(
    value
  )
}
