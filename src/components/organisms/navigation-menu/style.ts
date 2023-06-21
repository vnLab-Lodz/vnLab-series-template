import { motion } from "framer-motion"
import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { breakpoints, devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"
import { NAV_MODES } from "./nav-menu-context"
import ToC from "./tabs/toc"
import lightTheme from "src/styles/theme"

//#region Menu base

export const Aside = styled(GridContainer)<{ open?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ open }) => (open ? 12 : 8)};
  pointer-events: none;
  bottom: 0;
  grid-template-rows: auto 1fr;

  @media ${devices.tablet} {
    grid-template-rows: 1fr;
  }
`

export const Nav = styled.nav<{ mode: NAV_MODES; $open?: boolean }>`
  ${({ mode, $open, theme: { palette } }) => css`
    background: ${mode !== NAV_MODES.DARK ? palette.white : palette.black};
    display: flex;
    align-items: center;
    pointer-events: all;
    transition: all 0.3s ease-in-out;
    grid-column: 1 / last-col;
    border-bottom: solid 1px ${palette.black};
    position: relative;
    width: 100%;
    height: fit-content;
    z-index: 9;

    @media ${devices.tablet} {
      height: 100%;
      height: -webkit-fill-available;
      border-bottom: none;
      border-right: solid 1px
        ${mode !== NAV_MODES.DARK ? palette.black : palette.white};
      padding: 0px;
      grid-column: 1 / 4;
      flex-direction: column;
      justify-content: space-between;
    }

    @media ${devices.laptop} {
      grid-column: 1 / 3;
    }

    ${mode === NAV_MODES.DARK &&
    css`
      & > button,
      & > a,
      & > img {
        filter: brightness(10);
      }
    `}

    &:hover {
      & > button {
        background: ${palette.identity};

        & > * {
          filter: brightness(10) !important;
        }
      }

      @media ${devices.tablet} {
        border-right: solid 1px ${palette.identity};
        background: ${palette.identity};

        & > button {
          background: transparent;

          & > * {
            filter: none;
          }
        }

        & > * {
          filter: brightness(10) !important;
        }
      }
    }

    ${$open &&
    css`
      border-bottom: solid 1px ${palette.identity};

      & > button {
        background: ${palette.identity};

        & > * {
          filter: brightness(10) !important;
        }
      }

      @media ${devices.tablet} {
        background: ${palette.identity};
        border-right: solid 1px ${palette.identity};
        border-bottom: none;

        & > button {
          background: transparent;

          & > * {
            filter: none;
          }
        }

        & > * {
          filter: brightness(10) !important;
        }
      }
    `}
  `}
`

export const Progress = styled(motion.div)<{ light?: boolean }>`
  background: ${({ theme, light = false }) =>
    light ? theme.palette.white : theme.palette.black};
  position: absolute;

  @media (max-width: calc(${breakpoints.tablet} - 1px)) {
    display: none;
  }

  @media ${devices.tablet} {
    top: 0px;
    right: -2px;
    width: 3px !important;
  }
`

export const ProgressText = styled(motion.span)<{ $light?: boolean }>`
  position: absolute;
  left: calc(100% + 5px);
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  color: ${({ theme, $light: light = false }) =>
    light ? theme.palette.white : theme.palette.black};
  font-size: ${({ theme }) => theme.typography.sm};
  transform: translateY(-100%);
`

export const MobileProgress = styled(motion.div)<{ light?: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 5px !important;
  background: #bcbcbc;
  z-index: 9;

  @media ${devices.tablet} {
    display: none;
  }
`

export const Title = styled(LocalizedLink)`
  text-decoration: none;
  margin-left: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.palette.black};
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-weight: 300;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${devices.tablet} {
    margin-left: 0px;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
`

export const ToggleBtn = styled.button<{ open: boolean; mode: NAV_MODES }>`
  transition: background 0.2s ease-in;
  background: transparent;
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
        filter: brightness(10) !important;
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

  @media ${devices.desktop} {
    padding: ${({ theme }) => theme.spacing.md} 0px;
    height: 164px;
  }
`

export const Logo = styled.img`
  display: none;
  height: 60px;

  @media ${devices.tablet} {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media ${devices.desktop} {
    height: 128px;
    width: auto;
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
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow-y: scroll;
    overflow-x: hidden;

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

export const Tabs = styled.header<{ sticky?: boolean }>`
  ${({ theme: { spacing, palette } }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${palette.identity};
    grid-column: 1 / last-col;
    padding: ${spacing.xs} ${spacing.xxs};

    @media ${devices.tablet} {
      padding: 0px ${spacing.xs};
      height: 106px;

      ${props =>
        //@ts-ignore
        props.sticky &&
        css`
          position: sticky;
          top: 0px;
          z-index: 7;
        `};
    }

    @media ${devices.desktop} {
      padding: ${({ theme }) => theme.spacing.sm} ${spacing.xs};
      height: fit-content;
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

export const TabButton = styled.button<{ small?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  position: relative;
  padding: ${({ theme: { spacing }, small }) =>
    !small ? `${spacing.xs} ${spacing.xxs}` : `0px ${spacing.xxs}`};

  ${({ small, theme }) =>
    small &&
    css`
      margin-right: ${theme.spacing.xxs};
    `};

  @media ${devices.tablet} {
    padding: ${({ theme: { spacing }, small }) =>
      !small ? `0px ${spacing.xxs}` : `0px ${spacing.xxs}`};
    height: 100%;
    text-align: center;
  }

  @media ${devices.desktop} {
    padding: ${({ theme: { spacing } }) => `0px ${spacing.xxs}`};
    align-self: center;
  }
`

export const TabButtonText = styled(atoms.p)<{ active?: boolean }>`
  ${({ active, theme: { typography } }) => css`
    text-underline-offset: 10px;
    color: ${lightTheme.palette.white};
    text-transform: uppercase;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    letter-spacing: 0.55px;
    font-weight: bold;

    max-width: min-content;
    white-space: nowrap;
    position: relative;

    @media ${devices.tablet} {
      max-width: initial;
      white-space: initial;
    }

    @media screen and (min-width: 1024px) and (max-width: 1190px) {
      max-width: min-content;
    }

    ${active &&
    css`
      &:after {
        content: "";
        position: absolute;
        bottom: -7px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 1px;
        background-color: ${lightTheme.palette.white};
      }
    `}
  `}
`

export const SearchImg = styled.img`
  filter: brightness(10);
`

//#endregion

//#region Table of contents tab

export const TocGrid = styled.section`
  /* overflow-y: scroll; */
  display: grid;
  height: 100%;
  grid-column: 1 / last-col;
  grid-row: 2;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(16, 1fr);

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
    color: ${palette.dark};
    text-transform: uppercase;
    text-align: start;
    margin: ${spacing.md} 0px;
    grid-column: 2 / -2;

    @media ${devices.tablet} {
      grid-column: 3 / -2;
    }
  `}
`

export const Part = styled(atoms.h3)<{ first?: boolean }>`
  margin: 80px 0px calc(80px - var(--space-xs)) 0px;
  text-align: start;
  grid-column: 2 / -2;

  ${({ first }) =>
    first &&
    css`
      margin-top: 0px;
    `}

  @media ${devices.tablet} {
    grid-column: 3 / -2;
  }
`

export const TableOfContents = styled(ToC)`
  padding-top: ${({ theme }) => theme.spacing.md};
`

//#endregion

//#region About

export const AboutWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-column: 1 / last-col;
  padding-top: ${({ theme }) => theme.spacing.md};

  @media ${devices.tablet} {
    grid-template-columns: repeat(27, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(14, 1fr);
  }
`

export const AboutContent = styled.article`
  padding-bottom: ${({ theme }) => theme.spacing.md};
  grid-column: 2 / -2;

  @media ${devices.tablet} {
    grid-column: 3 / -2;
  }
`

//#endregion

//#region Indexes tab

export const IndexesWrapper = styled.article`
  display: flex;
  flex-direction: column;
  grid-column: 1 / last-col;
`

export const IndexesTabs = styled(Tabs)`
  border-top: solid 1px ${({ theme }) => theme.palette.identityLight};);
  background: ${({ theme }) => theme.palette.identityLight};);
`

export const ActiveTabWrapper = styled.article`
  flex-grow: 1;
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(16, 1fr);

  @media ${devices.tablet} {
    grid-template-columns: repeat(27, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(14, 1fr);
  }
`

export const IndexLetter = styled(atoms.p)`
  ${({ theme: { typography, spacing } }) => css`
    align-self: center;
    font-family: ${typography.fonts.primary};
    font-weight: bold;
    grid-column: 2;
    align-self: start;
    margin-top: ${spacing.md};

    height: calc(${({ theme }) => theme.typography.md});
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    span {
      display: block;
      font-size: ${typography.sm};
      line-height: 110%;
    }

    @media ${devices.tablet} {
      grid-column: 3;
    }
  `}
`

export const Keyword = styled(atoms.p)`
  line-height: 100%;
`

export const Mentions = styled(atoms.p)`
  font-size: calc(${({ theme }) => theme.typography.sm});
  font-weight: normal;
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: 500;
`

export const IndexText = styled(atoms.p)`
  grid-column: 6 / -2;
  height: fit-content;
  align-self: end;
  margin-top: ${({ theme }) => theme.spacing.md};
  line-height: 100%;

  @media ${devices.tablet} {
    grid-column: 5 / -2;
  }
`

export const Anchors = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(4px + 1ch);
`

export const ChapterTitle = styled(atoms.h3)`
  margin: 0;
  margin-top: ${({ theme }) => theme.spacing.xxs};
  margin-bottom: 4px;
  text-align: start;
  font-size: calc(${({ theme }) => theme.typography.sm} * 1.2);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const BiogramLink = styled(atoms.p)`
  width: fit-content;
  display: inline-block;
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-size: calc(${({ theme }) => theme.typography.sm} * 1.2);
  text-decoration: none;
  color: inherit;
  font-weight: inherit;
  display: block;
  cursor: pointer;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`

//#endregion

export const AnnotationsButton = styled.button`
  background: ${({ theme }) => theme.palette.quaternary};
  border: none;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing.md};
  grid-column: 1 / last-col;
  font-size: ${({ theme }) => theme.typography.sm};
  letter-spacing: 0.55px;
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: bold;
  color: ${({ theme }) => theme.palette.black};
  cursor: pointer;
`

export const NextTabButton = styled.button`
  background: ${({ theme }) => theme.palette.identity}};
  border: none;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing.md};
  grid-column: 1 / last-col;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sm};
  letter-spacing: 0.55px;
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: bold;
  color: ${lightTheme.palette.white};
  cursor: pointer;
`
