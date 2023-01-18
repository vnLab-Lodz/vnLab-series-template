import styled from "styled-components"
import {
  Absolute,
  ViewportConstraint,
} from "~components/molecules/viewport-image/style"
import Slide from "../slide"

export const ViewportImageSlideContainer = styled(Slide)`
  & ${ViewportConstraint} {
    grid-template-rows: 0 1fr 0;
    max-height: 100vh;
  }

  & ${Absolute} {
    position: initial;
  }
`
