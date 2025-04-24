import { motion } from "framer-motion"
import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import BaseLayout from "../layout"

export const ArticleMenuContainer = styled.div<{ $spaced?: boolean }>`
  position: sticky;
  top: 65px;
  height: 75px;
  z-index: 7;

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
  & > div {
    grid-column: 1 / -1;

    @media ${devices.tablet} {
      grid-column: 4 / -1;
    }

    @media ${devices.laptop} {
      grid-column: 3 / -1;
      padding-right: calc((100vw / 32) * 2);
    }
  }

  @media ${devices.desktop} {
    justify-content: center;
  }
`

export const MenuNav = styled.nav<{ open: boolean }>`
  ${({ theme: { spacing } }) => css`
    display: flex;
    justify-content: flex-start;
    position: relative;
    z-index: 3;
    overflow-x: auto;
    padding: ${spacing.md} calc(100vw / 32);

    & > :not([hidden]) ~ :not([hidden]) {
      margin-left: ${spacing.xs};
    }

    @media ${devices.tablet} {
      justify-content: center;
      align-items: center;

      & > :not([hidden]) ~ :not([hidden]) {
        margin-left: min(${spacing.lg}, 60px);
      }

      padding: ${spacing.sm} calc(100vw / 32);
      height: 106px;
      max-height: 106px;
      overflow-x: hidden;
    }

    @media ${devices.desktop} {
      height: 164px;
      max-height: 164px;
    }

    @media ${devices.desktopL} {
      & > :not([hidden]) ~ :not([hidden]) {
        margin-left: ${spacing.xxl};
      }
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

export const Button = styled.button.attrs({
  tabIndex: 0,
  type: "button",
})`
  ${({ theme: { spacing, palette } }) => css`
    box-sizing: border-box;
    padding: ${spacing.xxs} ${spacing.xs};
    background: ${palette.white};
    outline: solid 1px transparent;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${palette.black};
    transition: box-shadow 0.1s ease-in-out;

    &:hover,
    &:active,
    &:focus-visible {
      outline: solid 2px transparent;
      box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
    }
  `}
`

export const MenuContent = styled(motion.div).attrs({
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
})<{ $maxHeight: string }>`
  ${({ $maxHeight: maxHeight, theme: { palette } }) => css`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
    background-color: ${palette.white};
    border-bottom: solid 1px transparent;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.05);
    overflow-y: scroll;
    max-height: ${maxHeight};
    overscroll-behavior: contain;
  `}
`

export const AnimatedContent = styled(motion.div).attrs({
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
})({})

export const MenuLayout = styled(BaseLayout)`
  ${({ theme: { spacing } }) => css`
    margin-top: calc(${spacing.md} * 2 + 35px);
    margin-bottom: ${spacing.md};

    @media ${devices.tablet} {
      margin-top: calc(106px + ${spacing.sm});
      margin-bottom: ${spacing.sm};
    }

    @media ${devices.desktop} {
      justify-content: center;
    }

    @media ${devices.desktopL} {
      margin-top: calc(164px + ${spacing.sm});
      margin-bottom: ${spacing.md};
    }
  `};
`

export const BibliographyLink = styled(LocalizedLink)`
  text-decoration: none;
`
