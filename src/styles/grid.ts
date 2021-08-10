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
