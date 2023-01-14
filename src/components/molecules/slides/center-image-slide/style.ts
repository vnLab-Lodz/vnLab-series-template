import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const SlideImageWrapper = styled.div<{
  fullscreen?: boolean
  withCaption?: boolean
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

  margin: 80px 0;
  max-height: calc(100vh - 2 * 80px);

  ${({ fullscreen }) =>
    fullscreen &&
    css`
      margin: 0;
      max-height: 100vh;
      grid-column-end: last-col;
      grid-column-start: first-col;

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
