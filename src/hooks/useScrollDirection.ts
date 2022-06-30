import { useEffect, useState } from "react"

interface Options {
  threshold?: number
}

export enum SCROLL_DIRECTION {
  UP = "up",
  DOWN = "down",
  NONE = "none",
}

const useScrollDirection = ({ threshold = 0 }: Options = {}) => {
  const [scrollDir, setScrollDir] = useState(SCROLL_DIRECTION.UP)

  useEffect(() => {
    let previousScrollYPosition = window.scrollY

    const scrolledMoreThanThreshold = (currentScrollYPosition: number) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0)

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? SCROLL_DIRECTION.DOWN
          : SCROLL_DIRECTION.UP
        setScrollDir(newScrollDirection)
        previousScrollYPosition =
          currentScrollYPosition > 0 ? currentScrollYPosition : 0
      } else {
        setScrollDir(SCROLL_DIRECTION.NONE)
      }
    }

    const onScroll = () => window.requestAnimationFrame(updateScrollDirection)

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return scrollDir
}

export default useScrollDirection
