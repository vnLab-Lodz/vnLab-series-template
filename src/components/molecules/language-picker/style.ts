import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"
import lightTheme from "~styles/theme"

export const LangButton = styled.button<{
  inMenu?: boolean
  compact?: boolean
}>`
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
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

export const LangButtonText = styled(atoms.p)`
  ${({ theme: { typography } }) => css`
    text-underline-offset: 10px;
    color: ${lightTheme.palette.white};
    text-transform: uppercase;
    font-family: ${typography.fonts.primary};
    font-size: calc(${typography.sm} * 0.8);
    position: relative;
  `}
`

export const LanguagePopUp = styled.div<{ close: boolean }>`
  ${({ theme: { spacing, palette } }) => css`
    position: absolute;
    top: calc(100% + var(--space-xxs));
    left: calc(var(--space-xxs) * -1 - 1px);
    background: ${palette.white};
    border: solid 1px ${palette.dark};
    padding: calc(${spacing.xxs} / 2) 0px;
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
    cursor: pointer;
    color: ${palette.black};
    padding: calc(${spacing.xxs} / 2) ${spacing.xxs};
    font-size: calc(${typography.sm});
    line-height: 150%;
    font-weight: normal;

    ${inactive === "true" &&
    css`
      font-weight: bold;
      pointer-events: none;
      cursor: default;
      color: ${palette.black};
    `};
  `}
`

export const LocaleSpan = styled.span<{ active: boolean }>`
  font-size: inherit;
  font-family: inherit;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  letter-spacing: 0.55px;
`
