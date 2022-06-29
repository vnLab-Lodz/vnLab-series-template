import { motion } from "framer-motion"
import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import BaseLayout from "../layout"

export const ArticleMenuContainer = styled.div<{ spaced?: boolean }>`
  position: sticky;
  top: 65px;
  height: 75px;
  z-index: 7;
  background: ${({ theme: { palette } }) => palette.light};

  @media ${devices.tablet} {
    top: 0px;
    height: 106px;
  }

  @media ${devices.desktopL} {
    top: 0px;
    height: 164px;
  }
`

export const StickyWrapper = styled.div<{ sticky?: boolean }>`
  background: ${({ theme: { palette } }) => palette.light};
  ${({ sticky }) =>
    sticky &&
    css`
      position: fixed;
      top: 65px;
      left: 0px;
      right: 0px;
      z-index: 3;

      @media ${devices.tablet} {
        top: 0px;
      }
    `}
`

export const Layout = styled(BaseLayout)`
  @media ${devices.desktop} {
    justify-content: center;
  }
`

export const MenuNav = styled.nav<{ open: boolean }>`
  ${({ open, theme: { spacing, palette } }) => css`
    background: ${open ? palette.white : "none"};
    display: flex;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${palette.dark};
    padding: ${spacing.xxs};
    position: relative;
    z-index: 3;
    transition: background 0.5s ease-in-out;

    filter: ${open
      ? `drop-shadow(-10px 0px 0px ${palette.white})  drop-shadow(10px 0px 0px ${palette.white})`
      : "none"};

    overflow-x: auto;

    @media ${devices.tablet} {
      padding: ${spacing.sm};
      max-height: 106px;
      justify-content: space-evenly;
      overflow-x: hidden;
    }

    @media ${devices.desktop} {
      max-height: 164px;
      height: 164px;
    }

    @media (min-width: 1024px) and (max-width: 1100px) {
      overflow-x: visible;
    }
  `}
`

export const ButtonText = styled.span`
  ${({ theme: { spacing, typography, palette } }) => css`
    margin-right: ${spacing.xxs};
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    letter-spacing: 0.55px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${palette.black};
  `}
`

export const Button = styled.button`
  ${({ theme: { spacing, palette } }) => css`
    padding: ${spacing.xs};
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${palette.black};
  `}
`

export const MenuContent = styled(motion.div)<{ maxHeight: string }>`
  ${({ maxHeight, theme: { palette } }) => css`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
    background-color: ${palette.white};
    border-bottom: solid 1px ${palette.dark};
    overflow-y: scroll;
    max-height: ${maxHeight};
  `}
`

export const MenuLayout = styled(Layout)`
  margin-top: ${({ theme: { spacing } }) => spacing.xxxl};
  margin-bottom: ${({ theme: { spacing } }) => spacing.xl};
`

export const BibliographyLink = styled(LocalizedLink)`
  text-decoration: none;
`
