import useResizeObserver from '@react-hook/resize-observer'
import { useLayoutEffect, useEffect, useState } from 'react'

const canUseDOM = typeof window !== 'undefined'
const useIsomorphicLayoutEffect = canUseDOM
  ? useLayoutEffect
  : useEffect

export const useSize = (target) => {
  const [size, setSize] = useState<any>()

  useIsomorphicLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  useResizeObserver(target, (entry: ResizeObserverEntry) =>
    setSize(entry.contentRect)
  )

  return size
}
