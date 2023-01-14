import styled from "styled-components"
import { devices } from "~styles/breakpoints"
import Slide from "../slide"

export const SlideContainer = styled(Slide)`
  padding: 80px 0px;
  align-items: center;

  @media ${devices.tablet} {
    padding: 120px 0px;
  }
`
