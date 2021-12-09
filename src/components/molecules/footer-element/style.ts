import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const ElementWrapper = styled.article`
  flex: 1;

  ${({ theme: { spacing, palette } }) => css`
    padding: ${spacing.md};
    outline: 1px solid ${palette.dark};
    margin-left: 1px;

    min-width: ${`calc(100% - (2 * ${spacing.md}) - 1px)`};
    width: ${`calc(100% - (2 * ${spacing.md}) - 1px)`};
    max-width: ${`calc(100% - (2 * ${spacing.md}) - 1px)`};

    @media ${devices.laptop} {
      min-width: ${`calc(50% - (2 * ${spacing.md}) - 1px)`};
      width: ${`calc(50% - (2 * ${spacing.md}) - 1px)`};
      max-width: ${`calc(50% - (2 * ${spacing.md}) - 1px)`};
    }
  `};
`

export const VariantHeader = styled(atoms.h3)`
  ${({ theme: { spacing, typography } }) => css`
    text-transform: uppercase;
    text-align: left;
    margin: 0px 0px ${spacing.md} 0px;
    font-size: ${typography.sm};
    font-weight: normal;
  `}
`

export const ArticleTitle = styled(LocalizedLink)`
  text-decoration: none;
`

export const ArticleNumber = styled(atoms.p)`
  ${({ theme: { spacing, typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;
    margin-bottom: ${spacing.xxs};
  `}
`
export const ArticleAuthor = styled(atoms.h3)`
  ${({ theme: { spacing } }) => css`
    margin: ${spacing.xxs} 0px;
    text-align: left;
  `}
`

export const SummaryButton = styled.button`
  ${({ theme: { spacing, typography, palette } }) => css`
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    margin-bottom: ${spacing.sm};
    color: ${palette.black};

    span {
      color: ${palette.black};
      font-family: ${typography.fonts.primary};
      font-size: ${typography.sm};
      font-weight: normal;
      text-transform: lowercase;
      line-height: 115%;
      margin-right: ${spacing.xxs};
    }
  `}
`
