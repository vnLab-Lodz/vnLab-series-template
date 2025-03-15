import styled, { css } from "styled-components"
import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import { GridConstraint, GridContainer } from "~styles/grid"
import { devices } from "~styles/breakpoints"
import atoms from "~components/atoms"

import { Swiper } from "swiper/react"

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
  display: grid;
  grid-template-rows: 1fr min-content;

  @media ${devices.desktop} {
    height: 100%;
  }
`

export const Slider = styled(Swiper)`
  grid-row: 1;
  width: 100%;
  max-width: -moz-available;

  max-height: 90vh;

  grid-column: 2 / 32;

  @media ${devices.tablet} {
    grid-column: 7 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }

  overflow: visible;

  max-height: calc(100vh - 30px - 2 * ${({ theme }) => theme.spacing.xs});
`

export const Slide = styled.div`
  height: 100%;
  max-height: calc(100vh - 30px - ${({ theme }) => theme.spacing.xs});
  width: 100%;
  display: flex;
`

export const ImageWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  width: -webkit-fill-available;
`

export const Image = styled(GatsbyImage)`
  cursor: grab;
  flex: 1 1 auto;
`

export const Caption = styled.article`
  min-height: 2rem;
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
`

export const Controls = styled(GridConstraint)`
  margin-top: ${({ theme }) => theme.spacing.xs};
  height: 30px;
`

export const CarouselNav = styled.nav`
  ${({ theme: { spacing } }) => css`
    grid-column: 1 / last-col;
    padding-bottom: ${spacing.xxs};
  `};
`

export const Arrow = styled.button<{ side: "left" | "right" }>`
  background: none;
  border: none;
  cursor: pointer;
  grid-column: ${({ side }) => (side === "left" ? 1 : "last-col")};

  @media ${devices.tablet} {
    grid-column: ${({ side }) => (side === "left" ? 10 : 15)};
  }

  @media ${devices.laptop} {
    grid-column: ${({ side }) => (side === "left" ? "6 / 8" : "11 / 13")};
  }
`

export const Expand = styled.button`
  background: none;
  border: none;
  grid-column: last-col;
  cursor: pointer;
  margin-left: auto;

  img {
    vertical-align: middle;
  }
`

export const ImageCount = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;
    text-align: center;
    grid-column: 13 / 17;
    align-self: center;

    @media ${devices.tablet} {
      grid-column: 11 / 15;
    }

    @media ${devices.laptop} {
      grid-column: 8 / 11;
    }
  `}
`

export const ImageCaption = styled(atoms.p)`
  ${({ theme: { spacing, typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    margin-top: ${spacing.xs};
    width: 90%;
    white-space: break-spaces;
  `}
`

//#region Fullscreen carousel styles

export const Fullscreen = styled(GridContainer)`
  ${({ theme: { palette, spacing } }) => css`
    position: fixed;
    background: ${palette.white};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 7;
    grid-template-rows: auto 1fr auto;
    padding-bottom: ${spacing.sm};
    height: 100vh;

    @media ${devices.desktop} {
      justify-content: center;
    }
  `}
`

export const FullscreenArrow = styled(Arrow)`
  filter: brightness(15);
  grid-row: 2;
  grid-column: ${({ side }) => (side === "left" ? "2 / 4" : "-2 / last-col")};

  @media ${devices.tablet} {
    grid-column: ${({ side }) => (side === "left" ? "4 / 6" : "-3 / last-col")};
  }

  @media ${devices.laptop} {
    grid-column: ${({ side }) =>
      side === "left" ? "3 / 5" : " -3 / last-col"};
  }
`

export const CloseBtn = styled.button`
  filter: brightness(15);
  cursor: pointer;
  padding: 0px;
  background: none;
  border: none;
  grid-row: 1;
  grid-column: -5 / last-col;
  margin: ${({ theme }) => theme.spacing.xs};
  margin-left: auto;
  width: fit-content;
`

export const FullscreenCount = styled(ImageCount)`
  color: ${({ theme }) => theme.palette.black};
  grid-row: 3;

  @media ${devices.tablet} {
    grid-column: 5 / 7;
  }

  @media ${devices.laptop} {
    grid-column: 7 / 8;
  }
`

export const FullscreenCaption = styled(atoms.p)`
  ${({ theme: { palette, typography } }) => css`
    color: ${palette.black};
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    grid-row: 3;

    @media ${devices.tablet} {
      grid-column: 7 / -3;
    }

    @media ${devices.laptop} {
      grid-column: 9 / -5;
    }
  `}
`

export const FullscreenSlider = styled(Slider)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / 3;
  position: relative;
  margin: ${({ theme }) => theme.spacing.xxs} 0px;
  overflow: hidden;

  @media ${devices.tablet} {
    grid-column: 6 / -3;
  }

  @media ${devices.laptop} {
    grid-column: 5 / 31;
  }
`

export const SliderImage = styled.div<{
  marginStart?: number
  marginEnd?: number
  fullscreen?: boolean
}>`
  display: inline-block;
  vertical-align: top;
  margin: 0px 16px;
  height: 100%;
  pointer-events: none;

  @media ${devices.tablet} {
    cursor: pointer;
    pointer-events: all;
  }

  ${({ fullscreen }) => (fullscreen ? FullscreenSlider : Slider)} & {
    &:first-child {
      margin-left: ${({ marginStart }) => `${marginStart ?? 0}px`};
    }

    &:last-child {
      margin-right: ${({ marginEnd }) => `${marginEnd ?? 0}px`};
    }
  }

  ${({ fullscreen }) =>
    fullscreen &&
    css`
      display: flex;
      margin: 0px !important;
      position: absolute;
      cursor: default;
      height: initial;
      max-height: 100%;
    `}

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`

//#endregion
