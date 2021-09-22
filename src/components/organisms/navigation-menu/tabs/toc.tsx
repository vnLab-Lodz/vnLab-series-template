import React from "react"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import TocElement from "~components/molecules/toc-element"
import { getPartFromIndex } from "~util/indexes"
import * as Styled from "../style"
import { v4 as uuid } from "uuid"
import { useTranslation } from "react-i18next"

type GroupedPages = PublicationPage[][]

interface Props {
  className?: string
  headless?: boolean
}

function groupPages(pages: PublicationPage[]): GroupedPages {
  return pages.reduce((prev, page) => {
    const part = getPartFromIndex(page.index ?? 0)

    let array = [...prev]
    array[part - 1] = [...(array[part - 1] ?? []), page]

    return array
  }, [] as GroupedPages)
}

const Part: React.FC = ({ children }) => <>{children}</>

const TableOfContents: React.FC<Props> = ({ className, headless }) => {
  const pages = usePublication()
  const groupedPages = groupPages(pages)
  const uid = uuid()
  const { t } = useTranslation("common")

  return (
    <Styled.TocGrid className={className}>
      {!headless && (
        <Styled.TocHeader type="primary">{`${t("toc")}:`}</Styled.TocHeader>
      )}
      {groupedPages.map((group, i) => (
        <Part key={`toc-part__${uid}--${i}`}>
          <Styled.Part type="primary">{`${t("part")} ${i + 1}`}</Styled.Part>
          {group.map((page, j) => (
            <TocElement key={`toc-element__${uid}--${j}`} page={page} />
          ))}
        </Part>
      ))}
    </Styled.TocGrid>
  )
}

export default TableOfContents
