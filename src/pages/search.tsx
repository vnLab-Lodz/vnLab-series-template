import { PageProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import SearchInput from "~components/molecules/search-input"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import { GridContainer } from "~styles/grid"

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.primary};
  height: 100vh;
  overflow-y: scroll;
`

const Search: React.FC<PageProps> = () => {
  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <StyledLayout>
        <SearchInput />
      </StyledLayout>
    </NavMenuProvider>
  )
}

export default Search
