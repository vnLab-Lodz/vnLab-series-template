import styled, { css } from "styled-components"
import { LocalizedLink } from "gatsby-theme-i18n"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const TocContainer = styled.article`
  position: relative;
  display: grid;
  grid-column: 1 / last-col;
  grid-template-rows: repeat(4, min-content);
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(16, 1fr);

  @media ${devices.tablet} {
    grid-template-columns: repeat(27, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(14, 1fr);
  }
`

export const ArticlTitle = styled(LocalizedLink)`
  text-decoration: none;
  grid-row: 1;
  grid-column: 6 / -2;
`

export const ArticleNumber = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    align-self: center;
    grid-row: 1;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;
    grid-column: 2;

    @media ${devices.tablet} {
      grid-column: 3;
    }
  `}
`
export const ArticleAuthor = styled(atoms.h3)`
  ${({ theme: { spacing } }) => css`
    grid-row: 2;
    grid-column: 6 / -2;
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
    /* margin-bottom: ${spacing.sm}; */
    grid-row: 3;
    grid-column: 6 / -2;
    text-align: left;

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

export const Summary = styled(atoms.p)`
  margin-top: ${({ theme }) => theme.spacing.xxs};
  grid-row: 4;
  grid-column: 6 / -2;
  overflow: hidden;
`

export const Divider = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  background: ${({ theme }) => theme.palette.dark};
  grid-column: 2 / -2;

  @media ${devices.tablet} {
    grid-column: 3 / -2;
  }
`