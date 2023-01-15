import React, { PropsWithChildren } from "react"
import * as Styled from "./style"

type Props = PropsWithChildren<{}>

const ViewportImageSlide: React.FC<Props> = ({ children }) => {
  return (
    <Styled.ViewportImageSlideContainer>
      {children}
    </Styled.ViewportImageSlideContainer>
  )
}

export default ViewportImageSlide
