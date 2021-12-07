import { motion } from "framer-motion"
import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import BaseLayout from "../layout"

export const ArticleMenuContainer = styled.div`
  position: relative;
  height: 250px;
  background: ${({ theme: { palette } }) => palette.light};
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
    padding: ${spacing.sm};
    position: relative;
    z-index: 3;
    transition: background 0.5s ease-in-out;

    overflow-x: auto;

    @media ${devices.tablet} {
      justify-content: center;
      overflow-x: hidden;
    }
  `}
`

export const ButtonText = styled.span`
  ${({ theme: { spacing, typography } }) => css`
    margin-right: ${spacing.xxs};
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;
    text-transform: uppercase;
    line-height: 115%;
  `}
`

export const Button = styled.button`
  ${({ theme: { spacing } }) => css`
    padding: ${spacing.xs};
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  `}
`

export const MenuContent = styled(motion.div)`
  ${({ theme: { palette } }) => css`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
    background-color: ${palette.white};
    border-bottom: solid 2px ${palette.dark};
    overflow-y: scroll;
    max-height: 88vh;
  `}
`

export const MenuLayout = styled(Layout)`
  margin-top: ${({ theme: { spacing } }) => spacing.xxxl};
  margin-bottom: ${({ theme: { spacing } }) => spacing.sm};
`

export const BibliographyLink = styled(LocalizedLink)`
  text-decoration: none;
`
