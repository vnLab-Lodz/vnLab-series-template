import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const LangButton = styled.button<{
  inMenu?: boolean
  compact?: boolean
}>`
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  position: relative;
  padding: ${({ theme: { spacing }, inMenu }) =>
    inMenu ? `${spacing.xs} ${spacing.xxs}` : `${spacing.xs} ${spacing.xxs}`};

  ${({ compact, theme: { spacing } }) =>
    compact &&
    css`
      padding: 0px ${spacing.xxs};
      margin-left: auto;
    `};

  @media ${devices.tablet} {
    padding: ${({ theme: { spacing } }) => spacing.xxs};
    height: 100%;
    text-align: center;
  }

  @media ${devices.desktop} {
    padding: ${({ theme: { spacing } }) => spacing.xs};
  }
`

export const LangButtonText = styled(atoms.p)<{
  dark?: boolean
  alwaysDark?: boolean
}>`
  ${({ dark, alwaysDark, theme: { palette, typography } }) => css`
    text-underline-offset: 10px;
    color: ${palette.white};
    text-transform: uppercase;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};

    ${dark &&
    css`
      color: ${palette.white};

      @media ${devices.tablet} {
        color: ${palette.black};
      }
    `}

    ${alwaysDark &&
    css`
      color: ${palette.black};
    `}
  `}
`

export const LanguagePopUp = styled.div<{ close: boolean }>`
  ${({ theme: { spacing, palette }, close }) => css`
    position: absolute;
    top: ${close ? "100%" : "70%"};
    right: 0px;
    background: ${palette.white};
    border: solid 1px ${palette.dark};
    padding: ${spacing.xxs};
    display: flex;
    flex-direction: column;
    z-index: 8;
    cursor: default;
  `}
`

export const LangLink = styled(LocalizedLink)<{ inactive?: string }>`
  ${({ inactive, theme: { spacing, typography, palette } }) => css`
    text-align: left;
    text-decoration: none;
    padding: ${spacing.xxs};
    color: ${palette.black};
    font-size: calc(${typography.md} * 0.9);
    font-weight: 500;

    ${inactive === "true" &&
    css`
      pointer-events: none;
      cursor: default;
      color: ${palette.medium};
    `};
  `}
`

export const LocaleSpan = styled.span<{ active: boolean }>`
  font-size: inherit;
  font-family: inherit;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  letter-spacing: 0.55px;
`
