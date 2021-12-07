import styled, { css } from "styled-components"
import { motion } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import { GridConstraint, GridContainer } from "~styles/grid"
import { devices } from "~styles/breakpoints"

export const ViewportConstraint = styled(GridContainer)<{ sticky: boolean }>`
  max-height: 100vh;
  grid-column: 1 / last-col;
  margin: ${({ theme: { spacing } }) => spacing.xxl} 0px;
  display: grid;
  grid-template-rows: 1fr min-content;
  overflow: initial;
`

export const Slider = styled(motion.div)`
  grid-row: 1;
  max-height: 100%;
  grid-column: 1 / last-col;
  display: flex;
  scroll-behavior: smooth;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    grid-column: 3 / last-col;
  }

  padding-left: calc(calc(100vw / 32) * 1);
  padding-right: calc(calc(100vw / 32) * 1);

  @media ${devices.tablet} {
    padding-left: calc(calc(100vw / 32) * 3);
    padding-right: calc(calc(100vw / 32) * 3);
  }

  @media ${devices.laptop} {
    padding-left: calc(calc(100vw / 32) * 6);
    padding-right: calc(calc(100vw / 32) * 8);
  }

  overflow-x: -moz-scrollbars-none;
  overflow-x: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
`

export const ImageWrapper = styled.div`
  flex: 1 0 auto;
  width: calc(calc(100vw / 32) * 30);
  display: flex;
  flex-direction: column;
  margin: 0px ${({ theme }) => theme.spacing.xs};
  overflow: hidden;

  @media ${devices.tablet} {
    width: calc(calc(100vw / 32) * 23);
  }

  @media ${devices.laptop} {
    width: calc(calc(100vw / 32) * 16);
  }

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    margin-right: 0px;
  }
`

export const Image = styled(GatsbyImage)`
  cursor: pointer;
  flex: 1 1 auto;
`

export const Caption = styled.article`
  min-height: 2rem;
`

export const Controls = styled(GridConstraint)`
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const CarouselNav = styled.nav`
  ${({ theme: { palette, spacing } }) => css`
    border-bottom: solid 1px ${palette.dark};
    grid-column: 1 / last-col;
    padding-bottom: ${spacing.xxs};
  `}
`
