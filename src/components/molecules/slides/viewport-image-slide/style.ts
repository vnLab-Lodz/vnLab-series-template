import styled from "styled-components"
import {
  Absolute,
  ImageWrapper,
  ViewportConstraint,
} from "~components/molecules/viewport-image/style"
import Slide from "../slide"

export const ViewportImageSlideContainer = styled(Slide)`
  & ${ViewportConstraint} {
    grid-template-rows: 0 1fr 0;
    max-height: 100vh;
    margin: 0px !important;
  }

  & ${ImageWrapper} {
    padding: 0;
    margin-top: ${({ theme }) => theme.spacing.xs};

    align-items: flex-end;
  }

  & ${Absolute} {
    position: initial;
  }
`
