import smoothScroll from 'scroll-to-element'

export const scrollToElement = (elem) => {
  if (!elem) return

  smoothScroll(elem, {
    ease: 'in-out-quad',
    duration: 650
  })
}
