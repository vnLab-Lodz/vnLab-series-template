import styled from "styled-components"
import { ViewportConstraint } from "~components/organisms/carousel/style"
import Slide from "../slide"

export const CarouselSlideContainer = styled(Slide)`
  & ${ViewportConstraint} {
    grid-template-rows: 0 1fr 0;
    max-height: 100vh;
  }
`
