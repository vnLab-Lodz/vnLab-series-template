import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { breakpoints, devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"
import { NAV_MODES } from "./nav-menu-context"

//#region  Menu base

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
    border-bottom: solid 1px ${palette.black};
    position: relative;
    width: 100%;
    z-index: 9;

    @media ${devices.tablet} {
      border-bottom: none;
      border-right: solid 1px
        ${mode === NAV_MODES.LIGHT ? palette.black : palette.white};
      padding: 0px 0px ${spacing.md} 0px;
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
  margin-left: ${({ theme }) => theme.spacing.xs};

  @media ${devices.tablet} {
    margin-left: 0px;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
`

export const ToggleBtn = styled.button<{ open: boolean }>`
  background: ${({ open, theme }) => (!open ? "none" : theme.palette.black)};
  transition: background 0.2s ease-in;
  border: none;
  cursor: pointer;
  height: 100%;
  border-radius: 0px;

  @media (max-width: calc(${breakpoints.tablet} - 1px)) {
    padding: ${({ theme: { spacing } }) => `${spacing.xs} ${spacing.sm}`};
    min-width: ${({ theme: { spacing } }) => `calc(${spacing.sm} * 2 + 31px)`};
    min-height: ${({ theme: { spacing } }) => `calc(${spacing.xs} * 2 + 25px)`};
  }

  ${({ open }) =>
    open &&
    css`
      & > * {
        filter: brightness(10);
      }
    `}

  @media ${devices.tablet} {
    padding: ${({ theme }) => theme.spacing.sm} 0px;
    height: 106px;
    margin: 0px;
    // 1px offsets the scaling of 1px borders on devices with pixel scaling of 1.5
    // that makes them 2px leaving a white gap between button and tabs
    width: calc(100% + 1px);
  }
`

export const Logo = styled.img`
  display: none;

  @media ${devices.tablet} {
    display: block;
  }
`

export const NavMenuContent = styled(motion.div)`
  ${({ theme: { palette } }) => css`
    pointer-events: all;
    background: ${palette.white};
    border-right: solid 1px ${palette.dark};
    height: 100%;
    z-index: 8;
    display: grid;
    grid-column: 1 / last-col;
    grid-template-rows: auto 1fr;
    overflow: hidden;

    @media ${devices.tablet} {
      grid-column: 4 / -2;
      grid-template-columns: repeat(27, 1fr);
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(14, 1fr);
      grid-column: 3 / 17;
    }
  `}
`

export const Tabs = styled.header`
  ${({ theme: { spacing, palette } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${palette.black};
    grid-column: 1 / last-col;
    padding: ${spacing.xs} ${spacing.xxs};

    @media ${devices.tablet} {
      padding: 0px ${spacing.xs};
      height: 106px;
    }
  `}
`

export const TabItems = styled.div<{ noFlex?: boolean }>`
  ${({ noFlex }) => css`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: start;

    @media ${devices.tablet} {
      flex-direction: row;
    }

    ${!noFlex &&
    css`
      justify-content: space-evenly;

      @media ${devices.tablet} {
        flex: 1;
      }
    `}

    ${noFlex &&
    css`
      align-items: flex-start;
      flex-direction: row;
      justify-content: end;
    `}
  `}
`

export const TabButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  padding: ${({ theme: { spacing } }) => `${spacing.xs} ${spacing.xxs}`};

  @media ${devices.tablet} {
    padding: ${({ theme: { spacing } }) => spacing.xxs};
    height: 100%;
    text-align: center;
  }
`

export const TabButtonText = styled(atoms.p)<{ active?: boolean }>`
  ${({ active, theme: { palette, typography } }) => css`
    text-underline-offset: 10px;
    color: ${palette.white};
    text-transform: uppercase;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;

    ${active &&
    css`
      text-decoration: underline;
    `}
  `}
`

export const SearchImg = styled.img`
  filter: brightness(10);
`

//#endregion

//#region Table of contents tab

export const TocGrid = styled.section`
  overflow-y: scroll;
  display: grid;
  grid-column: 1 / last-col;
  grid-auto-rows: min-content;
  grid-row: 2;

  @media ${devices.tablet} {
    grid-template-columns: repeat(27, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(14, 1fr);
  }
`

export const TocHeader = styled(atoms.h3)`
  ${({ theme: { spacing, palette, typography } }) => css`
    font-size: ${typography.sm};
    font-weight: normal;
    color: ${palette.dark}
    text-transform: uppercase;
    text-align: start;
    grid-column: 3 / -2;
    margin: ${spacing.md} 0px
  `}
`

export const Part = styled(atoms.h3)`
  margin: 0px 0px ${({ theme }) => theme.spacing.md} 0px;
  text-align: start;
  grid-column: 3 / last-col;
`

//#endregion
