import { GridContainer } from "~styles/grid"
import styled from "styled-components"

export const SearchLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.primary};
  min-height: 100vh;
  overflow-y: hidden;
  grid-auto-rows: min-content;
`

export const Wrapper = styled.article`
  background: ${({ theme: { palette } }) => palette.primary};
`
