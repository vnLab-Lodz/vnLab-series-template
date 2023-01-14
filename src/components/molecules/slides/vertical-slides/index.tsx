import React, { PropsWithChildren } from "react"
import Slide from "../slide"

interface Props {
  background?: string
}

const VerticalSlides: React.FC<PropsWithChildren<Props>> = ({
  children,
  background,
}) => {
  return <Slide>{children}</Slide>
}

export default VerticalSlides
