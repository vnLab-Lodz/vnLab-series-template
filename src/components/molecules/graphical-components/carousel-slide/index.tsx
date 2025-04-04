import React, { PropsWithChildren } from "react"
import * as Styled from "./style"

type Props = PropsWithChildren<{}>

const CarouselSlide: React.FC<Props> = ({ children }) => {
  return (
    <Styled.CarouselSlideContainer>{children}</Styled.CarouselSlideContainer>
  )
}

export default CarouselSlide
