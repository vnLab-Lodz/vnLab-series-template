import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"

export const FooterSpacer = styled.div`
  ${({ theme: { palette, spacing } }) => css`
    background: ${palette.light};
    padding: ${spacing.xxxl} 0px;

    @media ${devices.tablet} {
      padding-top: calc(0.9 * ${spacing.xxxl});
      padding-bottom: calc(1.05 * ${spacing.xxxl});
    }
  `}
`

export const FooterGrid = styled(GridContainer)`
  ${({ theme: { palette } }) => css`
    background: ${palette.white};
    border-top: solid 1px ${palette.dark};
    border-bottom: solid 1px ${palette.dark};
    width: 100%;
  `}
`

export const FooterContainer = styled.footer`
  position: relative;
  grid-column: 1 / last-col;
  display: grid;
  grid-template-columns: repeat(32, 1fr);

  @media ${devices.tablet} {
    grid-template-columns: repeat(29, 1fr);
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(30, 1fr);
    grid-column: 3 / last-col;
  }
`

export const ArrowButton = styled.button<{ side: "left" | "right" }>`
  ${({ side, theme: { palette } }) => css`
    cursor: pointer;
    height: 100%;
    width: 100%;
    grid-column: ${side === "left" ? "1 / 4" : "-4 / last-col"};
    grid-row: 1;
    background: none;
    border: none;
    border-radius: 0px;
    outline: 1px solid ${palette.dark};
    transition: background 0.2s ease-in-out;

    @media ${devices.tablet} {
      grid-column: ${side === "left" ? "1 / 3" : "-3 / last-col"};
    }

    &:hover {
      background: ${palette.light};
    }
  `}
`
export const FooterPages = styled.div`
  display: flex;
`

export const FooterPagesContainer = styled.div`
  grid-row: 1;
  grid-column: 4 / -4;
  overflow: hidden;

  @media ${devices.tablet} {
    grid-column: 3 / -3;
  }
`
