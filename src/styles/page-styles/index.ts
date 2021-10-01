import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import Edition from "~components/molecules/edition"
import atoms from "~components/atoms"
import ToC from "~components/organisms/navigation-menu/tabs/toc"
import LP from "~components/molecules/language-picker"
import { LocalizedLink } from "gatsby-theme-i18n"

export const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  filter: brightness(0.6);

  @media ${devices.tablet} {
    z-index: 10;
  }

  @media ${devices.laptop} {
    position: fixed;
    z-index: 0;
    display: block;
    width: 50vw;
  }
`

export const ContentWrapper = styled.aside`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr repeat(6, min-content);
  align-content: end;
  grid-column: 1 / last-col;

  grid-template-columns: repeat(32, 1fr);

  z-index: 7;

  @media ${devices.tablet} {
    z-index: 11;
  }

  @media ${devices.laptop} {
    background-color: ${({ theme }) => theme.palette.white};
    grid-column: 1 / 17;
    grid-template-columns: repeat(16, 1fr);
  }
`

export const LanguagePicker = styled(LP)<{ flex?: boolean }>`
  grid-row: 1;
  height: fit-content !important;
  margin-top: ${({ theme }) => `calc(67px + ${theme.spacing.sm} * 1.3)`};

  grid-column: -8 / -3;

  @media ${devices.tablet} {
    margin-top: ${({ theme }) => `calc(${theme.spacing.sm} * 1.3)`};
    grid-column: -6 / -3;
  }

  @media ${devices.laptop} {
    grid-column: -4;
  }

  @media ${devices.desktop} {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }

  ${({ flex }) =>
    flex &&
    css`
      margin-top: 0px !important;
      margin-left: auto; ;
    `};
`

export const SearchBtn = styled.button<{ flex?: boolean }>`
  cursor: pointer;
  border: none;
  background: none;
  grid-row: 1;
  grid-column: -3;
  height: fit-content;
  padding-top: ${({ theme }) => `calc(${theme.spacing.xs} * 0.8)`};
  margin-top: ${({ theme }) => `calc(67px + ${theme.spacing.sm} * 1.3)`};
  filter: brightness(10);

  @media ${devices.tablet} {
    padding-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.8)`};
    margin-top: ${({ theme }) => `calc(${theme.spacing.sm} * 1.3)`};
    filter: brightness(0);
  }

  @media ${devices.laptop} {
    filter: none;
  }

  ${({ flex }) =>
    flex &&
    css`
      margin-top: 0px !important;
      padding-top: 0px !important;
    `};
`

export const LogoImg = styled.img`
  transform: rotate(90deg) translateY(-35%);
  grid-row: 2;
  filter: brightness(10);
  grid-column: 2 / last-col;

  @media ${devices.tablet} {
    grid-column: 7 / last-col;
  }

  @media ${devices.laptop} {
    filter: none;
    grid-column: 5 / 7;
  }
`

export const Title = styled(atoms.title)`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  grid-row: 3;
  grid-column: 2 / 16;
  filter: brightness(10);

  @media ${devices.tablet} {
    grid-column: 7 / 16;
  }

  @media ${devices.laptop} {
    grid-column: 5 / 10;
    filter: none;
    grid-row: 3;
  }
`

export const Editorship = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};

    grid-column: 2 / -2;
    filter: brightness(10);

    @media ${devices.tablet} {
      grid-column: 7 / -2;
      font-weight: bold;
      grid-row: 4;
    }

    @media ${devices.laptop} {
      grid-column: 5 / 9;
      filter: none;
      grid-row: 4;
    }
  `}
`

export const Author = styled(atoms.h3)`
  margin: 0px;
  margin-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.5)`};
  text-align: left;

  filter: brightness(10);
  grid-column: 2 / -2;

  @media ${devices.tablet} {
    grid-column: 7 / -2;
    grid-row: 5;
  }

  @media ${devices.laptop} {
    filter: none;
    grid-column: 5 / 14;
    grid-row: 5;
  }
`

export const BiogramLink = styled(LocalizedLink)`
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
`

export const WrappedEdition = styled(Edition)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: repeat(10, 1fr);

  filter: brightness(10);
  grid-column: 2 / 11;

  @media ${devices.tablet} {
    filter: brightness(10);
    grid-column: 7 / 20;
    grid-row: 6;
  }

  @media ${devices.laptop} {
    filter: none;
    grid-column: 5 / 16;
    grid-row: 6;
  }
`

export const TocButton = styled.button`
  ${({ theme: { palette, spacing } }) => css`
    border: none;
    background: ${palette.black};
    color: ${palette.white};
    padding: ${spacing.sm} 0px;
    display: grid;
    cursor: pointer;
    margin-top: calc(${spacing.lg});

    grid-template-columns: repeat(32, 1fr);
    grid-column: 1 / last-col;

    @media ${devices.tablet} {
      margin-top: calc(${spacing.xxl} * 2);
      padding: ${spacing.md} 0px;
      grid-column: 1 / last-col;
      grid-row: 7;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(16, 1fr);
      grid-column: 1 / 17;
      grid-row: 7;
    }

    @media (min-height: 1100px) {
      margin-top: 30vh;
    }

    @media (max-height: 650px) {
      margin-top: 0;
    }

    @media ${devices.desktop} {
      margin-top: calc(${spacing.xxl} * 2);
    }
  `}
`

export const TocBtnText = styled(atoms.p)`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    color: ${palette.white};
    text-transform: uppercase;
    text-align: left;
    grid-column: 2 / 11;

    @media ${devices.tablet} {
      grid-column: 7 / 12;
    }

    @media ${devices.laptop} {
      grid-column: 5 / 8;
    }
  `}
`

export const ArrowDownImg = styled.img`
  @media ${devices.tablet} {
    grid-column: 12;
  }

  @media ${devices.laptop} {
    grid-column: 8;
  }
`

export const TocWrapper = styled.div`
  background: ${({ theme }) => theme.palette.white};
  grid-column: 1 / last-col;
  min-height: 100vh;

  @media ${devices.tablet} {
    grid-column: 4 / last-col;
  }

  @media ${devices.laptop} {
    background: none;
    grid-column: 3 / 17;
  }
`

export const TableOfContents = styled(ToC)`
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`

export const NavBtn = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 0px;
  background: none;
  /* margin-top: ${({ theme: { spacing } }) => spacing.sm}; */
  padding: ${({ theme: { spacing } }) => spacing.xs};
  height: fit-content;
  grid-row: 1;
  grid-column: 1;
`

export const Header = styled.div`
  grid-row: 1;
  grid-column: 1 / last-col;
  background: ${({ theme }) => theme.palette.white};
  height: 100px;
  display: flex;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing.xs};
`
