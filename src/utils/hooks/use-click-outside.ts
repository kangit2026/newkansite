import { useEffect, useRef } from 'react'
import isFunction from 'lodash-es/isFunction'

export const useClickOutside = (callback) => {
  const callbackRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleClick = (e) => {
      if (
        isFunction(callbackRef.current) &&
        innerRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e)
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])

  return innerRef
}
