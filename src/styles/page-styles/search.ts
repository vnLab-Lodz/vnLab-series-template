import { GridContainer } from "~styles/grid"
import styled from "styled-components"

export const SearchLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.primary};
  height: 100vh;
  overflow-y: scroll;
  grid-auto-rows: min-content;
`
