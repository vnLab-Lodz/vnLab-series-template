import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const FoundItems = styled(atoms.p)`
  ${({ theme: { spacing, typography, palette } }) => css`
  margin-top: ${spacing.md};
  color: ${palette.accentDark};
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
