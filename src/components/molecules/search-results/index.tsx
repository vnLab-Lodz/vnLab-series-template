import React from "react"
import { PublicationPage } from "src/hooks/usePublication"
import TocElement from "../toc-element"
import * as Styled from "./style"

interface Props {
  results: PublicationPage[]
}

const SearchResults: React.FC<Props> = ({ results }) => {
  return (
    <Styled.ResultsWrapper>
      {results.map((res, i) => (
        <TocElement
          key={`search-result__${i}--${res.id}-${res.index}`}
          page={res}
        />
      ))}
    </Styled.ResultsWrapper>
  )
}

export default SearchResults
