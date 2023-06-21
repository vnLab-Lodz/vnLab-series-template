import { useRef } from "react"
import useScrollContext from "./useScrollContext"
import { isFirefox } from "~util/isFirefox"

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

  const setOriginalValues = () => {
    originalValues.current = {
      top: document.body.style.top,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      backgroundColor: document.body.style.backgroundColor,
    }
  }

  const pauseScroll = (callback?: () => void) => {
    if (!isPaused && !isFirefox()) {
      setIsPaused(true)
      setOriginalValues()

      const top = window.scrollY
      const scrollbarWidth = getScrollbarWidth()

      document.body.style.position = "fixed"
      document.body.style.top = `-${top}px`
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    if (callback) callback()
  }

  const resumeScroll = (callback?: () => void) => {
    if (isPaused && !isFirefox()) {
      setIsPaused(false)

      const scrollY = document.body.style.top
      document.body.style.position = originalValues.current?.position ?? ""
      document.body.style.top = originalValues.current?.top ?? ""
      document.body.style.paddingRight =
        originalValues.current?.paddingRight ?? ""

      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }

    if (callback) setTimeout(() => callback(), 66)
  }

  return { isPaused, pauseScroll, resumeScroll }
}
