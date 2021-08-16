import styled, { css } from "styled-components"

export const ul = styled.ul`
  ${({ theme: { typography, palette, spacing } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: normal;
    font-style: normal;
    line-height: 139%;
    color: ${palette.black};
    list-style: disc;
    margin: ${spacing.lg} 0px;
    margin-left: 1em;

    li {
      font-family: inherit;
    }

    // Indent multilevel lists
    & & {
      margin-left: ${spacing.xs};
    }
  `}
`
