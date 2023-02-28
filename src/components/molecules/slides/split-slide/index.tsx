import React, { PropsWithChildren } from "react"
import { CaptionProps } from "../caption-slide"
import * as Styled from "./style"

type Props = PropsWithChildren<
  CaptionProps & {
    leftSticky?: boolean
    rightSticky?: boolean
  }
>

const SplitSlide: React.FC<Props> = ({ children, leftSticky, rightSticky }) => {
  if (!Array.isArray(children) || children.length !== 2) {
    throw new Error("Split slide must have two children")
  }

  if (leftSticky && rightSticky) {
    throw new Error("Only one HalfSlide can be sticky at a time.")
  }

  return (
    <Styled.SplitSlideContainer data-ignore-slide={true}>
      <Styled.HalfSlide data-sticky={leftSticky} data-half-slide $left>
        {children[0]}
      </Styled.HalfSlide>
      <Styled.HalfSlide data-sticky={rightSticky} data-half-slide $right>
        {children[1]}
      </Styled.HalfSlide>
    </Styled.SplitSlideContainer>
  )
}

export default SplitSlide
