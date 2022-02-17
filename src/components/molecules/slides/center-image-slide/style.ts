import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const SlideImageWrapper = styled.div<{
  fullscreen?: boolean
  withCaption?: boolean
}>`
  display: flex;
  justify-content: center;
  max-height: calc(100vh - 260px);

  @media (${devices.tablet}) {
    max-height: calc(100vh - 200px);
  }

  ${({ fullscreen, withCaption }) =>
    fullscreen &&
    css`
      width: 100%;
      max-width: 100% !important;
      height: calc(100% - 65px);
      max-height: calc(100% - 65px);
      margin: 65px 0px 0px 0px;

      @media ${devices.tablet} {
        height: ${withCaption ? "calc(100vh - 100px)" : "100vh"};
        max-height: ${withCaption ? "calc(100vh - 100px)" : "100vh"};
        margin: 0;
      }
    `}
`
