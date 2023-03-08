import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"

export const Fullscreen = styled(GridContainer)`
  ${({ theme: { palette } }) => css`
    position: fixed;
    background: ${palette.white};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 7;
    height: 100vh;

    @media ${devices.desktop} {
      justify-content: center;
    }
  `}
`

export const ScrollableContainer = styled.div`
  height: 100%;
  max-height: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  grid-column: 1 / last-col;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    grid-column: 3 / last-col;
  }

  overflow: visible;
  overscroll-behavior: contain;
`

export const Overflow = styled.div`
  max-height: 100%;
  max-width: 100%;
`

export const CloseButton = styled.button`
  position: fixed;
  background: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.black};
  border-radius: 9999px;
  aspect-ratio: 1 / 1;
  padding: ${({ theme }) => theme.spacing.xxs};

  img {
    vertical-align: middle;
  }

  right: ${({ theme }) => theme.spacing.sm};
  bottom: ${({ theme }) => theme.spacing.md};

  text-align: center;
  cursor: pointer;

  @media ${devices.laptop} {
    right: ${({ theme }) => theme.spacing.md};
  }
`
