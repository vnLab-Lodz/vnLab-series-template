import { RetrievedDoc } from "@lyrasearch/lyra"
import React from "react"
import TocElement from "../toc-element"
import * as Styled from "./style"

interface Props {
  query: string
  results: (readonly [
    RetrievedDoc<{
      uid: "string"
      link: "string"
      text: "string"
      isTitle: "boolean"
      pageId: "string"
    }>,
    {
      readonly path: string
      readonly mdxAST: any
      readonly id: string
      readonly title: string
      readonly summary?: string | undefined
      readonly index?: number | undefined
      readonly author?: string | undefined
      readonly slideshow: boolean
    }
  ])[]
}

const SearchResults: React.FC<Props> = ({ results, query }) => {
  const excerpt = query
    .replaceAll(/[\[\\\^\$\.\|\?\*\+\(\)]/g, m => `\\${m}`)
    .trim()

  return (
    <Styled.ResultsWrapper>
      {results.map(([res, page], i) => (
        <React.Fragment key={`search-result__${res.id}`}>
          <TocElement page={page} last={results.length - 1 === i}>
            {!res.document.isTitle ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: res.document.text.replaceAll(
                    new RegExp(excerpt, "gi"),
                    match => `<mark>${match}</mark>`
                  ),
                }}
              />
            ) : null}
          </TocElement>
        </React.Fragment>
      ))}
    </Styled.ResultsWrapper>
  )
}

export default React.memo(SearchResults)
