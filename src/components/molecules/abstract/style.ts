import styled, { css } from "styled-components"
import atoms from "~components/atoms"

export const AbstractText = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.lg};
    font-weight: bold;
    line-height: 1.2;
  `}
`
