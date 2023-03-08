import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  // temp
  background: rgba(0, 0, 0, 0.4);
`

export const DialogContent = styled(GridContainer).attrs({
  as: motion.article,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
})`
  ${({ theme: { palette, typography, spacing } }) => css`
    grid-template-rows: auto auto;
    background: ${palette.white};
    border-top: solid 1px ${palette.dark};
    border-bottom: solid 1px ${palette.dark};
    padding-top: ${spacing.sm};
    padding-bottom: ${spacing.lg};
    width: 100%;
    row-gap: ${spacing.md};
    column-gap: ${spacing.xxs};
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

export const DialogParagraph = styled(atoms.p)`
  grid-row: 1;
  grid-column: 2 / 32;
  text-align: left;

  @media ${devices.tablet} {
    grid-column: 8 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }
`

export const FullscreenButton = styled(atoms.button)`
  grid-row: 2;
  grid-column: 17 / 32;

  @media ${devices.tablet} {
    grid-column: 19 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 17 / 25;
  }
`

export const CloseButton = styled(atoms.button)`
  grid-row: 2;
  grid-column: 2 / 17;

  @media ${devices.tablet} {
    grid-column: 8 / 19;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 17;
  }
`
