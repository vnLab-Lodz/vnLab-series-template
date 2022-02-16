import styled, { css } from "styled-components"

export const p = styled.p`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: 300;
    font-style: normal;
    line-height: 150%;
    color: ${palette.black};
  `}
`
