import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"
import Slide from "../slide"

export const CaptionSlideContainer = styled(Slide)`
  position: relative;
  align-items: center;
`

export const CaptionButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.xs};
  bottom: ${({ theme }) => theme.spacing.xs};
  background: transparent;
  outline: none;
  border: none;
  padding: 0;

  cursor: pointer;

  @media ${devices.laptop} {
    right: ${({ theme }) => theme.spacing.xs};
  }
`

export const Caption = styled(GridContainer).attrs({
  as: motion.article,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
})`
  ${({ theme: { palette, typography, spacing } }) => css`
    z-index: 1;
    grid-template-rows: auto auto;
    background: ${palette.white};
    border-top: solid 1px ${palette.dark};
    border-bottom: solid 1px ${palette.dark};
    font-family: ${typography.fonts.secondary};
    padding-top: ${spacing.sm};
    position: absolute;
    left: 0px;
    right: 0px;
    top: 100vh;
    transform: translateY(-100%);
    max-height: 60vh;
    row-gap: ${spacing.xs};
    overflow-y: auto;
    overscroll-behavior: contain;

    font-family: ${({ theme }) => theme.typography.fonts.primary};
    font-weight: 700;

    @media ${devices.desktop} {
      justify-content: center;
      max-width: none;
    }
  `}
`

export const CaptionText = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    grid-column: 1 / -6;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    text-align: left;
    font-weight: 300;
  `}
`

export const CaptionHeader = styled(CaptionText)`
  grid-column: 3 / 30;
  grid-row: 1;
  font-size: ${({ theme: { typography } }) => typography.md};
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-weight: 300;

  @media ${devices.tablet} {
    grid-column: 8 / 28;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 23;
  }
`

export const CaptionParagraph = styled(atoms.p)<{ $padded?: boolean }>`
  grid-column: 3 / 32;
  grid-row: 2;
  text-align: left;

  ${({ $padded: padded, theme }) =>
    padded &&
    css`
      padding-bottom: ${theme.spacing.xs};
    `};

  @media ${devices.tablet} {
    grid-column: 8 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }
`

export const CloseBtn = styled.button`
  position: sticky;
  top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0px;
  background: transparent;
  border: none;
  cursor: pointer;
  height: fit-content;

  grid-column: 31;
  grid-row: 1;

  filter: invert(1);
`
