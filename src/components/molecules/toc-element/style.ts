import styled, { css } from "styled-components"
import { LocalizedLink } from "gatsby-theme-i18n"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const TocContainer = styled.article<{ highlighted?: boolean }>`
  position: relative;
  display: grid;
  grid-column: 1 / last-col;
  grid-template-rows: repeat(5, min-content);
  padding-block: ${({ theme }) => theme.spacing.xs};
  /* old Safari does not handle block */
  padding-top: ${({ theme }) => theme.spacing.xs};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  grid-template-columns: repeat(16, 1fr);

  ${({ highlighted, theme }) =>
    highlighted &&
    css`
      background: ${theme.palette.light};
      border-block: 1px solid ${theme.palette.black};
      /* old Safari does not handle block */
      border-top: 1px solid ${theme.palette.black};
      border-bottom: 1px solid ${theme.palette.black};
    `};

  @media ${devices.tablet} {
    grid-template-columns: repeat(27, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(14, 1fr);
  }
`

export const SlidshowTitle = styled(atoms.p)`
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: lighter;
  grid-column: 4 / -3;
  align-self: end;
`

export const ArticleTitle = styled(LocalizedLink)`
  text-decoration: none;
  grid-column: 4 / -3;
  p {
    font-weight: 500;
  }
`

export const ArticleNumber = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    padding-top: 0.35rem;
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
  ${({ theme: { spacing, typography } }) => css`
    grid-column: 4 / -3;
    margin: ${spacing.xs} 0px;
    text-align: left;
    font-weight: normal;
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
    grid-column: 4 / -3;
    text-align: left;
    color: ${palette.black};

    span {
      color: ${palette.black};
      font-family: ${typography.fonts.primary};
      font-size: ${typography.sm};
      letter-spacing: 0.55px;
      font-weight: normal;
      text-transform: lowercase;
      line-height: 115%;
      margin-right: ${spacing.xxs};
    }
  `}
`

export const Summary = styled(atoms.p)`
  font-size: ${({ theme }) => `calc(${theme.typography.sm} * 1.153)`};
  margin-top: ${({ theme }) => theme.spacing.xxs};
  grid-column: 4 / -3;
  overflow: hidden;
`

export const p = styled(atoms.p)`
  font-size: inherit;
`

export const Divider = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  background: ${({ theme }) => theme.palette.dark};
  grid-column: 2 / -3;

  @media ${devices.tablet} {
    grid-column: 3 / -3;
  }
`
