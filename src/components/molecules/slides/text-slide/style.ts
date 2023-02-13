import styled from "styled-components"
import { devices } from "~styles/breakpoints"
import Slide from "../slide"

export const TextSlideContainer = styled(Slide)`
  padding: 80px 0px;
  align-items: center;

  @media ${devices.tablet} {
    padding: 120px 0px;
  }

  grid-template-rows: min-content;
  align-content: center;

  &:has(.mdx-video:only-child),
  &:has(.mdx-vimeo:only-child) {
    padding: 0;
  }
`
