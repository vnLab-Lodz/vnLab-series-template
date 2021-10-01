import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const ElementWrapper = styled.article<{
  variant: "left" | "right"
}>`
  ${({ variant, theme: { spacing } }) => css`
    padding: ${spacing.md} 0px;

    ${variant === "right" &&
    css`
      display: block;
      grid-column: 4 / -4;

      @media ${devices.tablet} {
        grid-column: 6 / 25;
      }

      @media ${devices.laptop} {
        grid-column: 18 / 27;
      }
    `}

    ${variant === "left" &&
    css`
      display: none;

      @media ${devices.laptop} {
        display: block;
        grid-column: 5 / 14;
      }
    `}
  `}
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

export const ArticlTitle = styled(LocalizedLink)`
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
  ${({ theme: { spacing, typography } }) => css`
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    margin-bottom: ${spacing.sm};

    span {
      font-family: ${typography.fonts.primary};
      font-size: ${typography.sm};
      font-weight: normal;
      text-transform: lowercase;
      line-height: 115%;
      margin-right: ${spacing.xxs};
    }
  `}
`
