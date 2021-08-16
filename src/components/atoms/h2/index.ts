import styled, { css } from "styled-components"
import spacing from "~styles/spacing"
import { devices } from "../../../styles/breakpoints"
import { StyledTypeProps } from "../../../types"

export const h2 = styled.h2<StyledTypeProps>`
  ${({ type, theme: { typography, palette } }) => css`
    font-family: ${typography.fonts[type ?? "secondary"]};
    font-size: ${typography.lg};
    font-style: normal;
    font-weight: 500;
    line-height: 114%;
    color: ${palette.black};
    text-align: center;
    margin-top: calc(${spacing.xxl} * 1.2);
    margin-bottom: ${spacing.lg};

    @media ${devices.tablet} {
      line-height: 125%;
    }
  `}
`
