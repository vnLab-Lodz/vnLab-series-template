import styled, { css } from "styled-components"
import { devices } from "../../../styles/breakpoints"
import { isPrimary, StyledTypeProps } from "../../../types"

export const h3 = styled.h3<StyledTypeProps>`
  ${({ type, theme: { typography, palette, spacing } }) => css`
    font-weight: ${type && isPrimary(type) ? "bold" : 500};
    font-family: ${typography.fonts[type ?? "secondary"]};
    font-size: ${typography.md};
    font-style: normal;
    line-height: 139%;
    color: ${palette.black};
    text-align: center;
    margin-top: calc(${spacing.xxl} * 1.2);
    margin-bottom: ${spacing.lg};

    @media ${devices.tablet} {
      line-height: 125%;
    }
  `}
`
