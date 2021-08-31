import { PageProps } from "gatsby"
import React, { useState } from "react"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import SearchInput from "~components/molecules/search-input"
import SearchResults from "~components/molecules/search-results"
import SearchTabs from "~components/molecules/search-tabs"
import NavigationMenu from "~components/organisms/navigation-menu"
import NavMenuProvider from "~components/organisms/navigation-menu/nav-menu-context"
import { devices } from "~styles/breakpoints"
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

const StyledFoundItems = styled(atoms.p)`
  ${({ theme: { spacing, typography, palette } }) => css`
    margin-top: ${spacing.md};
    color: ${palette.accentDark};
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    text-transform: uppercase;
    grid-column: 2 / last-col;
    
    strong {
      font-weight: bold;
      font-family: inherit;
      font-size: inherit;
    }

    @media ${devices.tablet} {
      grid-column 7 / -3;
    }

    @media ${devices.laptop} {
      grid-column 5 / 13;
    }
  `}
`

const Search: React.FC<PageProps> = () => {
  const [tab, setTab] = useState(SEARCH_TABS.TITLES)
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<PublicationPage[]>([])
  const pages = usePublication()

  const onSubmit = () => {
    if (!query) {
      setResults([])
      return
    }

    if (tab === SEARCH_TABS.TITLES) {
      setResults(
        pages.filter(page =>
          page.title.toLowerCase().includes(query.toLowerCase())
        )
      )
    }

    if (tab === SEARCH_TABS.EVERYWHERE) setResults([])
  }

  return (
    <NavMenuProvider>
      <NavigationMenu currentPath={location.pathname} />
      <StyledLayout>
        <SearchInput setQuery={setQuery} onSubmit={onSubmit} />
        <SearchTabs tab={tab} setTab={setTab} />
        {results.length !== 0 && (
          <StyledFoundItems>
            znaleziono artykułów: <strong>{results.length}</strong>
          </StyledFoundItems>
        )}
        <SearchResults results={results} />
      </StyledLayout>
    </NavMenuProvider>
  )
}

export default Search
