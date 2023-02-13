import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import {
  Caption,
  CaptionButton,
  CaptionSlideContainer,
} from "../caption-slide/style"
import { SlideImageWrapper } from "../center-image-slide/style"
import Slide from "../slide"
import { TextSlideContainer } from "../text-slide/style"

export const SplitSlideContainer = styled(Slide)`
  position: initial;
  scroll-snap-align: none;

  @media ${devices.laptop} {
    position: relative;
  }
`

export const HalfSlide = styled.section<{
  $left?: boolean
  $right?: boolean
}>`
  margin: 0;
  display: grid;

  scroll-snap-align: start;

  & ${TextSlideContainer} {
    @media ${devices.laptop} {
      grid-template-columns: repeat(15, 1fr);

      .mdx-video:only-child {
        grid-column: 1 / last-col;
      }
    }
  }

  & ${CaptionSlideContainer} {
    @media ${devices.laptop} {
      position: initial;
      grid-template-columns: repeat(15, 1fr);

      ${SlideImageWrapper} {
        grid-column-end: -2;
        grid-column-start: 2;

        @media ${devices.tablet} {
          grid-column-end: -2;
          grid-column-start: 2;
        }

        @media ${devices.laptop} {
          grid-column-start: 2;
          grid-column-end: -2;

          &[data-fullscreen="true"] {
            grid-column-start: first-col;
            grid-column-end: last-col;
          }
        }
      }
    }
  }

  &[data-sticky="true"] {
    @media ${devices.laptop} {
      max-height: 100vh;
      position: sticky;
      top: 0px;
      scroll-snap-align: none !important;

      & ${Caption} {
        width: 200%;
        transform: translate(-50%, -100%);
      }

      & ${CaptionSlideContainer} {
        scroll-snap-align: none !important;
      }
    }
  }

  ${({ $left: left = false }) =>
    left &&
    css`
      grid-column-start: first-col;
      grid-column-end: last-col;

      @media ${devices.laptop} {
        grid-column-start: 3;
        grid-column-end: 18;
      }

      & ${CaptionButton} {
        @media ${devices.laptop} {
          transform: ${({ theme }) =>
            `translate(-50%, calc(-100% - ${theme.spacing.md}))`};
          right: 50%;
        }
      }
    `};

  ${({ $right: right = false }) =>
    right &&
    css`
      grid-column-start: first-col;
      grid-column-end: last-col;

      @media ${devices.laptop} {
        grid-column-start: 18;
        grid-column-end: last-col;
      }
    `};
`
