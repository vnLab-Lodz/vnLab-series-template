import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const SlideWrapper = styled.div<{
  withPadding: boolean
  fullscreen?: boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  //If the slide is fullscreen then remove padding
  padding-top: ${({ fullscreen }) => (fullscreen ? "0" : "100px")};

  // If there is no caption, we need to add some padding
  padding-bottom: ${({ withPadding, fullscreen }) =>
    withPadding && !fullscreen ? "100px" : "0"};

  // Margin the size of the bottom bar on mobile
  margin-bottom: 60px;
  // Height smaller by the height of the bottom bar
  height: calc(100vh - 60px);

  @media ${devices.tablet} {
    height: 100vh;
    margin-bottom: 0px;
  }
`

export const SlideContainer = styled.div<{ fullscreen?: boolean }>`
  flex: 1 0 auto;
  display: flex;
  align-items: center;

  ${({ fullscreen }) =>
    !fullscreen &&
    css`
      max-width: calc(100vw / 32 * 30);

      @media ${devices.tablet} {
        max-width: calc(100vw / 32 * 23);
      }

      @media ${devices.laptop} {
        max-width: calc(100vw / 32 * 26);
      }
    `};
`

export const SlideCaption = styled.article`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-width: calc(100vw / 32 * 30);
  max-width: calc(100vw / 32 * 30);

  @media ${devices.tablet} {
    min-width: calc(100vw / 32 * 23);
    max-width: calc(100vw / 32 * 23);
  }

  @media ${devices.laptop} {
    min-width: calc(100vw / 32 * 19);
    max-width: calc(100vw / 32 * 19);
  }

  @media ${devices.desktop} {
    min-width: clamp(0px, calc(100vw / 32 * 26), calc(26 * 1.5rem));
    max-width: clamp(0px, calc(100vw / 32 * 26), calc(26 * 1.5rem));
  }
`

export const CaptionParagraph = styled(atoms.p)`
  text-align: left;
  font-size: ${({ theme: { typography } }) =>
    `calc(${typography.sm} * 1.3) !important`};
  color: ${({ theme: { palette } }) => palette.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ExpandCaptionButton = styled.button`
  ${({ theme: { typography, palette } }) => css`
    font-familty: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: normal;
    text-transform: lowercase;
    line-height: 115%;
    padding: 0px;
    text-align: right;
    background: transparent;
    border: none;
    cursor: pointer;
    height: fit-content;
    color: ${palette.white};
    margin-left: ${({ theme: { spacing } }) => spacing.md};
  `}
`
