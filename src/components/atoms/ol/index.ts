import styled, { css } from "styled-components"

export const ol = styled.ol`
  ${({ theme: { typography, palette, spacing } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: normal;
    font-style: normal;
    line-height: 150%;
    color: ${palette.black};
    margin: ${spacing.lg} 0px;
    padding-left: ${spacing.sm};
    position: relative;
    counter-reset: number;

    li {
      font-family: inherit;

      &::before {
        position: absolute;
        left: 0px;
        counter-increment: number;
        content: counter(number);
      }
    }

    // Indent multilevel lists
    & & {
      margin-left: ${spacing.xs};
    }
  `}
`
