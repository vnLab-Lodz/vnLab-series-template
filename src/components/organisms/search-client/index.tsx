import React, { Component, ComponentType } from "react"
import SearchInput from "~components/molecules/search-input"
import * as JsSearch from "js-search"
import { WithTranslation, withTranslation } from "react-i18next"
import * as Styled from "./style"
import { SearchNode } from "src/pages/search"
import SearchResults from "~components/molecules/search-results"
import SearchTabs from "~components/molecules/search-tabs"

type Indexes = Array<"author" | "title" | "summary" | "rawBody">
type IndexStrategy = "Prefix match" | "Exact match" | "All"
type SearchSanitizer = "Lower Case" | "Case Sensitive"

export enum SEARCH_TABS {
  TITLES,
  EVERYWHERE,
}

export interface EngineOptions {
  indexStrategy: IndexStrategy
  searchSanitizer: SearchSanitizer
  indexes: Indexes
}

type Props = {
  data: any[]
  engine: EngineOptions
} & WithTranslation<"search">

interface State {
  isLoading: boolean
  searchResults: SearchNode[]
  search: JsSearch.Search | undefined
  isError: boolean
  indexes: Indexes
  termFrequency: boolean
  removeStopWords: boolean
  searchQuery: string
  selectedStrategy: IndexStrategy
  selectedSanitizer: SearchSanitizer
  tab: SEARCH_TABS
}

function getIndexStrategy(strategy: IndexStrategy) {
  switch (strategy) {
    case "All":
      return new JsSearch.AllSubstringsIndexStrategy()
    case "Prefix match":
      return new JsSearch.PrefixIndexStrategy()
    case "Exact match":
      return new JsSearch.ExactWordIndexStrategy()
    default:
      return new JsSearch.PrefixIndexStrategy()
  }
}

class SearchClient extends Component<Props, State> {
  state: State = {
    isLoading: true,
    searchResults: [],
    search: undefined,
    isError: false,
    indexes: [],
    termFrequency: true,
    removeStopWords: false,
    searchQuery: "",
    selectedStrategy: "Prefix match",
    selectedSanitizer: "Lower Case",
    tab: SEARCH_TABS.EVERYWHERE,
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: Readonly<State>
  ) {
    if (prevState.search !== undefined) return null

    const { engine } = nextProps

    return {
      indexes: engine.indexes,
      selectedSanitizer: engine.searchSanitizer,
      selectedStrategy: engine.indexStrategy,
    }
  }

  componentDidMount = async () => this.rebuildIndex()

  componentDidUpdate(_: Props, prevState: State) {
    if (prevState.tab === this.state.tab) return

    this.rebuildIndex()
    setTimeout(() => this.searchData(this.state.searchQuery))
  }

  rebuildIndex = () => {
    const { data } = this.props
    const {
      selectedStrategy,
      selectedSanitizer,
      removeStopWords,
      termFrequency,
      indexes,
    } = this.state

    const dataToSearch = new JsSearch.Search("id")

    if (removeStopWords) {
      dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(
        dataToSearch.tokenizer
      )
    }

    dataToSearch.indexStrategy = getIndexStrategy(selectedStrategy)

    if (selectedSanitizer === "Case Sensitive") {
      dataToSearch.sanitizer = new JsSearch.CaseSensitiveSanitizer()
    } else dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()

    if (termFrequency) {
      dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("isbn")
    } else dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex()

    indexes.forEach(index => {
      dataToSearch.addIndex(index)
    })

    dataToSearch.addDocuments(data)

    this.setState({ search: dataToSearch, isLoading: false })
  }

  searchData = (query: string) => {
    const { search } = this.state
    if (search === undefined) return

    const queryResult = search.search(query) as SearchNode[]
    this.setState({ searchQuery: query, searchResults: queryResult })
  }

  render = () => {
    const { t } = this.props
    const { searchResults, searchQuery } = this.state
    const queryResults = searchQuery === "" ? [] : searchResults

    return (
      <>
        <SearchInput setQuery={this.searchData} />
        <Styled.FoundItems>
          {t("found_articles")} <strong>{queryResults.length}</strong>
        </Styled.FoundItems>
        <SearchTabs
          tab={this.state.tab}
          setTab={tab =>
            this.setState(prev => ({
              ...prev,
              tab,
              indexes:
                tab === SEARCH_TABS.EVERYWHERE
                  ? ["author", "title", "summary", "rawBody"]
                  : ["title"],
            }))
          }
        />
        <SearchResults results={queryResults} />
      </>
    )
  }
}

export default withTranslation("search")(SearchClient)
