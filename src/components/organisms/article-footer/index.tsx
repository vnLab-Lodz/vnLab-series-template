import React, { useState } from "react"
import { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import usePublication, { PublicationPage } from "src/hooks/usePublication"
import FooterElement from "~components/molecules/footer-element"
import { getChapterNumberFromIndex, getCurrentPathIndex } from "~util"
import * as Styled from "./style"

//@ts-ignore
import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
//@ts-ignore
import RightArrowSVG from "../../../images/icons/arrow_right.svg"

interface Props {
  currentPath: string
}

function getIndex(page: PublicationPage, fallback: number) {
  return getChapterNumberFromIndex(page.index ?? Number(`0.${fallback + 1}`))
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
    const leftPageChapterIndex = getIndex(leftPage, prevIndex)
    const rightPageChapterIndex = getIndex(rightPage, nextIndex)

    return {
      left: {
        ...leftPage,
        header:
          leftPageChapterIndex < currentPathIndex + 1
            ? t("previous_article")
            : t("next_article"),
      },
      right: {
        ...rightPage,
        header:
          rightPageChapterIndex > currentPathIndex + 1
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
            <img
              className="sizeable-icon--small"
              src={LeftArrowSVG}
              alt="Left arrow"
            />
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
            <img
              className="sizeable-icon--small"
              src={RightArrowSVG}
              alt="Right arrow"
            />
          </Styled.ArrowButton>
        </Styled.FooterContainer>
      </Styled.FooterGrid>
    </Styled.FooterSpacer>
  )
}

export default ArticleFooter
