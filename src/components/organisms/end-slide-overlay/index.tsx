import { motion } from "framer-motion"
import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSwipeable } from "react-swipeable"
import usePublication from "src/hooks/usePublication"
import { getCurrentPathIndex } from "~util"
import * as Styled from "./style"

interface Props {
  currentPath: string
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EndSlideOverlay: React.FC<Props> = ({
  currentPath,
  setIsOverlayVisible,
}) => {
  const pages = usePublication()
  const currentPathIndex = getCurrentPathIndex(
    pages,
    currentPath.split("/#/")[0]
  )
  const { t } = useTranslation("common")

  const nextPage = useMemo(
    () => pages[currentPathIndex + 1],
    [pages, currentPathIndex, currentPath]
  )

  const handlers = useSwipeable({
    onSwiped: e => {
      if (e.dir === "Right") setIsOverlayVisible(false)
    },
  })

  return (
    <Styled.SlideOverlay
      right
      as={motion.div}
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      exit={{ translateX: "100%" }}
      transition={{ duration: 0.6, ease: "easeInOut", type: "keyframes" }}
    >
      <Styled.SlideOverlayPaper {...handlers}>
        <Styled.NextChapter
          id={nextPage.id}
          number={nextPage.index}
          header={t("next_article")}
          title={nextPage.title}
          author={nextPage.author}
          summary={nextPage.summary}
          path={nextPage.path}
        />
      </Styled.SlideOverlayPaper>
    </Styled.SlideOverlay>
  )
}

export default EndSlideOverlay
