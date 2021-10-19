import { useRef } from "react"

export default function (
  callback: (distance: number, start: number, end: number) => void,
  refresh?: number
) {
  const distance = useRef<number>()
  const start = useRef<number>()
  const end = useRef<number>()
  const timeout = useRef<NodeJS.Timeout>()

  return () => {
    if (!!!start.current) start.current = window.scrollY

    if (!!timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      end.current = window.scrollY
      distance.current = end.current - (start.current as number)

      callback(distance.current, start.current as number, end.current)

      start.current = undefined
      end.current = undefined
      distance.current = undefined
    }, refresh ?? 66)
  }
}
