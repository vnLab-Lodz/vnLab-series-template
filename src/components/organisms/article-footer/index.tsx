import React, { useEffect, useRef, useState } from "react"
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
  const { t } = useTranslation("common")
  const { themeMode } = useThemeSwitcherContext()
  const [layout, setLayoutMode] = useState<"base" | "compact">("base")
  const prevLayout = useRef<"base" | "compact">("base")

  const pages = usePublication()
  const currentPathIndex = getCurrentPathIndex(pages, currentPath)
  const [index, setIndex] = useState(currentPathIndex)

  const translationFactor = useSpring(currentPathIndex)
  const translateXBig = useMotionTemplate`calc(${translationFactor} * -50%)`
  const translateXSmall = useMotionTemplate`calc(${translationFactor} * -100%)`
  const translateX = layout === "base" ? translateXBig : translateXSmall

  const rewindIndex = () => setIndex(prev => Math.max(0, prev - 1))

  const forwardIndex = () => {
    setIndex(prev => {
      const offset = layout === "base" ? 1 : 2
      return Math.min(prev + 1, pages.length - offset)
    })
  }

  const getTranslationFactor = (i: number) => {
    return layout === "base" ? i - 1 : i
  }

  const determineLayoutMode = () => {
    const { clientWidth } = document.documentElement
    setLayoutMode(prev => {
      prevLayout.current = prev
      return clientWidth < 1024 ? "compact" : "base"
    })
  }

  useLayoutEffect(() => {
    determineLayoutMode()
    window.addEventListener("resize", determineLayoutMode)
    return () => window.removeEventListener("resize", determineLayoutMode)
  }, [])

  useEffect(() => {
    if (prevLayout.current !== layout) {
      if (layout === "compact" && index === pages.length - 1) {
        setIndex(pages.length - 2)
        return
      }

      if (layout === "base" && index === pages.length - 2) {
        setIndex(pages.length - 1)
        return
      }
    }

    const factor = getTranslationFactor(index)
    translationFactor.set(factor)
  }, [index, layout])

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
                if (i === currentPathIndex) {
                  return <React.Fragment key={page.id}></React.Fragment>
                }

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
