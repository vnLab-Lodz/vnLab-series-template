import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const SlideImageWrapper = styled.div<{
  $fullscreen?: boolean
  $withCaption?: boolean
}>`
  display: flex;
  justify-content: center;

  grid-column-end: -2;
  grid-column-start: 2;

  @media ${devices.tablet} {
    grid-column-start: 5;
    grid-column-end: -2;
  }

  @media ${devices.laptop} {
    grid-column-start: 5;
    grid-column-end: -5;
  }

  ${({ $fullscreen: fullscreen }) =>
    fullscreen &&
    css`
      margin: 0;
      height: 100%;
      max-height: 100vh;

      & ${Image} {
        margin: 0;
        height: 100%;
        width: 100%;
        flex: 1 1 auto;
        max-height: 100vh;

        & > div {
          height: 100%;
          max-height: 100vh;
          aspect-ratio: auto !important;
        }
      }

      grid-column-end: last-col;
      grid-column-start: 1;

      @media ${devices.tablet} {
        grid-column-start: 4;
        grid-column-end: last-col;
      }

      @media ${devices.laptop} {
        grid-column-start: 3;
        grid-column-end: last-col;
      }
    `}
`

export const Image = styled.div`
  position: relative;
  margin: 80px 0;
  height: fit-content;
  width: fit-content;
  max-height: calc(100vh - 2 * 80px);

  & > div {
    max-height: calc(100vh - 2 * 80px);
  }
`
