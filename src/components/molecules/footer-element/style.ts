import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const ElementWrapper = styled.article`
  flex: 1;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    top: 30px;
    bottom: 30px;
    left: -1px;
    width: 1px;
    background: ${({ theme }) => theme.palette.medium};
  }

  ${({ theme: { spacing } }) => css`
    padding: ${spacing.md};
    min-width: 100%;
    width: 100%;
    max-width: 100%;

    @media ${devices.laptop} {
      min-width: 50%;
      width: 50%;
      max-width: 50%;
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

  p {
    font-weight: 500;
  }
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
  ${({ theme: { spacing, typography } }) => css`
    font-weight: normal;
    margin: ${spacing.xs} 0px;
    text-align: left;

    font-size: calc(${typography.sm} * 1.2);

    @media ${devices.tablet} {
      font-size: calc(${typography.sm} * 1.4);
    }

    @media ${devices.desktop} {
      font-size: calc(${typography.sm} * 1.1);
    }
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

export const p = styled(atoms.p)`
  font-size: ${({ theme }) => `calc(${theme.typography.sm} * 1.4)`};
`
