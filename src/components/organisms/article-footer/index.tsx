import React, { useEffect, useState } from "react"
import { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import usePublication from "src/hooks/usePublication"
import FooterElement from "~components/molecules/footer-element"
import { getCurrentPathIndex } from "~util"
import { motion, useMotionTemplate, useSpring } from "framer-motion"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"
import * as Styled from "./style"

import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
import RightArrowSVG from "../../../images/icons/arrow_right.svg"

interface Props {
  currentPath: string
}

const ArticleFooter: React.FC<Props> = ({ currentPath }) => {
  const pages = usePublication()
  const { t } = useTranslation("common")
  const { themeMode } = useThemeSwitcherContext()

  const currentPathIndex = getCurrentPathIndex(pages, currentPath)

  const [layoutMode, setLayoutMode] = useState<"base" | "compact">("base")
  const [index, setIndex] = useState(currentPathIndex)

  const translationFactor = useSpring(currentPathIndex)
  const translateXBig = useMotionTemplate`calc(${translationFactor} * -50%)`
  const translateXSmall = useMotionTemplate`calc(${translationFactor} * -100%)`
  const translateX = layoutMode === "base" ? translateXBig : translateXSmall

  const rewindIndex = () => setIndex(prev => (prev === 0 ? prev : prev - 1))

  const forwardIndex = () =>
    setIndex(prev => {
      const isBase = layoutMode === "base"
      const modifier = isBase ? 3 : 2
      const validIndex = pages.length - modifier
      const canGoForward = isBase ? validIndex < prev : validIndex <= prev
      let nextIndex = canGoForward ? prev : prev + 1
      if (isBase && prev === 0) nextIndex = 2

      return nextIndex
    })

  const determineLayoutMode = () => {
    const { clientWidth } = document.documentElement
    setLayoutMode(clientWidth < 1024 ? "compact" : "base")
  }

  useEffect(() => {
    const offset = layoutMode === "base" ? 1 : 0
    const factor = index - offset
    translationFactor.set(factor >= 0 ? factor : 0)
  }, [index])

  useLayoutEffect(() => {
    determineLayoutMode()
    window.addEventListener("resize", determineLayoutMode)

    return () => {
      window.removeEventListener("resize", determineLayoutMode)
    }
  }, [])

  useEffect(() => {
    if (layoutMode === "compact") {
      translationFactor.set(index)
      return
    }

    const factor = index - 1
    translationFactor.set(factor >= 0 ? factor : 0)
  }, [layoutMode])

  if (pages.length <= 1) return null

  return (
    <Styled.FooterSpacer>
      <Styled.FooterGrid $noConstraint>
        <Styled.FooterContainer>
          <Styled.ArrowButton side="left" onClick={rewindIndex}>
            <img
              className="sizeable-icon--small"
              src={LeftArrowSVG}
              alt="Left arrow"
              style={{
                filter: themeMode === THEME_MODES.DARK ? "invert(1)" : "none",
              }}
            />
          </Styled.ArrowButton>
          <Styled.FooterPagesContainer>
            <Styled.FooterPages as={motion.div} style={{ translateX }}>
              {pages.map((page, i) => {
                if (i === currentPathIndex)
                  return <React.Fragment key={page.id}></React.Fragment>

                const header =
                  i > currentPathIndex
                    ? t("next_article")
                    : t("previous_article")

                return (
                  <FooterElement
                    key={page.id}
                    id={page.id}
                    number={page.index}
                    header={header}
                    title={page.title}
                    author={page.author}
                    summary={page.summary}
                    path={page.path}
                  />
                )
              })}
            </Styled.FooterPages>
          </Styled.FooterPagesContainer>

          <Styled.ArrowButton side="right" onClick={forwardIndex}>
            <img
              className="sizeable-icon--small"
              src={RightArrowSVG}
              alt="Right arrow"
              style={{
                filter: themeMode === THEME_MODES.DARK ? "invert(1)" : "none",
              }}
            />
          </Styled.ArrowButton>
        </Styled.FooterContainer>
      </Styled.FooterGrid>
    </Styled.FooterSpacer>
  )
}

export default ArticleFooter
