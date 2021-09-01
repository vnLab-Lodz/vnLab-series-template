import { LocalizedLink } from "gatsby-theme-i18n"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const LangButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  padding: ${({ theme: { spacing } }) => `${spacing.xs} ${spacing.xxs}`};
  position: relative;

  @media ${devices.tablet} {
    padding: ${({ theme: { spacing } }) => spacing.xxs};
    height: 100%;
    text-align: center;
  }
`

export const LangButtonText = styled(atoms.p)<{ dark?: boolean }>`
  ${({ dark, theme: { palette, typography } }) => css`
    text-underline-offset: 10px;
    color: ${palette.white};
    text-transform: uppercase;
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;

    ${dark &&
    css`
      color: ${palette.black};

      @media ${devices.tablet} {
        color: ${palette.white};
      }

      @media ${devices.laptop} {
        color: ${palette.black};
      }
    `}
  `}
`

export const LanguagePopUp = styled.div`
  ${({ theme: { spacing, palette } }) => css`
    position: absolute;
    top: 60%;
    right: 0px;
    background: ${palette.white};
    border: solid 1px ${palette.dark};
    padding: ${spacing.xxs};
    display: flex;
    flex-direction: column;
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
      cursor: normal;
      color: ${palette.dark};
    `};
  `}
`
