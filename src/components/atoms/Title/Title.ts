import styled, { css } from "styled-components"
import { StyledTypeProps } from "../../../types"

export const Title = styled.h1<StyledTypeProps>`
  ${({ type, theme: { typography, palette } }) => css`
    font-family: ${typography.fonts[type ?? "secondary"]};
    font-size: ${typography.xxl};
    font-style: normal;
    font-weight: normal;
    line-height: 100%;
    color: ${palette.black};
  `}
`
