import React from "react"
import { useTheme } from "styled-components"

interface Props {
  background?: string
}

const Slide: React.FC<Props> = ({ children, background }) => {
  const theme = useTheme()
  const bgColor = background ?? theme.palette.light

  return <section data-background-color={bgColor}>{children}</section>
}

export default Slide
