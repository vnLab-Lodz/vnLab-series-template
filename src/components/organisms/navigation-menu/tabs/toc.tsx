import React from "react"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import TocElement from "~components/molecules/toc-element"
import { getPartFromIndex } from "~util/indexes"
import * as Styled from "../style"
import { v4 as uuid } from "uuid"

type GroupedPages = PublicationPage[][]

function groupPages(pages: PublicationPage[]): GroupedPages {
  return pages.reduce((prev, page) => {
    const part = getPartFromIndex(page.index ?? 0)

    let array = [...prev]
    array[part - 1] = [...(array[part - 1] ?? []), page]

    return array
  }, [] as GroupedPages)
}

const Part: React.FC = ({ children }) => <>{children}</>

const TableOfContents: React.FC = () => {
  const pages = usePublication()
  const groupedPages = groupPages(pages)
  const uid = uuid()

  return (
    <Styled.TocGrid>
      <Styled.TocHeader type="primary">SPIS TREŚCI:</Styled.TocHeader>
      {groupedPages.map((group, i) => (
        <Part key={`toc-part__${uid}--${i}`}>
          <Styled.Part type="primary">Część {i + 1}</Styled.Part>
          {group.map((page, j) => (
            <TocElement key={`toc-element__${uid}--${j}`} page={page} />
          ))}
        </Part>
      ))}
    </Styled.TocGrid>
  )
}

export default TableOfContents
