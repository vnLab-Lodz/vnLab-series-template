import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"

export const FootnoteTarget = styled.span`
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  background: pink;
`

export const FootnoteIndex = styled.span`
  ${({ theme: { typography } }) => css`
    font-size: ${typography.sm};
    font-family: ${typography.fonts.secondary};
    vertical-align: super;
    cursor: pointer;
    line-height: initial;
  `}
`

export const FootnoteContent = styled(GridContainer)`
  ${({ theme: { palette, typography, spacing } }) => css`
    grid-template-rows: auto auto;
    background: ${palette.secondary};
    border-top: solid 1px ${palette.dark};
    border-bottom: solid 1px ${palette.dark};
    font-family: ${typography.fonts.secondary};
    padding-top: ${spacing.sm};
    padding-bottom: ${spacing.lg};
    position: absolute;
    left: 0px;
    right: 0px;

    @media ${devices.desktop} {
      justify-content: center;
      max-width: none;
    }
  `}
`

export const FootnoteNumber = styled(atoms.p)`
  grid-column: 2;
  grid-row: 2;

  @media ${devices.tablet} {
    grid-column: 7;
  }

  @media ${devices.laptop} {
    grid-column: 9;
  }
`

export const FootnoteParagraph = styled(atoms.p)`
  grid-column: 4 / 32;
  grid-row: 2;

  @media ${devices.tablet} {
    grid-column: 9 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 10 / 25;
  }
`

export const CloseBtn = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0px;
  background: transparent;
  border: none;
  cursor: pointer;

  grid-column: 31;
  grid-row: 1;

  @media ${devices.tablet} {
    grid-column: 29;
  }
  @media ${devices.laptop} {
    grid-column: 24;
  }
`

export const InheritParagraph = styled.p.attrs({ as: "span" })`
  all: inherit;
`
