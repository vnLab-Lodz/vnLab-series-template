import styled, { css } from "styled-components"
import { devices } from "../../../styles/breakpoints"

export const p = styled.p`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: normal;
    font-style: normal;
    line-height: 139%;
    color: ${palette.black};

    @media ${devices.tablet} {
      line-height: 150%;
    }
  `}
`
