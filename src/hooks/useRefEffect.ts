import React, { useCallback, useEffect, useRef } from "react"

export function useRefEffect<T>(
  effect: (node: T) => (() => void) | void,
  dependencyArray: any[]
): readonly [React.MutableRefObject<T | null>, (node: T) => void] {
  const ref = useRef<T | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  const setRef = useCallback<(node: T) => void>(node => {
    if (ref.current && cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }

    if (node) {
      cleanupRef.current = effect(node) ?? null
    }

    ref.current = node
  }, dependencyArray)

  useEffect(() => {
    if (ref.current) setRef(ref.current)
  }, [setRef])

  return [ref, setRef] as const
}
