import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import { InnerGrid } from "~styles/grid"

export const QuoteContainer = styled.article`
  ${({ theme: { spacing, palette } }) => css`
    border-top: 1px solid ${palette.medium};
    border-bottom: 1px solid ${palette.medium};
    padding: ${spacing.md} 0px;
    width: 100%;
    }
  `}
`

export const QuoteText = styled(atoms.p).attrs({ as: "div" })`
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

export const BlockQuoteIcon = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
`

export const BlockQuoteContainer = styled(InnerGrid).attrs({ as: "article" })`
  width: 100%;
`

export const BlockQuoteText = styled(atoms.p).attrs({ as: "div" })`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    color: ${palette.black};
    grid-column: 3 / last-col;

    p {
      font-size: 16px;
      line-height: 25px;
    }

    @media ${devices.laptop} {
      grid-column: 2 / last-col;

      p {
        font-size: 18px;
        line-height: 30px;
      }
    }
  `}
`

export const BlockQuoteAuthor = styled(atoms.h3)`
  margin-top: ${({ theme: { spacing } }) => spacing.xxs};
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: 13px;
  line-height: 15px;
  text-align: end;
  margin-bottom: 0px;
  grid-column: 3 / last-col;

  @media ${devices.laptop} {
    grid-column: 2 / last-col;
    margin-top: ${({ theme: { spacing } }) => spacing.xs};

    font-size: 15px;
    line-height: 18px;
  }
`
