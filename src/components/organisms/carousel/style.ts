import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"

//#region Base carousel styles

export const ViewportConstraint = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: ${({ theme: { spacing } }) => spacing.xxl} 0px;
  max-height: 100vh;

  @media (max-height: 800px) {
    max-height: 700px;
  }
`

export const Slider = styled.div`
  grid-row: 1;
  grid-column: 1 / last-col;
  white-space: nowrap;
`

export const SliderImage = styled.div<{
  marginStart?: number
  marginEnd?: number
  fullscreen?: boolean
}>`
  display: inline-block;
  vertical-align: top;
  margin: 0px 16px;

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
      margin: 0px;
      position: absolute;
    `}
`

export const ImageCaption = styled(atoms.p)`
  ${({ theme: { spacing, typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    margin-top: ${spacing.xs};
    width: 100%;
    white-space: break-spaces;
  `}
`

export const CarouselNav = styled.nav`
  ${({ theme: { palette, spacing } }) => css`
    border-bottom: solid 1px ${palette.dark};
    grid-column: 1 / last-col;
    padding-bottom: ${spacing.xxs};
    margin-top: ${spacing.lg};
  `}
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
      grid-column: 8/ 12;
    }
  `}
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
    grid-column: ${({ side }) => (side === "left" ? 7 : 12)};
  }
`

export const Expand = styled.button`
  background: none;
  border: none;
  grid-column: last-col;
  cursor: pointer;
  display: none;

  @media ${devices.tablet} {
    display: block;
  }
`

//#endregion

//#region Fullscreen carousel styles

export const Fullscreen = styled(GridContainer)`
  ${({ theme: { palette, spacing } }) => css`
    position: fixed;
    background: ${palette.black};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
    grid-template-rows: auto 1fr auto;
    padding-bottom: ${spacing.sm};
  `}
`

export const FullscreenArrow = styled(Arrow)`
  filter: brightness(10);
  grid-row: 2;
  grid-column: ${({ side }) => (side === "left" ? "2 / 3" : "-2 / last-col")};

  @media ${devices.tablet} {
    grid-column: ${({ side }) => (side === "left" ? "4 / 5" : "-3 / last-col")};
  }

  @media ${devices.laptop} {
    grid-column: ${({ side }) =>
      side === "left" ? "3 / 5" : " -3 / last-col"};
  }
`

export const CloseBtn = styled.button`
  filter: brightness(10);
  cursor: pointer;
  padding: 0px;
  background: none;
  border: none;
  grid-row: 1;
  grid-column: -3 / last-col;
  margin: ${({ theme }) => theme.spacing.xs};
`

export const FullscreenCount = styled(ImageCount)`
  color: ${({ theme }) => theme.palette.white};
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
    color: ${palette.white};
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
  grid-row: 1 / 3;
  position: relative;

  @media ${devices.tablet} {
    grid-column: 5 / -3;
  }

  @media ${devices.laptop} {
    grid-column: 7 / -5;
  }
`

//endregion
