import React, { useEffect, useRef } from "react"

export default function <T = any>(
  callback: (
    distance: number,
    start: number,
    end: number,
    e: T extends Element ? React.UIEvent<T, UIEvent> : Event
  ) => void,
  refresh?: number,
  axis: "x" | "y" = "y"
) {
  const distance = useRef<number>()
  const start = useRef<number>()
  const end = useRef<number>()
  const timeout = useRef<NodeJS.Timeout>()

  useEffect(
    () => () => {
      if (!!timeout.current) clearTimeout(timeout.current)
    },
    []
  )

  return (e: T extends Element ? React.UIEvent<T, UIEvent> : Event) => {
    if (!!!start.current) {
      start.current = axis === "y" ? window.scrollY : window.scrollX
    }

    if (!!timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      end.current = axis === "y" ? window.scrollY : window.scrollX
      distance.current = end.current - (start.current as number)

      callback(distance.current, start.current as number, end.current, e)

      start.current = undefined
      end.current = undefined
      distance.current = undefined
    }, refresh ?? 66)
  }
}
