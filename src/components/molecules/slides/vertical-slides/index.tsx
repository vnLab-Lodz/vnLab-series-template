import React, { PropsWithChildren } from "react"
import Slide from "../slide"

interface Props {
  background?: string
}

const VerticalSlides: React.FC<PropsWithChildren<Props>> = ({
  children,
  background,
}) => {
  return (
    <Slide disableSwipe background={background}>
      {children}
    </Slide>
  )
}

export default VerticalSlides
