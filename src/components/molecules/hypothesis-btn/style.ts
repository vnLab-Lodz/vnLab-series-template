import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const TextButton = styled.button`
  ${({ theme: { palette, spacing } }) => css`
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border: none;
    border-radius: 0;
    text-transform: uppercase;
    background-color: ${palette.black};
    padding: ${spacing.xxs};
    z-index: 12;
    width: -webkit-fill-available;
    width: 100%;
    cursor: pointer;

    @media ${devices.tablet} {
      padding: ${spacing.xs};
      transform: rotate(180deg);
      top: 0px;
      left: initial;
      bottom: initial;
      width: fit-content;
    }
  `};
`

export const VerticalText = styled.p`
  ${({ theme: { palette, typography } }) => css`
    color: ${palette.white};
    font-weight: 500;
    font-size: ${typography.sm};
    letter-spacing: 0.55px;
    font-family: ${typography.fonts.primary};

    @media ${devices.tablet} {
      width: fit-content;
      writing-mode: vertical-lr;
      text-orientation: mixed;
    }
  `};
`

export const IconButton = styled.button`
  ${({ theme: { spacing } }) => css`
    z-index: 12;
    position: fixed;
    background: none;
    border: none;
    padding: ${spacing.xxs};
    bottom: ${spacing.xxs};
    right: ${spacing.xs};
    cursor: pointer;

    @media ${devices.tablet} {
      bottom: initial;
      top: ${spacing.sm};
    }

    img {
      height: 32px;

      @media ${devices.desktop} {
        height: 48px;
      }
    }
  `};
`
