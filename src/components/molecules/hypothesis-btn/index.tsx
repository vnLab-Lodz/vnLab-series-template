import { navigate } from "gatsby-link"
import { useLocalization } from "gatsby-theme-i18n"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as Styled from "./style"
import useHypothesis from "src/hooks/useHypothesis"
import useIsClient from "src/hooks/useIsClient"
import useIsMobile from "src/hooks/useIsMobile"
import { useSpring, useTransform } from "framer-motion"
import { useTheme } from "styled-components"
import useThemeSwitcherContext from "src/hooks/useThemeSwitcherContext"
import { THEME_MODES } from "src/context/theme-switcher-context"

import HypothesisIcon from "../../../images/icons/hypothesis.svg"
import HypothesisIconInvert from "../../../images/icons/hypothesis_rewers.svg"
import XSVG from "../../../images/icons/x.svg"

function getHypothesisTutorialStatus() {
  return !!localStorage.getItem("hypothesisTutorialViewed")
}

interface Props {
  left?: boolean
  hiddenOnMobile?: boolean
  invert?: boolean
}

export const HypothesisIconButton = ({
  component,
  ignoreTheme,
  ...delegated
}: any) => {
  const { showHypothesis, hideHypothesis, isHidden } = useHypothesis()
  const { themeMode } = useThemeSwitcherContext()

  const handleIconBtnClick = () => {
    isHidden() ? showHypothesis() : hideHypothesis()
  }

  const Button = component ? component : Styled.IconButton
  const src =
    themeMode === THEME_MODES.DARK && !ignoreTheme
      ? HypothesisIcon
      : HypothesisIconInvert

  return (
    <Button
      aria-label="Toggle Hypothesis"
      type="button"
      id="hypothesis-btn"
      onClick={handleIconBtnClick}
      {...delegated}
    >
      <img
        height={20}
        src={src}
        alt="Hypothesis Icon"
        className="sizeable-icon"
      />
    </Button>
  )
}

const HypothesisBtn: React.FC<Props> = ({
  hiddenOnMobile = false,
  invert = false,
}) => {
  const { t } = useTranslation("common")
  const { isClient } = useIsClient()
  const [hypothesisTutorialViewed, setHypothesisTutorialViewed] =
    useState(false)
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
      ? ["brightness(0)", "brightness(15)"]
      : ["brightness(15)", "brightness(0)"]
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

  const closeAnnotateBtn = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setHypothesisTutorialViewedInLocalStorage()
  }

  if (!isClient || (hiddenOnMobile && isMobile) || hypothesisTutorialViewed)
    return <></>

  return (
    <Styled.TextButton id="hypothesis-btn" style={{ backgroundColor }}>
      <Styled.VerticalText style={{ color }} onClick={handleTextBtnClick}>
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
