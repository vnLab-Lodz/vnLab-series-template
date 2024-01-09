import styled, { css } from "styled-components"
import atoms from "~components/atoms"

export const DialogOverlay = styled.div`
  ${({ theme: { palette, spacing } }) => css`
    position: fixed;
    bottom: ${spacing.xs};
    right: ${spacing.xs};
    z-index: 20;
    max-width: 100%;

    background: ${palette.white};
    border: solid 1px ${palette.dark};
    padding: ${spacing.xxs} calc(${spacing.xxs} * 1.6) ${spacing.xxs}
      ${spacing.xxs};

    font-family: ${({ theme }) => theme.typography.fonts.primary};
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    &[data-visible="false"] {
      display: none;
    }
  `}
`

export const DialogParagraph = styled(atoms.p)`
  margin-right: ${({ theme }) => theme.spacing.xs};
  font-size: calc(${({ theme }) => theme.typography.md} * 0.8);
  text-align: left;
`

export const CloseButton = styled.button`
  flex: 1 0 auto;
  height: 100%;
  width: auto;
  aspect-ratio: 1 / 1;
  border: none;
  background: none;
  padding: 0;
  position: relative;
  cursor: pointer;

  & > svg {
    vertical-align: middle;
    width: 1em;
    height: 1em;
  }

  *.loader {
    top: 50%;
    left: 50%;
    position: absolute;
    aspect-ratio: 1 / 1;
    width: 220%;
    height: auto;
    border: 1px solid #222;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    translate: -50% -50%;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
