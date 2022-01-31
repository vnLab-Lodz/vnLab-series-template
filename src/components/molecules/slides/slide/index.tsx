import React from "react"
import { useSwipeable } from "react-swipeable"
import { useTheme } from "styled-components"

interface Props {
  background?: string
}

const Slide: React.FC<Props> = ({ children, background }) => {
  const theme = useTheme()
  const bgColor = background ?? theme.palette.light

  const handlers = useSwipeable({
    onSwiped: eventData => {
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
