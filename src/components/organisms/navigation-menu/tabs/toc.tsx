import React from "react"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import TocElement from "~components/molecules/toc-element"
import { getPartFromIndex } from "~util/indexes"
import * as Styled from "../style"
import { v4 as uuid } from "uuid"
import { useTranslation } from "react-i18next"
import { useLocalization } from "gatsby-theme-i18n"

import sectionNamesJSON from "../../../../../meta/section_names.json"

const sectionNames = sectionNamesJSON as unknown as Record<
  string,
  Record<string, string | boolean>
>

type GroupedPages = PublicationPage[][]

interface Props {
  className?: string
  headless?: boolean
}

const Part: React.FC = ({ children }) => <>{children}</>

const TableOfContents: React.FC<Props> = ({ className, headless }) => {
  const { locale } = useLocalization()
  const pages = usePublication()
  const groupedPages = groupPages(pages)
  const uid = uuid()
  const { t } = useTranslation("common")

  return (
    <Styled.TocGrid className={className}>
      {!headless && (
        <Styled.TocHeader type="primary">{`${t("toc")}:`}</Styled.TocHeader>
      )}
      {groupedPages.map((group, i) => {
        const index = i + 1
        const sectionName: string | boolean =
          sectionNames[locale]?.[index] ?? `${t("part")} ${index}`

        return (
          <Part key={`toc-part__${uid}--${i}`}>
            {!!sectionName && (
              <Styled.Part type="primary">{sectionName}</Styled.Part>
            )}
            {group.map((page, j) => (
              <TocElement
                key={`toc-element__${uid}--${j}`}
                page={page}
                last={group.length - 1 === j && groupedPages.length - 1 === i}
              />
            ))}
          </Part>
        )
      })}
    </Styled.TocGrid>
  )
}

function groupPages(pages: PublicationPage[]): GroupedPages {
  return pages.reduce((prev, page) => {
    const part = getPartFromIndex(page.index ?? 0)

    let array = [...prev]
    array[part - 1] = [...(array[part - 1] ?? []), page]

    return array
  }, [] as GroupedPages)
}

export default TableOfContents
