import React, { useMemo } from "react"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import TocElement from "~components/molecules/toc-element"
import { getPartFromIndex } from "~util/indexes"
import * as Styled from "../style"
import { v4 as uuid } from "uuid"
import { useTranslation } from "react-i18next"
import { useLocalization } from "gatsby-theme-i18n"
import { useLocation } from "@reach/router"

import config from "publication/publication.config.json"
import { LangKey } from "~types/config"

type GroupedPages = PublicationPage[][]

interface Props {
  className?: string
  headless?: boolean
}

const TableOfContents: React.FC<Props> = ({ className, headless }) => {
  const { t } = useTranslation("common")
  const { locale } = useLocalization()
  const { pathname } = useLocation()
  const pages = usePublication()
  const uid = uuid()

  const groupedPages = useMemo(() => groupPages(pages), [pages])

  return (
    <Styled.TocGrid className={className}>
      {!headless && (
        <Styled.TocHeader type="primary">{`${t("toc")}:`}</Styled.TocHeader>
      )}
      {groupedPages.map((group, index) => {
        const currentPageIndex = group.findIndex(el => el.path === pathname)
        const sectionName: string | boolean =
          // @ts-ignore
          config[locale as LangKey].sectionNames[index] ??
          `${t("part")} ${index}`

        return (
          <React.Fragment key={`toc-part__${uid}--${index}`}>
            {!!sectionName && (
              <Styled.Part type="primary" first={index === 0}>
                {sectionName}
              </Styled.Part>
            )}
            {group.map((page, j) => (
              <TocElement
                key={`toc-element__${uid}--${j}`}
                page={page}
                last={
                  group.length - 1 === j && groupedPages.length - 1 === index
                }
                current={pathname === page.path}
                hideDivider={currentPageIndex - 1 === j}
              />
            ))}
          </React.Fragment>
        )
      })}
    </Styled.TocGrid>
  )
}

function groupPages(pages: PublicationPage[]): GroupedPages {
  return pages.reduce((prev, page) => {
    const part = getPartFromIndex(page.index ?? 0)

    let array = [...prev]
    array[part] = [...(array[part] ?? []), page]

    return array
  }, [] as GroupedPages)
}

export default TableOfContents
