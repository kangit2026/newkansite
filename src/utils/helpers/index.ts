export * from './transforms'
export * from './formatting'

export const getElementOffset = (elem) => {
  var el = elem,
    offsetLeft = 0,
    offsetTop = 0

  do {
    offsetLeft += el.offsetLeft
    offsetTop += el.offsetTop

    el = el.offsetParent
  } while (el)

  return { x: offsetLeft, y: offsetTop }
}
