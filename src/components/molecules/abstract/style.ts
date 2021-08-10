import styled, { css } from "styled-components"
import atoms from "~components/atoms"

export const AbstractText = styled(atoms.p)`
  ${({ theme: { typography, spacing } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.lg};
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: ${spacing.lg};
  `}
`
