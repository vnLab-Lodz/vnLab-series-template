import { navigate } from "gatsby-link"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import useHypothesis from "src/hooks/useHypothesis"
import useIsClient from "src/hooks/useIsClient"
import useIsMobile from "src/hooks/useIsMobile"
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion"
import { useTheme } from "styled-components"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"

//@ts-ignore
import HypothesisIcon from "../../../images/icons/hypothesis.svg"
//@ts-ignore
import HypothesisIconInvert from "../../../images/icons/hypothesis_rewers.svg"
//@ts-ignore
import XSVG from "../../../images/icons/x.svg"

function getHypothesisTutorialStatus() {
  return !!localStorage.getItem("hypothesisTutorialViewed")
}

interface Props {
  left?: boolean
  hiddenOnMobile?: boolean
  invert?: boolean
}

const HypothesisBtn: React.FC<Props> = ({
  left,
  hiddenOnMobile = false,
  invert = false,
}) => {
  const { t } = useTranslation("common")
  const { isClient } = useIsClient()
  const [hypothesisTutorialViewed, setHypothesisTutorialViewed] =
    useState(false)
  const { showHypothesis, hideHypothesis, isHidden } = useHypothesis()
  const { locale, defaultLang, prefixDefault, localizedPath } =
    useLocalization()
  const isMobile = useIsMobile()
  const { palette } = useTheme()

  const { themeMode } = useThemeSwitcherContext()

  const invertFactor = useSpring(invert ? 0 : 1)
  const backgroundColor = useTransform(
    invertFactor,
    [0, 1],
    [palette.white, palette.black]
  )
  const color = useTransform(
    invertFactor,
    [0, 1],
    [palette.black, palette.white]
  )
  const filter = useTransform(
    invertFactor,
    themeMode !== THEME_MODES.DARK ? [0, 1] : [0, 1],
    themeMode !== THEME_MODES.DARK
      ? ["brightness(0)", "brightness(10)"]
      : ["brightness(10)", "brightness(0)"]
  )

  useEffect(() => {
    setHypothesisTutorialViewed(getHypothesisTutorialStatus())
  }, [])

  useEffect(() => {
    invertFactor.set(invert ? 0 : 1)
  }, [invert, palette])

  const setHypothesisTutorialViewedInLocalStorage = () => {
    if (!!!hypothesisTutorialViewed) {
      localStorage.setItem("hypothesisTutorialViewed", "true")
      setHypothesisTutorialViewed(true)
    }
  }

  const handleTextBtnClick = () => {
    setHypothesisTutorialViewedInLocalStorage()

    navigate(
      localizedPath({
        defaultLang,
        prefixDefault,
        locale,
        path: "/hypothesis_tutorial",
      }),
      {}
    )
  }

  const handleIconBtnClick = () => {
    isHidden() ? showHypothesis() : hideHypothesis()
  }

  const closeAnnotateBtn = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setHypothesisTutorialViewedInLocalStorage()
  }

  if (!isClient || (hiddenOnMobile && isMobile)) return <></>

  return hypothesisTutorialViewed ? (
    <Styled.IconButton
      id="hypothesis-btn"
      onClick={handleIconBtnClick}
      left={!!left && isMobile}
    >
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.img
          key={invert ? "inverted-icon" : "normal-icon"}
          src={
            invert || themeMode === THEME_MODES.DARK
              ? HypothesisIconInvert
              : HypothesisIcon
          }
          alt="Hypothesis Icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
    </Styled.IconButton>
  ) : (
    <Styled.TextButton style={{ backgroundColor }}>
      <Styled.VerticalText
        style={{ color }}
        id="hypothesis-btn"
        onClick={handleTextBtnClick}
      >
        {t("hypothesis_btn")}
      </Styled.VerticalText>
      <Styled.CloseBtn
        src={XSVG}
        style={{ filter }}
        alt="X"
        onClick={closeAnnotateBtn}
      />
    </Styled.TextButton>
  )
}

export default HypothesisBtn
