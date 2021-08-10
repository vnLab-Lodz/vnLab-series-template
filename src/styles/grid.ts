import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

interface ContainerProps {
  columns?: number | string
  rows?: number | string
}

export const GridContainer = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(32, 1fr);
`

export const GridConstraint = styled.div`
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
