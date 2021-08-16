import styled, { css } from "styled-components"
import atoms from "~components/atoms"

export const QuoteContainer = styled.article`
  ${({ theme: { spacing, palette } }) => css`
    border-top: 1px solid ${palette.medium};
    border-bottom: 1px solid ${palette.medium};
    padding: ${spacing.md} 0px;
    width: 100%;
    margin: ${spacing.xl} 0px;
    }
  `}
`

export const QuoteText = styled(atoms.p)`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.lg};
    color: ${palette.black};
    line-height: 1.2;
  `}
`

export const Author = styled(atoms.h3)`
  margin-top: ${({ theme: { spacing } }) => spacing.sm};
  text-align: end;
  margin-bottom: 0px;
`
