import { GridContainer } from "~styles/grid"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import styled, { css } from "styled-components"
import { Summary } from "~components/molecules/toc-element/style"

export const SearchLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.primary};
  min-height: 100vh;
  overflow-y: hidden;
  grid-auto-rows: min-content;
`

export const Wrapper = styled.article`
  background: ${({ theme: { palette } }) => palette.primary};
`

export const FoundItems = styled(atoms.p)`
  ${({ theme: { spacing, typography, palette } }) => css`
  margin-top: ${spacing.md};
  font-family: ${typography.fonts.primary};
  font-size: ${typography.sm};
  text-transform: uppercase;
  grid-column: 2 / last-col;
  
  strong {
    font-weight: bold;
    font-family: inherit;
    font-size: inherit;
  }

  @media ${devices.tablet} {
    grid-column 7 / -3;
  }

  @media ${devices.laptop} {
    grid-column 5 / 13;
  }
`}
`

export const ResultsWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  grid-column: 2 / last-col;
  margin-left: -6vw; // offset 2 grid fractions

  @media ${devices.tablet} {
    grid-column: 7 / -3;
  }

  @media ${devices.laptop} {
    margin-left: -4vw;
    grid-column: 5 / 13;

    ${Summary} {
      width: 200%;
      text-align: justify;
    }
  }
`
