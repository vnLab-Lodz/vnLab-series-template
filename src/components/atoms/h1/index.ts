import { StyledTypeProps } from "~types"
import { devices } from "~styles/breakpoints"
import styled, { css } from "styled-components"

export const h1 = styled.h1<StyledTypeProps>`
  ${({ type, theme: { typography, palette } }) => css`
    font-family: ${typography.fonts[type ?? "secondary"]};
    font-size: ${typography.xl};
    font-style: normal;
    font-weight: normal;
    line-height: 109%;
    color: ${palette.black};

    @media ${devices.tablet} {
      line-height: 100%;
    }
  `}
`
