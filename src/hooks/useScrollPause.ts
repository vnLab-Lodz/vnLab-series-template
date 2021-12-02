import { useRef } from "react"
import useScrollContext from "./useScrollContext"

function getScrollbarWidth() {
  return window.innerWidth - document.body.clientWidth
}

interface OriginalValuesRef {
  top: string
  paddingRight: string
  position: string
  backgroundColor: string
}

interface ScrollPauseOptions {
  backgroundColor?: string
}

export default function useScrollPause(options?: ScrollPauseOptions) {
  const { isPaused, setIsPaused } = useScrollContext()
  const originalValues = useRef<OriginalValuesRef | undefined>(undefined)

  const setOriginalValues = () =>
    (originalValues.current = {
      top: document.body.style.top,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      backgroundColor: document.body.style.backgroundColor,
    })

  const pauseScroll = (callback?: () => void) => {
    if (isPaused) return

    setIsPaused(true)
    setOriginalValues()

    const scrollbarWidth = getScrollbarWidth()
    document.body.style.paddingRight = `${scrollbarWidth}px`

    if (options?.backgroundColor) {
      document.body.style.backgroundColor = options?.backgroundColor
    }

    const top = window.scrollY
    document.body.style.top = `-${top}px`
    document.body.style.position = "fixed"

    if (callback) callback()
  }

  const resumeScroll = (callback?: () => void) => {
    if (!isPaused) return

    setIsPaused(false)

    const scrollY = document.body.style.top
    document.body.style.position = originalValues.current?.position ?? ""
    document.body.style.top = originalValues.current?.top ?? ""
    document.body.style.paddingRight =
      originalValues.current?.paddingRight ?? ""
    document.body.style.backgroundColor =
      originalValues.current?.backgroundColor ?? ""

    window.scrollTo(0, parseInt(scrollY || "0") * -1)

    if (callback) setTimeout(() => callback(), 66)
  }

  return { isPaused, pauseScroll, resumeScroll }
}
