import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"
import { NAV_MODES } from "./nav-menu-context"

export const Aside = styled(GridContainer)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;
  pointer-events: none;
`

export const Nav = styled.nav<{ mode: NAV_MODES }>`
  ${({ mode, theme: { spacing, palette } }) => css`
    background: ${mode === NAV_MODES.LIGHT ? palette.white : palette.black};
    border-right: solid 1px
      ${mode === NAV_MODES.LIGHT ? palette.dark : palette.white};
    padding: ${spacing.md} 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    pointer-events: all;
    transition: all 0.3s ease-in-out;

    @media ${devices.tablet} {
      grid-column: 1 / 4;
    }

    @media ${devices.laptop} {
      grid-column: 1 / 3;
    }

    ${mode === NAV_MODES.DARK &&
    css`
      & > * {
        filter: brightness(10);
      }
    `}
  `}
`

export const Title = styled(atoms.p)`
  writing-mode: vertical-lr;
  transform: rotate(180deg);
`

export const HamburgerBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
