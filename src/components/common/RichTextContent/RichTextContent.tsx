import React, { FC } from 'react'
import { css } from 'stitches.config'
import {
  isRichTextHtml,
  normalizeRichTextHtml
} from '@utils/helpers/richText'

export const RichTextContent: FC<{
  html?: string | null
  className?: string
}> = ({ html, className }) => {
  const normalized = normalizeRichTextHtml(html)

  if (normalized === '') {
    return null
  }

  if (isRichTextHtml(normalized)) {
    return (
      <div
        className={`${richTextBody()} ${className ?? ''}`.trim()}
        dangerouslySetInnerHTML={{ __html: normalized }}
      />
    )
  }

  return (
    <div className={`${richTextBody()} ${richTextPlain()} ${className ?? ''}`.trim()}>
      {normalized}
    </div>
  )
}

const richTextPlain = css({
  whiteSpace: 'pre-wrap'
})

const richTextBody = css({
  fontWeight: 400,
  '& p': {
    margin: 0
  },
  '& p:not(:last-child)': {
    mb: '1em'
  },
  '& ul, & ol': {
    pl: '1.25em',
    mb: '1em',
    mt: 0
  },
  '& li:not(:last-child)': {
    mb: '0.35em'
  },
  '& a': {
    color: 'inherit',
    textDecoration: 'underline'
  },
  '& strong, & b': {
    fontWeight: 600
  },
  '& h2, & h3': {
    fontWeight: 600,
    lineHeight: 1.3,
    mb: '0.75em',
    mt: '1.25em'
  },
  '& h2:first-child, & h3:first-child, & p:first-child': {
    mt: 0
  },
  '& blockquote': {
    borderLeft: '3px solid #e2e4ea',
    pl: '1em',
    ml: 0,
    color: '#6b7280'
  }
})
