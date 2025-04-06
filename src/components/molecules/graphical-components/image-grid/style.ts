import React from "react"
import styled from "styled-components"
import Slide from "../slide"
import { Image, SlideImageWrapper } from "../center-image-slide/style"
import { Caption, CaptionSlideContainer } from "../caption-slide/style"

export const ImageGridContainer = styled(Slide)`
  display: flex;
  max-width: none;
  flex-wrap: wrap;
  position: relative;

  ${CaptionSlideContainer} {
    position: initial;
  }

  ${Caption} {
    top: 100%;
  }
`

export const ImageGridRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
`
export const ImageGridColumn = styled.div`
  display: flex;
  flex-direction: column;

  & ${SlideImageWrapper} {
    grid-column-start: 1;
    grid-column-end: -1;
    max-height: none;
  }

  & ${Image} {
    margin: 0;
    max-height: none;
  }
`
export const FullscreenImageGridColumn = styled(ImageGridColumn)`
  margin-left: calc((100vw / 32) * 2);
`
export const FullWidthImageGridColumn = styled(ImageGridColumn)`
  flex: 1 1 auto;

  & ${Image} {
    margin: 0;
    max-height: none;
    max-width: none;
    width: 100%;

    & > div {
      width: 100%;
      max-width: none;
      max-height: none;
    }
  }
`
