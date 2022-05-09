import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import Edition from "~components/molecules/edition"
import atoms from "~components/atoms"
import ToC from "~components/organisms/navigation-menu/tabs/toc"
import LP from "~components/molecules/language-picker"
import { LocalizedLink } from "gatsby-theme-i18n"
import { THEME_MODES } from "src/context/theme-switcher-context"

export const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  max-height: 100vh;
  min-height: 680px;
  filter: brightness(0.6);

  @media ${devices.tablet} {
    z-index: 10;
  }

  @media ${devices.laptop} {
    filter: brightness(1);
    position: fixed;
    z-index: 0;
    display: block;
    width: 51vw; // ! 1 for scroll pause compatibility
  }
`

export const ContentWrapper = styled.aside`
  height: 100vh;
  min-height: 680px;
  display: grid;
  align-content: end;
  grid-column: 1 / last-col;
  grid-template-rows: 1fr min-content;

  grid-template-columns: repeat(32, 1fr);

  z-index: 7;

  @media ${devices.tablet} {
    grid-template-rows: min-content 1fr min-content;
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

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;

  grid-column: 2 / -2;

  @media ${devices.tablet} {
    grid-column: 7 / -7;
  }

  @media ${devices.laptop} {
    grid-column: 5 / 13;
  }
`

export const LogoImg = styled.img<{ themeMode?: THEME_MODES }>`
  transform: rotate(90deg) translateY(-35%);
  max-width: 1.3rem;
  filter: brightness(10);

  @media ${devices.laptop} {
    filter: ${({ themeMode }) =>
      themeMode === THEME_MODES.DARK ? "invert(1)" : "none"};
  }
`

export const Title = styled.img<{ themeMode?: THEME_MODES }>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  align-self: flex-start;

  filter: brightness(10);

  @media ${devices.laptop} {
    filter: ${({ themeMode }) =>
      themeMode === THEME_MODES.DARK ? "invert(1)" : "none"};
  }
`

export const Editorship = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};

    filter: brightness(10);

    @media ${devices.laptop} {
      filter: none;
    }
  `}
`

export const Author = styled(atoms.h3)`
  margin: 0px;
  margin-top: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.5)`};
  text-align: left;

  filter: brightness(10);

  @media ${devices.laptop} {
    filter: none;
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
  margin-top: ${({ theme }) => theme.spacing.md};

  ${atoms.p} {
    font-size: ${({ theme }) => theme.typography.sm};
  }

  button {
    font-size: ${({ theme }) => theme.typography.sm};
  }

  filter: brightness(10);
  grid-column: 2 / last-col;

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

// This element is a div instead of button to support gird in Safari
export const TocButton = styled.div`
  ${({ theme: { palette, spacing } }) => css`
    border: none;
    color: ${palette.white};
    background: transparent;
    padding: ${spacing.sm} 0px;
    display: grid;
    cursor: pointer;
    margin: 0;w

    grid-template-columns: repeat(32, 1fr);
    grid-column: 1 / last-col;

    @media ${devices.tablet} {
      background: ${palette.black};
      padding: ${spacing.md} 0px;
      grid-column: 1 / last-col;
      grid-row: 7;
    }

    @media ${devices.laptop} {
      grid-template-columns: repeat(16, 1fr);
      grid-column: 1 / 17;
      grid-row: 7;
    }
  `}
`

export const TocBtnContent = styled.div`
  ${({ theme: { typography, palette } }) => css`
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    color: ${palette.white};
    text-transform: uppercase;
    text-align: left;

    display: flex;
    align-items: center;

    grid-column: 2 / -2;

    @media ${devices.tablet} {
      grid-column: 7 / -2;
    }

    @media ${devices.laptop} {
      grid-column: 5 / -2;
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
    display: none;

    @media ${devices.tablet} {
      display: initial;
    }
  `}
`

export const ArrowDownImg = styled.img<{ themeMode?: THEME_MODES }>`
  margin-left: ${({ theme }) => `calc(${theme.spacing.xxs} * 0.3)`};

  @media ${devices.tablet} {
    margin-left: ${({ theme }) => theme.spacing.md};
    filter: ${({ themeMode }) =>
      themeMode === THEME_MODES.DARK ? "invert(1)" : "none"};
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
    grid-column: 3 / 17;
    z-index: 1;
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
