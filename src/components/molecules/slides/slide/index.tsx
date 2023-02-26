import styled from "styled-components"
import { GridContainer } from "~styles/grid"
import { devices } from "~styles/breakpoints"

const Slide = styled(GridContainer).attrs({
  as: "section",
  className: "slide",
})`
  background: ${({ theme: { palette } }) => palette.light};
  overflow: initial;

  grid-template-rows: auto;

  @media ${devices.desktop} {
    justify-content: center;
    margin: auto;
  }

  width: 100%;
  min-height: 100vh;
  scroll-snap-align: start;
`

export default Slide
