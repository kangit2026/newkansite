export function numberWithSpaces(num) {
  const parts = num.toString().split('.')

  return [parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '), parts[1]]
    .filter((i) => i != undefined)
    .join('.')
}

export const formatDate = (date) =>
  new Date(date).toLocaleDateString()

export const mapToYoutubeUrl = (url, options = '?controls=0') => {
  if (url?.includes('/embed/')) return url

  if (url?.includes('youtu.be')) {
    const cleanUrl = url.split('?')[0]
    return (
      cleanUrl.replace('youtu.be/', 'youtube.com/embed/') + options
    )
  } else if (url?.includes('youtube.com')) {
    if (url?.includes('/watch?')) {
      const videoId = url
        .split('?')[1]
        .split('&')[0]
        .replace('v=', '')

      return `https://www.youtube.com/embed/${videoId}${options}`
    } else {
      const cleanUrl = url.split('?')[0]
      return (
        cleanUrl.replace('youtube.com/', 'youtube.com/embed/') +
        options
      )
    }
  }

  return url
}

export const getPaginationItems = (current, total, delta = 1) => {
  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []

  let l

  for (let i = 1; i <= total; i++) {
    if (i == 1 || i == total || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export const formatPaginationItems = (items) => {
  let dots = 0

  return items.map((i) => {
    if (i === '...') {
      return {
        id: `dots_${dots++}`,
        title: '...',
        page: null
      }
    } else {
      return {
        id: `page_${i}`,
        title: i,
        page: i - 1
      }
    }
  })
}

export const formatLink = (link) => {
  const matched = link.match(
    /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
  )

  if (matched == null) return null
  return matched[matched.length - 1]
}
