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

    li {
      font-family: inherit;
      padding-left: ${spacing.xs};
    }

    // Indent multilevel lists
    & & {
      margin-left: ${spacing.xs};
    }
  `}
`
