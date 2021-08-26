import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { breakpoints, devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"
import { NAV_MODES } from "./nav-menu-context"

export const Aside = styled(GridContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 8;
  pointer-events: none;

  @media ${devices.tablet} {
    bottom: 0;
  }
`

export const Nav = styled.nav<{ mode: NAV_MODES }>`
  ${({ mode, theme: { spacing, palette } }) => css`
    background: ${mode === NAV_MODES.LIGHT ? palette.white : palette.black};
    display: flex;
    align-items: center;
    pointer-events: all;
    transition: all 0.3s ease-in-out;
    grid-column: 1 / last-col;
    padding: ${spacing.xs} 0px;
    border-bottom: solid 1px ${palette.black};
    position: relative;

    @media ${devices.tablet} {
      border-bottom: none;
      border-right: solid 1px
        ${mode === NAV_MODES.LIGHT ? palette.dark : palette.white};
      padding: ${spacing.md} 0px;
      grid-column: 1 / 4;
      flex-direction: column;
      justify-content: space-between;
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

export const Progress = styled(motion.div)`
  background: ${({ theme }) => theme.palette.black};
  position: absolute;

  @media (max-width: calc(${breakpoints.tablet} - 1px)) {
    top: 0px;
    left: 0px;
    height: 2px !important;
  }

  @media ${devices.tablet} {
    top: 0px;
    right: -1.5px;
    width: 2px !important;
  }

  @media ${devices.laptopL} {
    right: -2px;
  }
`

export const Title = styled(atoms.p)`
  @media ${devices.tablet} {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
`

export const HamburgerBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0px ${({ theme }) => theme.spacing.sm};

  @media ${devices.tablet} {
    margin: 0px;
  }
`

export const Logo = styled.img`
  display: none;

  @media ${devices.tablet} {
    display: block;
  }
`
