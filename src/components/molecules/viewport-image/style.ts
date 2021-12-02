import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import { GridContainer, InnerGrid } from "~styles/grid"
import atoms from "~components/atoms"
import { motion } from "framer-motion"

export const ViewportConstraint = styled(motion.div)<{ sticky: boolean }>`
  display: grid;
  grid-template-columns: repeat(32, 1fr);
  overflow: hidden;

  grid-template-rows: ${({ theme: { spacing } }) =>
    `${spacing.xxxl} 1fr ${spacing.xxxl}`};
  grid-column: 1 / last-col;
  max-height: ${({ theme: { spacing } }) =>
    `calc(100vh + 2 * ${spacing.xxxl})`};

  overflow: initial;
`

export const Absolute = styled(GridContainer)<{ sticky: boolean }>`
  grid-column: 1 / last-col;
  grid-row: 2;
  position: ${({ sticky }) => (sticky ? "sticky" : "relative")};
  top: 0;
`

export const ImageWrapper = styled.div`
  justify-content: center;
  overflow: hidden;
  display: flex;
  flex: 1;

  grid-column: 1 / last-col;

  @media ${devices.tablet} {
  }

  @media ${devices.laptop} {
    grid-column: 3 / last-col;
  }
`

export const Caption = styled(InnerGrid)`
  margin: ${({ theme: { spacing } }) => spacing.xs} 0px;
  align-items: baseline;
`

export const ExpandCaptionBtn = styled.button`
  ${({ theme: { typography } }) => css`
    grid-column: -5 / span 4;
    @media ${devices.tablet} {
      grid-column: -3 / span 2;
    }
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: 500;
    text-transform: lowercase;
    line-height: 115%;
    padding: 0px;
    text-align: right;
    background: transparent;
    border: none;
    cursor: pointer;
    height: fit-content;
  `}
`

export const CaptionText = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    grid-column: 1 / -6;
    font-size: calc(${typography.sm} * 1.3);
  `}
`

export const CaptionContent = styled(GridContainer)`
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
    max-height: 60vh;
    row-gap: ${spacing.xs};

    @media ${devices.desktop} {
      justify-content: center;
    }
  `}
`

export const CaptionHeader = styled(CaptionText)`
  grid-column: 3 / 30;
  grid-row: 1;

  @media ${devices.tablet} {
    grid-column: 8 / 28;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 23;
  }
`

export const CaptionParagraph = styled(atoms.p)`
  grid-column: 3 / 32;
  grid-row: 2;

  @media ${devices.tablet} {
    grid-column: 8 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }
`

export const CloseBtn = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0px;
  background: transparent;
  border: none;
  cursor: pointer;
  height: fit-content;

  grid-column: 31;
  grid-row: 1;

  @media ${devices.tablet} {
    grid-column: 29;
  }
  @media ${devices.laptop} {
    grid-column: 24;
  }
`
