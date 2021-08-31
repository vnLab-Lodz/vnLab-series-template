import { PageProps } from "gatsby"
import React, { useState } from "react"
import usePublication from "src/hooks/usePublication"
import styled from "styled-components"
import SearchInput from "~components/molecules/search-input"
import SearchTabs from "~components/molecules/search-tabs"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import { GridContainer } from "~styles/grid"

export enum SEARCH_TABS {
  TITLES,
  EVERYWHERE,
}

const StyledLayout = styled(GridContainer)`
  background: ${({ theme: { palette } }) => palette.primary};
  height: 100vh;
  overflow-y: scroll;
  grid-auto-rows: min-content;
`

const Search: React.FC<PageProps> = () => {
  const [tab, setTab] = useState(SEARCH_TABS.TITLES)
  const publication = usePublication()

  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <StyledLayout>
        <SearchInput />
        <SearchTabs tab={tab} setTab={setTab} />
      </StyledLayout>
    </NavMenuProvider>
  )
}

export default Search
