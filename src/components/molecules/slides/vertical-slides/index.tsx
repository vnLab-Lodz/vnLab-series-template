import React from "react"
import Slide from "../slide"

interface Props {
  background?: string
}

const VerticalSlides: React.FC<Props> = ({ children, background }) => {
  return (
    <Slide disableSwipe background={background}>
      {children}
    </Slide>
  )
}

export default VerticalSlides
