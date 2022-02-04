import React from "react"
import { useSwipeable } from "react-swipeable"
import { useTheme } from "styled-components"

interface Props {
  background?: string
  disableSwipe?: boolean
}

const Slide: React.FC<Props> = ({
  children,
  background,
  disableSwipe = false,
}) => {
  const theme = useTheme()
  const bgColor = background ?? theme.palette.light

  const handlers = useSwipeable({
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    onSwiped: eventData => {
      if (disableSwipe) return

      const event = new CustomEvent("deck_swipe", { detail: eventData })
      window.dispatchEvent(event)
    },
  })

  return (
    <section {...handlers} data-background-color={bgColor}>
      {children}
    </section>
  )
}

export default Slide
