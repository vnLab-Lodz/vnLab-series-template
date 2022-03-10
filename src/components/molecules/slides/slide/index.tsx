import React from "react"
import { SwipeableHandlers, useSwipeable } from "react-swipeable"
import { useTheme } from "styled-components"

interface Props {
  background?: string
  disableSwipe?: boolean
  swipeHandlers?: SwipeableHandlers
}

const Slide: React.FC<Props> = ({
  children,
  background,
  swipeHandlers,
  disableSwipe = false,
}) => {
  const theme = useTheme()
  const bgColor = background ?? theme.palette.black

  const handlers = !disableSwipe
    ? useSwipeable({
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        onSwiped: eventData => {
          if (disableSwipe) return

          const event = new CustomEvent("deck_swipe", { detail: eventData })
          window.dispatchEvent(event)
        },
      })
    : {}

  const memoizedHandlers = React.useMemo(() => {
    if (disableSwipe) return {}

    if (!!swipeHandlers) return swipeHandlers

    return handlers
  }, [handlers, disableSwipe, swipeHandlers])

  return (
    <section {...memoizedHandlers} data-background-color={bgColor}>
      {children}
    </section>
  )
}

export default Slide
