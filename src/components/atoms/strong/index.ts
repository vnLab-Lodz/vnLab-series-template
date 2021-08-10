import styled, { css } from "styled-components"

export const strong = styled.strong`
  ${({ theme }) => css`
    font-family: ${theme.typography.fonts.secondary};
    font-weight: bold;
    font-size: inherit;
  `}
`
