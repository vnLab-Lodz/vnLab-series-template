import styled, { css } from "styled-components"

export const ol = styled.ol`
  ${({ theme: { typography, palette, spacing } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: normal;
    font-style: normal;
    line-height: 139%;
    color: ${palette.black};
    counter-reset: number;
    counter-reset: number2;

    li {
      font-family: inherit;

      &::before {
        counter-increment: number;
        content: counter(number);
        margin-right: ${spacing.xs};
      }
    }

    // Indent multilevel lists
    & & {
      margin-left: ${spacing.xs};
    }
  `}
`
