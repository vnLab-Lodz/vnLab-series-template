import { GatsbyImage } from "gatsby-plugin-image"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import { GridContainer, InnerGrid } from "~styles/grid"
import atoms from "~components/atoms"

export const ViewportConstraint = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: ${({ theme: { spacing } }) => spacing.xxxl} 0px;
`

export const ImageWrapper = styled.div`
  justify-content: center;
  overflow: hidden;
  display: flex;
  width: 100vw;
  flex: 1;

  transform: translateX(-5%);

  @media ${devices.tablet} {
    transform: translateX(-20%);
  }
  @media ${devices.laptop} {
    transform: translateX(-25%);
  }
`

export const Image = styled(GatsbyImage)`
  height: 100%;
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
    grid-column: 1 / 14;
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
