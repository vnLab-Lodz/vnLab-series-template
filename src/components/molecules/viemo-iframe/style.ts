import styled from "styled-components"
import { gridConstraint } from "~components/mdx"
import { devices } from "~styles/breakpoints"

export const PlaySVG = styled.svg<{ $isVisible?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;

  display: ${({ $isVisible }) => ($isVisible ? "initial" : "none")};
`

export const IframeWrapper = styled.div`
  position: relative;
  width: -webkit-fill-available;
  width: fill-available;
  width: -moz-available;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  display: flex;

  grid-column-start: 1;
  grid-column-end: last-col;

  @media ${devices.tablet} {
    grid-column-start: 4;
    grid-column-end: last-col;
  }

  @media ${devices.laptop} {
    grid-column-start: 3;
    grid-column-end: last-col;
  }

  * + & {
    margin-top: ${({ theme }) => theme.spacing.md};

    ${gridConstraint}
  }

  & > iframe {
    flex-grow: 1;
    border: none;
    margin: 0;
    padding: 0;
  }

  &[data-cover="true"]:only-child {
    aspect-ratio: initial;
    height: 100vh;

    & iframe {
      flex-grow: initial;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`
