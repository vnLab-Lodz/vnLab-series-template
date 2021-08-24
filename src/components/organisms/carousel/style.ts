import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const ViewportConstraint = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: ${({ theme: { spacing } }) => spacing.xxl} 0px;
  max-height: 100vh;
`

export const Slider = styled.div`
  grid-row: 1;
  grid-column: 1 / last-col;
  white-space: nowrap;
`

export const SliderImage = styled.div<{
  marginStart: number
  marginEnd: number
}>`
  display: inline-block;
  margin: 0px 16px;

  ${Slider} & {
    &:first-child {
      margin-left: ${({ marginStart }) => `${marginStart}px`};
    }

    &:last-child {
      margin-right: ${({ marginEnd }) => `${marginEnd}px`};
    }
  }
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
