import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import { GridContainer, InnerGrid } from "~styles/grid"
import atoms from "~components/atoms"
import { motion } from "framer-motion"

export const ViewportConstraint = styled(motion.div)`
  display: grid;
  overflow: initial;
  grid-column: 1 / last-col;
  grid-template-columns: repeat(32, 1fr);
  grid-template-rows: ${({ theme: { spacing } }) =>
    `${spacing.xl} 1fr ${spacing.xl}`};
  max-height: ${({ theme: { spacing } }) => `calc(100vh + 2 * ${spacing.xl})`};

  @media ${devices.tablet} {
    grid-template-rows: ${({ theme: { spacing } }) =>
      `${spacing.xxxl} 1fr ${spacing.xxxl}`};
    max-height: ${({ theme: { spacing } }) =>
      `calc(100vh + 2 * ${spacing.xxxl})`};
  }
`

export const Absolute = styled(GridContainer)<{ sticky: boolean }>`
  grid-column: 1 / last-col;
  grid-row: 2;
  position: ${({ sticky }) => (sticky ? "sticky" : "relative")};
  top: 0;

  @media ${devices.desktop} {
    height: 100%;
  }
`

export const ImageWrapper = styled.div<{
  $withVerticalPadding?: boolean
  $verticalImage?: boolean
}>`
  justify-content: center;
  overflow: hidden;
  display: flex;
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing.xs};

  ${({ $withVerticalPadding, theme }) =>
    $withVerticalPadding &&
    css`
      padding-bottom: ${theme.spacing.xs};
    `};

  grid-column: 1 / last-col;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    grid-column: 3 / last-col;
  }

  ${({ $verticalImage }) =>
    $verticalImage &&
    css`
      justify-content: flex-start;
      grid-column: 2 / 32;

      @media ${devices.tablet} {
        grid-column: 7 / 30;
      }

      @media ${devices.laptop} {
        grid-column: 9 / 25;
      }
    `}
`

export const ImageCaptionTarget = styled.div`
  position: relative;
  width: auto;
`

export const Caption = styled(InnerGrid)`
  margin: ${({ theme: { spacing } }) => spacing.xs} 0px;
  align-items: baseline;
`

export const ExpandCaptionBtn = styled.button`
  ${({ theme: { typography, palette } }) => css`
    grid-row: 2;
    grid-column: 1 / auto;
    white-space: nowrap;

    @media ${devices.tablet} {
      grid-column: 1 / span 4;
    }

    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: 500;
    text-transform: lowercase;
    line-height: 115%;
    padding: 0px;
    margin-top: ${({ theme }) => theme.spacing.xxs};
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
    height: fit-content;
    color: ${palette.black};
  `}
`

export const CaptionText = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    grid-column: 1 / -4;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    text-align: left;
    font-weight: 300;

    @media ${devices.laptop} {
      grid-column: 1 / 9;
    }
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
    position: absolute;
    left: 0px;
    right: 0px;
    max-height: 60vh;
    row-gap: ${spacing.xs};
    overflow-y: auto;
    overscroll-behavior: contain;

    @media ${devices.desktop} {
      justify-content: center;
      max-width: none;
    }
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

export const CaptionParagraph = styled(atoms.p)<{ padded?: boolean }>`
  grid-column: 3 / 32;
  grid-row: 2;
  text-align: left;

  ${({ padded, theme }) =>
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

export const Expand = styled.button`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};

  background: ${({ theme }) => theme.palette.light};
  padding: calc(${({ theme }) => theme.spacing.xxs} / 2);
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  border: none;
  grid-column: last-col;
  cursor: pointer;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  transition: background 0.3s ease-in-out;
  & * {
    transition: all 0.3s ease-in-out;
  }

  & > span > svg > path {
    fill: ${({ theme }) => theme.palette.black};
    stroke: ${({ theme }) => theme.palette.black};
  }

  &:hover {
    background: ${({ theme }) => theme.palette.dark};

    & > span > svg > path {
      fill: ${({ theme }) => theme.palette.white};
      stroke: ${({ theme }) => theme.palette.white};
    }
  }
`
