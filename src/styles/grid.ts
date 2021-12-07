import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

interface ContainerProps {
  columns?: number | string
  rows?: number | string
  noConstraint?: boolean
  left?: boolean
}

export const GridContainer = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(32, 1fr);
  overflow: hidden;

  ${({ noConstraint, left }) =>
    !noConstraint &&
    css`
      @media ${devices.desktop} {
        grid-template-columns: repeat(32, max(3.125rem));
        max-width: calc(3.125rem * 32);
        margin: ${left ? "0 auto 0 0" : "auto"};
      }
    `}
`

export const GridConstraint = styled.div`
  max-width: -moz-available;
  grid-column: 2 / 32;

  @media ${devices.tablet} {
    grid-column: 7 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }
`

export const InnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(30, 1fr);

  @media ${devices.tablet} {
    grid-template-columns: repeat(23, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(16, 1fr);
  }
`
