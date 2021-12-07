import React, { useEffect, useState } from "react"
import { useLayoutEffect } from "react"
import { useTranslation } from "react-i18next"
import usePublication from "src/hooks/usePublication"
import FooterElement from "~components/molecules/footer-element"
import { getCurrentPathIndex } from "~util"
import { motion, useMotionTemplate, useSpring } from "framer-motion"
import * as Styled from "./style"

//@ts-ignore
import LeftArrowSVG from "../../../images/icons/arrow_left.svg"
//@ts-ignore
import RightArrowSVG from "../../../images/icons/arrow_right.svg"

interface Props {
  currentPath: string
}

const ArticleFooter: React.FC<Props> = ({ currentPath }) => {
  const pages = usePublication()
  const { t } = useTranslation("common")

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
      let modifier = layoutMode === "base" ? 3 : 2
      return pages.length - modifier === prev ? prev : prev + 1
    })

  const determineLayoutMode = () => {
    const { clientWidth } = document.documentElement
    setLayoutMode(clientWidth < 1024 ? "compact" : "base")
  }

  useEffect(() => {
    translationFactor.set(index)
  }, [index])
  useLayoutEffect(() => {
    determineLayoutMode()
    window.addEventListener("resize", determineLayoutMode)

    return () => {
      window.removeEventListener("resize", determineLayoutMode)
    }
  }, [])

  return (
    <Styled.FooterSpacer>
      <Styled.FooterGrid noConstraint>
        <Styled.FooterContainer>
          <Styled.ArrowButton side="left" onClick={rewindIndex}>
            <img
              className="sizeable-icon--small"
              src={LeftArrowSVG}
              alt="Left arrow"
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
            />
          </Styled.ArrowButton>
        </Styled.FooterContainer>
      </Styled.FooterGrid>
    </Styled.FooterSpacer>
  )
}

export default ArticleFooter
