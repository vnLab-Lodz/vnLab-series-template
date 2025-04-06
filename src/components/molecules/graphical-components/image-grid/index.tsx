import React from "react"
import { PropsWithChildren } from "react"
import * as Styled from "./style"
import CenterImageSlide from "../center-image-slide"

export function Grid(props: PropsWithChildren) {
  return <Styled.ImageGridContainer>{props.children}</Styled.ImageGridContainer>
}

export function GridRow(props: PropsWithChildren) {
  return <Styled.ImageGridRow>{props.children}</Styled.ImageGridRow>
}

export function GridColumn(props: PropsWithChildren) {
  return <Styled.ImageGridColumn>{props.children}</Styled.ImageGridColumn>
}

export function FullscreenGridColumn(props: PropsWithChildren) {
  return (
    <Styled.FullscreenImageGridColumn>
      {props.children}
    </Styled.FullscreenImageGridColumn>
  )
}

export function FullWidthGridColumn(props: PropsWithChildren) {
  return (
    <Styled.FullWidthImageGridColumn>
      {props.children}
    </Styled.FullWidthImageGridColumn>
  )
}

export const GridImage = CenterImageSlide
