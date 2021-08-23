import React, { useState } from "react"
import { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import FooterElement from "~components/molecules/footer-element"
import * as Styled from "./style"

interface Props {
  currentPath: string
}

function getCurrentPathIndex(pages: PublicationPage[], currentPath: string) {
  return pages.findIndex(p => p.path == currentPath)
}

const ArticleFooter: React.FC<Props> = ({ currentPath }) => {
  const pages = usePublication()
  const { t } = useTranslation("common")

  const currentPathIndex = getCurrentPathIndex(pages, currentPath)
  const [index, setIndex] = useState(currentPathIndex)
  const [layoutMode, setLayoutMode] = useState<"base" | "compact">("base")

  const rewindIndex = () => setIndex(prev => (prev === 0 ? prev : prev - 1))

  const forwardIndex = () =>
    setIndex(prev => {
      if (prev === pages.length - 2) return prev

      if ([0, 1].includes(prev) && layoutMode === "base") return 2

      return prev + 1
    })

  const getFooterLayout = () => {
    const footerPages = pages.filter((_, i) => i !== currentPathIndex)
    let prevIndex: number = index - 1
    let nextIndex: number = index

    if (prevIndex < 0) {
      prevIndex = 0
      nextIndex = layoutMode === "base" ? 1 : 0
    }

    if (nextIndex > footerPages.length - 1) {
      nextIndex = footerPages.length - 1
      prevIndex = footerPages.length - 2
    }

    const leftPage = footerPages[prevIndex]
    const rightPage = footerPages[nextIndex]

    return {
      left: {
        ...leftPage,
        header:
          (leftPage?.index ?? prevIndex) < currentPathIndex + 1
            ? t("previous_article")
            : t("next_article"),
      },
      right: {
        ...footerPages[nextIndex],
        header:
          (rightPage?.index ?? nextIndex) > currentPathIndex + 1
            ? t("next_article")
            : t("previous_article"),
      },
    }
  }

  const determineLayoutMode = () => {
    const { clientWidth } = document.documentElement
    setLayoutMode(clientWidth < 1024 ? "compact" : "base")
  }

  useLayoutEffect(() => {
    determineLayoutMode()
    window.addEventListener("resize", determineLayoutMode)

    return () => {
      window.removeEventListener("resize", determineLayoutMode)
    }
  }, [])

  const { left, right } = getFooterLayout()

  return (
    <Styled.FooterSpacer>
      <Styled.FooterGrid>
        <Styled.FooterContainer>
          <Styled.ArrowButton side="left" onClick={rewindIndex}>
            {"<"}
          </Styled.ArrowButton>
          <FooterElement
            id={left.id}
            number={left.index}
            header={left.header}
            title={left.title}
            author={left.author}
            summary={left.summary}
            path={left.path}
            variant="left"
          />
          <FooterElement
            id={right.id}
            number={right.index}
            header={right.header}
            title={right.title}
            author={right.author}
            summary={right.summary}
            path={right.path}
            variant="right"
          />
          <Styled.ArrowButton side="right" onClick={forwardIndex}>
            {">"}
          </Styled.ArrowButton>
        </Styled.FooterContainer>
      </Styled.FooterGrid>
    </Styled.FooterSpacer>
  )
}

export default ArticleFooter
