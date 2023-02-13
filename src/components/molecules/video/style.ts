import styled from "styled-components"
import { gridConstraint } from "~components/mdx"
import { devices } from "~styles/breakpoints"

export const Video = styled.video`
  flex-grow: 1;
`
export const VideoWrapper = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  position: relative;
  width: -webkit-fill-available;
  width: fill-available;
  width: -moz-available;
  width: 100%;
  height: auto;
  margin: auto;

  grid-column-start: first-col;
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

  &[data-cover="true"]:only-child {
    aspect-ratio: initial;
    height: 100vh;

    ${Video} {
      flex-grow: initial;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`
